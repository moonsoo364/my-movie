<script setup lang="ts">
import { useMovieStore } from '@/stores/movie';
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import {type MovieSearchQuery} from '@/api/tmdb/types/queryMovie'
import { TMDB_IMAGE_SIZES } from '@/api/tmdb/consts/tmdbConsts'
import MovieCard from '@/components/movie/MovieCard.vue'
const imageSize = ref(TMDB_IMAGE_SIZES.poster[4])
const imageSizes = TMDB_IMAGE_SIZES.poster

const movieNm = ref<string>()
movieNm.value = '미션 임파서블'

const movieStore = useMovieStore()
const {movies} = storeToRefs(movieStore)

//컴포넌트 메서드로 래핑
const fetchMovies = async (query: MovieSearchQuery) => {
  await movieStore.fetchMovies(query)
}


const createMovieQuery = (): MovieSearchQuery => ({
  query: movieNm.value || '',
  include_adult: false,
  language: 'ko-KR',
  page: 1
})

const currentPage = ref(0)
const moviesPerPage = 4
const paginatedMovies = computed(() => {
  const start = currentPage.value * moviesPerPage
  return movies.value.slice(start, start + moviesPerPage)
})

const goNext = () => {
  if ((currentPage.value + 1) * moviesPerPage < movies.value.length) {
    currentPage.value++
  }
}

const goPrev = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

onBeforeMount(() => {
  fetchMovies(createMovieQuery())
})

</script>

<template>
  <main class="movie-main">
    <h2 class="movie-title">영화 목록</h2>
    <div class="search-controls">
      <input
        v-model="movieNm"
        type="text"
        class="movie-input"
        placeholder="영화 제목을 입력해주세요"
        @keyup.enter="fetchMovies(createMovieQuery())"
      >
      <button class="movie-button" @click="fetchMovies(createMovieQuery())">검색</button>
    </div>
    <div class="size-controls">
      <label for="poster-size">포스터 해상도:</label>
      <select id="poster-size" v-model="imageSize" class="poster-select">
        <option v-for="size in imageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
        <div class="pagination-controls">
      <button class="slide-btn" @click="goPrev">&lt;</button>
      <button class="slide-btn" @click="goNext">&gt;</button>
    </div>
    <div class="movie-card-wrap">
      <ul class="movie-list">
        <li v-for="movie in paginatedMovies" :key="movie.id">
          <MovieCard :movie="movie" :image-size="imageSize"/>
        </li>
      </ul>
    </div> 

  </main>
</template>


<style scoped>
.movie-main {
  padding: 2rem;
  background-color: #f4f6f8;
  color: #1e2a38;
  font-family: 'Segoe UI', sans-serif;
}

.movie-title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #1e2a38;
}

.search-controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.movie-input {
  flex: 1;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1e2a38;
}

.movie-input::placeholder {
  color: #999;
}

.movie-button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.movie-button:hover {
  background-color: #2d4373;
}

.size-controls {
  margin-bottom: 1rem;
}

.poster-select {
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #ffffff;
  color: #1e2a38;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-left: 0.5rem;
}

.movie-card-wrap {
  margin-top: 2rem;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
}

.pagination-controls {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-btn {
  padding: 0.5rem 1.2rem;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  background-color: #ffffff;
  color: #3b5998;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.slide-btn:hover {
  background-color: #e1ecf4;
}
</style>
