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
            import ( /* webpackChunkName: "single" */ "../views/SingleDraft.vue")
    },
    {
        path: "/elimination",
        name: "EliminationCreate",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/elimination/Create.vue")
    },
    {
        path: "/elimination/:id/series",
        name: "EliminationSeries",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/elimination/Series.vue")
    },
    {
        path: "/elimination/:id/lobby/:match/:team",
        name: "EliminationLobby",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/elimination/Lobby.vue")
    },
    {
        path: "/elimination/:id/match/:match",
        name: "EliminationMatch",
        component: () =>
            import ( /* webpackChunkName: "elimination" */ "../views/elimination/Match.vue")
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