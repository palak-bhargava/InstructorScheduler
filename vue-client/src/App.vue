<template>
  <v-app>
    <v-main>
      <Navbar/>
      <Banner/>
      <Dashboard/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Banner from './components/Banner.vue';
import Dashboard from './views/dashboard.vue';

export default {
  name: 'App',

  components: {
    Navbar,
    Banner,
    Dashboard
  },

  data: () => ({
    //
  }),
};
</script>
