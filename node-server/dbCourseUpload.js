const { Course } = require('./models/course_info');
const fs = require('fs');
const axios = require('axios');

// Read the JSON data from coursebook.json
fs.readFile('coursebook.json', 'utf8', (err, data) => {
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

        return new Course(jsonEntry);
    };

    const apiUrl = 'http://localhost:3000/course';

    // Iterate through each entry in report_data and post it to the database
    for (const data of reportData) {
        const course = mapJsonToSchema(data);
        postToDb(course, apiUrl);
    }
});

const postToDb = (course, apiUrl) => {
    axios.post(apiUrl, course)
        .then(response => {
            // Handle the response data here
            console.log('Response data:', response.data);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
};
