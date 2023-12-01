const express = require('express')
const { InstructorPreference } = require('../models/instructor_preferences')
const axios = require('axios');

async function getInstructorPreference(instructor_name){
//     axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`)
//         .then(function (response) {
//             console.log(response.data);
//     })
//         .catch(function (error) {
//             console.log(error);
//   });
try {
    const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}
module.exports = {getInstructorPreference};