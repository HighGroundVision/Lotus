import { v4 as uuid } from 'uuid';
//import axios from 'axios';

export const SingleDraftPersonaStore = {
    state: () => ({
        id: uuid(),
        persona: null,
    }),
    actions: {
        loadPersona({ commit }) {
            let payload = localStorage.getItem('single-draft-persona');
            if (payload) {
                commit('change', JSON.parse(payload));
            }
        },
        savePersona({ state }) {
            var payload = {
                id: state.id,
                persona: state.persona,
            };
            localStorage.setItem('single-draft-persona', JSON.stringify(payload));
        },
        changePersona({ state, commit, dispatch }, { persona }) {
            commit('change', { id: state.id, persona: persona });
            dispatch('savePersona');
        },
    },
    mutations: {
        change(state, payload) {
            state.id = payload.id;
            state.persona = payload.persona;
        }
    }
}