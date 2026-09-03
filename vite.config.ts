import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/motion')) {
            return 'vendor-motion'
          }
          if (
            id.includes('node_modules/@base-ui') ||
            id.includes('node_modules/class-variance-authority') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'vendor-ui'
          }
          if (
            id.includes('node_modules/@phosphor-icons') ||
            id.includes('node_modules/simple-icons') ||
            id.includes('node_modules/lucide-react')
          ) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis'
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
