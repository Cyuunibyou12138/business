import Vue from 'vue'
import VueRouter from 'vue-router'
import reg from '../components/Register/index.vue'
import login from '../components/Login/index.vue'
import home from '../components/Home/index.vue'
import search from '../components/search/index.vue'
import detail from '../components/Detail/detail.vue'
import shopcart from '../components/ShopCart/shopcart.vue'
import addcart from '../components/AddCartSuccess/AddCartSuccess.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/home'},
  {path:'/register',component:reg},
  {path:'/login',component:login},
  {path:'/home',component:home},
  {path:'/search/:keyword',name:'search' ,component:search,props:true},
  {path:'/detail/:id',component:detail,props:true},
  {path:'/shopcart',component:shopcart},
  {path:'/addcart',component:addcart},
]

const router = new VueRouter({
	routes
})

export default router
