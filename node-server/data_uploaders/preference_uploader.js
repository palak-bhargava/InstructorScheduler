//temp file for data upload
const { InstructorPreference } = require('../models/instructor_preferences');
const fs = require('fs');
const axios = require('axios');

// Read the JSON data from coursebook.json
fs.readFile('../json_data/instructor_preference.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading coursebook.json:', err);
        return;
    }

    const jsonData = JSON.parse(data);

    // Function to map JSON data to the schema
    const mapJsonToSchema = (jsonEntry) => {
        // any required preprocessing
        return new InstructorPreference(jsonEntry);
    };

    const apiUrl = 'http://localhost:3000/instructorpreferences';

    

    // Iterate through each entry in report_data and post it to the database
    for (const data of jsonData) {
        const instructor_preference = mapJsonToSchema(data);
        postToDb(instructor_preference, apiUrl);
    }
});

const postToDb = (instructor_preference, apiUrl) => {
    axios.post(apiUrl, instructor_preference)
        .then(response => {
            // Handle the response data here
            console.log('Response data:', response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
};
