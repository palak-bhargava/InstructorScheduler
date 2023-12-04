import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your components
import LoginPage from '@/views/LoginPage.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import Dashboard from '@/views/dashboard.vue';
import AvailableCourses from '@/views/AvailableCourses.vue';

Vue.use(VueRouter);

const routes = [

    {
    path: '/',
    component: LoginPage,
    name: 'Login',
  },
  {
    path: '/admin',
    component: AdminLogin,
    name: 'AdminLogin',
  },
  {
    path:'/dashboard',
    component: Dashboard,
    name: 'Dashboard',
  },
  {
    path: '/availablecourses',
    component: AvailableCourses,
    name: 'AvailableCourses',
  },
];

const router = new VueRouter({
  routes,
});

export default router;