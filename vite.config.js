// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Example: replace with your framework/plugin

export default defineConfig({
  plugins: [vue()], // Example: replace with your plugins
  define: {
    'process.env': {
      VITE_GOOGLE_API_KEY: process.env.VITE_GOOGLE_API_KEY,
    },
  },
});
