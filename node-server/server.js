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


//DEMO:
//GET
//POST
//Next Steps: 
//1) Get method to get document based on requested parameters, 
//2) Script to parse JSON file and upload courses to database
//3) Collection to store instructor preferences,
//4) Methods to get, post, patch instructor preferences

app.listen(process.env.PORT, () => console.log('Server has started on port 3000'))