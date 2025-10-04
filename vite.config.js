import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    hmr: {
      port: 5000
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  },
  esbuild: {
    jsxInject: "import React from 'react'",
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  }
})
