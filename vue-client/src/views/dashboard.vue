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
                                <v-card class="rounded-xl" >
                                    <div class="pa-3 font-weight-bold subtitle-1">Preferred Courses</div>
                                    <v-row v-for="(preference, index) in generalpreferencesarray" :key="index">
                                        <div class="pl-6 pt-2 text-body-2"><b>{{ preference.course_prefix }}{{ preference.course_number }}</b> {{ preference.title }}</div>
                                    </v-row>
                                    <br>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card class="rounded-xl"> 
                                    <div class="pa-3 font-weight-bold subtitle-1">Time Frames</div>
                                    <v-row v-for="(availability, index) in availabilitiesArray" :key="index">
                                        <div class="pl-6 pt-2 text-body-2"><b>{{ availability.day }}</b> | {{ displayTimes(availability.times) }}</div>
                                    </v-row> <br>
                                </v-card>
                            </v-col>
                        </v-row>
                    
                        <v-row justify-center class="mb-0 pt-2"> 
                            <v-btn
                            color="#FFB86F"
                            elevation="2"
                            rounded
                            class="mx-auto"
                            @click="goToPreferences"
                            >
                                Edit Preferences
                                <v-icon right>
                                    mdi-arrow-right-thick
                                </v-icon>
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
             <div class="scrollable-table">
                <v-data-table
                    :headers="headers"
                    :items="available_classes"
                    hide-default-footer
                    item-key="class_number"
                    class="elevation-2 mt-3"
                    :items-per-page=10
                    >
                    </v-data-table>
                </div>
                <v-row justify-center class="mb-0 mt-5"> 
                    <v-btn
                    color="#FFB86F"
                    elevation="2"
                    rounded
                    class="mx-auto"
                    @click="goToAvailableCourses"
                    >
                        View All Available Courses
                        <v-icon right>
                            mdi-arrow-right-thick
                        </v-icon>
                    </v-btn> 
                </v-row> 
            </v-container>
        </v-card> 
            
        <div class="text-h5 mb-2 mt-15 d-flex justify-space-between align-center">
            <span class="flex-grow-1">My Current Schedule</span>
            <v-card 
                color="#ffffff"
                class="rounded-xl pl-5 pr-5 d-flex justify-end align-center"
                elevation="0"
                style="height: 36px; width: 250px;"
            >
                <span v-if="isApproved === 'waiting'" style="color: black; font-size: 14px; margin-right: 5px;">
                    <b>Schedule Pending Approval.<span v-html="displayDots"></span></b>
                </span>
                <span v-else-if="!isApproved" style="color: red; font-size: 14px; display: flex; align-items: center;">
                    <v-icon color="red">mdi-alert-circle</v-icon>
                    &nbsp;&nbsp;<b>Schedule Not Approved</b>
                </span>
                <span v-else style="color: #5C9970; font-size: 14px;">
                    <v-icon color="#5C9970">mdi-check-circle</v-icon>
                    &nbsp;&nbsp;<b>Schedule Approved</b>
                </span>
            </v-card>
        </div>
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
            <v-row justify-center class="pb-5 pt-3"> 
                <v-btn
                color="#FFB86F"
                elevation="2"
                rounded
                class="mx-auto"
                @click="deleteSchedule"
                >
                    &nbsp;Delete Schedule
                    <v-icon right>
                        mdi-trash-can-outline
                    </v-icon>
                </v-btn> 
            </v-row>
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
        events: [],
        isApproved: "",
        isAnimatingDots: false,
        generalpreferencesarray: [],
        availabilitiesArray: [],
        displayDots: '',
        dotCount: 0,
        maxDots: 4,
        itemsPerPage: 10,
        headers: [
          {
            text: 'Course Code',
            align: 'start',
            sortable: false,
            value: 'class_number',
          },
          { text: 'Course Number', value: 'course_number' },
          { text: 'Course Name', value: 'title' },
          { text: 'Section', value: 'section' },
          { text: 'Location', value: 'location' },
          { text: 'Days', value: 'days' },
          { text: 'Time', value: 'times_12h' },
        ],
        available_classes: [],
    }),

    mounted() {
        this.instructorName = this.$route.params.instructorName;
        this.getCoursesArray();
        this.getAvailableCourses();
        this.animatePendingApproval();
        this.getInstructorPreferences();
        this.getInstructorAvailabilities();
        this.getInstructorScheduleStatus(); 
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


        async animatePendingApproval() {
            this.isAnimatingDots = true;
            while (this.isAnimatingDots) {
                await this.delay(500); // Adjust timing as needed
                this.displayDots += '.';
                this.dotCount++;

                if (this.dotCount === this.maxDots) {
                this.displayDots = '';
                this.dotCount = 0;
                }
            }
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async getInstructorPreferences(){
            const instructor_name = this.instructorName;
            console.log("instructor NAME:", instructor_name);
            try {
                const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
                this.generalpreferencesarray = response.data[0].general_preferences;
    
                console.log("instructor preferences:", response.data[0].general_preferences);
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        async getInstructorAvailabilities(){
            const instructor_name = this.instructorName;
            try {
                const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
                this.availabilitiesArray = response.data[0].availabilities;
                console.log('instructor avail:', response.data[0].availabilities);
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        displayTimes(times) {
            return times.join(', ');
        },

        async getAvailableCourses() {
            let availability = "false";
            try {
            const response = await axios.get(`http://localhost:3000/currentcourses/${availability}`);
            console.log(response)
            this.available_classes = response.data;
            } 
            catch (error) {
            console.error(error);
            }
            console.log("available courses array:", this.available_classes);
        },

        async getCoursesArray(){
            const instructor_name = this.instructorName;
            try {
                const response = await axios.get(`http://localhost:3000/instructorschedules/${instructor_name}/courses`);
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

            console.log("Days: ", days)

                days.forEach(day => {
                    const[startString, endString] = this.getEventDateTime(day, course.times);
                const event = {
                    name: course.course_prefix.toUpperCase() + ' ' + course.course_number + ' ' + course.title,
                    start: startString,
                    end: endString,
                    color: '#FFB86F',
                    details: 'Section: ' + course.section + '<br>Location: ' + course.location,
                };
             
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
            console.log("daysToAdd: ", daysToAdd);
            const date = new Date(currentDate);
            date.setDate(date.getDate() + daysToAdd);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const dayOfMonth = date.getDate().toString().padStart(2, '0');

            // Format time to 'HH:mm'
            const startTime = `${year}-${month}-${dayOfMonth} ${startHour}:${startMinute}`;
            const endTime = `${year}-${month}-${dayOfMonth} ${endHour}:${endMinute}`;

            return [startTime, endTime];
        },

        async getInstructorScheduleStatus(){
            const instructor_name = this.instructorName;
            try {
                const response = await axios.get(`http://localhost:3000/instructorschedules/${instructor_name}/approved_schedule`);
                this.isApproved = response.data;
                console.log("Approved or not:", response.data);
            } 
            catch (error) {
                console.error(error.message);
            }
        },

        async deleteSchedule(){
            //console.log("delete schedule");
            const instructor_name = this.instructorName;
            try {
                const response = await axios.delete(`http://localhost:3000/instructorschedules/${instructor_name}/deleteSchedule`);
                this.events = [];
                console.log("deleteSchedule:", response.data);
            } 
            catch (error) {
                console.error(error.message);
            }
        }

    }
  }
</script>

<style>
.scrollable-table {
  max-height: 250px; 
  overflow-y: auto;
}
</style>