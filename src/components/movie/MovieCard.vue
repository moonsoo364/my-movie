<template>
  <article class="movie--details-wrapper">
    <img
      :src="posterUrl"
      :alt="movie.original_title"
      height="400"
      width="300"
    />
    <p>{{ movie.title }}</p>
    <p class="movie--original-title">{{ movie.original_title }}</p>
    <p class="movie--overview">{{ movie.overview }}</p>
    <div class="movie--meta">
      <span>평점: {{ movie.vote_average }} / 10</span>
      <span>개봉일: {{ movie.release_date }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/api/tmdb/types/movie'
import type { PropType } from 'vue'
import { IMG_INIT_URL, TMDB_IMAGE_SIZES } from '@/api/tmdb/consts/tmdbConsts'

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>,
    required: true,
  },
    imageSize: {
    type: String,
    required: true,
  },
})

const posterUrl = computed(() => {
  return IMG_INIT_URL + props.imageSize + props.movie.poster_path
})
</script>

<style scoped>
.movie--details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 300px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
}

img {
  object-fit: cover;
  border-radius: 4px;
}

.movie--original-title {
  font-size: 0.9rem;
  color: #555;
}

.movie--overview {
  font-size: 0.85rem;
  color: #333;
  text-align: center;
}

.movie--meta {
  font-size: 0.8rem;
  color: #777;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
