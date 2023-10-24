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
          Past Schedules
          </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>
  </v-container>
    <br><br><br>

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
        <h2>Spring 2023</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content
        color="#5C9970"
        rounded
      >
        insert calendar here
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <br><br>
  <v-expansion-panels
    dark
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        color="#5C9970"
      >
        <h2>Fall 2022</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content
        color="#5C9970"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <br><br>
  <v-expansion-panels
    dark
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        color="#5C9970"
      >
        <h2>Spring 2022</h2>
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
    name: 'PastSchedules',

    data: () => ({
      
    }),
  }
</script>

<style>
</style>