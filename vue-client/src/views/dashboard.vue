<template>
  
    <v-container>
        
        <v-row class="mt-5">
            <v-col>
            <div class="text-h5 mb-5">My Preferences</div>
               <v-card
                    color="#5C9970"
                    class="rounded-xl"> 
                    
                    <v-row> 
                        <v-col>
                            <v-card>
                            <v-container>
                                <div class="subtitle-1 font-weight-bold">Preferred Courses</div>
                                <v-card>
                                CS 4384<br>CS4875
                                </v-card>
                            </v-container>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                            <v-container>
                                <div class="subtitle-1 font-weight-bold">Time Frames</div>
                            </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            
            <v-col>
                <div class="text-h5 mb-2">Past Schedules</div>
                <v-card
                color="#5C9970"
                class="rounded-xl">  
                    <v-container>
                        <v-card
                            class = "mb-2 pa-2 rounded-xl text-decoration-underline"
                            color="#FFFFFF">
                            Fall 2023
                        </v-card>
                        
                        <v-card
                            class = "mb-2 pa-2 rounded-xl text-decoration-underline"
                            color="#FFFFFF">
                            Spring 2022
                        </v-card>

                        <v-card
                            class = "pa-2 rounded-xl text-decoration-underline"
                            color="#FFFFFF">
                            Fall 2022
                        </v-card>
                    </v-container>
                </v-card> 
            </v-col>
        </v-row>

        <v-row>
            Available Courses
        </v-row>
            
        <v-row>
            My Course Schedule
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
