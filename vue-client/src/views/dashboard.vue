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
                   {{ instructorName }}'s Dashboard
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
                        :events="events"
                        type="week"
                        first-time=07:00
                        last-time=10:00
                        interval-count=15
                        @click:event="showPopup"
                        >
                        <template v-slot:day-label-header="{}">{{ " " }}</template>
                        </v-calendar>
                        <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x
                        >
                            <v-card
                                color="grey lighten-4"
                                min-width="250px"
                                flat
                            >
                                <v-toolbar
                                :color="selectedEvent.color"
                                dark
                                >
                                    <v-toolbar-title 
                                    v-html="selectedEvent.name"></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-card-text class="mb-0">
                                    <span 
                                        v-html="selectedEvent.details"
                                        style="font-weight:bold; font-size:medium">
                                    </span>
                                </v-card-text>
                                <v-card-actions class="d-flex justify-center mt-0">
                                    <v-btn
                                        class="ma-2"
                                        color="grey lighten-2"
                                        @click="selectedOpen = false"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
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
        instructorName: '',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        instructorScheduleArray: [],
        events: []
    }),

    mounted() {
        this.getCoursesArray();
        this.instructorName = this.$route.params.instructorName;
    },

    methods: {
        goToAvailableCourses() {
            this.$router.push({ name: 'AvailableCourses', params: { instructorName: this.instructorName } });
        },
        goToPastSchedules() {
            this.$router.push({ name: 'PastSchedules', params: { instructorName: this.instructorName } });
        },
        goToPreferences() {
            this.$router.push({ name: 'Preferences', params: { instructorName: this.instructorName} });
        },

        showPopup({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event;
                this.selectedElement = nativeEvent.target;
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => (this.selectedOpen = true))
                );
            };

            if (this.selectedOpen) {
                this.selectedOpen = false;
                requestAnimationFrame(() => open());
            } else {
                open();
            }
            nativeEvent.stopPropagation();
        },
        deleteEvent(eventToDelete) {
            const index = this.events.findIndex((event) => event === eventToDelete);
            if (index !== -1) {
                this.events.splice(index, 1);
            }

            this.selectedOpen = false;
        },

        async getCoursesArray(){
            const instructor_name = "Pushpa%20Kumar";
            try {
                const response = await axios.get(`http://localhost:3000/instructorschedules/${instructor_name}`);
                this.instructorScheduleArray = response.data;
            } 
            catch (error) {
                console.error(error.message);
            }

            this.events = this.parseCoursesToEvents(this.instructorScheduleArray);
        },

        parseCoursesToEvents(courses) {
            const localEvents = [];

            courses.forEach(course => {
                const days = course.days.map(day => day.slice(0, 3));

                days.forEach(day => {
                    const[startString, endString] = this.getEventDateTime(day, course.times);
                    const event = {
                        name: course.course_prefix.toUpperCase() + ' ' + course.course_number + ' ' + course.title,
                        start: startString,
                        end: endString,
                        details: 'Section: ' + course.section + '<br>Location: ' + course.location,
                        color: '#FFB86F',
                    };
                    console.log("course name: ", event.name);

                    localEvents.push(event);
                });
            });
            return localEvents;
        },

        getEventDateTime(day, time) {
            const [start, end] = time.split('-');
            const [startHour, startMinute] = start.trim().split(':').map(String);
            const [endHour, endMinute] = end.trim().split(':').map(String);
            const currentDate = new Date();
            const currentDay = currentDate.getDay();
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let dayIndex = daysOfWeek.indexOf(day);

            const daysToAdd = dayIndex - currentDay;
            const date = new Date(currentDate);
            date.setDate(date.getDate() + daysToAdd);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const dayOfMonth = date.getDate().toString().padStart(2, '0');

            const startTime = `${year}-${month}-${dayOfMonth} ${startHour}:${startMinute}`;
            const endTime = `${year}-${month}-${dayOfMonth} ${endHour}:${endMinute}`;

            return [startTime, endTime];
        }
    }
}
</script>