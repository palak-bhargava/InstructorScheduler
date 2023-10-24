<template>
    <v-container class="mt-15">
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
                        </v-btn> 
                        <v-btn
                        color="white"
                        elevation="2"
                        rounded
                        block
                        outlined
                        >
                            Fall 2022
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
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    Class #
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    Course Name 
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    Section
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    Location
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    Days & Time
                </v-card>
                <v-btn
                    color="#FFFFFF"
                    elevation="2"
                    rounded
                    block
                    outlined
                    class="mb-2"
                >
                    class info
                </v-btn>
                
                <v-btn
                    color="white"
                    elevation="2"
                    rounded
                    block
                    outlined
                    class="mb-2"
                >
                    class info
                </v-btn> 
                <v-btn
                    color="white"
                    elevation="2"
                    rounded
                    block
                    outlined
                >
                    class info
                </v-btn> 
            </v-container>
        </v-card> 
            
        <v-row>
            <v-card
            color="#5C9970"
            class="rounded-xl">
            </v-card>
        </v-row> 
    </v-container>
</template>

<script>
export default {
  methods: {},
};
</script>
