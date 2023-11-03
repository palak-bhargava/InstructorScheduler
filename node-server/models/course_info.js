const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
        section_address: {
            type: String,
            required: [true]
        },
        course_prefix: {
            type: String,
            required: [true]
        },
        course_number: {
            type: Number,
            required: [true]
        },
        section: {
            type: Number,
            required: [true]
        },
        class_number: {
            type: Number,
            required: [true]
        },
        title: {
            type: String,
            required: [true]
        },
        topic: {
            type: String,
            required: [false]
        },
        enrolled_status: {
            type: String,
            required: [true]
        },
        enrolled_current: {
            type: Number,
            required: [false],
            default: 0
        },
        enrolled_max: {
            type: Number,
            required: [false],
            default: 0
        },
        instructors: {
            type: Array,
            required: [false],
            default: []
        },
        assistants: {
            type: Array,
            required: [false],
            default: []
        },
        term: {
            type: String,
            required: [true]
        },
        session: {
            type: Number,
            required: [true]
        },
        days: {
            type: Array,
            required: [true]
        },
        times: {
            type: String,
            required: [true]
        },
        times_12h: {
            type: String,
            required: [true]
        },
        location: {
            type: String,
            required: [true]
        },
        core_area: {
            type: String,
            required: [false]
        },
        activity_type: {
            type: String,
            required: [true]
        },
        school: {
            type: String,
            required: [true]
        },
        dept: {
            type: String,
            required: [true]
        },
        syllabus: {
            type: String,
            required: [false]
        },
        textbooks: {
            type: String,
            required: [false]
        }

    }
)

const Course = mongoose.model('Course', courseSchema)

module.exports = { Course };