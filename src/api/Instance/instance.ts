import axios from 'axios';

export const API_URL =
  process.env.REACT_APP_PUBLIC_URL ||
  'https://engine.hotellook.com/api/v2/cache.json';

export const instance = axios.create({
  baseURL: API_URL,
});
