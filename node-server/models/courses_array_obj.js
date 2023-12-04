const mongoose = require('mongoose')

const courseArrayObjSchema = mongoose.Schema(
    {
        course_prefix: {
            type: String,
            required: [true]
        },
        course_number: {
            type: String,
            required: [true]
        },
        title: {
            type: String,
            required: [true]
        }
    }
)

const CourseArrayObj = mongoose.model('CourseArrayObj', courseArrayObjSchema)

module.exports = { CourseArrayObj };