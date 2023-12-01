<template>
  <v-app>
    <v-main>
      <MyPreferences/>
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
