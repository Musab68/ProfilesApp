import axios from 'axios';

// .env dosyasındaki IP adresini alıyoruz [cite: 135]
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL, // [cite: 136, 137]
});