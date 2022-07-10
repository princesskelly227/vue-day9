import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'

// 全部引入want组件
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);



Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
