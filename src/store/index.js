import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag:false
  },
  getters: {
    nickName(state) {
      if (state.flag) {
        return sessionStorage.getItem('name')
      }
      return ''
    }
  },
  mutations: {
    changeFlag(state){

      state.flag=!state.flag
      console.log(state.flag)
    }
  },
  actions: {
  },
  modules: { 
  }
})
