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
      <div class="text-h5 mt-15 pl-3">My Availibility</div>
      <v-col cols="12">
        <v-card
          class = "pl-4 pa-2 rounded-xl"
          color="#5C9970"
          dark
        >
          insert availibility calendar here<br><br><br>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: ['CS 4348', 'CS 4347', 'CS 4349', 'CS 4375', 'CS 2336', 'CS 2337', 'CS 1336', 'CS 1337', 'CS 3345'],
      values: ['CS 4348'],
      value: null,
    }),
  }
</script>