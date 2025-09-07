import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({ 
 
  css: {
    postcss: {
      plugins: [tailwindcss()],
        }},
  plugins: [react()],
    ssr: {
         // Specify the entry point for your server-side code
         entry: '/src/server.jsx',
       },
  build: {
    ssr: true,
    rollupOptions:{
      input: './src/server.jsx',
    },

  }
})
