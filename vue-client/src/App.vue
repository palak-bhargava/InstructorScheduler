<template>
  <v-app>
    <v-main>
      <AdminView/>
    </v-main>
  </v-app>
</template>

<script>
import AdminView from './views/AdminView';

export default {
  name: 'App',

  components: {
    AdminView,
  },

  data: () => ({
    //
  }),
};
</script>
