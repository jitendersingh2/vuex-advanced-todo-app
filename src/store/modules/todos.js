const URL = 'https://jsonplaceholder.typicode.com/todos';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await fetch(URL);
    const data = await response.json();
    
    commit('setTodos', data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos)
};

export default {
  state,
  getters,
  actions,
  mutations
};