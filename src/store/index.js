import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersList: [],
    editUser: {
        id: null,
        data: {
          name: "",
          email: "",
        },
    },
  },
  mutations: {
    SET_USERS_LIST(state, users) {
      state.usersList = users
    },
    SET_EDIT_USER(state, users) {
      state.editUser = users
    }
  },
  actions: {
    getUsersList({commit}) {
      axios.get(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/users`)
      .then(resp => commit('SET_USERS_LIST', resp.data)) 
    },
    createUser({dispatch}, user) {
      axios.post(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/users`, user)
      .then(resp => dispatch('getUsersList', resp.data)) 
    },
    deleteUser({dispatch}, id) {
      axios.delete(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/users`, { data: id})
      .then(resp => dispatch('getUsersList', resp.data)) 
    },
    editUser({commit}, user) {
      commit('SET_EDIT_USER', user)
    },
    updateUser({dispatch}, user) {
      axios.put(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/users/${user.id}`, user.data)
      .then(resp => dispatch('getUsersList', resp.data)) 
    }
  },
  modules: {
  }
})
