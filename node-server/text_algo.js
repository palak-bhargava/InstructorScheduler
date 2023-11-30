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

console.log(courses_map.get("cs1134.103.22f"))

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



//Scheduling algorithm planning


//Get the preferences the instructor sets on the frontend
//Days, Times, Class Number, Prefix
//Create a get function that can take multiple parameters the instructor searches by
    //Get function must be for the current_course_info DB 


//Store the response in an array

//Get function for the instructor's current schedule (from last semester)

//Store time availabilites in a dict
var instructorAvailabilites = {Monday: [], Tuesday: [], Wednesday: [], 
    Thursday: [], Friday: [], Saturday: [], Sunday:[]};

//Update the instructorAvailabilities based off the preferences they set 
//and their previous schedule

    //For example: if available to teach from 9:00 AM to 3:00 PM on Monday, but 
    //already teaching a class from 1:00 PM to 2:15 PM, the availability would be
    //Monday: from 9:00 AM - 1:00 PM and from 2:15 PM - 3:00 PM


let allPossibleCourses = [];
//For each course they add to preferences, do the following

//The API response will include the classes based off preference by day and course
//Need to check time

//if the time of the course on the day in within the range
//For example, if class is taught on Monday and Wednesday

for (let i = 0; i < course_objs.length; i++){
    timeOfClass = course_objs[i].times
    courseTemp = course_objs[i]

    if (timeInRange(timeOfClass, instructorAvailabilites.Monday) && 
    timeInRange(timeOfClass, instructorAvailabilites.Wednesday)){
    //add to possible courses
        allPossibleCourses.push(courseTemp)
    }    

}


let tempAllPossibleCourses = { ...allPossibleCourses };
let tempInstructorAvailabilites = { ...instructorAvailabilites };
//Algorithm and Scoring
//allPossibleCourses
//  __________ __________ __________  _________  _________  __________  __________
// | CourseA1 | CourseA2 | CourseA3 | CourseB1 | CourseB2 | Course C1 | Course C2 | 
//  ---------- ---------- ---------- ---------- ---------- -----------  ----------

//Algorithm
//Start to iterate, and fill out the possible schedule object
//Must build this object based off the number of course preferences the instructor set
possibleSchedule = {
    course1: "",
    course2: "",
    course3: "",
}


//while more schedules can be generated

//      X
//  __________ __________ __________  _________  _________  __________  __________
// | CourseA1 | CourseA2 | CourseA3 | CourseB1 | CourseB2 | Course C1 | Course C2 | 
//  ---------- ---------- ---------- ---------- ---------- -----------  ----------


//Check that course has already been assigned, if so, then keep iterating until one
//that hasn't been assigned is found

//Scoring: 100/#of courses for each possible course, only courses 
//with the score of 100 will be sent to frontend

//assign it to the possibleSchedule object and modify the tempInstructorAvailabilites
//by removing the time of the class added
//repeat the same with the next course, and keep adding to the the possible Schedule object
//once a schedule object is filled, a possible schedule has been verified!

//add that schedule object to the finalPossibleCourses array

//Things to consider: after the 1st occurance of the course has been accepted, 
//declare it unavailable for the 2nd iteration




let finalPossibleCourses = []

//return this to the frontend where each entry is a possible schedule

//











