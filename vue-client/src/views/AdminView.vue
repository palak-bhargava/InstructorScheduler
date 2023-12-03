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
          Admin View
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
    >
      <v-expansion-panel v-for="(schedule, index) in allSchedules" :key="index" rounded>
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
      <v-expansion-panel-content color="#5C9970" rounded>
      <br>
      <v-row>
    <v-col cols="9" class="spacing-playground pa-0">
      <v-card class="mx-auto" color="#ffffff" light outlined>
        <v-list-item three-line v-for="(course, index) in schedule.courses" :key="index">
          <v-list-item-content>
          
            <v-list-item-title class="text-h7">
            <div v-if="course">
              {{ course.course_number }}
            </div>
              <b></b> 
            </v-list-item-title>
            <!-- Add other details as needed -->
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
              <v-btn color="#FFB86F" elevation="2" rounded light class="mr-3 mb-1 ml-15">
                Yes
              </v-btn>
              <v-btn color="#FFB86F" elevation="2" rounded light class="mb-1 ml-4">
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
        allSchedules: [],
        instructorSchedule: [],
      };
    },
    created() {
      this.getAllSchedules();
    },
    methods: {
      
      async getAllSchedules() {
        try {
          const response = await axios.get(`http://localhost:3000/instructorschedules`);
          this.allSchedules = response.data; // Assign the data to the pastClasses property
        } 
        catch (error) {
          console.error(error);
        }
        console.log("all schedules array:", this.allSchedules);
      
      },

      showInstructorSchedule(schedule) {
        // Assuming schedule contains class_schedules field with an array of schedules
        this.instructorSchedule = schedule;
        // Optionally, you can log the schedule for debugging or verification
        console.log("Instructor Schedule:", this.instructorSchedule);
      },
      showClass(course) {
        // Assuming schedule contains class_schedules field with an array of schedules
        this.instructorSchedule = course;
        // Optionally, you can log the schedule for debugging or verification
        console.log("Classes:", this.instructorSchedule);
       
      },
    },
  }
</script>

<style>
</style>