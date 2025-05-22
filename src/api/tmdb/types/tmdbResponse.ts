// /search/movie response 값, 
export type TmdbMovie = {
  adult: boolean; //성인물 여부
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  // https://image.tmdb.org/t/p/w500/{image.jpg} 로 요청해야함 
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
