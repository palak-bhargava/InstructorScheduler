import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your components
import LoginPage from '@/views/LoginPage.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import Dashboard from '@/views/dashboard.vue';
import AvailableCourses from '@/views/AvailableCourses.vue';
import PastSchedules from '@/views/PastSchedules.vue';
import AdminView from '@/views/AdminView.vue';
import Preferences from '@/views/preferences.vue';

Vue.use(VueRouter);

const routes = [

    {
    path: '/',
    component: LoginPage,
    name: 'Login',
    props: true,
  },
  {
    path: '/admin-login',
    component: AdminLogin,
    name: 'AdminLogin',
    props: true,
  },
  {
    path:'/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    props: true,
  },
  {
    path: '/available-courses',
    component: AvailableCourses,
    name: 'AvailableCourses',
    props: true,
  },
  {
    path: '/past-schedules',
    component: PastSchedules,
    name: 'PastSchedules',
    props: true,
  },
  {
    path: '/admin-view',
    component: AdminView,
    name: 'AdminView',
    props: true,
  },
  {
    path: '/my-preferences',
    component: Preferences,
    name: 'Preferences',
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;