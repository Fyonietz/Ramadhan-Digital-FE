import axios from "axios";

// Inisiasi Axios dengan Base URL backend Anda
export const api = axios.create({
  baseURL: "https://reproduction-freeware-snow-matthew.trycloudflare.com/api/v1/",
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
