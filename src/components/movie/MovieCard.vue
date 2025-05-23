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
    <div class="movie--genres">
  <span
    v-for="(genre, index) in genreTags"
    :key="index"
    class="movie--genre-tag"
    :style="{ backgroundColor: genre.color }"
  >
    {{ genre.name }}
  </span>
</div>
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
import { genreMap } from '@/api/tmdb/types/movieGenre' // ✅ 실제 값 import
import type { PropType } from 'vue'
import { IMG_INIT_URL } from '@/api/tmdb/consts/tmdbConsts'

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

// 장르명 + 색상 정보를 포함하는 배열 생성
const genreTags = computed(() => {
  return props.movie.genre_ids.map(id => {
    const genre = genreMap[id]
    return genre ? genre : { name: 'Unknown', color: '#bdc3c7' }
  })
})

</script>

<style scoped>
.movie--genre-tag {
  display: inline-block;
  color: white;
  padding: 0.2em 0.6em;
  margin: 0.2em;
  border-radius: 0.5em;
  font-size: 0.8em;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  opacity: 0.85;
  transition: opacity 0.3s ease;
}
.movie--genre-tag:hover {
  opacity: 1;
}
 .movie--details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* 조금 더 여유 있게 */
  align-items: center;
  width: 100%;
  max-width: 300px;
  min-height: 550px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}
.movie--details-wrapper:hover {
  background-color: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
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
  line-height: 1.4;
  color: #333;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
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
    border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

</style>
