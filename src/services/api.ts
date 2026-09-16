import axios from "axios";

// Inisiasi Axios dengan Base URL backend Anda
const DEFAULT_BASE = "http://localhost:3001/api/v1/";

export const api = axios.create({
  baseURL: (import.meta.env?.VITE_API_BASE_URL as string) || DEFAULT_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Interceptor untuk otomatis menyisipkan Bearer Token
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");
    
    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
