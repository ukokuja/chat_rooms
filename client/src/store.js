import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    user: '',
    instance: 0
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setInstance (state, value) {
      state.instance = value
    }
  }
})