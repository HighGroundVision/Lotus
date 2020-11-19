import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/host",
        name: "Host",
        // route level code-splitting
        // this generates a separate chunk (admin.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "choice" */ "../views/HostChoice.vue")
    },
    {
        path: "/balanced",
        name: "Balanced",
        // route level code-splitting
        // this generates a separate chunk (balanced.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "balanced" */ "../views/BalancedDraft.vue")
    },
    {
        path: "/main",
        name: "Main",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "main" */ "../views/Main.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;