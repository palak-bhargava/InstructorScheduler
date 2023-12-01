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
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}
module.exports = {getInstructorSchedule};