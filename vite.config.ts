import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  server: {
    port: 5173,
    host: true, // Nécessaire pour le bon fonctionnement dans StackBlitz
    hmr: {
      overlay: true
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-hook-form'
          ],
          'firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore'
          ]
        }
      }
    }
  }
});