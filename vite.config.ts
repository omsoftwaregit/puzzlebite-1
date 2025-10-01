import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change "puzzlebite" to your repo name if different
export default defineConfig({
  plugins: [react()],
  base: '/puzzlebite-vite/'
})
