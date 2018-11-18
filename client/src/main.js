import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Homepage from './components/Homepage.vue'
import chat from './components/chat.vue'

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
