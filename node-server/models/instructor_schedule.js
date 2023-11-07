const mongoose = require('mongoose')

const instructorScheduleSchema = mongoose.Schema(
    {
        instructor_name: {
            type: String,
            required: [true]
        },
        courses: [
            {   
                section_address: String,
                course_prefix: String,
                course_number: Number,
                section: Number,
                class_number: Number,
                title: String,
                session: Number,
                days: Array,
                times: String,
                times_12h: String,
                location: String,
                required: [false]
            },
            {
                section_address: String,
                course_prefix: String,
                course_number: Number,
                section: Number,
                class_number: Number,
                title: String,
                session: Number,
                days: Array,
                times: String,
                times_12h: String,
                location: String,
                required: [false]
            },
            {
                section_address: String,
                course_prefix: String,
                course_number: Number,
                section: Number,
                class_number: Number,
                title: String,
                session: Number,
                days: Array,
                times: String,
                times_12h: String,
                location: String,
                required: [false]
            },
            {
                section_address: String,
                course_prefix: String,
                course_number: Number,
                section: Number,
                class_number: Number,
                title: String,
                session: Number,
                days: Array,
                times: String,
                times_12h: String,
                location: String,
                required: [false]
            },
            {
                section_address: String,
                course_prefix: String,
                course_number: Number,
                section: Number,
                class_number: Number,
                title: String,
                session: Number,
                days: Array,
                times: String,
                times_12h: String,
                location: String,
                required: [false]
            },

        ]

    }
)

const InstructorSchedule = mongoose.model('InstructorSchedule', instructorScheduleSchema)

module.exports = {InstructorSchedule}