<template>
  <v-app>
    <v-main>
      <AdminLogin/>
    </v-main>
  </v-app>
</template>

<script>
import AdminLogin from './views/AdminLogin';

export default {
  name: 'App',

  components: {
    AdminLogin,
  },

  data: () => ({
    //
  }),
};
</script>
