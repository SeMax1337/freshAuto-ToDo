import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: null
  },
  mutations: {
    SET_ALL_TODOS(state, data) {
      state.todos = data
    },
    ADD_TODO(state, data) {
      state.todos.push(data)
    },
  },
  actions: {
    getTodos({ commit }) {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        commit('SET_ALL_TODOS', json.slice(0, 5));
      })
    },
    addNewTodo({ commit }, params) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => commit('ADD_TODO', json));
    }
  },
  getters: {
    GET_TODOS: state => {
      return state.todos;
    },
  },
  modules: {
  }
})
