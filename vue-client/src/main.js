import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')