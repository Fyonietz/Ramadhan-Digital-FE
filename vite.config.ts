import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Membaca variabel dari file .env
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      // 1. Plugin React dengan konfigurasi React Compiler bawaan
      react({
      }),
      
      // 2. Plugin Tailwind CSS v4
      tailwindcss(),
    ],
    
    // 3. Konfigurasi Server & Proxy untuk menghindari CORS
    server: {
      host:true,
      allowedHosts:true,
      proxy: {
        '/api': {
          target: env.VITE_API_TARGET, // Membaca http://192.168.69.35:3001
          changeOrigin: true,
          secure: true, 
        }
      }
    }
  }
})
