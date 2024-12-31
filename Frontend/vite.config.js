import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
})
