import { createStore } from "vuex";
import { SingleDraftHostStore } from "./single/host";
import { SingleDraftPlayerStore } from "./single/player";
import { SingleDraftPersonaStore } from "./single/persona";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        'single-draft': {
            namespaced: true,
            modules: {
                persona: {
                    namespaced: true,
                    ...SingleDraftPersonaStore
                },
                host: {
                    namespaced: true,
                    ...SingleDraftHostStore
                },
                player: {
                    namespaced: true,
                    ...SingleDraftPlayerStore
                }
            }
        }
    }
});