import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer', '@lighthouse-web3/sdk'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      minify: false, // evita falha do Terser na geração do service worker
      includeAssets: ['favicon.ico', 'favicons/favicon-96x96.png', 'favicons/web-app-manifest-192x192.png', 'favicons/web-app-manifest-512x512.png'],
      manifest: {
        name: 'NΞØ Protocol',
        short_name: 'NEO',
        description: 'O Protocolo NΞØ não nasceu para ser uma empresa. Nasceu para ser uma topologia. Uma rede de nós autônomos. Uma consciência distribuída. Descentralização não é uma tecnologia. É um ato político. Uma forma de existir.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui', 'browser'],
        orientation: 'any',
        start_url: '/',
        scope: '/',
        categories: ['finance', 'utilities', 'productivity', 'web3', 'blockchain'],
        icons: [
          {
            src: 'favicons/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'favicons/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Nodes',
            short_name: 'Nodes',
            description: 'Explore os circuitos simultâneos da rede',
            url: '/nos',
            icons: [{ src: 'favicons/web-app-manifest-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Manifesto',
            short_name: 'Manifesto',
            description: 'Leia o documento público',
            url: '/manifesto',
            icons: [{ src: 'favicons/web-app-manifest-192x192.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        mode: 'development', // evita minificação do SW pelo Terser
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webp}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache-v1.0.3',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache-v1.0.3',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/gateway\.lighthouse\.storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ipfs-cache-v1.0.3',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
})
