<template>
  <v-container>
     <v-container class="pa-0">
    <v-app-bar
        app
        color="f5f5f5"
      >
        <div class="d-flex align-center justify-center" style="width: 100%">
           <v-app-bar-nav-icon
          @click="goToDashboard">
          <v-img
            class="shrink mr-2"
            contain
            :src="require('../assets/IS-logo.png')"
            transition="scale-transition"
            width="40"
          />
          </v-app-bar-nav-icon>
         <v-toolbar-title class="flex text-center">
          {{ instructorName }}'s Past Schedules
          </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
  </v-container>
    <br><br><br>

    <v-expansion-panels
        dark
        rounded="30"
    >
    <v-expansion-panel
        rounded
    >
      <v-expansion-panel-header
        color="#5C9970"
        rounded
      >
        <h2>Fall 2022</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content
        color="#5C9970"
        rounded
      >
      <br>
      <v-row v-for="item in pastClasses" :key="item.id">
        <v-col 
          cols="8" 
          class="spacing-playground pa-0"
        >
          <v-card
            class="mx-auto"
            color="#ffffff"
            light
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
              <v-list-item-title class="text-h7">{{ item.course_prefix.toUpperCase() }}{{ item.course_number }}</v-list-item-title>
              <v-list-item-title class="text-h7">{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ displayDays(item.days) }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ item.times_12h }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <br>
        </v-col>

          <v-col 
            cols="4"
            class="spacing-playground pa-0"
          >
            <v-card
              color="#FFB86F"
              light
              outlined
            >
              <div class="pt-3 pl-14 ml-12">
                Teach This Class Again?
              </div>
              <v-card-actions>
                <v-btn
                  :style="{ backgroundColor: item.yes }"
                  @click="changeColor(item, 'yes')"
                  elevation="2"
                  rounded
                  light
                  class="mr-3 mb-1 ml-15"
                >
                  Yes 
                </v-btn> 
                <v-btn
                  :style="{ backgroundColor: item.maybe }"
                  @click="changeColor(item, 'maybe')"
                  elevation="2"
                  rounded
                  light
                  class="mb-1 mr-3"
                >
                  Maybe
                </v-btn> 
                <v-btn
                  :style="{ backgroundColor: item.no}"
                  @click="changeColor(item, 'no')"
                  elevation="2"
                  rounded
                  light
                  class="mb-2 mt-1"
                >
                  No
                </v-btn> 
              </v-card-actions>
            </v-card>
          </v-col>
         </v-row> 
        <br>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      instructorName: '',
      buttonColor: '#ffffff',
      name: '',
      preference: '',
      instructor_name: '',
      pastClasses: [],
    };
  },
  created() {
    this.instructorName = this.$route.params.instructorName;
    this.getCourses();
  },

  methods: {
    goToDashboard() {
      this.$router.push({ name: 'Dashboard', params: { instructorName: this.instructorName } });
    },
    changeColor(item, buttonType) {
      // Update the active button for a specific card
      item.activeButton = buttonType;

      // Update the button colors based on the active button within the card
      item.yes = buttonType === 'yes' ? '#5C9970' : '#ffffff';
      item.maybe = buttonType === 'maybe' ? '#5C9970' : '#ffffff';
      item.no = buttonType === 'no' ? '#5C9970' : '#ffffff';

      //this.updatePreferences(item.activeButton, item.class_number);
      //check if active button is yes, add to schedule else ignore
      if(item.activeButton === 'yes'){
        //update schedule
        this.addToInstructorSchedule(item);
        const assigned = "true";
        this.updateCurrentCoursesClassStatus(item.class_number, assigned);
      }
      else if(item.activeButton === 'no'){
        this.deleteFromInstructorSchedule(item.class_number);
        const assigned = "false";
        this.updateCurrentCoursesClassStatus(item.class_number, assigned);
      }
      // else if(item.activeButton === 'maybe'){
      //   this.updatePreferences(item.activeButton, item.class_number);
      // }
    },

    displayDays(days) {
      return days.join(', ');
    },

    async getCourses() {
      let instructor_name = this.instructorName;
      try {
        const response = await axios.get(`http://localhost:3000/pastcourses/instructors?name=${instructor_name}`);
        this.pastClasses = response.data.map(item => ({
          ...item,
          yes: '#ffffff', // Initialize unique button colors for each item
          maybe: '#ffffff',
          no: '#ffffff',
          activeButton: null, // strores which button is pressed
        })); // Assign the data to the pastClasses property
      } 
      catch (error) {
        console.error(error);
      }
      console.log("past classes array:", this.pastClasses);
    
    },

    async addToInstructorSchedule(item) {
      console.log("adding to schedule");
    try {
      const instructor_name = this.instructorName;
      const course = item;

      console.log("course", course)

      const newCourse = {
        "section_address": course.section_address,
        "course_prefix": course.course_prefix,
        "course_number": parseInt(course.course_number, 10),
        "section": course.section,
        "class_number": parseInt(course.class_number, 10),
        "title": course.title,
        "session": course.session,
        "days": course.days,
        "times": course.times,
        "times_12h": course.times_12h,
        "location": course.location
      };

      const response = await axios.put(`http://localhost:3000/instructorschedules/${instructor_name}`, {newCourse});

      console.log('Response:', response.data.message);
    } catch (error) {
      console.error('Error:', error.message);
    }
  },

  async deleteFromInstructorSchedule(class_number) {
      
    try {
      const instructor_name = this.instructorName;
      const classNumber = class_number;

      const response = await axios.delete(`http://localhost:3000/instructorschedules/${instructor_name}/${classNumber}/removeClass`);

      console.log('Response:', response.data.message);
    } catch (error) {
      console.error('Error:', error.message);
    }
  },

  async updateCurrentCoursesClassStatus(class_number, class_assigned) {
      console.log("updating current courses to true");
    try {
      const classNumber = class_number;

      const data_update = {
        "class_assigned": class_assigned,
        "instructor_name": this.instructorName
      }

      const response = await axios.put(`http://localhost:3000/currentcourses/${classNumber}`, data_update);

      console.log('Response:', response.data.message);
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  

    async updatePreferences(activeButton, classNum){
      let preference = activeButton; //this.preference.trim();
      let instructor_name = this.instructorName;
      let class_number = classNum;
    
      const data_update = {
        teaching_preference: preference
      }

      axios.put(`http://localhost:3000/instructorpreferences/${instructor_name}/${class_number}/preferences`, data_update)
      .then(response => {
          console.log('Response:', response.data.message);
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
      
    }
  },
};
</script>

<style>
</style>