const axios = require('axios');
const instructor_pref = require("./controllers/instructor_preferences_controller");
const instructor_sched = require("./controllers/instructor_schedule_controller");

//function to calculate if class time is within teacher preference ranges
// const timeRanges = ["8:00am - 12:00pm", "4:00pm - 7:00pm"];
// const timeRangeToCheck = "4:00pm - 6:45pm";

function timeInRange(timeRangeToCheck, timeRanges) {
    // console.log("TIME IN RANGE")
    // console.log("TimeRanges: ", timeRanges)
    const [s, e] = convert_to_24h(timeRangeToCheck)
    var newTimeRanges = []
    for (const i in timeRanges) {
        newTimeRanges[i] = convert_to_24h(timeRanges[i])
        if (s > newTimeRanges[i][0] && e < newTimeRanges[i][1]) {
            return true;
        }
    }
    return false;
}

//function to convert string time ranges to start and end time arrays
function convert_to_24h(time_range) {

    const times = (time_range.toString()).split(' - ');
    // const times = time_range
    for (t in times) {
        const timeComponents = times[t].match(/(\d+):(\d+)([ap]m)/i);
        let hour = parseInt(timeComponents[1], 10);
        const minute = timeComponents[2];
        const ampm = timeComponents[3].toLowerCase();

        if (ampm === "pm" && hour < 12) {
            hour += 12;
        } else if (ampm === "am" && hour === 12) {
            hour = 0;
        }

        times[t] = `${hour.toString().padStart(2, '0')}:${minute}`;
    }
    // console.log("TIMES: ", times)
    return times
}

//function to update the instructor availabilities based off a new course added to the schedule
async function updateInstructorAvailabiltities(course, updatedAvailabilities) {
    console.log("UPDATING AVAILABILITIES")
    const unavailableDay = course.days;
    // console.log(course.days)
    const unavailableTime = [course.times_12h]
    // console.log(course.times_12h)

    for (i in unavailableDay) {
        // console.log(updatedAvailabilities[unavailableDay[i]])

        if (updatedAvailabilities[unavailableDay[i]].length != 0) {
            // console.log(instructorAvailabilities[unavailableDay])
            // console.log(unavailableTime)

            for (j in updatedAvailabilities[unavailableDay[i]]) {

                // console.log("calling availrange")
                // console.log(updatedAvailabilities[unavailableDay[i]][j])
                const availRange = convertTimeRangesToDatetime([updatedAvailabilities[unavailableDay[i]][j]])
                // console.log("calling courserange")
                // console.log(unavailableTime)
                const courseRange = convertTimeRangesToDatetime(unavailableTime)
                // console.log(availRange[0].startDate.toLocaleTimeString())
                // console.log(availRange[0].endDate.toLocaleTimeString())
                // console.log(courseRange[0].startDate.toLocaleTimeString())
                // console.log(courseRange[0].endDate.toLocaleTimeString())

                const newTimes = (removeOverlap(availRange, courseRange));
                // console.log(updatedAvailabilities[unavailableDay[i]])
                updatedAvailabilities[unavailableDay[i]][j] = convertDatetimeArrayToStrings(newTimes)[0]
                if (newTimes.length > 1) {
                    for (let k = 1; k < newTimes.length; k++) {
                        updatedAvailabilities[unavailableDay[i]].push(convertDatetimeArrayToStrings(newTimes)[k])
                    }
                }
            }
        }
    }
    console.log(updatedAvailabilities)
    return updatedAvailabilities;
}

//function to populate the intial instructor availabilities based off classes in schedule and availabilities
async function populateInstructorAvailabilities(instructorPreference, instructorSchedule) {
    // Initialize the instructorAvailabilities object
    var instructorAvailabilities = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    };

    // Extract availability information from the instructorPreference
    const availability1 = instructorPreference[0].availabilities;

    // Iterate through availability and add times to corresponding days
    availability1.forEach((avail) => {
        const day = avail.day;
        const times = avail.times;
        instructorAvailabilities[day] = instructorAvailabilities[day].concat(times);
    });
    console.log("AVAILABILITIES: ", instructorAvailabilities)


    // Extract class information from the instructorSchedule
    const classes = instructorSchedule;

    // // Iterate through classes and remove times from corresponding days
    classes.forEach((course) => {
        const unavailableDay = course.days;
        //console.log(course.days)
        const unavailableTime = [course.times_12h]

        for (i in unavailableDay) {
            // console.log(instructorAvailabilities[unavailableDay[i]])
            if (instructorAvailabilities[unavailableDay[i]].length != 0) {
                // console.log(instructorAvailabilities[unavailableDay])
                // console.log(unavailableTime)
                for (j in instructorAvailabilities[unavailableDay[i]]) {
                    // console.log("HERE 2")
                    // console.log(instructorAvailabilities[unavailableDay[i]][j])
                    const availRange = convertTimeRangesToDatetime([instructorAvailabilities[unavailableDay[i]][j]])
                    const courseRange = convertTimeRangesToDatetime(unavailableTime)
                    // console.log(availRange[0].startDate.toLocaleTimeString())
                    // console.log(availRange[0].endDate.toLocaleTimeString())
                    // console.log(courseRange[0].startDate.toLocaleTimeString())
                    // console.log(courseRange[0].endDate.toLocaleTimeString())

                    const newTimes = (removeOverlap(availRange, courseRange));
                    // console.log("NEW TIMES: ",newTimes)
                    //console.log(instructorAvailabilities[unavailableDay[i]])
                    instructorAvailabilities[unavailableDay[i]][j] = convertDatetimeArrayToStrings(newTimes)[0]
                    if (newTimes.length > 1) {
                    for (let k = 1; k < newTimes.length; k++) {
                        instructorAvailabilities[unavailableDay[i]].push(convertDatetimeArrayToStrings(newTimes)[k])
                    }
                }
                    
                }
            }
        }
    });
    console.log("UPDATED INSTRUCTOR AVAILABILITIES")
    console.log(instructorAvailabilities)
    return instructorAvailabilities;
}
//function to convert dateTimes to string format "12:00pm - 1:15pm"
function convertDatetimeArrayToStrings(datetimeArray) {

    const convertDatetimeToTimeString = ({ startDate, endDate }) => {
        const formatTime = (date) => {
            const hours = date.getHours() % 12 || 12; // Ensure 12-hour format
            const minutes = date.getMinutes();
            const period = date.getHours() >= 12 ? 'pm' : 'am';

            return `${hours}:${minutes.toString().padStart(2, '0')}${period}`;
        };

        return `${formatTime(startDate)} - ${formatTime(endDate)}`;
    };
    console.log(datetimeArray.map(convertDatetimeToTimeString))
    return datetimeArray.map(convertDatetimeToTimeString);
}


//function to convert time strings "12:00pm - 1:15pm" to dateTimes
function convertTimeRangesToDatetime(timeRanges) {
    const convertTimeStringToDatetime = (timeString) => {
        const [start, end] = (timeString).match(/(\d+:\d+[ap]m)/gi);

        const parseTime = (time) => {
            const [hours, minutes, period] = time.match(/(\d+):(\d+)([ap]m)/i).slice(1);
            const isPM = period && period.toLowerCase() === 'pm';
            return { hours: parseInt(hours, 10) + (isPM && hours !== '12' ? 12 : 0), minutes: parseInt(minutes, 10) };
        };

        const startTime = parseTime(start);
        const endTime = parseTime(end);

        const startDate = new Date(1970, 0, 1, startTime.hours, startTime.minutes);
        const endDate = new Date(1970, 0, 1, endTime.hours, endTime.minutes);

        return { startDate, endDate };
    };
    console.log(timeRanges, " TIME RANGES")
    return timeRanges.map(convertTimeStringToDatetime);
}


//function to check time ranges and identify overlap
function compareRanges(availRange, courseRange) {
    if (availRange.endDate < courseRange.startDate || courseRange.endDate < availRange.startDate) {
        console.log("No Overlap found, will not update availabilities")
        return false
    }
    else {
        console.log("Overlap found: will update availabilities")
        return true
    }
}
//function to remove a time overlap
function removeOverlap(array1, array2) {
    const result = [];

    for (const range1 of array1) {
        for (const range2 of array2) {
            if (compareRanges(range1, range2)) {
                // If there's an overlap, adjust the time range in array1
                // const overlapStart = new Date(Math.max(range2.startDate, range1.startDate))
                // const overlapEnd = new Date(Math.min(range2.endDate, range1.endDate))
                const overlapStart = range2.startDate > range1.startDate ? range2.startDate : range1.startDate;
                const overlapEnd = range2.endDate < range1.endDate ? range2.endDate : range1.endDate;

                console.log('RANGE1 START: ', range1.startDate.toLocaleTimeString())
                console.log('RANGE1 END: ', range1.endDate.toLocaleTimeString())
                console.log('RANGE2 START: ', range2.startDate.toLocaleTimeString())
                console.log('RANGE2 END: ', range2.endDate.toLocaleTimeString())


                console.log('OVERLAP START: ', overlapStart.toLocaleTimeString())
                console.log('OVERLAP END: ', overlapEnd.toLocaleTimeString())
                // Add the non-overlapping part before the overlap
                if (overlapStart > range1.startDate) {
                    // console.log(range1.startDate.toLocaleTimeString(), " ", overlapStart.toLocaleTimeString())
                    result.push({ startDate: range1.startDate, endDate: overlapStart });
                }

                // Add the non-overlapping part after the overlap

                if (overlapEnd < range1.endDate) {
                    // console.log('INSIDE')
                    // console.log(overlapEnd.toLocaleTimeString(), " ", range1.endDate.toLocaleTimeString())
                    result.push({ startDate: overlapEnd, endDate: range1.endDate });
                }

                // Break the loop since we handled the overlap for this range
                break;
            } else {
                result.push(range1)
            }
        }
    }
    console.log("RESULT", result)
    return result;
}

//function to make a call to axios function to get instructor preferences
async function getPreference(instructor_name) {
    const response = await instructor_pref.getInstructorPreference(instructor_name)
    return response
}
//function to make a call to axios function to get instructor schedule
async function getSchedule(instructor_name) {
    const response = await instructor_sched.getInstructorSchedule(instructor_name)
    return response
}

var tempPreferenceCourses = [
    {
        section_address: "cs4337.002.22f",
        course_prefix: "cs",
        course_number: 4337,
        section: 0o02,
        class_number: 84799,
        title: "Programming Language Paradigms",
        days: ["Tuesday", "Thursday"],
        times_12h: "4:00pm - 5:15pm",
        location: "ECSS_2.311"
    },
    {
        section_address: "cs1336.001.22f",
        course_prefix: "cs",
        course_number: 1336,
        section: 0o01,
        class_number: 84693,
        title: "Programming Fundamentals",
        days: ["Monday", "Wednesday"],
        times_12h: "11:30am - 12:45pm",
        location: "ECSS_2.311"
    },

]
//function to make axios call based of requested available courses in instructorPreferences
//to get the full course information
async function getSpecificPreferenceCourse(courseParamString) {
    console.log("FINAL PARAM: ", courseParamString)
    const response = await instructor_pref.getCourseByClassNumber(courseParamString)
    //const response = await instructor_sched.getGivenClasses(courseParamString)
    console.log("FINAL RESPONSE: ", response)
    return response
    //return tempPreferenceCourses
}

//function to make axios call based off general preferences in instructorPreferences
//to get possible specific course options for the general preference
async function getGeneralPreference(generalParamString) {
    // console.log("PARAMS FOR GENERAL PREF: ", generalParamString)
    const response = await instructor_sched.getGivenClasses(generalParamString)
    //console.log("CLASSES BASED OFF GENERAL PREFERENCE: ", response)
    return response
    //return course_objs
}
//function that adds specific available courses from instructor preferences to the generated instructor schedule
async function getScheduleOverlap(chosenAvailableCourses, instructorCourses, updatedAvailabilities) {
    for (let i = 0; i < chosenAvailableCourses.length; i++) {
        try {
            //const canAdd = await isScheduleOverlap(chosenAvailableCourses[i], instructorCourses)
            //if (canAdd){
            finalPossibleCourses.push(chosenAvailableCourses[i]);
            //console.log(finalPossibleCourses);
            updatedAvailabilities = await updateInstructorAvailabiltities(chosenAvailableCourses[i], updatedAvailabilities);
            //}
        } catch (error) {
            console.error("Error:", error);
        }

    }
}
//function to call the populateInstructorAvailabilities function
async function populateHelper(instructorPreference, instructorSchedule) {
    var confirm = await populateInstructorAvailabilities(instructorPreference, instructorSchedule)
    // console.log('CONFIRM: ', confirm)
    return confirm
}

//mock data for now
//ideally should make a call to the db with days and courses

const course_objs = [
    [{
        section_address: "cs2340.001.22f",
        course_prefix: "cs",
        course_number: 2340,
        section: 0o01,
        class_number: 84884,
        title: "Computer Architecture ",
        days: ["Tuesday", "Thursday"],
        times_12h: "2:30pm - 3:45pm",
        location: "ECSS_2.311"
    },
    {
        section_address: "cs2340.002.22f",
        course_prefix: "cs",
        course_number: 2340,
        section: 0o02,
        class_number: 84884,
        title: "Computer Architecture ",
        days: ["Monday", "Wednesday"],
        times_12h: "5:30pm - 6:45pm",
        location: "ECSS_2.311"
    },
    {
        section_address: "cs2340.003.22f",
        course_prefix: "cs",
        course_number: 2340,
        section: 0o03,
        class_number: 84884,
        title: "Computer Architecture ",
        days: ["Monday", "Wednesday"],
        times_12h: "1:00pm - 2:15pm",
        location: "ECSS_2.311"
    }],

    [
        {
            section_address: "cs3345.001.22f",
            course_prefix: "cs",
            course_number: 3345,
            section: 0o01,
            class_number: 84868,
            title: "Data Structures and Introduction to Algorithmic Analysis ",
            days: ["Monday", "Wednesday"],
            times_12h: "1:00pm - 2:15pm",
            location: "ECSS_2.311"
        },
        {
            section_address: "cs3345.002.22f",
            course_prefix: "cs",
            course_number: 3345,
            section: 0o02,
            class_number: 84868,
            title: "Data Structures and Introduction to Algorithmic Analysis ",
            days: ["Monday", "Wednesday"],
            times_12h: "5:30pm - 6:45pm",
            location: "ECSS_2.311"
        },
        {
            section_address: "cs3345.003.22f",
            course_prefix: "cs",
            course_number: 3345,
            section: 0o03,
            class_number: 84868,
            title: "Data Structures and Introduction to Algorithmic Analysis ",
            days: ["Monday", "Wednesday"],
            times_12h: "3:00pm - 4:15pm",
            location: "ECSS_2.311"
        },
    ]

]

//variable to hold the generated schedule
var finalPossibleCourses = []

//async function that checks if a course fits within an instructor's availabilties
async function checkTimes(course, updatedAvailabilities) {

    if (course.length != 0) {
        for (i in course) {
            timeOfClass = course[i].times_12h
            courseTemp = course[i]
            daysOfClass = courseTemp.days
            // console.log(timeOfClass)
            // console.log(courseTemp)
            console.log(daysOfClass)
            console.log(courseTemp.course_prefix, " ", courseTemp.course_number)



            if (daysOfClass.length == 1) {
                switch (daysOfClass[0]) {
                    case 'Monday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Monday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                    case 'Tuesday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Tuesday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                    case 'Wednesday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Wednesday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                    case 'Thursday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Thursday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                    case 'Friday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Friday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                    case 'Saturday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Saturday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                    case 'Sunday':
                        if (timeInRange(timeOfClass, updatedAvailabilities.Sunday)) {
                            //add to possible courses
                            //allPossibleCourses.push(courseTemp)
                            return true
                        }
                        break;
                }
            }
            else if (daysOfClass.length == 2) {
                var count = 0
                for (let k = 0; k < daysOfClass.length; k++) {
                    switch (daysOfClass[i]) {
                        case 'Monday':
                            console.log("IN CASE MONDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Monday)) {
                                //add to possible courses
                                if (count == 1) {
                                    // allPossibleCourses.push(courseTemp)
                                    console.log("IN CASE MONDAY CONFIRMED")
                                    return course[i]
                                } else {
                                    count++
                                }

                            }
                            break;
                        case 'Tuesday':
                            console.log("IN CASE TUESDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Tuesday)) {
                                //add to possible courses
                                if (count == 1) {
                                    // allPossibleCourses.push(courseTemp)
                                    return course[i]
                                } else {
                                    count++
                                }
                            }
                            break;
                        case 'Wednesday':
                            console.log("IN CASE WEDNESDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Wednesday)) {

                                //add to possible courses
                                if (count == 1) {
                                    // allPossibleCourses.push(courseTemp)
                                    console.log("IN CASE WEDNESDAY CONFIRMED")
                                    console.log(course[i])
                                    return course[i]
                                } else {
                                    count++
                                }
                            }
                            break;
                        case 'Thursday':
                            console.log("IN CASE THURSDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Thursday)) {
                                //add to possible courses
                                if (count == 1) {
                                    // allPossibleCourses.push(courseTemp)
                                    // count = 0
                                    return course[i]
                                } else {
                                    count++
                                }
                            }
                            break;
                        case 'Friday':
                            console.log("IN CASE FRIDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Friday)) {
                                //add to possible courses
                                if (count == 1) {
                                    // allPossibleCourses.push(courseTemp)
                                    // count = 0
                                    return course[i]
                                } else {
                                    count++
                                }
                            }
                            break;
                        case 'Saturday':
                            console.log("IN CASE SATURDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Saturday)) {
                                //add to possible courses
                                if (count == 1) {
                                    // allPossibleCourses.push(courseTemp)
                                    // count = 0
                                    return course[i]
                                } else {
                                    count++
                                }
                            }
                            break;
                        case 'Sunday':
                            console.log("IN CASE SUNDAY")
                            if (timeInRange(timeOfClass, updatedAvailabilities.Sunday)) {
                                //add to possible courses
                                if (count == 1) {
                                    //allPossibleCourses.push(courseTemp)
                                    // count = 0
                                    return course[i]
                                } else {
                                    count++
                                }
                            }
                            break;
                    }

                }
            }
        }

    }
}
//function to get course options based off general preferences in instructor preferences
//and returns a formatted version
async function getFormattedGeneralPref(instructorPreference) {

    var formattedCourses = []
    for (let i = 0; i < instructorPreference[0].general_preferences.length; i++) {
        try {
            console.log("CALLING GET FOR THIS CLASS: ", instructorPreference[0].general_preferences[i].course_number)
            const courseOptions = await getGeneralPreference(instructorPreference[0].general_preferences[i].course_number)
            formattedCourses.push(courseOptions)
        } catch (error) {
            console.error("Error:", error);
        }
    }
    console.log("FORMATTED COURSES: ", formattedCourses)
    return formattedCourses;
}
//function to 
async function processCourses(courseOptions, updatedAvailabilities, finalPossibleCourses) {
    console.log("PROCESS COURSES: ")
    for (let i = 0; i < courseOptions.length; i++) {
        try {
            const courseToAdd = await checkTimes(courseOptions[i], updatedAvailabilities);
            console.log("COURSE TO ADD: ", courseToAdd)

            if (typeof courseToAdd !== "undefined") {
                console.log("solution found: ", courseToAdd.section_address);
                finalPossibleCourses.push(courseToAdd);
                //console.log(finalPossibleCourses);

                updatedAvailabilities = await updateInstructorAvailabiltities(courseToAdd, updatedAvailabilities);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    console.log(finalPossibleCourses);
    return finalPossibleCourses
}

async function putFinalPossibeCoursesInSchedule(finalPossibleCourses, instructor_name) {
    const response = await instructor_sched.putFinalPossibleCourses(finalPossibleCourses, instructor_name);
    console.log(response.data)
    return response.data
}

function generateSchedule(){
    //get function to get the instructorPreferences and instructorSchedule
    Promise.all([getPreference(instructor_name), getSchedule(instructor_name)])
    .then(([instructorPreference, instructorSchedule]) => {
        // 
        console.log("Instructor Preferences:");
        console.log(instructorPreference[0].courses);
        console.log(instructorPreference[0].availabilities);
        console.log("Instructor Schedule:");
        console.log(instructorSchedule);

        populateHelper(instructorPreference, instructorSchedule)
            .then((updatedAvailabilities) => {
                //AT THIS POINT, WE HAVE UPDATED AVAILABILITIES BASED OFF COURSES
                var courseParam = []
                instructorPreference[0].courses.forEach(course => {
                    courseParam.push(course.class_number)
                })
                var coursesParamString = courseParam.join(",")

                //get function to get the specific available courses requested by instructor
                getSpecificPreferenceCourse(coursesParamString).then((chosenAvailableCourses) => {
                    console.log("CHOSEN AVAILABLE COURSES", chosenAvailableCourses)
                    //if those classes are available (if length != 0)
                    if (Object.keys(chosenAvailableCourses).length != 0) {
                        //add the classes to the generated schedule
                        getScheduleOverlap(chosenAvailableCourses, instructorSchedule, updatedAvailabilities)
                    }
                    //get the possible courses based off the instructor's general preferences
                    getFormattedGeneralPref(instructorPreference).then((courseOptions) => {
                        //process the courses to get a possible schedule
                        processCourses(courseOptions, updatedAvailabilities, finalPossibleCourses).then((finalPossibleCourses) =>{
                            //put possible schedule in database
                            console.log('COURSES TO BE ADDED TO SCHEDULE DATABASE: ', finalPossibleCourses)
                            putFinalPossibeCoursesInSchedule(finalPossibleCourses, instructor_name);
                        }).catch((error) => {
                            console.error("Error:", error);
                        });
                    }).catch((error) => {
                        console.error("Error:", error);
                    });
                }).catch((error) => {
                    console.error("Error:", error);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
}

const instructor_name = "Karen%20Mazidi"
generateSchedule(instructor_name);


module.exports = {generateSchedule};


