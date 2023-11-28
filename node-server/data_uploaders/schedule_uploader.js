//temp file for data upload
//temp file for data upload
const { InstructorSchedule } = require('../models/instructor_schedule');
const fs = require('fs');
const axios = require('axios');

// Read the JSON data from coursebook.json
fs.readFile('../json_data/instructor_schedule.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading coursebook.json:', err);
        return;
    }

    const jsonData = JSON.parse(data);

    // Function to map JSON data to the schema
    const mapJsonToSchema = (jsonEntry) => {
        // any required preprocessing
        return new InstructorSchedule(jsonEntry);
    };

    const apiUrl = 'http://localhost:3000/instructorschedules';

    

    // Iterate through each entry in report_data and post it to the database
    for (const data of jsonData) {
        const instructor_schedule = mapJsonToSchema(data);
        postToDb(instructor_schedule, apiUrl);
    }
});

const postToDb = (instructor_schedule, apiUrl) => {
    axios.post(apiUrl, instructor_schedule)
        .then(response => {
            // Handle the response data here
            console.log('Response data:', response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
};
