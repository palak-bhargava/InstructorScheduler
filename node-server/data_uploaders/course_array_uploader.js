const { CourseArrayObj } = require('../models/courses_array_obj');
const fs = require('fs');
const axios = require('axios');

const uniqueCourseNumbers = new Set();
const uniqueCourseArrayObjs = [];

// Read the JSON data from coursebook2.json
fs.readFile('../json_data/coursebook.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading coursebook.json:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const reportData = jsonData.report_data;

        // Function to map JSON data to the schema
        const mapJsonToSchema = (jsonEntry) => {
            return new CourseArrayObj(jsonEntry);
        };

        const apiUrl = 'http://localhost:3000/coursearrayobj';

        // Iterate through each entry in report_data and add it to the array based on course_number
        for (const data of reportData) {
            const course_array_obj = mapJsonToSchema(data);

            // Check if the course_number is already in the Set
            if (!uniqueCourseNumbers.has(course_array_obj.course_number)) {
                uniqueCourseNumbers.add(course_array_obj.course_number);
                //uniqueCourseArrayObjs.push(course_array_obj);

                // Uncomment the line below to post each unique object to the database
                postToDb(course_array_obj, apiUrl);
            }
        }
    } catch (parseError) {
        console.error('Error parsing JSON data:', parseError);
    }
});

const postToDb = (course_array_obj, apiUrl) => {
    axios.post(apiUrl, course_array_obj)
        .then(response => {
            // Handle the response data here
            console.log('Response data:', response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
};