import axiosTMDB from './axios-tmdb';

export const searchMovie = (query: string) =>
  axiosTMDB.get('/search/movie', {
    params: { query },
  });

export const searchActor = (query: string) =>
  axiosTMDB.get('search/person',{
    params: {query},
  })
