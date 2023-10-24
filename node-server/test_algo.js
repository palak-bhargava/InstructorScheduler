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

//------------------------ COURSE PREFERENCE ------------------------//
//check if the course prefix and number are included in the professors preferences
function inPreferences(course, preferences){
    return preferences.some(prefCourse => (
        prefCourse.course_prefix === course.course_prefix &&
        prefCourse.course_number === course.course_number
    ));
}

console.log(inPreferences(course_objs[0], preferences_obj[0].courses_preferences))


//------------------------- DAY PREFERENCE --------------------------//
//check if the days the class is taught matches the professors preference
const classDays = ["Monday", "Wednesday"];
const instructorPreferences = ["Monday", "Wednesday", "Friday"];

//professor must be able to teach on all class days
function canTeachClass(classDays, instructorPreferences) {
    return classDays.every(day => instructorPreferences.includes(day));
}
//console.log(canTeachClass(classDays, instructorPreferences));

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

//------------------------ SCORING ALGORITHM ------------------------//

//criteria for scoring based on different preferences:
// 1. Times --> based on how far out of or in range?
// 2. Days --> based on if class days are in preferences, num of days in prefereces?
// 3. Courses --> should we have a priority for course preference to base score off of?