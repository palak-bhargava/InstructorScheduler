const express = require('express')
const { Course } = require('./models/course_info')
const app = express();
const mongoose = require('mongoose')

const dotenv = require('dotenv');
dotenv.config();

uri = process.env.URI

mongoose
.connect(uri)
.then(() => console.log("Connected to db"))
.catch((error) => console.error(error))

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello from Palak")
})
app.post('/course', async(req, res) => {
    try{
        const course = await Course.create(req.body)
        res.status(200).json(course)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
})

//GET all courses
app.get('/courses', async(req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET courses by course number
app.get('/courses/number/:course_number', async(req, res) =>{
    try {
        const {course_number} = req.params;
        const courses = await Course.find({course_number: course_number});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET courses by day
app.get('/courses/day/:days', async(req, res) =>{
    try {
        const days = [req.params.days.split(',')]; 
        const courses = await Course.find({days: { $in: days }});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//DEMO:
//GET
//POST
//Next Steps: 
//1) Get method to get document based on requested parameters, 
//2) Script to parse JSON file and upload courses to database
//3) Collection to store instructor preferences,
//4) Methods to get, post, patch instructor preferences

app.listen(process.env.PORT, () => console.log('Server has started on port 3000'))