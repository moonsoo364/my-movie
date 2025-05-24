<script setup lang="ts">
import { useMovieStore } from '@/stores/movie';
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import {type MovieSearchQuery} from '@/api/tmdb/types/query/queryMovie'
import { TMDB_IMAGE_SIZES } from '@/api/tmdb/consts/tmdbConsts'
import MovieCard from '@/components/movie/MovieCard.vue'
const imageSize = ref(TMDB_IMAGE_SIZES.poster[4])
const imageSizes = TMDB_IMAGE_SIZES.poster
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const { movies, total_pages, total_results} = storeToRefs(movieStore)

//컴포넌트 메서드로 래핑
const fetchMovies = async (query: MovieSearchQuery) => {
  await movieStore.fetchMovies(query)
}


const movieNm = ref<string>(route.query.movieTitle as string || '미션 임파서블')

const createMovieQuery = (): MovieSearchQuery => ({
  query: movieNm.value || '',
  include_adult: false,
  language: 'ko-KR',
  page: 1
})

const currentPage =  ref(parseInt(route.query.page as string) || 0)
const moviesPerPage = 10


const totalPages = computed(() => total_pages.value || 0)
const totalResults = computed(() => total_results.value || 0)
const paginatedMovies = computed(() => {
  const start = currentPage.value * moviesPerPage
  return movies.value.slice(start, start + moviesPerPage)
})
const isPrevDisabled = computed(() => currentPage.value === 0)
const isNextDisabled = computed(() => (currentPage.value + 1)*moviesPerPage >= movies.value.length)

const updateRoute = () => {
  router.push({
    query: {
      movieTitle: movieNm.value,
      page: currentPage.value.toString()
    }
  })
}
const handleSearch = () => {
  currentPage.value = 0 // 검색 시 첫 페이지로 초기화
  updateRoute()
  fetchMovies(createMovieQuery())
}

const goNext = () => {
  if ((currentPage.value + 1) * moviesPerPage < movies.value.length) {
    currentPage.value++
    updateRoute()
  }
}

const goPrev = () => {
  if (currentPage.value > 0) {
    currentPage.value--
    updateRoute()
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
        @keyup.enter="handleSearch"
      >
      <button class="movie-button" @click="handleSearch">검색</button>
    </div>
    <div class="size-controls">
      <label for="poster-size">포스터 해상도</label>
      <select id="poster-size" v-model="imageSize" class="poster-select">
        <option v-for="size in imageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <div class="pagination-controls">
      <div class="page-info">
        <span>현재 페이지: {{ currentPage + 1 }} / {{ Math.ceil(movies.length / moviesPerPage) }}</span>
        <span>전체 결과: {{ totalResults }}개</span>
      </div>
      <div class="pagination-buttons">
        <button class="slide-btn" @click="goPrev" v-show="isPrevDisabled">&lt;&lt;</button>
        <button class="slide-btn" @click="goPrev" :disabled="isPrevDisabled">&lt;</button>
        <button class="slide-btn" @click="goNext" :disabled="isNextDisabled">&gt;</button>
        <button class="slide-btn" @click="goNext" v-show="isNextDisabled">&gt;&gt;</button>
      </div>
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
.pagination-controls {
  margin-top: 2rem;
  display: flex;
  flex-direction: column; /* 행으로 분리 */
  align-items: center;
  gap: 0.8rem;
}


.page-info {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  font-size: 0.95rem;
  margin-right: 1rem;
  color: #555;
}

.page-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
}

.pagination-buttons {
  display: flex;
  gap: 1rem;
}

.movie-main {
  padding: 2rem;
  background-color: #f4f6f8;
  color: #1e2a38;
  font-family: 'Noto Sans', sans-serif;
}

.movie-title {
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Noto Sans', sans-serif;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1e2a38;
  width: 80%;
  max-width: 80%; /* 기본적으로 꽉 차게 */
}
/* PC 이상 화면에서 */
@media (min-width: 768px) {
  .movie-input {
    max-width: 400px; /* 최대 너비 지정 */
  }
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Noto Sans', sans-serif;
  font-size: 1rem;
}

.movie-card-wrap {
  margin-top: 2rem;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  justify-content: center;
}
.slide-btn {
  padding: 0.3rem 0.8rem; /* 버튼 크기 줄임 */
  font-size: 1.2rem;       /* 폰트 크기 감소 */
  margin: 0 0.3rem;        /* 버튼 간 간격 축소 */
  background-color: #ffffff;
  color: #3b5998;
  border: 1px solid #ccc;
  border-radius: 4px;      /* 둥근 정도도 살짝 줄임 */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.slide-btn:hover {
  background-color: #e1ecf4;
}

.slide-btn:disabled {
  opacity: 0.4;            /* 비활성화된 버튼 더 희미하게 */
  cursor: not-allowed;
}

/* ✅ disabled 상태일 때 hover 효과 제거 */
.slide-btn:disabled:hover {
  background-color: #ffffff; /* 기본 배경색으로 고정 */
}
</style>
