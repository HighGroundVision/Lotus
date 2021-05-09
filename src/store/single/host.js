import { v4 as uuid } from 'uuid';
import data from '@/data/heroes.json'
import axios from 'axios';

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function* getRandomHero(data, key, size) {
    var collection = data.filter(_ => _.primary_attribute == key);
    var selection = Array.from(Array(collection.length).keys());
    shuffle(selection);
    var selection = selection.slice(0, size);
    for (const i of selection) {
        yield collection[i].id;
    }
}

function createSlots() {
    let slots = [];
    let size = 10;
    let str = getRandomHero(data, "STRENGTH", size);
    let agi = getRandomHero(data, "AGILITY", size);
    let int = getRandomHero(data, "INTELLECT", size);

    for (let i = 0; i < size; i++) {
        let slot = {
            id: uuid(),
            player: {
                id: null,
                name: null
            },
            selection: [
                str.next().value,
                agi.next().value,
                int.next().value
            ],
            choice: null,
        };
        slots.push(slot);
    }

    return slots;
}

export const SingleDraftHostStore = {
    state: () => ({
        id: null,
        slots: [],
    }),
    actions: {
        load({ commit }) {
            let payload = localStorage.getItem('single-draft-host');
            if (payload) {
                commit('load', JSON.parse(payload));
            }
        },
        reset({ commit, dispatch }) {
            let payload = {
                id: null,
                slots: [],
            };
            commit('load', payload);
            dispatch('save');
        },
        save({ state }) {
            var payload = {
                id: state.id,
                slots: state.slots,
            };
            localStorage.setItem('single-draft-host', JSON.stringify(payload));
        },
        create({ commit, dispatch }) {
            commit('create');
            dispatch('save');
        },
        join({ state, commit, dispatch }, { id, name }) {
            let existing = state.slots.find(_ => _.player.id == id);
            let i = state.slots.indexOf(existing);
            if (i === -1) {
                let next = state.slots.filter(_ => _.player.id == null)[0];
                i = state.slots.indexOf(next);
            }

            let slot = state.slots[i];
            if (slot) {
                commit('claim', { i, id, name });
                dispatch('claim', { index: i });
                dispatch('save');
            }
        },
        async claim({ state }, { index }) {
            let url = `${process.env.VUE_APP_BASE_URL}/api/single/${state.id}/claim`;
            var body = {
                slot_id: state.slots[index].id,
                player_id: state.slots[index].player.id,
                selection: state.slots[index].selection,
                choice: state.slots[index].choice,
            };
            await axios.post(url, body);
        },
        async kick({ state }, { index }) {
            let url = `${process.env.VUE_APP_BASE_URL}/api/single/${state.id}/kick`;
            var body = {
                player_id: state.slots[index].player.id,
            };
            await axios.post(url, body);
        },
        async boot({ state, commit, dispatch }, { slot_id }) {
            let slot = state.slots.find(_ => _.id == slot_id);
            let i = state.slots.indexOf(slot);

            await dispatch('kick', { index: i });
            await commit('choice', { i, choice: null });
            await commit('claim', { i, id: null, name: null });
            await dispatch('save');
        },
        selection({ state, commit, dispatch }, { slot_id, choice }) {
            let slot = state.slots.find(_ => _.id == slot_id);
            let i = state.slots.indexOf(slot);
            if (i >= 0) {
                commit('choice', { i, choice });
                dispatch('save');
            }
        },
        async pick({ state, commit, dispatch }, { slot_id, choice }) {
            let slot = state.slots.find(_ => _.id == slot_id);
            let i = state.slots.indexOf(slot);
            if (i >= 0) {
                await commit('choice', { i, choice });
                await dispatch('choice', { index: i });
                await dispatch('save');
            }
        },
        async choice({ state }, { index }) {
            let url = `${process.env.VUE_APP_BASE_URL}/api/single/${state.id}/pick`;
            var body = {
                slot_id: state.slots[index].id,
                choice: state.slots[index].choice
            };
            await axios.post(url, body);
        },
        reorder({ commit, dispatch }, payload) {
            commit('reorder', payload);
            dispatch('save');
        },
    },
    mutations: {
        load(state, payload) {
            state.id = payload.id;
            state.slots = payload.slots;
        },
        create(state) {
            state.id = uuid();
            state.slots = createSlots();
        },
        claim(state, { i, id, name }) {
            state.slots[i].player.id = id;
            state.slots[i].player.name = name;
        },
        choice(state, { i, choice }) {
            state.slots[i].choice = choice;
        },
        reorder(state, { slots }) {
            state.slots = slots;
        }
    }
}