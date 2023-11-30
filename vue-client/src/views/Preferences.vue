<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <div class="text-h5 mt-15 mb-3">Course Search</div>
        <v-row>
          <v-col cols="10">
            <v-autocomplete
              v-model="values"
              :items="items"
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
              last-time="10:00"
              interval-count="15"
              :events="events"
              :event-color="getEventColor"
              :event-ripple="false"
              @change="updateEvents"
              @click:event="showEvent"
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave="cancelDrag"
            >
              <template v-slot:event="{ event, timed }">
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
      // selectedEvent: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      value: 'null',
      focus: '',
      events: [],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
    }),
    mounted () {
      console.log('Component mounted');
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
          this.createEvent = {
            name: `Event #${this.events.length}`,
            color: '#FFB86F',
            start: this.createStart,
            end: this.createStart,
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
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent({ nativeEvent, event }) {
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

        // Close the menu after deleting the event
        this.selectedOpen = false;
      },
      updateRange ({ start, end }) {
        const newEvent = {
          name: 'Time Frame',
          start: new Date(start),
          end: new Date(end),
          color: '#FFB86F',
          timed: true,
        };
        this.events.push(newEvent);
      },
    },
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

