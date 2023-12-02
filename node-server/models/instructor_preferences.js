const mongoose = require('mongoose')

const instructorPreferenceSchema = mongoose.Schema(
    {
        instructor_name: {
            type: String,
            required: [true]
        },
        courses: {
            type: [
            {
                course_prefix: String,
                course_number: Number,
                teaching_preference: String,
                class_number: Number
            }
        ],
            required: [false]
        },
        general_preferences: {
            type: Array,
            required: [false]
        },
        availability: {
            type: [
                {
                    day: String,
                    time: Array
                }
            ],
            required: [false]
        }
    }
)

const InstructorPreference = mongoose.model('InstructorPreferences', instructorPreferenceSchema)

module.exports = {InstructorPreference}