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
const moviesPerPage = 3
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
  <main>
    <h2>영화 목록</h2>
    <div>
      <input
      v-model="movieNm"
      type="text"
      placeholder="영화 제목을 입력해주세요"
      @keyup.enter="fetchMovies(createMovieQuery())"
    >
    <button @click="fetchMovies(createMovieQuery())">검색</button>
    </div>
    <div>
      <label for="poster-size">포스터 사이즈:</label>
      <select id="poster-size" v-model="imageSize">
        <option v-for="size in imageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <div class="movie-card-wrap">
      <ul class="movie-list">
        <li v-for="movie in paginatedMovies" :key="movie.id">
          <MovieCard :movie="movie" :image-size="imageSize"/>
        </li>
      </ul>
    </div> 

    <div class="pagination-controls">
      <button class="slide-btn" @click="goPrev">&lt;</button>
      <button class="slide-btn" @click="goNext">&gt;</button>
    </div>
  </main>
</template>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(3, 0fr);
  justify-content: center; /* 그리드 전체를 가운데 정렬 */
  gap: 1rem;
  padding: 0;
  list-style: none;
  
}

.slide-btn {
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
}

.slide-btn:hover {
  background-color: #f0f0f0;
}
</style>