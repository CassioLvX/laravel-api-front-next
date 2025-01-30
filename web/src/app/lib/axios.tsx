import axios from 'axios';
import Cookies from 'js-cookie';

const setupAxios = () => {

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.error('Não autorizado. Redirecionando...');
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default setupAxios;
