import axios from 'axios';
import { auth } from './firebase'; // تأكد من ضبط المسار الصحيح لملف firebase.js

const API = axios.create({
  baseURL: 'https://minhiti-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

API.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    // جلب الـ ID Token المجدد تلقائياً من Firebase
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;