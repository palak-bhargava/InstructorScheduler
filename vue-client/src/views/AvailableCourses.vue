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
      :single-select="singleSelect"
      :search="search"
      :page.sync="page"
      :items-per-page=9
      hide-default-footer
      item-key="number"
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
        >
          Add To Schedule
          <v-icon right>
            mdi-plus
          </v-icon>
        </v-btn> 
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

  export default {
    name: 'AvailableCourses',

    data () {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 9,
        search: '',
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Class #',
            align: 'start',
            sortable: false,
            value: 'number',
          },
          { text: 'Course Name', value: 'name' },
          { text: 'Section', value: 'section' },
          { text: 'Location', value: 'location' },
          { text: 'Days', value: 'days' },
          { text: 'Time', value: 'time' },
        ],
        available_classes: [
          {
            number: 123456,
            name: 'Data Structures',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 574930,
            name: 'Machine Learning',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 890273,
            name: 'Advanced Algorithms',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 469320,
            name: 'Data Structures',
            section: '004',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 738209,
            name: 'Data Structures',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 103864,
            name: 'Machine Learning',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 310432,
            name: 'Advanced Algorithms',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 595743,
            name: 'Data Structures',
            section: '004',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 984633,
            name: 'Data Structures',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 464839,
            name: 'Machine Learning',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 203474,
            name: 'Advanced Algorithms',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 230432,
            name: 'Data Structures',
            section: '004',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 658494,
            name: 'Data Structures',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 134556,
            name: 'Machine Learning',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 122334,
            name: 'Advanced Algorithms',
            section: '003',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
          {
            number: 111111,
            name: 'Data Structures',
            section: '004',
            location: 'ECSW 2.106',
            days: 'TTH',
            time: '10:00AM - 11:15AM',
          },
        ],
      }
    },
  }
</script>

<style>
.v-data-table-header {
  background-color: #ffb86f !important;
}
</style>