const { CurrentCourses } = require('../models/current_course_info');
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
        jsonEntry.instructors = [];
        jsonEntry.assistants = [];
        jsonEntry.enrolled_current= 0;
        jsonEntry.syllabus = "";


        if (jsonEntry.days && typeof jsonEntry.days === 'string' && jsonEntry.days.trim() !== '') {
            jsonEntry.days = jsonEntry.days.split(',').map(day => day.trim());
        }

        if (jsonEntry.textbooks && typeof jsonEntry.textbooks === 'string' && jsonEntry.textbooks.trim() !== '') {
            jsonEntry.textbooks = jsonEntry.textbooks.split(',').map(textbook => textbook.trim());
        }

        if (jsonEntry.title && typeof jsonEntry.title === 'string' && jsonEntry.title.trim() !== '') {
            jsonEntry.title = jsonEntry.title.trim();
        }

        jsonEntry.class_assigned = "false";

        return new CurrentCourses(jsonEntry);
    };

    const apiUrl = 'http://localhost:3000/currentcourses';

    // Iterate through each entry in report_data and post it to the database
    for (const data of reportData) {
        const current_course = mapJsonToSchema(data);
        postToDb(current_course, apiUrl);
    }
});

const postToDb = (current_course, apiUrl) => {
    axios.post(apiUrl, current_course)
        .then(response => {
            // Handle the response data here
            console.log('Response data:', response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
};
