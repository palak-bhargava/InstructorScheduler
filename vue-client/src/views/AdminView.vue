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
            @click="toggleGenerateSchedule(schedule)"
          >
            {{ schedule.generateBtnText }}
          </v-btn> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </v-expansion-panel-header>
      <v-expansion-panel-content color="#5C9970" rounded> <br>
         <v-row v-if="schedule.showContent">
          <v-col cols="9" class="spacing-playground pa-0">
            <v-card class="mx-auto" color="#ffffff" light outlined>
              <v-list-item three-line v-for="(course, index) in generatedSchedule" :key="index">
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
        allSchedules: [],
        instructorSchedule: [],
        finalPossibleCourses: [],
        generatedSchedule: [],
        generateBtnText: 'Generate Schedule',
        generateBtnColor: '#FFB86F',
        generateBtnClickCount: 0,
      };
    },
    created() {
      this.getAllSchedules();
    },
    methods: {
      displayDays(days) {
        return days.join(', ');
      },

      toggleGenerateSchedule(schedule) {
      if (!schedule.generateBtnClickCount) {
        this.$set(schedule, 'generateBtnText', 'View Schedule');
        // first click to populate schedule
        this.showInstructorSchedule(schedule);
        schedule.generateBtnClickCount = 1;
      } 
      else {
        schedule.showContent = true; // Set flag to true when button is clicked
        this.$set(schedule, 'generateBtnText', 'Generate Schedule');
        // second click to display schedule
        this.showInstructorSchedule(schedule);
        schedule.generateBtnClickCount = 0;
      }
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
            generateBtnText: 'Generate Schedule',
            generateBtnColor: '#FFB86F',
            generateBtnClickCount: 0,
            isApproved: null, // strores which button is pressed
            showContent: false,
          })); // Assign the data to the pastClasses property // Assign the data to the pastClasses property
        } 
        catch (error) {
          console.error(error);
        }
        console.log("all schedules array:", this.allSchedules);
      },

      async showInstructorSchedule(schedule) {
        this.generateSchedule(schedule.instructor_name);
        //PUT GETS CALLED INSIDE THE GENERATE PER COURSE ADDED
      },

      async updateApprovedStatus(schedule){
        const instructor_name = schedule.instructor_name;
        const isApproved = schedule.isApproved;
        axios.put(`http://localhost:3000/instructorschedules/${instructor_name}/${isApproved}`)
        .then(response => {
            console.log('Response:', response.data.message);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
      },

       // -------------------------- ALGO ADDITIONS -------------------------
       // instructor preferences controller
      async getInstructorPreference(instructor_name){
        try {
            const response = await axios.get(`http://localhost:3000/instructorpreferences/${instructor_name}`);
            console.log("GET INSTRUCTOR PREFERENCES: ", response.data)
            return response.data;
          } catch (error) {
            console.error(error);
            throw error;
          }
      },
      async getCurrentAvailableCoursesArray(course_number) {
        const class_assigned = "false";
        try {
            const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${course_number}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
      },

      async getCourseByClassNumber(classNumbers) {
        const class_assigned = "false";
        try {
            const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${classNumbers}/getAvailClassByClassNumber`);
            //console.log("Multi class search: ",response.data[0]);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
      },
      // instructor schedule controller
      async getInstructorSchedule(instructor_name){
        try {
            const response = await axios.get(`http://localhost:3000/instructorschedules/${instructor_name}`);
            console.log(response.data)
            this.generatedSchedule = response.data;
            //console.log("HIIIIIIIII", this.generatedSchedule);
            return response.data;
          } catch (error) {
            console.error(error);
            throw error; // Re-throw the error to propagate it to the caller
          }
      },

      async getGivenClasses(courseNumbers) {
        const class_assigned = "false";
        try {
            const response = await axios.get(`http://localhost:3000/currentcourses/${class_assigned}/${courseNumbers}/getAvailClass`);
            //console.log("Multi class search: ",response.data[0]);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
      },

      async putFinalPossibleCourses(instructor_name, course){
        console.log("IN THE PUT, course array from generate", course.putCourse)
        try {
            const response = await axios.put(`http://localhost:3000/instructorschedules/${instructor_name}/fromAlgorithm`, course);
            console.log("updated schedule",response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
      },

      //algo code from new_algo.js

      //function to calculate if class time is within teacher preference ranges
      timeInRange(timeRangeToCheck, timeRanges) {
        // console.log("TIME IN RANGE")
        // console.log("TimeRanges: ", timeRanges)
        const [s, e] = this.convert_to_24h(timeRangeToCheck)
        var newTimeRanges = []
        for (const i in timeRanges) {
            newTimeRanges[i] = this.convert_to_24h(timeRanges[i])
            if (s > newTimeRanges[i][0] && e < newTimeRanges[i][1]) {
                return true;
            }
        }
        return false;
      },

      //function to convert string time ranges to start and end time arrays
      convert_to_24h(time_range) {

        const times = (time_range.toString()).split(' - ');
        // const times = time_range
        for (const t in times) {
            const timeComponents = times[t].match(/(\d+):(\d+)([ap]m)/i);
            let hour = parseInt(timeComponents[1], 10);
            const minute = timeComponents[2];
            const ampm = timeComponents[3].toLowerCase();

            if (ampm === "pm" && hour < 12) {
                hour += 12;
            } else if (ampm === "am" && hour === 12) {
                hour = 0;
            }

            times[t] = `${hour.toString().padStart(2, '0')}:${minute}`;
        }
        // console.log("TIMES: ", times)
        return times
    },


    //function to update the instructor availabilities based off a new course added to the schedule
    async updateInstructorAvailabiltities(course, updatedAvailabilities) {
      //console.log("UPDATING AVAILABILITIES")
      const unavailableDay = course.days;
      // console.log(course.days)
      const unavailableTime = [course.times_12h]
      // console.log(course.times_12h)

      for (const i in unavailableDay) {
          if (updatedAvailabilities[unavailableDay[i]].length != 0) {
              for (const j in updatedAvailabilities[unavailableDay[i]]) {
                  const availRange = this.convertTimeRangesToDatetime([updatedAvailabilities[unavailableDay[i]][j]])
                  const courseRange = this.convertTimeRangesToDatetime(unavailableTime)
              
                  const newTimes = (this.removeOverlap(availRange, courseRange));
                  // console.log(updatedAvailabilities[unavailableDay[i]])
                  updatedAvailabilities[unavailableDay[i]][j] = this.convertDatetimeArrayToStrings(newTimes)[0]
                  if (newTimes.length > 1) {
                      for (let k = 1; k < newTimes.length; k++) {
                          updatedAvailabilities[unavailableDay[i]].push(this.convertDatetimeArrayToStrings(newTimes)[k])
                      }
                  }
              }
          }
      }
      console.log(updatedAvailabilities)
      return updatedAvailabilities;
    },

    //function to populate the intial instructor availabilities based off classes in schedule and availabilities
    async populateInstructorAvailabilities(instructorPreference, instructorSchedule) {
        // Initialize the instructorAvailabilities object
        var instructorAvailabilities = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };

        // Extract availability information from the instructorPreference
        const availability1 = instructorPreference[0].availabilities;

        // Iterate through availability and add times to corresponding days
        availability1.forEach((avail) => {
            const day = avail.day;
            const times = avail.times;
            instructorAvailabilities[day] = instructorAvailabilities[day].concat(times);
        });
        console.log("AVAILABILITIES: ", instructorAvailabilities)


        // Extract class information from the instructorSchedule
        const classes = instructorSchedule;

        // // Iterate through classes and remove times from corresponding days
        classes.forEach((course) => {
            const unavailableDay = course.days;
            //console.log(course.days)
            const unavailableTime = [course.times_12h]

            for (const i in unavailableDay) {
                if (instructorAvailabilities[unavailableDay[i]].length != 0) {
                    for (const j in instructorAvailabilities[unavailableDay[i]]) {
                        const availRange = this.convertTimeRangesToDatetime([instructorAvailabilities[unavailableDay[i]][j]])
                        const courseRange = this.convertTimeRangesToDatetime(unavailableTime)
                        const newTimes = (this.removeOverlap(availRange, courseRange));
                        // console.log("NEW TIMES: ",newTimes)
                        //console.log(instructorAvailabilities[unavailableDay[i]])
                        instructorAvailabilities[unavailableDay[i]][j] = this.convertDatetimeArrayToStrings(newTimes)[0]
                        if (newTimes.length > 1) {
                        for (let k = 1; k < newTimes.length; k++) {
                            instructorAvailabilities[unavailableDay[i]].push(this.convertDatetimeArrayToStrings(newTimes)[k])
                        }
                    }
                        
                    }
                }
            }
        });
        console.log("UPDATED INSTRUCTOR AVAILABILITIES")
        console.log(instructorAvailabilities)
        return instructorAvailabilities;
    },

    //function to convert dateTimes to string format "12:00pm - 1:15pm"
    convertDatetimeArrayToStrings(datetimeArray) {

      const convertDatetimeToTimeString = ({ startDate, endDate }) => {
          const formatTime = (date) => {
              const hours = date.getHours() % 12 || 12; // Ensure 12-hour format
              const minutes = date.getMinutes();
              const period = date.getHours() >= 12 ? 'pm' : 'am';

              return `${hours}:${minutes.toString().padStart(2, '0')}${period}`;
          };

          return `${formatTime(startDate)} - ${formatTime(endDate)}`;
      };
      console.log(datetimeArray.map(convertDatetimeToTimeString))
      return datetimeArray.map(convertDatetimeToTimeString);
    },

    //function to convert time strings "12:00pm - 1:15pm" to dateTimes
    convertTimeRangesToDatetime(timeRanges) {
      const convertTimeStringToDatetime = (timeString) => {
          const [start, end] = (timeString).match(/(\d+:\d+[ap]m)/gi);

          const parseTime = (time) => {
              const [hours, minutes, period] = time.match(/(\d+):(\d+)([ap]m)/i).slice(1);
              const isPM = period && period.toLowerCase() === 'pm';
              return { hours: parseInt(hours, 10) + (isPM && hours !== '12' ? 12 : 0), minutes: parseInt(minutes, 10) };
          };

          const startTime = parseTime(start);
          const endTime = parseTime(end);

          const startDate = new Date(1970, 0, 1, startTime.hours, startTime.minutes);
          const endDate = new Date(1970, 0, 1, endTime.hours, endTime.minutes);

          return { startDate, endDate };
      };
      console.log(timeRanges, " TIME RANGES")
      return timeRanges.map(convertTimeStringToDatetime);
    },

    //function to check time ranges and identify overlap
    compareRanges(availRange, courseRange) {
      if (availRange.endDate < courseRange.startDate || courseRange.endDate < availRange.startDate) {
          //console.log("No Overlap found, will not update availabilities")
          return false
      }
      else {
          //console.log("Overlap found: will update availabilities")
          return true
      }
    },

    //function to remove a time overlap
    removeOverlap(array1, array2) {
      const result = [];

      for (const range1 of array1) {
          for (const range2 of array2) {
              if (this.compareRanges(range1, range2)) {
                  // If there's an overlap, adjust the time range in array1
                  // const overlapStart = new Date(Math.max(range2.startDate, range1.startDate))
                  // const overlapEnd = new Date(Math.min(range2.endDate, range1.endDate))
                  const overlapStart = range2.startDate > range1.startDate ? range2.startDate : range1.startDate;
                  const overlapEnd = range2.endDate < range1.endDate ? range2.endDate : range1.endDate;

                  // console.log('RANGE1 START: ', range1.startDate.toLocaleTimeString())
                  // console.log('RANGE1 END: ', range1.endDate.toLocaleTimeString())
                  // console.log('RANGE2 START: ', range2.startDate.toLocaleTimeString())
                  // console.log('RANGE2 END: ', range2.endDate.toLocaleTimeString())


                  // console.log('OVERLAP START: ', overlapStart.toLocaleTimeString())
                  // console.log('OVERLAP END: ', overlapEnd.toLocaleTimeString())
                  // Add the non-overlapping part before the overlap
                  if (overlapStart > range1.startDate) {
                      // console.log(range1.startDate.toLocaleTimeString(), " ", overlapStart.toLocaleTimeString())
                      result.push({ startDate: range1.startDate, endDate: overlapStart });
                  }

                  // Add the non-overlapping part after the overlap

                  if (overlapEnd < range1.endDate) {
                      // console.log('INSIDE')
                      // console.log(overlapEnd.toLocaleTimeString(), " ", range1.endDate.toLocaleTimeString())
                      result.push({ startDate: overlapEnd, endDate: range1.endDate });
                  }

                  // Break the loop since we handled the overlap for this range
                  break;
              } else {
                  result.push(range1)
              }
          }
      }
      //console.log("RESULT", result)
      return result;
    },

    //function to make a call to axios function to get instructor preferences
    async getPreference(instructor_name) {
        const response = await this.getInstructorPreference(instructor_name)
        return response
    },
    //function to make a call to axios function to get instructor schedule
    async getSchedule(instructor_name) {
        const response = await this.getInstructorSchedule(instructor_name)
        return response
    },

    //function to make axios call based of requested available courses in instructorPreferences
    //to get the full course information
    async getSpecificPreferenceCourse(courseParamString) {
        //console.log("FINAL PARAM: ", courseParamString)
        const response = await this.getCourseByClassNumber(courseParamString)
        //const response = await this.getGivenClasses(courseParamString)
        //console.log("FINAL RESPONSE: ", response)
        return response
        //return tempPreferenceCourses
    },
    //function to make axios call based off general preferences in instructorPreferences
    //to get possible specific course options for the general preference
    async getGeneralPreference(generalParamString) {
        // console.log("PARAMS FOR GENERAL PREF: ", generalParamString)
        const response = await this.getGivenClasses(generalParamString)
        //console.log("CLASSES BASED OFF GENERAL PREFERENCE: ", response)
        return response
        //return course_objs
    },

    //function that adds specific available courses from instructor preferences to the generated instructor schedule
    async getScheduleOverlap(chosenAvailableCourses, instructorCourses, updatedAvailabilities, finalPossibleCourses) {
        for (let i = 0; i < chosenAvailableCourses.length; i++) {
            try {
                //const canAdd = await isScheduleOverlap(chosenAvailableCourses[i], instructorCourses)
                //if (canAdd){
                finalPossibleCourses.push(chosenAvailableCourses[i]);
                //console.log(this.finalPossibleCourses);
                updatedAvailabilities = await this.updateInstructorAvailabiltities(chosenAvailableCourses[i], updatedAvailabilities);
                //}
            } catch (error) {
                console.error("Error:", error);
            }

        }
    },

    //function to call the this.populateInstructorAvailabilities function
    async populateHelper(instructorPreference, instructorSchedule) {
        var confirm = await this.populateInstructorAvailabilities(instructorPreference, instructorSchedule)
        // console.log('CONFIRM: ', confirm)
        return confirm
    },

    //variable to hold the generated schedule
    //const finalPossibleCourses = [] ACCESS USING THIS.FINALPOSSIBLECOURSES

    //async function that checks if a course fits within an instructor's availabilties
    async checkTimes(course, updatedAvailabilities) {

        if (course.length != 0) {
            for (const i in course) {
                const timeOfClass = course[i].times_12h
                const courseTemp = course[i]
                const daysOfClass = courseTemp.days
                // console.log(timeOfClass)
                // console.log(courseTemp)
                console.log(daysOfClass)
                console.log(courseTemp.course_prefix, " ", courseTemp.course_number)

                if (daysOfClass.length == 1) {
                    switch (daysOfClass[0]) {
                        case 'Monday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Monday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                        case 'Tuesday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Tuesday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                        case 'Wednesday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Wednesday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                        case 'Thursday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Thursday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                        case 'Friday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Friday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                        case 'Saturday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Saturday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                        case 'Sunday':
                            if (this.timeInRange(timeOfClass, updatedAvailabilities.Sunday)) {
                                //add to possible courses
                                //allPossibleCourses.push(courseTemp)
                                return true
                            }
                            break;
                    }
                }
                else if (daysOfClass.length == 2) {
                    var count = 0
                    for (let k = 0; k < daysOfClass.length; k++) {
                        switch (daysOfClass[i]) {
                            case 'Monday':
                                console.log("IN CASE MONDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Monday)) {
                                    //add to possible courses
                                    if (count == 1) {
                                        // allPossibleCourses.push(courseTemp)
                                        console.log("IN CASE MONDAY CONFIRMED")
                                        return course[i]
                                    } else {
                                        count++
                                    }

                                }
                                break;
                            case 'Tuesday':
                                console.log("IN CASE TUESDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Tuesday)) {
                                    //add to possible courses
                                    if (count == 1) {
                                        // allPossibleCourses.push(courseTemp)
                                        return course[i]
                                    } else {
                                        count++
                                    }
                                }
                                break;
                            case 'Wednesday':
                                console.log("IN CASE WEDNESDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Wednesday)) {

                                    //add to possible courses
                                    if (count == 1) {
                                        // allPossibleCourses.push(courseTemp)
                                        console.log("IN CASE WEDNESDAY CONFIRMED")
                                        console.log(course[i])
                                        return course[i]
                                    } else {
                                        count++
                                    }
                                }
                                break;
                            case 'Thursday':
                                console.log("IN CASE THURSDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Thursday)) {
                                    //add to possible courses
                                    if (count == 1) {
                                        // allPossibleCourses.push(courseTemp)
                                        // count = 0
                                        return course[i]
                                    } else {
                                        count++
                                    }
                                }
                                break;
                            case 'Friday':
                                console.log("IN CASE FRIDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Friday)) {
                                    //add to possible courses
                                    if (count == 1) {
                                        // allPossibleCourses.push(courseTemp)
                                        // count = 0
                                        return course[i]
                                    } else {
                                        count++
                                    }
                                }
                                break;
                            case 'Saturday':
                                console.log("IN CASE SATURDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Saturday)) {
                                    //add to possible courses
                                    if (count == 1) {
                                        // allPossibleCourses.push(courseTemp)
                                        // count = 0
                                        return course[i]
                                    } else {
                                        count++
                                    }
                                }
                                break;
                            case 'Sunday':
                                console.log("IN CASE SUNDAY")
                                if (this.timeInRange(timeOfClass, updatedAvailabilities.Sunday)) {
                                    //add to possible courses
                                    if (count == 1) {
                                        //allPossibleCourses.push(courseTemp)
                                        // count = 0
                                        return course[i]
                                    } else {
                                        count++
                                    }
                                }
                                break;
                        }

                    }
                }
            }

        }
      },

      //function to get course options based off general preferences in instructor preferences
      //and returns a formatted version
      async getFormattedGeneralPref(instructorPreference) {

          var formattedCourses = []
          for (let i = 0; i < instructorPreference[0].general_preferences.length; i++) {
              try {
                  console.log("CALLING GET FOR THIS CLASS: ", instructorPreference[0].general_preferences[i].course_number)
                  const courseOptions = await this.getGeneralPreference(instructorPreference[0].general_preferences[i].course_number)
                  formattedCourses.push(courseOptions)
              } catch (error) {
                  console.error("Error:", error);
              }
          }
          console.log("FORMATTED COURSES: ", formattedCourses)
          return formattedCourses;
      },
      //function to 
      async processCourses(courseOptions, updatedAvailabilities, finalPossibleCourses) {
      //async processCourses(courseOptions, updatedAvailabilities) {
          console.log("PROCESS COURSES: ")
          for (let i = 0; i < courseOptions.length; i++) {
              try {
                  const courseToAdd = await this.checkTimes(courseOptions[i], updatedAvailabilities);
                  console.log("COURSE TO ADD: ", courseToAdd)

                  if (typeof courseToAdd !== "undefined") {
                      console.log("solution found: ", courseToAdd.section_address);
                      finalPossibleCourses.push(courseToAdd);
                      //console.log(this.finalPossibleCourses);

                      updatedAvailabilities = await this.updateInstructorAvailabiltities(courseToAdd, updatedAvailabilities);
                  }
              } catch (error) {
                  console.error("Error:", error);
              }
          }
          console.log(finalPossibleCourses);
          return finalPossibleCourses
      },

    generateSchedule(instructor_name){
      const finalPossibleCourses = []
      var courseToPut = {}
        //get function to get the instructorPreferences and instructorSchedule
        Promise.all([this.getPreference(instructor_name), this.getSchedule(instructor_name)])
        .then(([instructorPreference, instructorSchedule]) => {
            // 
            console.log("Instructor Preferences:");
            console.log(instructorPreference[0].courses);
            console.log(instructorPreference[0].availabilities);
            console.log("Instructor Schedule:");
            console.log(instructorSchedule);

            this.populateHelper(instructorPreference, instructorSchedule)
                .then((updatedAvailabilities) => {
                    //AT THIS POINT, WE HAVE UPDATED AVAILABILITIES BASED OFF COURSES
                    var courseParam = []
                    instructorPreference[0].courses.forEach(course => {
                        courseParam.push(course.class_number)
                    })
                    var coursesParamString = courseParam.join(",")

                    //get function to get the specific available courses requested by instructor
                    this.getSpecificPreferenceCourse(coursesParamString).then((chosenAvailableCourses) => {
                        console.log("CHOSEN AVAILABLE COURSES", chosenAvailableCourses)
                        //if those classes are available (if length != 0)
                        if (Object.keys(chosenAvailableCourses).length != 0) {
                            //add the classes to the generated schedule
                            this.getScheduleOverlap(chosenAvailableCourses, instructorSchedule, updatedAvailabilities, finalPossibleCourses)
                        }
                        //get the possible courses based off the instructor's general preferences
                        this.getFormattedGeneralPref(instructorPreference).then((courseOptions) => {
                            //process the courses to get a possible schedule
                            this.processCourses(courseOptions, updatedAvailabilities, finalPossibleCourses).then((finalPossibleCourses) =>{
                              console.log("FINAL POSSIBLE COURSES FROM PROCESS COURSES", finalPossibleCourses)
                              finalPossibleCourses.forEach((course) => {
                                console.log("MUST ADD", course);
                                courseToPut = {
                                  "section_address": course.section_address,
                                  "course_prefix": course.course_prefix,
                                  "course_number": course.course_number,
                                  "section": course.section,
                                  "class_number": course.class_number,
                                  "title": course.title,
                                  "session":course.session,
                                  "days":course.days,
                                  "times": course.times,
                                  "times_12h": course.times_12h,
                                  "location": course.location
                                }
                                console.log("MUST ADD OBJ", courseToPut);
                                //call put method here
                                this.putFinalPossibleCourses(instructor_name, {putCourse: courseToPut})
                              })
                              }).catch((error) => {
                                console.error("Error:", error);
                              });     
                        }).catch((error) => {
                            console.error("Error:", error);
                        });
                    }).catch((error) => {
                        console.error("Error:", error);
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    },
    


  //ADD INSTRUCTOR NAME VARIABLE
      
     

    },
  }
</script>

<style>
</style>