// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

const __dirname = import.meta.dirname;

export default defineConfig({
  base: '/',
  
  server: {
    port: 3000,
    open: '/'
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        generate: resolve(__dirname, 'generate/index.html'),
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});