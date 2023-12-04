<template>
  <v-app>
    <v-main>
      <preferences/>
    </v-main>
  </v-app>
</template>

<script>
import preferences from './views/preferences';

export default {
  name: 'App',

  components: {
    preferences,
  },

  data: () => ({
    //
  }),
};
</script>
