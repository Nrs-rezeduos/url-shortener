import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/url-shortener/',
  plugins: [react()],
  server: {
    port: 5173,
   proxy: {
  '/api': {
    target: 'https://url-shortener-1egv.onrender.com',
    changeOrigin: true,
    secure: true
  }
}
  }
})