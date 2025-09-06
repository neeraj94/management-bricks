import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      port: 5000
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        'psychometric-assessment': './services/psychometric-assessment.html',
        'mock-interview': './services/mock-interview.html',
        'aptitude-testing': './services/aptitude-testing.html'
      }
    }
  },
  publicDir: 'public'
})