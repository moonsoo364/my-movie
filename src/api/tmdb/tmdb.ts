import axiosTMDB from './axios-tmdb';

export const searchMovie = (query: string) =>
  axiosTMDB.get('/search/movie', {
    params: { query },
  });
