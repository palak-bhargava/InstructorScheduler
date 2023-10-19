<template>
  <v-app>
    <v-main>
      <Navbar/>
      <Banner/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Banner from './components/Banner';

export default {
  name: 'App',

  components: {
    Navbar, Banner
  },

  data: () => ({
    //
  }),
};
</script>
