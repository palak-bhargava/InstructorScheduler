const express = require('express')
const { InstructorPreference } = require('../models/instructor_preferences')
const axios = require('axios');

async function getInstructorPreference(instructor_name){
try {
    const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// async function getInstructorGeneralPreferences() {
//     let instructor_name = "Bob%20Kumar";
//     try {
//         const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
//         return response.data[0].general_preferences;
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }



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
//module.exports = {getInstructorPreference};

async function getFinalArray() {
    const preferences = await getInstructorPreference("Karen%20Mazidi");
    const general_preferences_array = preferences[0].general_preferences;
    console.log(general_preferences_array);
    const final_array = [];

    const promises = general_preferences_array.map(async (preference) => {
        //console.log(preference);
        const availableCourses = await getCurrentAvailableCoursesArray(preference.course_number);
        //console.log(availableCourses);
        final_array.push(availableCourses);
        //console.log("General preference available courses: " , final_array);
    });

    await Promise.all(promises);

    return final_array;
}

//getFinalArray();

// async function getCourseByClassNumber(classNumbers) {
//     const class_assigned = "false";
//     //const courseNumbers = "1134,3305,4485";
//     try {
//         const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${classNumbers}/getAvailClassByClassNumber`);
//         //console.log("Multi class search: ",response.data[0]);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }

async function getCourseByClassNumber(classNumbers) {
    const class_assigned = "false";
    //const courseNumbers = "1134,3305,4485";
    try {
        const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${classNumbers}/getAvailClassByClassNumber`);
        //console.log("Multi class search: ",response.data[0]);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}


module.exports = {getInstructorPreference, getCurrentAvailableCoursesArray, getFinalArray, getCourseByClassNumber};