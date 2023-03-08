import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import optimizer from 'vite-plugin-optimizer';
import { libs } from './config/libs';
import { port } from './config/port';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    },
    extensions: ['.json', '.js', '.mjs', '.ts', '.tsx']
  },
  server: {
    port: port.dev,
    strictPort: false
  },
  plugins: [
    react(),
    optimizer(libs)
  ],
});