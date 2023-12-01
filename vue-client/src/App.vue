<template>
  <v-app>
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
          My Preferences
          </v-toolbar-title>
          
          
        </div>

        <v-spacer></v-spacer>
      </v-app-bar>
    <v-main>
      <MyPreferences>

      </MyPreferences>
    </v-main>
  </v-app>
</template>

<script>
import MyPreferences from './views/preferences.vue';

export default {
  name: 'App',

  components: {
    MyPreferences,
  },

  data: () => ({
    //
  }),
};
</script>
