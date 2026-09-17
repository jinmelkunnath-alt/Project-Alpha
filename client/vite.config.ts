import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Binds to 0.0.0.0 so the dev server is reachable from the preview host.
// API calls prefixed with /api are proxied to the Express backend (port 3001).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    // Allow the Arena preview host (and any host) to reach the dev server.
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
