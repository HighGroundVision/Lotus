import { v4 as uuid } from 'uuid';
import axios from 'axios';

export const SingleDraftPlayerStore = {
    state: () => ({
        lobby_id: null,
        player_id: null,
        player_name: "",
        slot_id: null,
        selections: [],
        choice: null,
    }),
    actions: {
        async connect({ commit, dispatch }, payload) {
            await commit('join', payload);
            await dispatch('join');
        },
        async join({ state }) {
            let url = `${process.env.VUE_APP_BASE_URL}/api/single/${state.lobby_id}/join`;
            var body = {
                player_id: state.player_id,
                player_name: state.player_name
            };
            await axios.post(url, body);
        },
        async claim({ commit }, payload) {
            await commit('claim', payload);
        },
        async playerSelection({ commit, dispatch }, payload) {
            await commit('choice', payload);
            await dispatch('choice');
        },
        async hostSelection({ commit }, payload) {
            await commit('choice', payload);
        },
        async choice({ state }) {
            let url = `${process.env.VUE_APP_BASE_URL}/api/single/${state.lobby_id}/choice`;
            var body = {
                slot_id: state.slot_id,
                choice: state.choice
            };
            await axios.post(url, body);
        },
        async kick({ commit }) {
            let payload = {
                lobby_id: null,
                player_id: null,
                player_name: null,
                slot_id: null,
                selections: [],
                choice: null,
            };
            await commit('load', payload);
        }
    },
    mutations: {
        load(state, payload) {
            state.lobby_id = payload.lobby_id;
            state.player_id = payload.player_id;
            state.player_name = payload.player_name;
            state.slot_id = payload.slot_id;
            state.selections = payload.selections;
            state.choice = payload.choice;
        },
        join(state, { lobby_id, player_id, player_name }) {
            state.lobby_id = lobby_id;
            state.player_id = player_id;
            state.player_name = player_name;
            state.slot_id = null;
            state.selections = [];
            state.choice = null;
        },
        claim(state, { slot_id, selection, choice }) {
            state.slot_id = slot_id;
            state.selections = selection;
            state.choice = choice;
        },
        choice(state, { choice }) {
            state.choice = choice;
        }
    }
}