import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/host-choice",
        name: "HostChoice",
        component: () =>
            import ( /* webpackChunkName: "choice" */ "../views/HostChoice.vue")
    },
    {
        path: "/balanced-draft",
        name: "BalancedDraft",
        component: () =>
            import ( /* webpackChunkName: "balanced" */ "../views/BalancedDraft.vue")
    },
    {
        path: "/single-draft",
        name: "SingleDraft",
        component: () =>
            import ( /* webpackChunkName: "single" */ "../views/single/Index.vue")
    },
    {
        path: "/single-draft/player/:id",
        name: "SingleDraftPlayer",
        component: () =>
            import ( /* webpackChunkName: "single" */ "../views/single/Player.vue")
    },
    {
        path: "/single-draft/host",
        name: "SingleDraftHost",
        component: () =>
            import ( /* webpackChunkName: "single" */ "../views/single/Host.vue")
    },
    {
        path: "/captains-draft",
        name: "CaptainIndex",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/captains/Index.vue")
    },
    {
        path: "/captains-draft/host/:id",
        name: "CaptainLobby",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/captains/Host.vue")
    },
    {
        path: "/captains-draft/lobby/:id/:team",
        name: "CaptainDraft",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/captains/Lobby.vue")
    }

   
];

// route level code-splitting
// this generates a separate chunk (*.[hash].js) for this route
// which is lazy-loaded when the route is visited.

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;