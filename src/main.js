import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible';
import Vant from 'vant';
import 'vant/lib/index.css';
import netClient from "./api/index";
import axios from "axios"
import { Lazyload } from 'vant';

Vue.use(Lazyload);

Vue.use(Vant);
Vue.prototype.$axios=axios;
Vue.prototype.$netClient=netClient;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
