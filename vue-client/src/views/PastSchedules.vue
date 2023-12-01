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
          Past Schedules
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
      buttonColor: '#ffffff',
      name: '',
      preference: '',
      instructor_name: '',
      pastClasses: [],
    };
  },
  created() {
    this.getCourses();
  },
  methods: {
    changeColor(item, buttonType) {
      // Update the active button for a specific card
      item.activeButton = buttonType;

      // Update the button colors based on the active button within the card
      item.yes = buttonType === 'yes' ? '#5C9970' : '#ffffff';
      item.maybe = buttonType === 'maybe' ? '#5C9970' : '#ffffff';
      item.no = buttonType === 'no' ? '#5C9970' : '#ffffff';

      this.updatePreferences(item.activeButton, item.class_number);
    },

    displayDays(days) {
      return days.join(', ');
    },

    async getCourses() {
      let name = "Pushpa%20Kumar";
      try {
        const response = await axios.get(`http://localhost:3000/pastcourses/instructors?name=${name}`);
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

    //if preferences already exist, then put based on course_prefix, course_number and preference
    //else post the course into preferences

    //TODO: if a preference from this page is added, remove course time from availability

    async updatePreferences(activeButton, classNum){
      let preference = activeButton; //this.preference.trim();
      let instructor_name = "Pushpa%20Kumar"; //this.instructor_name.trim();
      let class_number = classNum;
    
      const data_update = {
        teaching_preference: preference
      }

      axios.put(`http://localhost:3000/instructorpreferences/${instructor_name}/${class_number}`, data_update)
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