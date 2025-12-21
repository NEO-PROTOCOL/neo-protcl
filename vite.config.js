import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  build: {
    cssCodeSplit: true,
    cssMinify: true, // Minificação padrão do Vite (esbuild)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Agrupar imagens do Thirdweb em chunks maiores para reduzir número de arquivos
        // Reduz de 459 arquivos pequenos para alguns chunks maiores
        manualChunks: (id) => {
          if (id.includes('node_modules/thirdweb')) {
            // Agrupar TODAS as imagens do Thirdweb em um único chunk grande
            // Identificar arquivos de imagem por padrão no nome
            if (id.includes('image-') && id.endsWith('.js')) {
              return 'thirdweb-images';
            }
            // Biblioteca Thirdweb principal (sem imagens)
            return 'thirdweb';
          }
          // Agrupar outras dependências grandes
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('ethers')) {
              return 'ethers-vendor';
            }
            // Outras dependências em vendor comum
            return 'vendor';
          }
        },
        // Limitar número de chunks para evitar muitos arquivos pequenos
        chunkSizeWarningLimit: 1000,
        // Otimizar nomes de arquivos CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
      onwarn(warning, warn) {
        // Suprimir avisos conhecidos do Lighthouse SDK sobre eval()
        if (warning.code === 'EVAL' && warning.id?.includes('@lighthouse-web3')) {
          return;
        }
        // Suprimir avisos sobre comentários @__PURE__ do thirdweb
        // Rollup não consegue interpretar esses comentários em certas posições
        // São apenas anotações de otimização, não erros
        if (
          warning.message?.includes('@__PURE__') ||
          warning.message?.includes('/*#__PURE__*/') ||
          warning.message?.includes('/* @__PURE__ */') ||
          (warning.code === 'PLUGIN_WARNING' && warning.plugin === 'vite:react-babel' && warning.message?.includes('@__PURE__'))
        ) {
          return;
        }
        // Usar o handler padrão para outros avisos
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    include: ['buffer', '@lighthouse-web3/sdk'],
    exclude: [
      // Excluir wallets não usadas do Thirdweb para reduzir bundle
      // Manter apenas o que é necessário (Embedded Wallets)
    ],
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
        // Em desenvolvimento, usar padrões mais flexíveis para evitar avisos
        globPatterns: mode === 'production' 
          ? ['**/*.{js,css,html,ico,png,svg,woff2,webp}']
          : ['index.html', '**/*.{js,css}'], // Menos arquivos em dev para evitar avisos
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        dontCacheBustURLsMatching: /\.\w{8}\./,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        // Aumentar limite para permitir bundles grandes (Thirdweb + vendor podem ser ~6MB)
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6 MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache-v3.0.0',
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
              cacheName: 'images-cache-v3.0.0',
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
              cacheName: 'ipfs-cache-v3.0.0',
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
        type: 'module',
        // Suprimir avisos de glob patterns em desenvolvimento
        suppressWarnings: true
      }
    })
  ],
}))
