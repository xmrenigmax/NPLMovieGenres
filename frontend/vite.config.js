import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false // Optional: smaller builds
  },
  // This ensures proper routing in production
  base: './'
})