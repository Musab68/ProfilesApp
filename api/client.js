import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      throw new Error('Ag hatasi. Baglantinizi kontrol edin.');
    }
    if (error.response.status === 404) {
      throw new Error('Kaynak bulunamadi.');
    }
    if (error.response.status >= 500) {
      throw new Error('Sunucu hatasi. Lutfen sonra tekrar deneyin.');
    }
    throw error;
  }
);