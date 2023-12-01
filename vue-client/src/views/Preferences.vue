<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <div class="text-h5 mt-15 mb-3">Course Search</div>
        <v-row>
          <v-col cols="10">
            <v-autocomplete
              
              filled
              rounded
              solo-filled
              dark
              clearable
              background-color = "#5C9970"
              label="Course Number"
              class = "small-autocomplete"
            >
              <template v-slot:append-outer>
                <v-row class="justify-center">
                <v-btn
                  color="#FFB86F"
                  elevation="2"
                  rounded
                  dark
                  class="ml-7 mt-1"
                >
                  Add
                </v-btn> 
                </v-row> 
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="5">
        <div class="text-h5 mt-15 mb-3">Courses I Want To Teach</div>
          <v-card
            color="#5C9970"
            class="rounded-xl"
          > 
            <v-container class="spacing-playground pb-3 pa-5">
              <v-card
                  class = "mb-2 pl-4 pa-2 rounded-pill"
                  color="#FFFFFF"
              >
                CS 4348 Automata Theory
              </v-card>

              <v-card
                  class = "mb-2 pl-4 pa-2 rounded-pill"
                  color="#FFFFFF"
              >
                CS 2336 CS II
              </v-card>
            
              <v-card
                class = "mb-2 pl-4 pa-2 rounded-pill"
                color="#FFFFFF"
              >
                CS 3345 Data Structures
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
            class="mt-2 mb-5" 
            color="#FFB86F" 
            @click="postPreferences(events)">
              Save Preferences
            </v-btn> 
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
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
    }),
    mounted () {
      this.$refs.calendar.checkChange()
      },
    methods: {
      
      startDrag ({ event, timed }) {
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start
          this.dragTime = mouse - start
        } else {
          this.createStart = this.roundTime(mouse)
          
          const eventDuration = 60 * 60 * 1000; // 1 hour as an example
          const createEnd = this.createStart + eventDuration;

          this.createEvent = {
            color: '#FFB86F',
            start: new Date(this.createStart),
            end: new Date(createEnd),
            timed: true
          }

        this.events.push(this.createEvent)
        }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start
          const end = this.dragEvent.end
          const duration = end - start
          const newStartTime = mouse - this.dragTime
          const newStart = this.roundTime(newStartTime)
          const newEnd = newStart + duration

          this.dragEvent.start = newStart
          this.dragEvent.end = newEnd
        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false)
          const min = Math.min(mouseRounded, this.createStart)
          const max = Math.max(mouseRounded, this.createStart)

          this.createEvent.start = min
          this.createEvent.end = max
        }
      },
      endDrag () {
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      },
      roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
      showPopup({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      deleteEvent(eventToDelete) {
        const index = this.events.findIndex((event) => event === eventToDelete);
        if (index !== -1) {
          this.events.splice(index, 1);
        }

        this.selectedOpen = false;
      },
      postPreferences(events) {
        const resultArray = [];

        try {
          events.forEach((event, index) => {
            try {
              // Extract relevant information from the event
              const { name, start, end } = event;

              // Convert the start and end times to Date objects for better manipulation
              const startDate = new Date(start);
              const endDate = new Date(end);

              // Get the day of the week as a string (e.g., "Monday", "Tuesday", etc.)
              const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(startDate);

              // Format the start and end times without space, with lowercase AM/PM, and without leading zero for single-digit hours
              const startTimeFormatted = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s/g, '').toLowerCase();
              const endTimeFormatted = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s/g, '').toLowerCase();

              // Find the entry in the result array corresponding to the day of the week
              let dayEntry = resultArray.find(entry => entry.day === dayOfWeek);

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
          console.log(resultArray)
          return resultArray;
          
        } catch (error) {
          console.error('Error in postPreferences function:', error);
          throw error; // Rethrow the error to propagate it further
        }
      },
    }
  }
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

