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
                teaching_preference: String,
                class_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                teaching_preference: String,
                class_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                teaching_preference: String,
                class_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                teaching_preference: String,
                class_number: Number,
                required: [false]
            },
            {
                course_prefix: String,
                course_number: Number,
                teaching_preference: String,
                class_number: Number,
                required: [false]
            }
        ],
        // days: {
        //     type: Array,
        //     required: [false]
        // },
        // times: {
        //     type: Array,
        //     required: [false]
        // }
        general_preferences: {
            type: Array,
            required: [false]
        },

        availabilities: [
            {
                day: String,
                times: Array,
                required: [false]
            },
            {
                day: String,
                times: Array,
                required: [false]
            },
            {
                day: String,
                times: Array,
                required: [false]
            },
            {
                day: String,
                times: Array,
                required: [false]
            },
            {
                day: String,
                times: Array,
                required: [false]
            },
            {
                day: String,
                times: Array,
                required: [false]
            },
            {
                day: String,
                times: Array,
                required: [false]
            }
        ]
    }
)

//[{day: "Monday", times: [11:00am - 2:00pm, 3:00pm - 4:00pm]}, {day: "Tuesday", times... }]

const InstructorPreference = mongoose.model('InstructorPreferences', instructorPreferenceSchema)

module.exports = {InstructorPreference}