import axios from 'axios';

const axiosKOBIS = axios.create({
  baseURL: '/kobis', // Vite 프록시를 통해 우회 (아래 설정 참고)
  params: {
    key: import.meta.env.VITE_KOBIS_API_KEY,
  },
});

export default axiosKOBIS;
