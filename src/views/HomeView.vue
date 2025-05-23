<script setup lang="ts">
import {IMG_INIT_URL,TMDB_IMAGE_SIZES} from '@/api/tmdb/consts/tmdbConsts'
import { useMovieStore } from '@/stores/movie';
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import {type MovieSearchQuery} from '@/api/tmdb/types/queryMovie'

const movieNm = ref<string>()
movieNm.value = '미션 임파서블'
const imgInitUrl = ref<string>();
const posterSizes = ref<string[]>();

posterSizes.value = TMDB_IMAGE_SIZES.poster;
imgInitUrl.value = IMG_INIT_URL;

const movieStore = useMovieStore()
const {movies} = storeToRefs(movieStore)

const getPosterSize = (sizeIdx: number): string => {
  return (posterSizes.value && posterSizes.value[sizeIdx] ? posterSizes.value[sizeIdx] : '')
}

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

onBeforeMount(() => {
  fetchMovies(createMovieQuery())
})

</script>

<template>
  <main>
    <h2>영화 목록</h2>
    <input v-model="movieNm" type="text" placeholder="영화 제목을 입력해주세요">
    <button @click="fetchMovies(createMovieQuery())">검색</button>
    <li>
      <ul v-for="movie in movies" :key="movie.id">
        <span>{{ movie.title }}</span>
        <div>
          <img :src="imgInitUrl + getPosterSize(1)  + movie.poster_path" :alt="movie.original_title">
        </div>
      </ul>
    </li>
  </main>
</template>