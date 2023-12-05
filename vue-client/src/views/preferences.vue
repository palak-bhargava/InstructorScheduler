<template>
  <v-container>
    <v-container class="pa-0">
      <v-app-bar
        app
        color="f5f5f5"
      >
        <div class="d-flex align-center justify-center" style="width: 100%">
          <v-app-bar-nav-icon
            @click="goToDashboard"
          ><v-img
            class="shrink mr-2"
            contain
            :src="require('../assets/IS-logo.png')"
            transition="scale-transition"
            width="40"
          />
          </v-app-bar-nav-icon>
        <v-toolbar-title class="flex text-center">
          {{ instructorName }}'s Preferences
        </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-container>

    <v-row>
      <v-col cols="6">
        <div class="text-h5 mt-15 mb-3">Course Search</div>
        <v-row>
          <v-col cols="10">
            <v-autocomplete
                v-model="selectedCourse"
                :items="courseInfo"
                filled
                rounded
                solo-filled
                dark
                clearable
                background-color="#5C9970"
                label="Course Number"
                class="small-autocomplete"
            >
              <template v-slot:append-outer>
                <v-row class="justify-center">
                  <v-btn
                    color="#FFB86F"
                    elevation="2"
                    rounded
                    dark
                    class="ml-7 mt-1"
                    @click="addCourse"
                  >
                    Add
                  </v-btn>
                </v-row>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <div class="text-h5 mt-15 mb-3">Courses I Want To Teach</div>
        <v-card color="#5C9970" class="rounded-xl">
          <v-container class="spacing-playground pb-3 pa-5">
            <v-card v-for="(preference, index) in generalpreferencesarray" :key="index" 
                class="mb-2 pl-4 pa-2 rounded-pill d-flex align-center"  
                color="#ffffff"
            >
                <div>
                    <b>{{ preference.course_prefix }}{{ preference.course_number }}</b> - {{ preference.title }}
                </div>
                <v-card-actions class="ml-auto">
                    <v-btn
                        color="#ffffff"
                        elevation="0"
                        rounded
                        small
                        @click="deletePreference(preference)"
                    >
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <div class="text-h5 mt-15 pl-3">My Availability</div>
      <v-col cols="12">
        <v-card class="pl-4 pa-2 mb-10 rounded-xl" color="#5C9970" dark>
          <v-sheet class="pa-5" style="background-color: #5C9970;" height="600">
            <v-calendar
              ref="calendar"
              v-model="value"
              color="green lighten-1"
              type="week"
              light
              first-time="07:00"
              last-time="22:00"
              interval-count="15"
              :events="events"
              :event-ripple="false"
              @click:event="showPopup"
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave.native="cancelDrag"
            >
              <template v-slot:event="{ event, timed, eventSummary }">
                <div class="v-event-draggable">
                  <component :is="{ render: eventSummary }"></component>
                </div>
                <div
                  v-if="timed"
                  class="v-event-drag-bottom"
                  @mousedown.stop="extendBottom(event)"
                ></div>
              </template>
            </v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
            >
              <v-card class="pa-1" color="grey lighten-4" flat>
                <v-card-actions>
                  <v-btn
                    class="ma-2"
                    color="grey lighten-2"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    color="error"
                    @click="deleteEvent(selectedEvent)"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
          <v-row class="d-flex justify-center">
            <v-btn
              class="mt-2 mb-5 ml-12"
              color="#FFB86F"
              rounded
              @click="sendAvailability(events)"
            >
              Save Preferences
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyPreferences',

  data: () => ({
    instructorName: '',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    value: '',
    focus: '',
    events: [],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    allCourses: [],
    selectedCourse: null,
    generalpreferencesarray: [],
  }),

  mounted() {
    this.$refs.calendar.checkChange();
    this.getCourseArray();
    this.getInstructorPreferences();
    this.instructorName = this.$route.params.instructorName;
  },
  computed: {
    // Compute an array of course titles
    courseInfo() {
      return this.allCourses.map(course => "CS"+course.course_number+" - "+course.title);
    },
  },

  methods: {
    goToDashboard() {
      this.$router.push({ name: 'Dashboard', params: { instructorName: this.instructorName } });
    },
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;
        this.dragTime = mouse - start;
      } else {
        this.createStart = this.roundTime(mouse);

        const eventDuration = 60 * 60 * 1000; // 1 hour as an example
        const createEnd = this.createStart + eventDuration;

        this.createEvent = {
          color: '#FFB86F',
          start: new Date(this.createStart),
          end: new Date(createEnd),
          timed: true,
        };

        this.events.push(this.createEvent);
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
    endDrag() {
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
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
    parseEvents(events) {
      const resultArray = [];

      try {
        events.forEach((event, index) => {
          try {
            // Extract relevant information from the event
            const { start, end } = event;

            // Convert the start and end times to Date objects for better manipulation
            const startDate = new Date(start);
            const endDate = new Date(end);

            // Get the day of the week as a string (e.g., "Monday", "Tuesday", etc.)
            const dayOfWeek = new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
            }).format(startDate);

            // Format the start and end times without space, with lowercase AM/PM, and without leading zero for single-digit hours
            const startTimeFormatted = startDate
              .toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(/\s/g, '')
              .toLowerCase();
            const endTimeFormatted = endDate
              .toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(/\s/g, '')
              .toLowerCase();

            // Find the entry in the result array corresponding to the day of the week
            let dayEntry = resultArray.find((entry) => entry.day === dayOfWeek);

            // If the entry does not exist, create a new one
            if (!dayEntry) {
              dayEntry = { day: dayOfWeek, times: [] };
              resultArray.push(dayEntry);
            }

            // Add the formatted time range to the times array
            const timeRange = `${startTimeFormatted} - ${endTimeFormatted}`;
            dayEntry.times.push(timeRange);
          } catch (error) {
            console.error(`Error processing event ${index + 1}:`, error);
            // Handle or log the error as needed
          }
        });
        //console.log(resultArray);
      } catch (error) {
        console.error('Error in postPreferences function:', error);
        throw error; // Rethrow the error to propagate it further
      }
      return resultArray;
    },

    async sendAvailability(events) {
      let instructor_name = "Pushpa%20Kumar"; //this.instructor_name.trim();
      
      const availabilities = this.parseEvents(events);
      
      console.log("availabilities: ", availabilities);
      try {
        const response = await axios.put(`http://localhost:3000/instructorpreferences/${instructor_name}/availabilities`, { availabilities });
         console.log('Response:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    },
    async getCourseArray() {
      try {
        const response = await axios.get(`http://localhost:3000/coursearrayobj`);
        this.allCourses = response.data;
        console.log('allCourses:', this.allCourses);
        //  console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    },
    async addCourse() {
        const instructor_name = "Pushpa%20Kumar";
        console.log('Selected Course:', this.selectedCourse);
       
        const pattern = /^([A-Za-z]+)(\d+)\s*-\s*(.+)$/;

        const matches = pattern.exec(this.selectedCourse);

        console.log(matches[1]);
        console.log(matches[2]);
        console.log(matches[3]);

        const data_update = {
            "course_prefix": matches[1],
            "course_number": matches[2],
            "title": matches[3]
        }

        try {
            const response = await axios.put(`http://localhost:3000/instructorpreferences/${instructor_name}/generalpreferences`, data_update);
            console.log('Response:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }

        this.getInstructorPreferences();
    },
    
    async getInstructorPreferences(){
        const instructor_name = "Pushpa%20Kumar";
        try {
            const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
            this.generalpreferencesarray = response.data[0].general_preferences;
            console.log('instructor preferences:', response.data[0].general_preferences);
        } catch (error) {
            console.error('Error:', error.message);
        }
    },
    async deletePreference(preference){
        //console.log("delete:", preference);
        const course_number = preference.course_number;

        const instructor_name = "Pushpa%20Kumar";
        try {
            const response = await axios.delete(`http://localhost:3000/instructorpreferences/${instructor_name}/generalpreferences/${course_number}`);
            console.log('instructor preference deletes:', response.data.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
        this.getInstructorPreferences();
    }
  },
};
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }
  &:hover::after {
    display: block;
  }
}
</style>