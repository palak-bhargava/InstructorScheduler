const express = require('express')
const { PastCourses } = require('./models/past_course_info')
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





    // if (name == "" || email == "" || password == ""){
    //     res.json({
    //         status: "FAILED",
    //         message: "Empty input fields"
    //     });
    // } else if (!/^[a-zA-Z ]*$/.test(name)){
    //     res.json({
    //         status: "FAILED",
    //         message: "Invalid name entered"
    //     });
    // } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/){
    //     res.json({
    //         status: "FAILED",
    //         message: "Invalid email entered"
    //     });
    // } else {
    //     User.find({email: email}).then(result => {

    //     }).catch(err => {
    //         console.log(err);
    //         if(result.length){
    //             res.json({
    //                 status: "FAILED",
    //                 message: "User with the provided email already exists"
    //             });
    //         } else {
    //             const saltRounds = 10;
    //             bcrypt.hash(password, saltRounds).then(hashedPassword => {
    //                 const newUser = new User({
    //                     name,
    //                     email,
    //                     password: hashedPassword
    //                 });
    //                 console.log(hashedPassword)
    //                 newUser.save().then(result => {
    //                     res.json({
    //                         status: "SUCESS",
    //                         message: "User added sucessfully",
    //                         data: result
    //                     })
    //                 })
    //                 .catch(err => {
    //                     res.json({
    //                         status: "FAILED",
    //                         message: "An error occured while saving the new user"
    //                     });

    //                 })
    //             })
    //             .catch(err => {
    //                 res.json({
    //                     status: "FAILED",
    //                     message: "An error occured while hashing the password"
    //                 });
    //             })

    //         }

    //         res.json({
    //             status: "FAILED",
    //             message: "An error occured while checking for existing users"
    //         });
    //     })
    // }
    
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
        const current_course = await CurrentCourses.create(req.body)
        res.status(200).json(current_course)
    }
    catch (error) { 
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
})

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

app.put('/instructorpreferences/:instructor_name', async (req, res) => {
    try {
        const instructor_name = req.params.instructor_name;
        const newCourses = req.body.newCourses;

        const instructor_preferences = await InstructorPreference.findOne({ instructor_name: instructor_name });

        if (instructor_preferences) {
            // Check if the courses array exists, if not, create it
            if (!instructor_preferences.courses) {
                instructor_preferences.courses = [];
            }

            newCourses.forEach((newCourse) => {
                const exists = instructor_preferences.courses.some(existingCourse => 
                    existingCourse.class_number === newCourse.class_number
                );
                console.log(exists);
                if (!exists) {
                    // Only push the new course if it doesn't already exist
                    instructor_preferences.courses.push(newCourse);
                }
                else{
                    res.status(404).json({ message: 'Course already exists' });
                }
            });
            //console.log("new instructor courses:", instructor_preferences.courses)

            instructor_preferences.save();

            res.status(200).json({ message: 'Course added successfully', instructor_preferences });
        } else {
            // If the instructor is not found, return a 404 status
            res.status(404).json({ message: 'Instructor not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: error.message });
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