const express = require('express')
const { PastCourses } = require('../models/past_course_info')
const axios = require('axios');

function getAllCourses(){
    axios.get('http://localhost:3000/pastcourses')
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getAllCourses;

function getCoursesByNumber(course_number){
    axios.get(`http://localhost:3000/pastcourses/number/${course_number}`)
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getCoursesByNumber;


function getCoursesByPrefix(course_prefix){
    axios.get(`http://localhost:3000/pastcourses/prefix/${course_prefix}`)
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getCoursesByPrefix;

function getCoursesByTitle(title){
    axios.get(`http://localhost:3000/pastcourses/title/${title}`)
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getCoursesByTitle;


function getCoursesByInstructor(name) {
    return new Promise((resolve, reject) => {
      name = name?.trim();
  
      axios.get(`http://localhost:3000/pastcourses/instructors?name=${name}`)
        .then(response => {
          console.log(response.data); // Log the data property of the response
          resolve(response.data); // Resolve with the data
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
  
  module.exports = getCoursesByInstructor;