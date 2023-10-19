const mongoose = require('mongoose')

const instructorPreferenceSchema = mongoose.Schema(
    {
        instructor_name: {
            type: String,
            required: [true]
        },
        courses: [
            {
                course_prefix: String,
                course_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                required: [false]
            }
        ],
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

const Course = mongoose.model('Course', courseSchema)

module.exports = Course