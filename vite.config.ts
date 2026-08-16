import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'BE-SIDE',
        short_name: 'BE-SIDE',
        description:
          "A gentle space to check in, reflect, and remember that you're not alone.",
        theme_color: '#8B6FB3',
        background_color: '#FAF8FC',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        id: 'be-side',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },
    }),
  ],
})
