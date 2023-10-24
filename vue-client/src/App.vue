<template>
  <v-app>
    <v-container>
    <v-app-bar
        app
        color="f5f5f5"
      >
        <div class="d-flex align-center justify-center" style="width: 100%">
          <v-img

            class="shrink mr-2"
            contain
            :src="require('./assets/IS-logo.png')"
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

    <br><br>
      <v-banner
      lines="one"
      color="#FFB86F"
      >
      <v-banner-text
      class="ml-15"
      >
        New to Instructor Scheduler? Watch this video tutorial to get started
      </v-banner-text>

        <template v-slot:actions>
          <v-btn
          class="mr-15 mb-1"
          >Tutorial Video</v-btn>
        </template>
      </v-banner>

    <v-main>
      <Dashboard/>
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from './views/dashboard.vue';

export default {
  name: 'App',

  components: {
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
