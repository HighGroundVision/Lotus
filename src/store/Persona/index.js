export const Persona = {
  namespaced: true,
  state: () => {
    let data = {
      name: localStorage.getItem('persona'),
    }
    return data
  },
  mutations: {
    setName(state, name) {
      state.name = name
      localStorage.setItem('persona', name)
    },
  },
  actions: {
    getName({ commit, state }) {
      if (state.name) {
        return state.name
      } else {
        let name = prompt('Please enter your Persona', state.name ?? '')
        commit('setName', name)
        return name
      }
    },
  },
  getters: {},
}
