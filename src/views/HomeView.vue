<script setup lang="ts">
import { searchMovie } from '@/api/tmdb/tmdb';
import { searchKobisMovie, searchDetailKobisMovie } from '@/api/kobis/kobis';

searchMovie('미션 임파서블: 파이널 레코닝').then(res=>{
  console.log('TMDB:', res.data);
})

searchKobisMovie('미션 임파서블').then(res => {
  console.log('KOBIS:', res.data);
})

searchDetailKobisMovie('20246489').then(res => {
  console.log('KOBIS:', res.data);
})
</script>

<template>
  <main>
    <h2>일일 박스 오피스 현황</h2>
  </main>
</template>
