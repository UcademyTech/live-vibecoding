import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const API_URL = 'http://localhost:3333';
const WEB_PORT = 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    port: WEB_PORT,
    proxy: {
      '/api': { target: API_URL, changeOrigin: true },
    },
  },
  optimizeDeps: {
    include: ['@live/shared'],
  },
  build: {
    commonjsOptions: {
      include: [/@live\/shared/, /node_modules/],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    css: false,
  },
});
