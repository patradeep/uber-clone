import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure base is set correctly if you are hosting in a subdirectory, 
  // otherwise '/' is standard.
  base: '/', 
})

