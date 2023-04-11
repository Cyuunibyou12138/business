import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'
//axios设置响应拦截器
axios.interceptors.response.use(
	response => {
		return response.data //拦截处理响应结果，直接返回需要的数据
	},
	err => {
		console.log(err)
	}
)
Vue.prototype.axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
