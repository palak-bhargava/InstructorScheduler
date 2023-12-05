const axios = require('axios');

//--------------------GET INSTRUCTOR GENERAL PREFERENCES--------------------------------------

async function getInstructorGeneralPreferences() {
    let instructor_name = "Bob%20Kumar";
    try {
        const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
        return response.data[0].general_preferences;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getCurrentAvailableCoursesArray(course_number) {
    const class_assigned = "false";
    try {
        const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${course_number}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getFinalArray() {
    const general_preferences_array = await getInstructorGeneralPreferences();
    //console.log(general_preferences_array);
    const final_array = [];

    const promises = general_preferences_array.map(async (preference) => {
        //console.log(preference);
        const availableCourses = await getCurrentAvailableCoursesArray(preference.course_number);
        //console.log(availableCourses);
        final_array.push(course_array);
    });

    await Promise.all(promises);

    return final_array;
}

const all_avaiable_courses = getFinalArray();
console.log(all_avaiable_courses);