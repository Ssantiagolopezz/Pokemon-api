import { createRouter, createWebHistory } from 'vue-router'
import PokedexList from '../views/PokedexList.vue'
import EquipoView from '../views/EquipoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/EquipoView',
      name: 'EquipoView',
      component: EquipoView,
    },
    {
      path: '/PokedexList',
      name: 'PokedexList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PokedexList.vue'),
    },
  ],
})

export default router
