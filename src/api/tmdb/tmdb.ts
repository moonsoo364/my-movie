import axiosTMDB from './axios-tmdb';
import {type MovieSearchQuery} from '@/api/tmdb/types/query/queryMovie'
import {type CreditQuery} from '@/api/tmdb/types/query/queryCredits'

export const searchMovie = (search: MovieSearchQuery) =>
  axiosTMDB.get('search/movie', {
    params: search,
  })
  
export const searchCredits = (search: CreditQuery) =>{
  axiosTMDB.get(`movie/${search.movieId}/credits`,{
    params: {search}
  })
}

export const searchActor = (query: string) =>
  axiosTMDB.get('search/person',{
    params: {query},
  })

