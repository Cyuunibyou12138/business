import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import typeNav from './components/TypeNav/typenav.vue'
Vue.component('TypeNav', typeNav)
// 导入公共样式
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import './assets/css/all.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

import axios from 'axios'
//axios设置响应拦截器
// 配置请求头信息
//axios设置请求拦截器
axios.interceptors.request.use(config => {
	// 获取token
	var tokenStr = sessionStorage.getItem('token')
	config.headers.token = tokenStr//设置响应头
	return config
}, err => {
	console.log(err)
})
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
