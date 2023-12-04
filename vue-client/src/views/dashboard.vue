<template>
    <v-container class="mt-10">
        <v-row>
            <v-col cols="7">
                <div class="text-h5 mb-2">My Preferences</div>
                <v-card
                color="#5C9970"
                class="rounded-xl"
                > 
                    <v-container class="spacing-playground pa-5">
                        <v-row> 
                            <v-col>
                                <v-card class="rounded-xl">
                                    <v-container>
                                        <div class="subtitle-1 font-weight-bold">Preferred Courses</div>
                                        CS 4384 - Automata Theory<br>CS 4875 - Machine Learning
                                    </v-container>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card class="rounded-xl">
                                    <v-container>
                                        <div class="subtitle-1 font-weight-bold">Time Frames</div>
                                        MW  12:00 PM - 4:00 PM<br>TTH  10:00 AM - 2:00 PM
                                    </v-container>
                                </v-card>
                            </v-col>
                        </v-row>
                    
                        <v-row justify-center class="mb-0"> 
                            <v-btn
                            color="#FFB86F"
                            elevation="2"
                            rounded
                            class="mx-auto"
                            >
                                Edit Preferences
                            </v-btn> 
                        </v-row> 
                    </v-container>
                </v-card>               
            </v-col>
        
            <v-col cols="1">
            </v-col>

            <v-col cols="4">
                <div class="text-h5 mb-2">Past Schedules</div>
                <v-card
                    color="#5C9970"
                    class="rounded-xl"
                > 
                    <v-container class="spacing-playground pa-5">
                        <v-btn
                        color="#FFFFFF"
                        elevation="2"
                        rounded
                        block
                        outlined
                        class="mb-2"
                        >
                            Fall 2023 
                            <v-spacer></v-spacer>
                            <v-icon right>
                            mdi-arrow-right-thick
                            </v-icon>
                        </v-btn> 
                        
                    
                        <v-btn
                        color="white"
                        elevation="2"
                        rounded
                        block
                        outlined
                        class="mb-2"
                        >
                            Spring 2022
                            <v-spacer></v-spacer>
                            <v-icon right>
                            mdi-arrow-right-thick
                            </v-icon>
                        </v-btn> 
                        <v-btn
                        color="white"
                        elevation="2"
                        rounded
                        block
                        outlined
                        >
                            Fall 2022
                            <v-spacer></v-spacer>
                            <v-icon right>
                            mdi-arrow-right-thick
                            </v-icon>
                        </v-btn> 
                    </v-container>
                </v-card> 
            </v-col>
        </v-row>
    
        <div class="text-h5 mb-2 mt-15">Available Courses</div>
        <v-card
            color="#5C9970"
            class="rounded-xl"
        > 
            <v-container class="spacing-playground pa-5">
                <v-card
                    class = "mb-2 pa-2 rounded-xl font-weight-medium"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col 
                        cols="2">
                        Course Number
                        </v-col>
                        <v-col cols="3">
                            Course Name
                        </v-col>
                        <v-col cols="1.5">
                            Section
                        </v-col>
                        <v-col cols="1.5">
                            Location
                        </v-col>
                        <v-col cols="2.5">
                            Days & Time
                        </v-col>
                    </v-row>
                </v-card>
                <v-card
                    class="rounded-xl mb-2 pa-2"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col cols="2">
                        CS 3345
                        </v-col>
                        <v-col cols="3">
                            Data Structures
                        </v-col>
                        <v-col cols="1.5">
                            003
                        </v-col>
                        <v-col cols="1.5">
                            ECSS 2.415
                        </v-col>
                        <v-col cols="2.5">
                            MW 4:00 PM - 5:15 PM
                        </v-col>
                    </v-row>
                </v-card>
                
                <v-card
                class="rounded-xl mb-2 pa-2"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col cols="2">
                        CS 2340
                        </v-col>
                        <v-col cols="3">
                            Computer Architecture
                        </v-col>
                        <v-col cols="1.5">
                            001
                        </v-col>
                        <v-col cols="1.5">
                            ECSS 2.501
                        </v-col>
                        <v-col cols="2.5">
                            MW 7:00 PM - 8:15 PM
                        </v-col>
                    </v-row>
                </v-card> 
                <v-card
                class="rounded-xl mb-2 pa-2"
                    color="#FFFFFF"
                >
                    <v-row>
                        <v-col cols="2">
                        CS 2336
                        </v-col>
                        <v-col cols="3">
                            Computer Science II
                        </v-col>
                        <v-col cols="1.5">
                            006
                        </v-col>
                        <v-col cols="1.5">
                            ECSW 1.365
                        </v-col>
                        <v-col cols="2.5">
                            TTH 1:00 PM - 2:15 PM
                        </v-col>
                    </v-row>
                </v-card> 

                <v-row justify-center class="mb-0 mt-3"> 
                            <v-btn
                            color="#FFB86F"
                            elevation="2"
                            rounded
                            class="mx-auto"
                            @click="goToAvailableCourses">
                                View Available Classes
                            </v-btn> 
                        </v-row> 
            </v-container>
        </v-card> 
            
        <div class="text-h5 mb-2 mt-15">My Current Schedule</div>
        <v-card
            color="#5C9970"
            class="rounded-xl mb-10"
        >
            <v-container class="spacing-playground pa-5">
                <v-row>
                    <v-col>
                    <v-sheet height="400">
                        <v-calendar
                        ref="calendar"
                        :value="today"
                        :events="events"
                        :today="now"
                        type="week"
                        first-time=07:00
                        last-time=10:00
                        interval-count=15
                        >
                        <template v-slot:day-label-header="{}">{{ " " }}</template>
                        </v-calendar>
                    </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      events: [
        {
          name: 'CS 4384',
          start: '2023-11-27 10:00',
          end: '2023-11-27 11:15',
          color: '#FFB86F'

        },
        {
          name: 'CS 4384',
          start: '2023-11-29 10:00',
          end: '2023-11-29 11:15',
          color: '#FFB86F',
          textcolor: '#000000'

        },
        {
          name: 'CS 4375',
          start: '2023-11-28 16:00',
          end: '2023-11-28 17:15',
          color: '#FFB86F'
        },
        {
          name: 'CS 4375',
          start: '2023-11-30 16:00',
          end: '2023-11-30 17:15',
          color: '#FFB86F'
        },
      ],
    }),

    methods: {
        goToAvailableCourses() {
            this.$router.push({ name: 'AvailableCourses' });
        },
    }
  }
</script>