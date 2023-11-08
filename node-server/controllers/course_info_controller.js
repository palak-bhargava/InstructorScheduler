const express = require('express')
const { Course } = require('../models/course_info')
const axios = require('axios');

function getAllCourses(){
    axios.get('http://localhost:3000/courses')
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getAllCourses;

function getCoursesByNumber(course_number){
    axios.get(`http://localhost:3000/courses/number/${course_number}`)
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getCoursesByNumber;


function getCoursesByPrefix(course_prefix){
    axios.get(`http://localhost:3000/courses/prefix/${course_prefix}`)
        .then(function (response) {
            console.log(response);
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getCoursesByPrefix;


//class number -- done
//course name
//section
//location
//days
//times