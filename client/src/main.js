import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Homepage from './components/Homepage.vue'
import chat from './components/chat.vue'
import { VueSpinners } from '@saeris/vue-spinners'

Vue.use(VueSpinners)

import vueResource from 'vue-resource';

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Homepage },
  { path: '/chat', component: chat }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(vueResource)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
