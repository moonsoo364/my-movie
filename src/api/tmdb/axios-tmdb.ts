import axios from 'axios';

const axiosTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'ko-KR',
  },
});

export default axiosTMDB;
