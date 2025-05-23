import {defineStore} from 'pinia'
import { searchMovie } from '@/api/tmdb/tmdb'
import { type Movie } from '@/api/tmdb/types/movie'
import { ref } from 'vue'

export const useMovieStore = defineStore('tmdbMovie', ()=>{
    const movies = ref<Movie[]>([])

    const fetchMovies = async(query: string) =>{
        const res = await searchMovie(query);
        movies.value = res.data.results;
    }

    return{
        movies,
        fetchMovies
    }
})