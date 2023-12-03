const axios = require('axios');
const instructor_pref = require("./controllers/instructor_preferences_controller");
const instructor_sched = require("./controllers/instructor_schedule_controller");



//FIND OVERLAPPING TIMES--------------------------------------------------------------------

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

// // Iterate through classes and remove times from corresponding days
classes.forEach((course) => {
  const unavailableDay = course.days[0];
  const unavailableTime = [course.times_12h]

  if (instructorAvailabilities[unavailableDay].length != 0){
        console.log(instructorAvailabilities[unavailableDay])
        console.log(unavailableTime)
        const availRange = convertTimeRangesToDatetime(instructorAvailabilities[unavailableDay])
        const courseRange = convertTimeRangesToDatetime(unavailableTime)
        console.log(availRange[0].startDate.toLocaleTimeString())
        console.log(availRange[0].endDate.toLocaleTimeString())
        console.log(courseRange[0].startDate.toLocaleTimeString())
        console.log(courseRange[0].endDate.toLocaleTimeString())

        const newTimes = (removeOverlap(availRange, courseRange));
        //console.log(convertDatetimeArrayToStrings(newTimes))
        instructorAvailabilities[unavailableDay] = convertDatetimeArrayToStrings(newTimes)

  }
});
console.log(instructorAvailabilities)
return instructorAvailabilities;
}

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

    return datetimeArray.map(convertDatetimeToTimeString);
}



function convertTimeRangesToDatetime(timeRanges) {
    const convertTimeStringToDatetime = (timeString) => {
        const [start, end] = timeString.match(/(\d+:\d+[ap]m)/gi);

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

    return timeRanges.map(convertTimeStringToDatetime);
}



function compareRanges(availRange, courseRange){
    if (availRange.startDate >= courseRange.startDate && availRange.startDate<= courseRange.endDate){
        //then overlapping
        console.log("Overlap found: with startdate")
        return true
    } else if (availRange.endDate >= courseRange.startDate && availRange.endDate<= courseRange.endDate){
        console.log("Overlap found: with enddate")
        return true
    } else {
        console.log("NOT OVERLAPPING")
        return false
    }
}

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
                
                // console.log('RANGE1 START: ', range1.startDate.toLocaleTimeString())
                // console.log('RANGE1 END: ', range1.endDate.toLocaleTimeString())
                // console.log('RANGE2 START: ', range2.startDate.toLocaleTimeString())
                // console.log('RANGE2 END: ', range2.endDate.toLocaleTimeString())


                // console.log('OVERLAP START: ', overlapStart.toLocaleTimeString())
                // console.log('OVERLAP END: ', overlapEnd.toLocaleTimeString())
                // Add the non-overlapping part before the overlap
                if (overlapStart > range1.startDate) {
                    console.log(range1.startDate.toLocaleTimeString(), " ", overlapStart.toLocaleTimeString())
                    result.push({ startDate: range1.startDate, endDate: overlapStart });
                }

                // Add the non-overlapping part after the overlap
                
                if (overlapEnd < range1.endDate) {
                    console.log('INSIDE')
                    console.log(overlapEnd.toLocaleTimeString(), " ", range1.endDate.toLocaleTimeString())
                    result.push({ startDate: overlapEnd, endDate: range1.endDate });
                }

                // Break the loop since we handled the overlap for this range
                break;
            } else {
                result.push(range1)
            }
        }
    }
    console.log(result)
    return result;
}

// Function to check if two date ranges overlap
function doRangesOverlap(range1, range2) {
    return range1.endDate > range2.startDate && range1.startDate < range2.endDate;
}

async function getPreference(){
    const response = await instructor_pref.getInstructorPreference("Karen%20Mazidi")
    return response
}

async function getSchedule(){
    const response = await instructor_sched.getInstructorSchedule("Karen%20Mazidi")
    return response
}


Promise.all([getPreference(), getSchedule()])
      .then(([instructorPreference, instructorSchedule]) => {
        // Both promises have resolved, and you have access to the results
        // console.log("Instructor Preferences:");
        // console.log(instructorPreference[0].availability);
        // console.log("Instructor Schedule:");
        // console.log(instructorSchedule[0].courses);
        
        populateInstructorAvailabilities(instructorPreference, instructorSchedule)
  
        // Call another function with the results
    //    var instructor_availabilites = excludeOverlappingTimes(instructorPreference[0].availability, instructorSchedule[0].courses);
    //    console.log(instructor_availabilites)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });