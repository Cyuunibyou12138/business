import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url:'',
    token:sessionStorage.getItem('token')
  },
  getters: {
    nickName(state) {
      if (sessionStorage.getItem('token')) {
        return sessionStorage.getItem('name')
      }
      return ''
    }
  },
  mutations: {
    changeFlag(state,isTrue){
      state.flag=isTrue
      console.log(state.flag)
    },
    changeImg(state,url){
      state.url=url
    },
    gettoken(state, value) {
      state.token = value
    }
  },
  actions: {
  },
  modules: { 
  }
})
