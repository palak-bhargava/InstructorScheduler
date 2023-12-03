const express = require('express')
const Course = require('./models/course_info')
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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // Replace with the appropriate origin.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/', (req, res) => {
    res.send("Hello from Palak")
})
app.post('/course', async(req, res) => {
    try{
        const past_course = await PastCourses.create(req.body)
        res.status(200).json(past_course)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
})

//GET all courses
app.get('/pastcourses', async(req, res) => {
    try {
        const past_courses = await PastCourses.find({});
        res.status(200).json(past_courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//GET courses by course number
app.get('/pastcourses/number/:course_number', async(req, res) =>{
    try {
        const {course_number} = req.params;
        const pastcourses = await PastCourses.find({course_number: course_number});
        res.status(200).json(pastcourses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET courses by day
app.get('/pastcourses/day/:days', async(req, res) =>{
    try {
        const days = [req.params.days.split(',')]; 
        const pastcourses = await PastCourses.find({days: { $in: days }});
        res.status(200).json(pastcourses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET courses by prefix
app.get('/pastcourses/prefix/:course_prefix', async(req, res) =>{
    try {
        const course_prefix = req.params.course_prefix; 
        const past_courses = await PastCourses.find({course_prefix: course_prefix});
        res.status(200).json(past_courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET courses by title
app.get('/pastcourses/title/:title', async(req, res) =>{
    try {
        const title = req.params.title; 
        const pastcourses = await PastCourses.find({title: title});
        res.status(200).json(pastcourses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET courses by number and prefix
app.get('/pastcourses/:course_prefix/:course_number', async(req, res) =>{
    try {
        const course_prefix = req.params.course_prefix; 
        const course_number = req.params.course_number; 
        const past_courses = await PastCourses.find(
            {
                course_prefix: course_prefix, 
                course_number: course_number
            });
        res.status(200).json(past_courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//GET courses by instructor name
app.get('/pastcourses/instructors', async (req, res) => {
    try {
        const instructorName = req.query.name;

        // Use Mongoose find to query the database based on the provided instructor name
        const filteredEntries = await PastCourses.find({ instructors: instructorName });

        // Send the filtered entries as a response
        res.status(200).json(filteredEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//----------------------API FOR CURRENT COURSES----------------------
app.post('/currentcourses', async(req, res) => {
    try{
        const current_course = await CurrentCourses.create(req.body)
        res.status(200).json(current_course)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
})

//----------------------API FOR INSTRUCTOR PREFERENCES----------------------
app.post('/instructorpreferences', async(req, res) => {
    try{
        const preference = await InstructorPreference.create(req.body)
        res.status(200).json(preference)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/instructorpreferences/:instructor_name', async(req, res) =>{
    try {
        const instructor_name = req.params.instructor_name; 
        const instructor_preferences = await InstructorPreference.find(
            {
                instructor_name: instructor_name
            });
        res.status(200).json(instructor_preferences);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.put('/instructorpreferences/:instructor_name/:class_number', async (req, res) => {
    try {
      const instructor_name = req.params.instructor_name;
      const teaching_preference = req.body.teaching_preference; // Change from req.params to req.body
      const class_number = req.params.class_number;

      //console.log(instructor_name, teaching_preference, class_number);

      const instructor_preferences = await InstructorPreference.findOne({ instructor_name: instructor_name });

      //console.log(instructor_preferences.courses)
  
      if (instructor_preferences) {
        const courseIndex = instructor_preferences.courses.findIndex(course => {
          return course.class_number === parseInt(class_number, 10);
        });

  
        if (courseIndex !== -1) {
          // Update teaching_preference for the specified course
          instructor_preferences.courses[courseIndex].teaching_preference = teaching_preference;
  
          // Save the updated document
          await instructor_preferences.save();
  
          res.status(200).json({ message: 'Teaching preference updated successfully' });
        } else {
          res.status(404).json({ message: 'Course not found for the specified instructor' });
        }
      } else {
        res.status(404).json({ message: 'Instructor not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put('/instructorpreferences/:instructor_name', async (req, res) => {
    try {
      const instructor_name = req.params.instructor_name;
      const instructor_availabilites = req.body.instructor_availabilites; // Change from req.params to req.body

      //console.log(instructor_name, teaching_preference, class_number);

      const instructor_preferences = await InstructorPreference.findOne({ instructor_name: instructor_name });

      console.log(instructor_preferences.availability)
  
      if (instructor_preferences) {
        instructor_preferences.availabilites = instructor_availabilites;

          // Save the updated document
          await instructor_preferences.save();
  
          res.status(200).json({ message: 'Instructor Availabilities updated successfully' });
        } else {
          res.status(404).json({ message: 'Instructor Preferences not for specific Instructor not found' });
        }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//----------------------API FOR NEW INSTRUCTOR SCHEDULES----------------------
app.post('/instructorschedules', async(req, res) => {
    try{
        const schedules = await InstructorSchedule.create(req.body)
        res.status(200).json(schedules)
    }
    catch (error) { 
        console.error(error.message)
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