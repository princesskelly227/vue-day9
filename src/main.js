import Vue from 'vue'
import App from './App.vue'
import "@/assets/styles/reset.css";
import "@/assets/mobile/flexible.js";
import Vant from 'vant';
import 'vant/lib/index.css';
import router from '@/router'


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
