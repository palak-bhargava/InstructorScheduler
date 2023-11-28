<template>
  <v-app>
    <v-main>
      <PastSchedules/>
    </v-main>
  </v-app>
</template>

<script>
import PastSchedules from './views/PastSchedules';

export default {
  name: 'App',

  components: {
    PastSchedules,
  },

  data: () => ({
    //
  }),
};
</script>
