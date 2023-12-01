<template>
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
          Instructor Scheduler Dashboard
          </v-toolbar-title>
          
          
        </div>

        <v-spacer></v-spacer>
      </v-app-bar>

    
  </v-container>
</template>

<script>
  export default {
    name: 'Navbar',
    data: () => ({
    
    }),
  }
</script>

<style>
.navbar-title {
  left: 50%;
}

</style>