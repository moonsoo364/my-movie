<template>
  <article class="movie--details-wrapper">
    <img
      :src="posterUrl"
      :alt="movie.original_title"
      height="300"
      width="225"
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
/* .movie--details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 300px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
} */
 .movie--details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 300px;
  min-height: 550px; /* 또는 height: 550px; */
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

img {
  object-fit: cover;
  border-radius: 4px;
}

.movie--original-title {
  font-size: 0.9rem;
  color: #555;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 1줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
 .movie--overview {
  font-size: 0.85rem;
  color: #333;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
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
.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 4px;
}

</style>
