
const axios = require('axios');
const instructor_pref = require("./controllers/instructor_preferences_controller");
const instructor_sched = require("./controllers/instructor_schedule_controller");


const course_objs = [
    {
        section_address: "cs1134.101.22f",
        course_prefix: "cs",
        course_number: 1134,
        section: 101,
        class_number: 84781,
        title: "Computer Science Laboratory ",
        days: ["Saturday"],
        times: "10:00am - 12:45am",
        location: "ECSS_2.312"
    }, 
    {
        section_address: "cs1134.103.22f",
        course_prefix: "cs",
        course_number: 1134,
        section: 102,
        class_number: 84782,
        title: "Computer Science Laboratory ",
        days: ["Friday"],
        times: "01:00pm - 03:45pm",
        location: "ECSS_2.310"
    },
    {
        section_address: "cs1134.103.22f",
        course_prefix: "cs",
        course_number: 1134,
        section: 103,
        class_number: 84783,
        title: "Computer Science Laboratory ",
        days: ["Monday", "Wednesday"],
        times: "04:00pm - 06:45pm",
        location: "ECSS_2.311"
    },
]

const preferences_obj = [
    {
        instructor_name: "Karen",
        days: ["Monday", "Wednesday", "Saturday"],
        times: ["08:00am - 12:00pm", "04:00pm - 07:00pm"],
        courses_preferences: [{
            course_prefix: "cs",
            course_number: 1134
        },
        {
            course_prefix: "cs",
            course_number: 1336
        }]
    }
]

const courses_map = new Map();
course_objs.forEach(item => courses_map.set(item.section_address, item))

// console.log(courses_map.get("cs1134.103.22f"))

//------------------------- TIME PREFERENCE -------------------------//
//calculate if class time is within teacher preference ranges
const timeRanges = ["8:00am - 12:00pm", "4:00pm - 7:00pm"];
const timeRangeToCheck = "4:00pm - 6:45pm";

function timeInRange(timeRangeToCheck, timeRanges){
    const [s,e] = convert_to_24h(timeRangeToCheck)
    for(const i in timeRanges) {
        timeRanges[i] = convert_to_24h(timeRanges[i])
        if (s >= timeRanges[i][0] && e <= timeRanges[i][1]){
            return true;
        }
    }
    return false;
}

//function to convert string time ranges to start and end time arrays
function convert_to_24h(time_range){
    const times = time_range.split(' - ');
    for(t in times){
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
    return times
}

async function getPreference(){
    const response = await instructor_pref.getInstructorPreference("Pushpa%20Kumar")
    return response
}

async function getSchedule(){
    const response = await instructor_sched.getInstructorSchedule("Pushpa%20Kumar")
    return response
}

function populateInstructorAvailabilities(instructorPreference, instructorSchedule) {
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
    const availability1 = instructorPreference[0].availability;

    // Iterate through availability and add times to corresponding days
    availability1.forEach((avail) => {
        const day = avail.day;
        const times = avail.time;
        instructorAvailabilities[day] = instructorAvailabilities[day].concat(times);
    });

    // Extract class information from the instructorSchedule
    const classes = instructorSchedule[0].courses;

    // Iterate through classes and remove times from corresponding days
    classes.forEach((course) => {
        const unavailableDay = course.days[0];
        const unavailableTime = course.times_12h;

        // Find the index of the time range in instructorAvailabilities
        const index = instructorAvailabilities[unavailableDay].findIndex(
            (timeRange) => timeRange.includes(unavailableTime)
        );

        if (index !== -1) {
            // Split the time range into two parts and update the array
            const [start, end] = instructorAvailabilities[unavailableDay][index].split(" - ");
            const classEndTime = course.times_12h.split(" - ")[1];
            instructorAvailabilities[unavailableDay][index] = `${classEndTime} - ${end}`;
        }
    });
    console.log(instructorAvailabilities)
    return instructorAvailabilities;
}




//Scheduling algorithm planning


//Get the preferences the instructor sets on the frontend
//Days, Times, Class Number, Prefix
//Create a get function that can take multiple parameters the instructor searches by
    //Get function must be for the current_course_info DB 

//Example input from frontend, actually should be stored in instructor preferences database

//Karen Mazidi
//call for instructor preferences


// console.log(response)


// const instructorPreference = getPreference()
// const instructorSchedule = getSchedule()
// console.log(instructorPreference)
// console.log(instructorSchedule)

// async function fetchData() {
//     try {
//       const instructorPreference = await getPreference();
//       console.log("Instructor Preference Response:", instructorPreference);
  
//       const instructorSchedule = await getSchedule();
//       console.log("Instructor Schedule Response:", instructorSchedule);
  
//       // Now check the structure of the responses and adjust your code accordingly
//       console.log("Instructor Preference Data:", instructorPreference.data);
//       console.log("Instructor Schedule Data:", instructorSchedule.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
// }
  
// fetchData();
// function fetchData() {
//     // Use Promise.all to wait for both promises to resolve
//     Promise.all([getPreference(), getSchedule()])
//       .then(([instructorPreference, instructorSchedule]) => {
//         // Both promises have resolved, and you have access to the results
//         console.log("Instructor Preference:", instructorPreference);
//         console.log("Instructor Schedule:", instructorSchedule);
  
//         // Call another function with the results
//         populateInstructorAvailabilities(instructorPreference, instructorSchedule);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }
  
//   fetchData()

function excludeOverlappingTimes(availabilities, courses) {
    // Initialize the result object
    var instructorAvailabilities = {};

    // Initialize all days with an empty array in the result object
    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    allDays.forEach(day => {
        instructorAvailabilities[day] = [];
    });

    // Iterate through the availabilities array
    availabilities.forEach((avail) => {
        const day = avail.day;
        const times = avail.time;

        // Iterate through all days to ensure they exist in the result object
        allDays.forEach(day => {
            if (!instructorAvailabilities[day]) {
                instructorAvailabilities[day] = [];
            }
        });

        // Iterate through the courses array
        courses.forEach((course) => {
            const courseDay = course.days[0];
            const courseTime = course.times_12h;

            // Check if the course overlaps with the availability
            if (day === courseDay && doTimesOverlap(times, courseTime)) {
                // Exclude overlapping times from the availability range
                const overlappingTimes = getOverlappingTimes(times, courseTime);
                // Remove overlapping times from the original availability
                instructorAvailabilities[day] = instructorAvailabilities[day].filter(time => !overlappingTimes.includes(time));
            }
        });

        // If there are no overlapping times, retain the original availability
        if (instructorAvailabilities[day].length === 0) {
            instructorAvailabilities[day] = times;
        }
    });

    // Sort the resulting time ranges
    allDays.forEach(day => {
        instructorAvailabilities[day] = instructorAvailabilities[day].sort();
    });

    return instructorAvailabilities;
}

// ... (rest of the code remains the same)

// Function to check if two time ranges overlap
function doTimesOverlap(range1, range2) {
    const [start1, end1] = range1.map(time => parseTimeRange(time));
    const [start2, end2] = parseTimeRange(range2);

    return start1 < end2 && end1 > start2;
}

// Function to get overlapping times between two ranges
function getOverlappingTimes(range1, range2) {
    const [start1, end1] = range1.map(time => parseTimeRange(time));
    const [start2, end2] = parseTimeRange(range2);

    const start = start1 < start2 ? start2 : start1;
    const end = end1 < end2 ? end1 : end2;

    const overlappingTimes = [];
    if (start < end) {
        overlappingTimes.push(formatTime(start), formatTime(end));
    }

    return overlappingTimes;
}

// Function to parse time range to start and end time
function parseTimeRange(timeRange) {
    const [start, end] = timeRange.split(" - ").map(time => new Date(`1970-01-01 ${time}`));
    return [start, end];
}

// Function to format time to HH:mmam/pm
function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}${ampm}`;
}




Promise.all([getPreference(), getSchedule()])
      .then(([instructorPreference, instructorSchedule]) => {
        // Both promises have resolved, and you have access to the results
        console.log("Instructor Preferences:");
        console.log(instructorPreference[0].availability);
        console.log("Instructor Schedule:");
        console.log(instructorSchedule[0].courses);
  
        // Call another function with the results
       var instructor_availabilites = excludeOverlappingTimes(instructorPreference[0].availability, instructorSchedule[0].courses);
       console.log(instructor_availabilites)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  


  
//   getPreference().then((instructorPreference) => {
//     console.log(instructorPreference);
//   });

//   getSchedule().then((instructorSchedule) => {
//     console.log(instructorSchedule);
//   });

//GET FUNCTION FOR COURSES BASED OFF DAY AND COURSE



// //Store the response in an array

// //call for current schedule
// //Get function for the instructor's current schedule (from last semester)

// //Store time availabilites in a dict
// const instructor_availabilities = populateInstructorAvailabilities(instructorPreference.data, instructorSchedule.data);
// console.log(instructor_availabilities)

// //Update the instructorAvailabilities based off the preferences they set 
// //and their previous schedule

    // For example: if available to teach from 9:00 AM to 3:00 PM on Monday, but 
    // already teaching a class from 1:00 PM to 2:15 PM, the availability would be
    // Monday: from 9:00 AM - 1:00 PM and from 2:15 PM - 3:00 PM.





// let allPossibleCourses = [];
// //For each course they add to preferences, do the following

// //The API response will include the classes based off preference by day and course
// //Need to check time

// //if the time of the course on the day in within the range
// //For example, if class is taught on Monday and Wednesday

// for (let i = 0; i < course_objs.length; i++){
//     timeOfClass = course_objs[i].times
//     courseTemp = course_objs[i]

//     if (timeInRange(timeOfClass, instructorAvailabilites.Monday) && 
//     timeInRange(timeOfClass, instructorAvailabilites.Wednesday)){
//     //add to possible courses
//         allPossibleCourses.push(courseTemp)
//     }    

// }


// let tempAllPossibleCourses = { ...allPossibleCourses };
// let tempInstructorAvailabilites = { ...instructorAvailabilites };
// //Algorithm and Scoring
// //allPossibleCourses
// //  __________ __________ __________  _________  _________  __________  __________
// // | CourseA1 | CourseA2 | CourseA3 | CourseB1 | CourseB2 | Course C1 | Course C2 | 
// //  ---------- ---------- ---------- ---------- ---------- -----------  ----------

// //Algorithm
// //Start to iterate, and fill out the possible schedule object
// //Must build this object based off the number of course preferences the instructor set
// possibleSchedule = {
//     course1: "",
//     course2: "",
//     course3: "",
// }


// //while more schedules can be generated

// //      X
// //  __________ __________ __________  _________  _________  __________  __________
// // | CourseA1 | CourseA2 | CourseA3 | CourseB1 | CourseB2 | Course C1 | Course C2 | 
// //  ---------- ---------- ---------- ---------- ---------- -----------  ----------


// //Check that course has already been assigned, if so, then keep iterating until one
// //that hasn't been assigned is found

// //Scoring: 100/#of courses for each possible course, only courses 
// //with the score of 100 will be sent to frontend

// //assign it to the possibleSchedule object and modify the tempInstructorAvailabilites
// //by removing the time of the class added
// //repeat the same with the next course, and keep adding to the the possible Schedule object
// //once a schedule object is filled, a possible schedule has been verified!

// //add that schedule object to the finalPossibleCourses array

// //Things to consider: after the 1st occurance of the course has been accepted, 
// //declare it unavailable for the 2nd iteration




// let finalPossibleCourses = []

//return this to the frontend where each entry is a possible schedule

//











