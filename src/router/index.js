import { createRouter, createWebHistory } from 'vue-router'
import DocumentaryView from '../views/DocumentaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'documentary',
      component: DocumentaryView,
    },
  ],
})

export default router
