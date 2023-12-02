import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/views/LoginPage.vue',
      component: require('@/views/LoginPage.vue').default,
      name: 'Login',
    },
    {
      path: '/views/AdminLogin.vue',
      component: require('@/views/AdminLogin.vue').default,
      name: 'AdminLogin',
    },
  ],
});

export default router;