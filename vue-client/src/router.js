import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your components
import LoginPage from '@/views/LoginPage.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import Dashboard from '@/views/dashboard.vue';
import AvailableCourses from '@/views/AvailableCourses.vue';
import PastSchedules from '@/views/PastSchedules.vue';
import AdminView from '@/views/AdminView.vue';

Vue.use(VueRouter);

const routes = [

    {
    path: '/',
    component: LoginPage,
    name: 'Login',
  },
  {
    path: '/admin-login',
    component: AdminLogin,
    name: 'AdminLogin',
  },
  {
    path:'/dashboard',
    component: Dashboard,
    name: 'Dashboard',
  },
  {
    path: '/available-courses',
    component: AvailableCourses,
    name: 'AvailableCourses',
  },
  {
    path: '/past-schedules',
    component: PastSchedules,
    name: 'PastSchedules',
  },
  {
    path: '/admin-view',
    component: AdminView,
    name: 'AdminView',
  },
];

const router = new VueRouter({
  routes,
});

export default router;