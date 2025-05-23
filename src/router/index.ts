import { createRouter, createWebHistory } from 'vue-router'
import MovieView from '@/views/MovieView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieView,
    },
    {
      path: '/movie/detail',
      name: 'movie-detail',
      component: MovieDetailView,
    },
  ],
})

export default router
