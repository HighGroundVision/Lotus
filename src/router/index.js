import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/Index.vue'),
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import(/* webpackChunkName: "faq" */ '../views/Faq/Index.vue'),
  },
  {
    path: '/hc',
    name: 'HC',
    component: () => import(/* webpackChunkName: "hc" */ '../views/HC/Index.vue'),
  },
  {
    path: '/bd',
    name: 'BD',
    component: () => import(/* webpackChunkName: "bd" */ '../views/BD/Index.vue'),
  },
  {
    path: '/sd',
    name: 'SD Lobby',
    component: () => import(/* webpackChunkName: "sd" */ '../views/SD/Index.vue'),
  },
  {
    path: '/sd/draft',
    name: 'SD Draft',
    component: () => import(/* webpackChunkName: "sd" */ '../views/SD/Draft.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
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
