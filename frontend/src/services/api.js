import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response?.data?.code === 'SESSION_EXPIRED') {
      window.dispatchEvent(new CustomEvent('atelier:session-expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
