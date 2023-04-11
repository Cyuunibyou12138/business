import Vue from 'vue'
import VueRouter from 'vue-router'
import reg from '../components/Register/index.vue'
import login from '../components/Login/index.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/register'},
  {path:'/register',component:reg},
  {path:'/login',component:login},
]

const router = new VueRouter({
	routes
})

export default router
