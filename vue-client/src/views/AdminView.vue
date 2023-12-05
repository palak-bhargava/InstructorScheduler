<template>
  <v-container>
     <v-container class="pa-0">
    <v-app-bar
        app
        color="f5f5f5"
      >
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
        <v-spacer></v-spacer>
      </v-app-bar>
  </v-container>
    <br><br>
    <h2>Schedules to Approve</h2><br>
    <v-expansion-panels
        dark
        rounded=30
        class="mb-15"
    >
      <v-expansion-panel 
        v-for="(schedule, index) in allSchedules" :key="index" 
        rounded
      >
        <v-expansion-panel-header color="#5C9970" rounded>
          <h3>{{ schedule.instructor_name }}</h3>
          <v-btn
            color="#FFB86F"
            elevation="2"
            rounded
            light
            style="max-width: 230px;"
            @click="showInstructorSchedule(schedule)"
          >
            Generate Schedule
          </v-btn> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </v-expansion-panel-header>
      <v-expansion-panel-content color="#5C9970" rounded> <br>
         <v-row v-if="schedule.showContent">
          <v-col cols="9" class="spacing-playground pa-0">
            <v-card class="mx-auto" color="#ffffff" light outlined>
              <v-list-item three-line v-for="(course, index) in schedule.courses" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="text-h7">
                    <div v-if="course">
                      <b>CS{{ course.course_number }} {{ course.title }}</b> 
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <div v-if="course">
                      {{ displayDays(course.days) }} | {{ course.times_12h }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="3" class="spacing-playground pa-0">
            <v-card color="#5C9970" light outlined>
              <div class="pl-8 ml-12">
                <b>Approve Schedule?</b>
              </div>
              <v-card-actions>
                <v-btn 
                  color="#FFB86F" 
                  elevation="2" 
                  rounded 
                  light 
                  class="mr-3 mb-1 ml-15"
                  :style="{ backgroundColor: schedule.yes }"
                  @click="changeColor(schedule, 'yes')"
                >
                  Yes
                </v-btn>
                <v-btn 
                  color="#FFB86F" 
                  elevation="2" 
                  rounded 
                  light 
                  class="mr-3 mb-1 ml-5"
                  :style="{ backgroundColor: schedule.no }"
                  @click="changeColor(schedule, 'no')"
                >
                  No
                </v-btn>
              </v-card-actions>
            </v-card> 
          </v-col>
        </v-row> <br>
      </v-expansion-panel-content>
    </v-expansion-panel> 
  </v-expansion-panels>
  </v-container>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'AdminView',

    data() {
      return {
        instructorName: '',
        allSchedules: [],
        instructorSchedule: [],
      };
    },
    created() {
      this.getAllSchedules();
      this.instructorName = this.$route.params.instructorName;
    },
    methods: {
      displayDays(days) {
        return days.join(', ');
      },

      changeColor(schedule, isApproved) {
        // Update the active button for a specific card
        schedule.isApproved = isApproved;

        // Update the button colors based on the active button within the card
        schedule.yes = isApproved === 'yes' ? '#ffdbb7' : '#FFB86F';
        schedule.no = isApproved === 'no' ? '#ffdbb7' : '#FFB86F';

        console.log("schedule: ", schedule);

        //check if active button is yes, add to schedule else ignore
        if(schedule.isApproved === 'yes') {
          //update schedule
          this.updateApprovedStatus(schedule);
        }
        else if(schedule.isApproved === 'no') {
          this.updateApprovedStatus(schedule);
        }
      },

      async getAllSchedules() {
        try {
          const response = await axios.get(`http://localhost:3000/instructorschedules`);
          this.allSchedules = response.data.map(item => ({
            ...item,
            yes: '#FFB86F', // Initialize unique button colors for each item
            no: '#FFB86F',
            isApproved: null, // strores which button is pressed
            showContent: false,
          })); // Assign the data to the pastClasses property // Assign the data to the pastClasses property
        } 
        catch (error) {
          console.error(error);
        }
        console.log("all schedules array:", this.allSchedules);
      },

      showInstructorSchedule(schedule) {
        //generate schedule function here
        schedule.showContent = true; // Set flag to true when button is clicked
        // You can also fetch and assign data specific to this schedule here
      },
      async updateApprovedStatus(schedule){
        const instructor_name = "Pushpa%20Kumar";
        const isApproved = schedule.isApproved;
        axios.put(`http://localhost:3000/instructorschedules/${instructor_name}/${isApproved}`)
        .then(response => {
            console.log('Response:', response.data.message);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
      }
    },
  }
</script>

<style>
</style>