import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open the browser like CRA
    port: 3000, // Run on port 3000 instead of Vite's default 5173
  },
  define: {
    'process.env': {}, // Emulate CRA's process.env
  },
});
