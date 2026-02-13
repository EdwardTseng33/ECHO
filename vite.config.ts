
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 確保瀏覽器端能讀取到 process.env.API_KEY
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
});
