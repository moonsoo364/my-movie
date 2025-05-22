import axiosKOBIS from './axios-kobis';

export const searchKobisMovie = (movieNm: string) =>
  axiosKOBIS.get('/kobisopenapi/webservice/rest/movie/searchMovieList.json', {
    params: { movieNm },
  });

export const searchDetailKobisMovie = (movieCd: string) =>
  axiosKOBIS.get('/kobisopenapi/webservice/rest/movie/searchMovieInfo.json', {
    params: { movieCd },
  });