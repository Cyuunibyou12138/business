import Vue from 'vue'
import VueRouter from 'vue-router'
import reg from '../components/Register/index.vue'
import login from '../components/Login/index.vue'
import home from '../components/Home/index.vue'
import search from '../components/search/index.vue'
import detail from '../components/Detail/detail.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/home'},
  {path:'/register',component:reg},
  {path:'/login',component:login},
  {path:'/home',component:home},
  {path:'/search/:keyword',component:search,props:true},
  {path:'/detail/:id',component:detail,props:true},
]

const router = new VueRouter({
	routes
})

export default router
