import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Configuração Vite para build e dev da página de Boot e Branding
 * Use: vite --config vite.config.boot.js (dev)
 * Use: vite build --config vite.config.boot.js (build)
 * 
 * IMPORTANTE: base: './' garante caminhos relativos para funcionar no IPFS
 */
export default defineConfig({
  plugins: [react()],
  base: './', // Caminhos relativos para funcionar no IPFS
  root: '.',
  build: {
    outDir: 'dist-boot',
    rollupOptions: {
      input: {
        branding: './branding.html',
        boot: './boot.html'
      }
    },
    assetsDir: 'assets',
    // Garantir que os assets sejam copiados corretamente
    copyPublicDir: false
  },
  server: {
    open: '/branding.html',
    port: 5173
  }
})

