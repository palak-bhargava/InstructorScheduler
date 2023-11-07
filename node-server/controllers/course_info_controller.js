const express = require('express');


const test = require('dotenv').config()
console.log(test)

// router.post('/course', async(req, res) => {
//     try{
//         const course = await Course.create(req.body)
//         res.status(200).json(course)
//     }
//     catch (error) { 
//         console.error(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// //GET all courses
// router.get('/courses', async(req, res) => {
//     try {
//         const courses = await Course.find({});
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //GET courses by course number
// router.get('/courses/number/:course_number', async(req, res) =>{
//     try {
//         const {course_number} = req.params;
//         const courses = await Course.find({course_number: course_number});
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //GET courses by day
// router.get('/courses/day/:days', async(req, res) =>{
//     try {
//         const days = [req.params.days.split(',')]; 
//         const courses = await Course.find({days: { $in: days }});
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// module.exports = router
