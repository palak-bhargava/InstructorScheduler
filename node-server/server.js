const express = require('express')
const { PastCourses } = require('./models/past_course_info')
const { CourseArrayObj } = require('./models/courses_array_obj')
const { CurrentCourses } = require('./models/current_course_info')
const { InstructorPreference } = require('./models/instructor_preferences');
const { InstructorSchedule } = require('./models/instructor_schedule');
const { User } = require('./models/user')
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

//-------------Functions using controllers-------------

//var getAllCourses = require('./controllers/course_info_controller')
//getAllCourses();

//var getCoursesByNumber = require('./controllers/course_info_controller')
//getCoursesByNumber("1200");

//var getCoursesByPrefix = require('./controllers/course_info_controller')
//getCoursesByPrefix("xy");

// var getCoursesByTitle = require('./controllers/course_info_controller')
// getCoursesByTitle("Computer Science Laboratory");

// var getUserEmail = require('./controllers/sign_in_controller')
// getUserEmail("bobby2@gmail.com", "123");


//----------------------API FOR INSTRUCTOR SIGN IN----------------------
//GET user by email
app.get('/users/email/:email', async(req, res) =>{
    try {
        const email = req.params.email; 
        const user = await User.find({email: email});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//POST TO USERS
app.post('/signup', async(req, res) => {
    console.log('HELLO')
    try{
        // const users = await User.create(req.body)
        // res.status(200).json(users)
        let {name, email, password} = req.body;
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        const saltRounds = 10;
                    bcrypt.hash(password, saltRounds).then(hashedPassword => {
                        const newUser = new User({
                            name,
                            email,
                            password: hashedPassword
                        });
                        console.log(hashedPassword)
                        newUser.save().then(result => {
                            res.json({
                                status: "SUCESS",
                                message: "User added sucessfully",
                                data: result
                            })
                        })
                    })
                    
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    } 
})


app.post('/signin', async(req, res) => {
    try {

        // const users = await User.find({email: email, password: password});
        // res.status(200).json(courses);

        let {email, password} = req.body;
        email = email?.trim();
        password = password?.trim();
        User. find({email: email}).then (data => {
        if (data) {
            const hashedPassword = data[0].password;
            bcrypt.compare (password, hashedPassword). then(result => {
                if (result){
                    res.json({
                        status: "SUCCESS",
                        message: "Sign in Sucessful"
                    })
                }
            })
        }})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//----------------------API FOR PAST COURSES----------------------
app.post('/pastcourses', async(req, res) => {
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
        const current_courses = await CurrentCourses.create(req.body)
        res.status(200).json(current_courses)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
});

app.put('/currentcourses/:class_number', async (req, res) => {
    try {
      const instructor_name = req.body.instructor_name;
      const class_assigned = req.body.class_assigned;
      const class_number = req.params.class_number;
  
      const current_course = await CurrentCourses.findOne({ class_number: parseInt(class_number, 10) });
  
      if (current_course) {
        // Update the class_assigned field
        current_course.class_assigned = class_assigned;
  
        // If class_assigned is true, add the instructor to the array (if not already present)
        if (class_assigned === "true" && !current_course.instructors.includes(instructor_name)) {
          current_course.instructors.push(instructor_name);
        }
        //console.log(class_assigned)
        // If class_assigned is false, remove the instructor from the array (if present)
        if (class_assigned === "false") {
          const index = current_course.instructors.indexOf(instructor_name);
          //console.log(index)
          if (index !== -1) {
            current_course.instructors.splice(index, 1);
          }
        }
  
        await current_course.save();
  
        res.status(200).json({ message: 'Updated successfully' });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/currentcourses/:class_assigned', async(req, res) =>{
    try {
        const class_assigned = req.params.class_assigned; 
        const current_courses = await CurrentCourses.find(
            {
                class_assigned: class_assigned
            });
        res.status(200).json(current_courses);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
  

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

app.put('/instructorpreferences/:instructor_name/newCourses', async (req, res) => {
    try {
      const instructor_name = req.params.instructor_name;
      const newCourses = req.body.newCourses;
  
      let instructor_preferences = await InstructorPreference.findOne({ instructor_name: instructor_name });
  
      if (!instructor_preferences) {
        // If instructor preferences do not exist, create a new entry
        instructor_preferences = new InstructorPreference({
          instructor_name: instructor_name,
          courses: [],
          general_preferences: [],
          availability: []
          // Add other fields as needed
        });
      }
  
      // Use a flag to determine if any course already exists
      let courseExists = false;
  
      newCourses.forEach((newCourse) => {
        const exists = instructor_preferences.courses.some(existingCourse => 
          existingCourse.class_number === newCourse.class_number
        );
  
        if (!exists) {
          // Only push the new course if it doesn't already exist
          instructor_preferences.courses.push(newCourse);
        } else {
          // Set the flag to indicate that at least one course already exists
          courseExists = true;
        }
      });
  
      // Save changes only if there are new courses or if it's a new entry
      if (newCourses.length > 0 || !req.body.newCourses) {
        await instructor_preferences.save();
  
        if (courseExists) {
          res.status(404).json({ message: 'At least one course already exists' });
        } else {
          res.status(200).json({ message: 'Courses added successfully', instructor_preferences });
        }
      } else {
        res.status(400).json({ message: 'No new courses provided' });
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });  


app.put('/instructorpreferences/:instructor_name/:class_number/preferences', async (req, res) => {
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

//----------------------------------------------------------------------------------------------------------
//INSTRUCTOR PREFERENCES PUT
app.put('/instructorpreferences/:instructor_name/availabilities', async (req, res) => {
    try {
        const instructor_name = req.params.instructor_name;
        const instructor_availabilities = req.body.availabilities;
        const instructor_preferences = await InstructorPreference.findOne({ instructor_name: instructor_name });
        
      if (instructor_preferences) {
        instructor_preferences.availability = instructor_availabilities;
  
        await instructor_preferences.save();
  
        res.status(200).json({ message: 'Instructor Availabilities updated successfully' });
      } else {
        res.status(404).json({ message: 'Instructor Preferences not found for specific Instructor' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
//----------------------------------------------------------------------------------------------------------

  
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

app.put('/instructorschedules/:instructor_name', async (req, res) => {
    const instructor_name = req.params.instructor_name;
    const newCourse = req.body.newCourse;  // Change from newCourses to newCourse
  
    try {
      let instructor_schedule = await InstructorSchedule.findOne({ instructor_name: instructor_name });
  
      if (!instructor_schedule) {
        instructor_schedule = new InstructorSchedule({
          instructor_name: instructor_name,
          approved_schedule: "false",
          courses: [],
        });
        await instructor_schedule.save();
      }
  
      const exists = instructor_schedule.courses.some(existingCourse => 
        existingCourse.class_number === newCourse.class_number
      );
  
      if (!exists) {
        // Only push the new course if it doesn't already exist
        instructor_schedule.courses.push(newCourse);
        await instructor_schedule.save();
        res.status(200).json({ message: 'Course added to instructor schedule successfully' });
      } else {
        res.status(404).json({ message: 'Course already exists in the schedule' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.delete('/instructorschedules/:instructor_name/:class_number', async (req, res) => {
    const instructor_name = req.params.instructor_name;
    const class_number = req.params.class_number;
  
    try {
      let instructor_schedule = await InstructorSchedule.findOne({ instructor_name: instructor_name });
  
      if (!instructor_schedule) {
        res.status(404).json({ message: 'Instructor schedule not found' });
        return;
      }
  
      // Find the index of the course with the specified class_number
      const courseIndex = instructor_schedule.courses.findIndex(course => course.class_number === parseInt(class_number,10));
  
      if (courseIndex !== -1) {
        // Remove the course from the array
        instructor_schedule.courses.splice(courseIndex, 1);
        await instructor_schedule.save();
        res.status(200).json({ message: 'Course removed from instructor schedule successfully' });
      } else {
        res.status(404).json({ message: 'Course not found in the schedule' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  //----------------------API FOR COURSE ARRAY OBJECT----------------------
  app.post('/coursearrayobj', async(req, res) => {
    try{
        const course_array_obj = await CourseArrayObj.create(req.body)
        res.status(200).json(course_array_obj)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
});

app.get('/coursearrayobj', async(req, res) => {
    try {
        const course_array_obj = await CourseArrayObj.find({});
        res.status(200).json(course_array_obj);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
  

app.listen(process.env.PORT, () => console.log('Server has started on port 3000'))