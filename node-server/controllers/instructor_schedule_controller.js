const express = require('express')
const { InstructorSchedule } = require('../models/instructor_schedule')
const axios = require('axios');

async function getInstructorSchedule(instructor_name){
//     axios.get(`http://localhost:3000/instructorschedules/${instructor_name}`)
//         .then(function (response) {
//             console.log(response.data);
//     })
//         .catch(function (error) {
//             console.log(error);
//   });
try {
    const response = await axios.get(`http://localhost:3000/instructorschedules/${instructor_name}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}
module.exports = {getInstructorSchedule};


// async function getGivenClasses(courseNumbers) {
//     const class_assigned = "false";
//     //const courseNumbers = "1134,3305,4485";
//     try {
//         const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${courseNumbers}/getAvailClass`);
//         //console.log("Multi class search: ",response.data[0]);
//         return response.data[0];
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }

// //getGivenClasses();

// module.exports = {getGivenClasses};

