import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import './theme/index.less'
import './assets/css/style.css'
import axios from './plugins/http.js'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
