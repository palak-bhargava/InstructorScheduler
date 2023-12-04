<template>
    <v-container>
        <v-app-bar app color="f5f5f5">
            <div class="d-flex align-center justify-center" style="width: 100%">
                <v-img
                    class="shrink mr-2"
                    contain
                    :src="require('../assets/IS-logo.png')"
                    transition="scale-transition"
                    width="40"
                />
                <v-toolbar-title class="flex text-center">
                    Instructor Scheduler Dashboard
                </v-toolbar-title>
            </div>
        </v-app-bar>
        <br><br>
        <v-row>
            <v-col cols="7">
                <div class="text-h5 mb-2">My Preferences</div>
                <v-card
                color="#5C9970"
                class="rounded-xl"
                > 
                    <v-container class="spacing-playground pa-5">
                        <v-row>         
                            <v-col>
                                <v-card class="rounded-xl">
                                    <v-container>
                                        <div class="subtitle-1 font-weight-bold">Preferred Courses</div>
                                        CS 4384 - Automata Theory<br>CS 4875 - Machine Learning
                                    </v-container>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card class="rounded-xl">
                                    <v-container>
                                        <div class="subtitle-1 font-weight-bold">Time Frames</div>
                                        MW  12:00 PM - 4:00 PM<br>TTH  10:00 AM - 2:00 PM
                                    </v-container>
                                </v-card>
                            </v-col>
                        </v-row>
                    
                        <v-row justify-center class="mb-0"> 
                            <v-btn
                            color="#FFB86F"
                            elevation="2"
                            rounded
                            class="mx-auto"
                            @click="goToPreferences"
                            >
                                Edit Preferences
                            </v-btn> 
                        </v-row> 
                    </v-container>
                </v-card>               
                </v-col>
            <v-col cols="1">
            </v-col>
            <v-col cols="4">
                <div class="text-h5 mb-2">Past Schedules</div>
                <v-card
                    color="#5C9970"
                    class="rounded-xl"
                > 
                    <v-container class="spacing-playground pa-5">
                        <v-btn
                        color="white"
                        elevation="2"
                        rounded
                        block
                        outlined
                        @click="goToPastSchedules"
                        >
                            Fall 2022
                            <v-spacer></v-spacer>
                            <v-icon right>
                            mdi-arrow-right-thick
                            </v-icon>
                        </v-btn> 
                    </v-container>
                </v-card> 
            </v-col>
        </v-row>

    <div class="text-h5 mb-2 mt-15">Available Courses</div>
    <v-card
        color="#5C9970"
        class="rounded-xl"
    > 
            <v-container class="spacing-playground pa-5">
                <v-card
                    class = "mb-2 pa-2 rounded-xl font-weight-medium"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col 
                        cols="2">
                        Course Number
                        </v-col>
                        <v-col cols="3">
                            Course Name
                        </v-col>
                        <v-col cols="1.5">
                            Section
                        </v-col>
                        <v-col cols="1.5">
                            Location
                        </v-col>
                        <v-col cols="2.5">
                            Days & Time
                        </v-col>
                    </v-row>
                </v-card>
                <v-card
                    class="rounded-xl mb-2 pa-2"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col cols="2">
                        CS 3345
                        </v-col>
                        <v-col cols="3">
                            Data Structures
                        </v-col>
                        <v-col cols="1.5">
                            003
                        </v-col>
                        <v-col cols="1.5">
                            ECSS 2.415
                        </v-col>
                        <v-col cols="2.5">
                            MW 4:00 PM - 5:15 PM
                        </v-col>
                    </v-row>
                </v-card>
                
                <v-card
                class="rounded-xl mb-2 pa-2"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col cols="2">
                        CS 2340
                        </v-col>
                        <v-col cols="3">
                            Computer Architecture
                        </v-col>
                        <v-col cols="1.5">
                            001
                        </v-col>
                        <v-col cols="1.5">
                            ECSS 2.501
                        </v-col>
                        <v-col cols="2.5">
                            MW 7:00 PM - 8:15 PM
                        </v-col>
                    </v-row>
                </v-card> 
                <v-card
                class="rounded-xl mb-2 pa-2"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col cols="2">
                        CS 2336
                        </v-col>
                        <v-col cols="3">
                            Computer Science II
                        </v-col>
                        <v-col cols="1.5">
                            006
                        </v-col>
                        <v-col cols="1.5">
                            ECSW 1.365
                        </v-col>
                        <v-col cols="2.5">
                            TTH 1:00 PM - 2:15 PM
                        </v-col>
                    </v-row>
                </v-card> 

                <v-row justify-center class="mb-0 mt-3"> 
                            <v-btn
                            color="#FFB86F"
                            elevation="2"
                            rounded
                            class="mx-auto"
                            @click="goToAvailableCourses">
                                View Available Classes
                            </v-btn> 
                        </v-row> 
            </v-container>
        </v-card> 
            
        <div class="text-h5 mb-2 mt-15">My Current Schedule</div>
        <v-card
            color="#5C9970"
            class="rounded-xl mb-10"
        >
            <v-container class="spacing-playground pa-5">
                <v-row>
                    <v-col>
                    <v-sheet height="400">
                        <v-calendar
                        ref="calendar"
                        :value="today"
                        :events="events"
                        :today="now"
                        type="week"
                        first-time=07:00
                        last-time=10:00
                        interval-count=15
                        >
                        <template v-slot:day-label-header="{}">{{ " " }}</template>
                        </v-calendar>
                    </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios"
  export default {
    data: () => ({
      events: [
        {
          name: 'CS 4384',
          start: '2023-11-27 10:00',
          end: '2023-11-27 11:15',
          color: '#FFB86F'

        },
        {
          name: 'CS 4384',
          start: '2023-11-29 10:00',
          end: '2023-11-29 11:15',
          color: '#FFB86F',
          textcolor: '#000000'

        },
        {
          name: 'CS 4375',
          start: '2023-11-28 16:00',
          end: '2023-11-28 17:15',
          color: '#FFB86F'
        },
        {
          name: 'CS 4375',
          start: '2023-11-30 16:00',
          end: '2023-11-30 17:15',
          color: '#FFB86F'
        },
      ],
      instructorScheduleArray: [],
      events: []
    }),

    mounted() {
    this.getCoursesArray();
    },

    methods: {
        goToAvailableCourses() {
            this.$router.push({ name: 'AvailableCourses' });
        },
        goToPastSchedules() {
            this.$router.push({ name: 'PastSchedules' });
        },
        goToPreferences() {
            this.$router.push({ name: 'Preferences' });
        },

        async getCoursesArray(){
            const instructor_name = "Pushpa%20Kumar";
            try {
                const response = await axios.get(`http://localhost:3000/instructorschedules/${instructor_name}`);
                this.instructorScheduleArray = response.data;
                //console.log("Instructor schedule: ", this.instructorScheduleArray);
            } 
            catch (error) {
                console.error(error.message);
            }

            this.parseCoursesToEvents(this.instructorScheduleArray);
        },

        parseCoursesToEvents(courses) {
            console.log("Courses: " ,courses);
            const events = [];

            courses.forEach(course => {
                const days = course.days.map(day => day.slice(0, 3)); // Extract first three letters of days

            console.log("Days: ", days)

                days.forEach(day => {
                    //console.log("course.time ", course.times);
                    const[startString, endString] = this.getEventDateTime(day, course.times);
                const event = {
                    name: course.title,
                    start: startString, //start string,
                    end: endString,//end string,
                    color: '#FFB86F',
                };
                console.log(event);

                // if (course.textcolor) {
                //     event.textcolor = course.textcolor;
                // }

                // events.push(event);
                });
            });
            //console.log(events);
            return events;
        },

        getEventDateTime(day, time) {
            //const [startHour, startMinute] = time.split(':').map(String);
            const [start, end] = time.split('-');
            const [startHour, startMinute] = start.trim().split(':').map(String);
            const [endHour, endMinute] = end.trim().split(':').map(String);
            const currentDate = new Date();
            //console.log("currentDate", currentDate);
            const currentDay = currentDate.getDay();
            //console.log("currentDay", currentDay);
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let dayIndex = daysOfWeek.indexOf(day);

            const daysToAdd = dayIndex - currentDay;
            console.log("daysToAdd: ", daysToAdd);
            const date = new Date(currentDate);
            date.setDate(date.getDate() + daysToAdd);
            //console.log(date);

            // start: '2023-11-30 16:00',
            // end: '2023-11-30 17:15',

            const startString = '2023-12-06 14:00';
            const endString = '2023-12-06 16:45';
            
            return {startString, endString};
        }

    }
  }
</script>