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
        days: {
            type: Array,
            required: [false]
        },
        times: {
            type: Array,
            required: [false]
        }
    }
)

const InstructorPreference = mongoose.model('InstructorPreferences', instructorPreferenceSchema)

module.exports = {InstructorPreference}