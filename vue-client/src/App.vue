<template>
  <v-app>
    <v-main>
      <AvailableCourses/>
    </v-main>
  </v-app>
</template>

<script>
import AvailableCourses from './views/AvailableCourses';

export default {
  name: 'App',

  components: {
    AvailableCourses,
  },

  data: () => ({
    //
  }),
};
</script>
