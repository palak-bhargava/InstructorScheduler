import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your components
import LoginPage from '@/views/LoginPage.vue';
import AdminLogin from '@/views/AdminLogin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/instructor',
    component: LoginPage,
    name: 'Login',
  },
  {
    path: '/admin',
    component: AdminLogin,
    name: 'AdminLogin',
  },
];

const router = new VueRouter({
  routes,
});

export default router;


// import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/views/LoginPage.vue',
//     component: require('@/views/LoginPage.vue').default,
//     name: 'Login',
//   },
//   {
//     path: '/views/AdminLogin.vue',
//     component: require('@/views/AdminLogin.vue').default,
//     name: 'AdminLogin',
//   },
// ];

// const router = new VueRouter({
//   routes,
// });

// export default router;