// Owner: M1
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // auth uses an httpOnly cookie
});

export default api;
