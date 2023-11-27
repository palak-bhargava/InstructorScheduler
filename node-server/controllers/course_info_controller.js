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


//class number -- done
//course name
//section
//location
//days
//times