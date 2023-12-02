const mongoose = require('mongoose')

const instructorScheduleSchema = mongoose.Schema(
    {
        instructor_name: {
            type: String,
            required: [true]
        },
        approved_schedule: {
            type: String,
            required: [true]
        },
        courses: [
            {   
                section_address: String,
                course_prefix: String,
                course_number: Number,
                section: String,
                class_number: Number,
                title: String,
                session: String,
                days: Array,
                times: String,
                times_12h: String,
                location: String
            }
        ]

    }
)

const InstructorSchedule = mongoose.model('InstructorSchedule', instructorScheduleSchema)

module.exports = {InstructorSchedule}