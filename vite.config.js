import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'schools.csv'], // <--- 1. Caches your CSV for offline use

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,csv}'], // <--- 2. Caches all these file types
        navigateFallback: '/index.html',                        // <--- 3. THE FIX: Redirects 404s to index.html so React can handle the route
        navigateFallbackDeny: [/^\/api/],                       // <--- 4. SAFETY: Don't redirect API calls (let them fail normally if offline)
      },

      manifest: {
        name: 'InsightEd',
        short_name: 'InsightEd',
        description: 'School Data Capture Tool',
        theme_color: '#004A99',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/InsightEd1.png', // Ensure you have this file in public/
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/InsightEd1.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})