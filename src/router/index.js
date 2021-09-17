import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/Index.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "faq" */ '../views/Faq/Index.vue'),
  },
  {
    path: '/hc',
    name: 'host-choice',
    component: () => import(/* webpackChunkName: "hc" */ '../views/HC/Index.vue'),
  },
  {
    path: '/bd',
    name: 'balanced-draft',
    component: () => import(/* webpackChunkName: "bd" */ '../views/BD/Index.vue'),
  },
  {
    path: '/sd',
    name: 'single-draft',
    component: () => import(/* webpackChunkName: "sd" */ '../views/SD/Index.vue'),
  },
  {
    path: '/sd/lobby/:matchID',
    name: 'single-draft-lobby',
    component: () => import(/* webpackChunkName: "sd" */ '../views/SD/Lobby.vue'),
  },
  {
    path: '/sd/game/:matchID',
    name: 'single-draft-game',
    component: () => import(/* webpackChunkName: "sd" */ '../views/SD/Game.vue'),
  },
  {
    path: '/ap',
    name: 'all-pick',
    component: () => import(/* webpackChunkName: "ap" */ '../views/AP/Index.vue'),
  },
  {
    path: '/ap/lobby/:matchID',
    name: 'all-pick-lobby',
    component: () => import(/* webpackChunkName: "ap" */ '../views/AP/Lobby.vue'),
  },
  {
    path: '/ap/game/:matchID',
    name: 'all-pick-game',
    component: () => import(/* webpackChunkName: "ap" */ '../views/AP/Game.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(/*to, from, savedPosition*/) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
