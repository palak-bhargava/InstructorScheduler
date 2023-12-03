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
    >
    <v-expansion-panel
        rounded
    >
      <v-expansion-panel-header
        color="#5C9970"
        rounded
      >
        <h3>Anjum Chida</h3>
        <v-btn
          color="#FFB86F"
          elevation="2"
          rounded
          light
          style="max-width: 230px;"
        >
          Generate Schedule
        </v-btn> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </v-expansion-panel-header>
      <v-expansion-panel-content
        color="#5C9970"
        rounded
      >
      <br>
      <v-row>
        <v-col 
          cols="9" 
          class="spacing-playground pa-0"
        >
          <v-card
            class="mx-auto"
            color="#ffffff"
            light
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h7">
                  <b>CS3345 Data Structures</b> 
                </v-list-item-title>
                <v-list-item-subtitle>
                Monday, Wednesday | 1:00 PM - 2:15 PM
                </v-list-item-subtitle>
                <br>
                <v-list-item-title class="text-h7">
                  <b>CS2336 Computer Science II</b> 
                </v-list-item-title>
                <v-list-item-subtitle>
                Monday, Wednesday | 2:00 PM - 3:15 PM
                </v-list-item-subtitle>
                <br>
                <v-list-item-title class="text-h7">
                  <b>CS4485 Automata Theory</b> 
                </v-list-item-title>
                <v-list-item-subtitle>
                Tuesday, Thursday | 1:00 PM - 2:15 PM
                </v-list-item-subtitle>
                <br>
                <v-list-item-title class="text-h7">
                  <b>CS3349 Advanced Algorithms</b> 
                </v-list-item-title>
                <v-list-item-subtitle>
                Tuesday, Thursday | 8:00 PM - 9:15 PM
                </v-list-item-subtitle>
                <br>
              </v-list-item-content>
            </v-list-item>
            </v-card>
          </v-col>

          <v-col 
            cols="3"
            class="spacing-playground pa-0"
          >
            <v-card
              color="#5C9970"
              light
              outlined
            >
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
                >
                  Yes 
                </v-btn> 
                <v-btn
                  color="#FFB86F"
                  elevation="2"
                  rounded
                  light
                  class="mb-1 ml-4"
                >
                  No
                </v-btn> 
              </v-card-actions>
            </v-card>
          </v-col>
         </v-row> 
        <br>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <br>
  <v-expansion-panels
    dark
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        color="#5C9970"
        rounded
      >
        <h3>John Cole</h3>
        <v-btn
          color="#FFB86F"
          elevation="2"
          rounded
          light
          style="max-width: 230px;"
        >
          Generate Schedule
        </v-btn> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </v-expansion-panel-header>
      <v-expansion-panel-content
        color="#5C9970"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <br>
  <v-expansion-panels
    dark
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        color="#5C9970"
        rounded
      >
        <h3>Karen Mazidi</h3>
        <v-btn
          color="#FFB86F"
          elevation="2"
          rounded
          light
          style="max-width: 230px;"
        >
          Generate Schedule
        </v-btn> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </v-expansion-panel-header>
      <v-expansion-panel-content
        color="#5C9970"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  
  </v-container>
</template>

<script>

  export default {
    name: 'AdminView',

    data: () => ({
      
    }),
  }
</script>

<style>
</style>