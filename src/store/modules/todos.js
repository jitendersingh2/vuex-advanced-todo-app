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
  },
  async addTodo({ commit }, title) {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ title, completed: false })
    });
    const data = await response.json();

    commit('newTodo', {...data, title });
  },
  async deleteTodo({ commit }, id) {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE'
    });

    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await fetch(
      `${URL}?_limit=${limit}`
    );
    const data = await response.json();

    commit('setTodos', data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id))
};

export default {
  state,
  getters,
  actions,
  mutations
};