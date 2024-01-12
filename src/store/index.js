import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    token: '',
    showReport: false
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    token(state) {
      console.log('token getters = ' + state)
      return state.token
    },
    getReport(state) {
      return state.showReport
    }
  },
  mutations: {
    isLoading (state, newIsLoading) {
      state.isLoading = newIsLoading
    },
    token (state, newToken) {
      console.log('newToken mutations = ' + newToken)
      state.token = newToken
    },
    switchReport(state, newState) {
      state.showReport = newState
    }
  },
  actions: {
  },
  modules: {
  }
})
