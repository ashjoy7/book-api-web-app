// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Adjust this if you're not using Vue

export default defineConfig({
  // Configure build options
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      input: {
        main: './index.html', // Path to your HTML entry point
      },
      external: [], // List of external modules if needed
    },
  },

  // Plugins used in the project
  plugins: [vue()], // Add or adjust plugins based on your project needs

  // Define environment variables
  define: {
    'process.env': {
      VITE_GOOGLE_API_KEY: JSON.stringify(process.env.VITE_GOOGLE_API_KEY), // Ensure the key is a string
    },
  },

  // Resolve options
  resolve: {
    alias: {
      '@': '/src', // Adjust this based on your project structure
    },
  },

  // Optional server settings
  server: {
    port: 5173, // Default port, adjust if necessary
  },
});
