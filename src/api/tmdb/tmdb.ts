import axiosTMDB from './axios-tmdb';
import {type MovieSearchQuery} from '@/api/tmdb/types/queryMovie'

export const searchMovie = (search: MovieSearchQuery) =>
  axiosTMDB.get('search/movie', {
    params: search,
  })


export const searchActor = (query: string) =>
  axiosTMDB.get('search/person',{
    params: {query},
  })
