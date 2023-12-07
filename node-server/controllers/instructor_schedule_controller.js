const express = require('express')
const { InstructorSchedule } = require('../models/instructor_schedule')
const axios = require('axios');

async function getInstructorSchedule(instructor_name){
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


async function getGivenClasses(courseNumbers) {
    const class_assigned = "false";
    //const courseNumbers = "1134,3305,4485";
    try {
        const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${courseNumbers}/getAvailClass`);
        //console.log("Multi class search: ",response.data[0]);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function putFinalPossibleCourses(finalPossibleCourses, instructor_name){
  const data_update = {
    finalPossibleCourses: finalPossibleCourses,
  }
  try {
      const response = await axios.put(`http://localhost:3000/instructorschedules/${instructor_name}/fromAlgorithm`, data_update);
      console.log("updated schedule",response.data);
      return response.data;
  } catch (error) {
      console.log(error);
      return [];
  }
}

//getGivenClasses();

module.exports = {getInstructorSchedule, getGivenClasses, putFinalPossibleCourses};

