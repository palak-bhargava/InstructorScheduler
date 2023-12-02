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
          Available Courses
          </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-container>
    <br>

    <v-row>
      <v-col cols="3">
      </v-col>
      <v-col cols="6">
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            rounded
            hide-details
            solo
            background-color="#5C9970"
            dark
        ></v-text-field>
      </v-col>
    </v-row>
    <br>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="available_classes"
      :search="search"
      :page.sync="page"
      :items-per-page=9
      hide-default-footer
      item-key="class_number"
      show-select
      class="elevation-2 mt-3"
      @page-count="pageCount = $event"
    >
    </v-data-table>
    
    <v-row>
      <v-col 
        cols="5"
        md="5"
        class="ml-md-auto"
        align=right
      >
        <v-btn
          color="#FFB86F"
          elevation="2"
          rounded
          dark
          class="ml-7 mt-4"
          @click="addToPreferences"
        >
          Request Course
          <v-icon right>
            mdi-plus
          </v-icon>
        </v-btn> <br><br>
      </v-col>
    </v-row>

    <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          color="#5C9970"
        ></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'AvailableCourses',

    data () {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 9,
        search: '',
        selected: [],
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
      }
    },
    created() {
      this.getAvailableCourses();
    },
    methods: {
      addToPreferences() {
        const updatedCoursesArray = [];
        //console.log(this.selected)
        this.selected.forEach((course) => {
            // Create a new courseObj for each iteration
            const courseObj = {
                "course_prefix": course.course_prefix,
                "course_number": course.course_number,
                "teaching_preference": "yes",
                "class_number": course.class_number
            };

            updatedCoursesArray.push(courseObj);
        });

        this.putAddedPreferences(updatedCoursesArray);
      },

      async putAddedPreferences(selectedCourseArray){
        let instructor_name = "Pushpa%20Kumar"; //this.instructor_name.trim();

        const newCourses = selectedCourseArray;

        axios.put(`http://localhost:3000/instructorpreferences/${instructor_name}`, {newCourses})
        .then(response => {
            console.log('Response:', response.data.message);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });

      },

      async getAvailableCourses() {
        let availability = "false";
        try {
          const response = await axios.get(`http://localhost:3000/currentcourses/${availability}`);
          //console.log(response)
          this.available_classes = response.data;
        } 
        catch (error) {
          console.error(error);
        }
        console.log("available courses array:", this.available_classes);
      },
    }
  }
</script>

<style>
.v-data-table-header {
  background-color: #ffb86f !important;
}
</style>