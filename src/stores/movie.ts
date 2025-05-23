import {defineStore} from 'pinia'
import { searchMovie } from '@/api/tmdb/tmdb'
import {type MovieSearchQuery} from '@/api/tmdb/types/queryMovie'
import { type Movie } from '@/api/tmdb/types/movie'
import { ref } from 'vue'

export const useMovieStore = defineStore('tmdbMovie', ()=>{
    const movies = ref<Movie[]>([])

    const fetchMovies = async(search: MovieSearchQuery) =>{
        const res = await searchMovie(search);
        movies.value = res.data.results;
    }

    return{
        movies,
        fetchMovies
    }
})