<script setup lang="ts">
import { searchMovie } from '@/api/tmdb/tmdb';
import type { Movie } from '@/api/tmdb/types/movie';
import {IMG_INIT_URL,TMDB_IMAGE_SIZES} from '@/api/tmdb/consts/tmdbConsts'
import { ref } from 'vue';


const movies = ref<Movie[]>([]);
const movieName = ref<string>();
const imgInitUrl = ref<string>();

imgInitUrl.value = IMG_INIT_URL;
const fetchMovies = async (query: string) => {
  const res = await searchMovie(query);
  
  movies.value = res.data.results;
  console.log(movies.value);
};

// 예시: 컴포넌트가 마운트될 때 호출
fetchMovies('미션 임파서블');


</script>

<template>
  <main>
    <h2>영화 목록</h2>
    <input v-model="movieName" type="text" placeholder="영화 제목을 입력해주세요">
    <button @click="fetchMovies(movieName || '')">검색</button>
    <li>
      <ul v-for="movie in movies" :key="movie.id">
        <span>{{ movie.title }}</span>
        <img :src="imgInitUrl+''+movie.poster_path" alt="">
      </ul>
    </li>
  </main>
</template>
