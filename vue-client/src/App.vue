<template>
  <v-app>
    <v-main>
      <router-view>
        <LoginPage/>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import LoginPage from './views/LoginPage';

export default {
  name: 'App',

  components: {
    LoginPage,
  },

  data: () => ({
    //
  }),
};
</script>
