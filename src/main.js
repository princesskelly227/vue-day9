import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
import '@/mobile/flexible.js'
import router from '@/router'
import { Tabbar, TabbarItem, NavBar, Grid, GridItem, Cell, Col, Row, Image as VanImage, Icon, Search, List} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Icon)
Vue.use(Search);
Vue.use(List);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
