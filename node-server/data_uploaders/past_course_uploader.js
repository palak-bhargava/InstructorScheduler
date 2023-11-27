const { PastCourses } = require('../models/past_course_info');
const fs = require('fs');
const axios = require('axios');

// Read the JSON data from coursebook.json
fs.readFile('../json_data/coursebook.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading coursebook.json:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    const reportData = jsonData.report_data;

    // Function to map JSON data to the schema
    const mapJsonToSchema = (jsonEntry) => {
        // Check if the fields exist and are non-empty strings before splitting
        if (jsonEntry.instructors && typeof jsonEntry.instructors === 'string' && jsonEntry.instructors.trim() !== '') {
            jsonEntry.instructors = jsonEntry.instructors.split(',').map(instructor => instructor.trim());
        }

        if (jsonEntry.assistants && typeof jsonEntry.assistants === 'string' && jsonEntry.assistants.trim() !== '') {
            jsonEntry.assistants = jsonEntry.assistants.split(',').map(assistant => assistant.trim());
        }

        if (jsonEntry.days && typeof jsonEntry.days === 'string' && jsonEntry.days.trim() !== '') {
            jsonEntry.days = jsonEntry.days.split(',').map(day => day.trim());
        }

        if (jsonEntry.textbooks && typeof jsonEntry.textbooks === 'string' && jsonEntry.textbooks.trim() !== '') {
            jsonEntry.textbooks = jsonEntry.textbooks.split(',').map(textbook => textbook.trim());
        }

        if (jsonEntry.title && typeof jsonEntry.title === 'string' && jsonEntry.title.trim() !== '') {
            jsonEntry.title = jsonEntry.title.trim();
        }

        return new PastCourses(jsonEntry);
    };

    const apiUrl = 'http://localhost:3000/pastcourses';

    // Iterate through each entry in report_data and post it to the database
    for (const data of reportData) {
        const past_course = mapJsonToSchema(data);
        postToDb(past_course, apiUrl);
    }
});

const postToDb = (past_course, apiUrl) => {
    axios.post(apiUrl, past_course)
        .then(response => {
            // Handle the response data here
            console.log('Response data:', response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
};
