<script lang="ts" setup>
import { searchMovie, searchActor } from '@/api/tmdb/tmdb';
import { searchKobisMovie, searchDetailKobisMovie } from '@/api/kobis/kobis';
import { MovieRoot, Movie } from '@/api/tmdb/types/movie';
import {ref} from 'vue';

// searchActor('톰 크루즈').then(res=>{
//   console.log('TMDB:', res.data);
// })

// searchKobisMovie('미션 임파서블').then(res => {
//   console.log('KOBIS:', res.data);
// })

// searchDetailKobisMovie('20246489').then(res => {
//   console.log('KOBIS:', res.data);
// })
</script>