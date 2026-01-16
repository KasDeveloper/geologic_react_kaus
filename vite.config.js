import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

const path = require('path')

export default defineConfig({
  root: 'wwwroot',
  server: {
    open: true,
    port: '8080',
  },
  resolve: {
    alias: {
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  plugins: [react()],
})
