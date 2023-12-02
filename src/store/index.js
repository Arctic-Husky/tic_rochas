import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuColor: true
  },
  getters: {
    getMenuColor(state) {
      return state.menuColor
    }
  },
  mutations: {
    SET_MENU_COLOR(state, payload) {
      state.menuColor = payload
    }
  },
  actions: {
    SET_MENU_COLOR(context, payload) {
      context.commit('SET_MENU_COLOR', payload)
    }
  },

})
