import {defineStore} from 'pinia'
import { searchMovie } from '@/api/tmdb/tmdb'
import {type MovieSearchQuery} from '@/api/tmdb/types/query/queryMovie'
import { type Movie } from '@/api/tmdb/types/movie'
import { ref } from 'vue'

export const useMovieStore = defineStore('tmdbMovie', ()=>{
    const movies = ref<Movie[]>([])
    const total_pages = ref<number> ();
    const total_results = ref<number> ();

    const fetchMovies = async(search: MovieSearchQuery) =>{
        const res = await searchMovie(search);
        movies.value = res.data.results;
        total_pages.value = res.data.total_pages;
        total_results.value = res.data.total_results;
    }

    return{
        movies,
        total_pages,
        total_results,
        fetchMovies
    }
})