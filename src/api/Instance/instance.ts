import axios from 'axios';

export const API_URL = process.env.REACT_APP_PUBLIC_URL;

export const instance = axios.create({
  baseURL: API_URL,
});
