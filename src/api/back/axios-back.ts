import axios from 'axios';

const axiosBack = axios.create({
  baseURL: '/back', // Vite 프록시를 통해 우회 (아래 설정 참고)
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_KOBIS_AUTH_TOKEN || ''}`,
  },
});

export default axiosBack;
