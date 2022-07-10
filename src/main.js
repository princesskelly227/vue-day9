import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import '@/assets/mobile/flexible.js'
import '@/assets/styles/reset.css'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import router from '@/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
