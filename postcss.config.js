export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  // Otimizações para produção
  ...(process.env.NODE_ENV === 'production' && {
    cssnano: false, // Vite já minifica, não precisa cssnano
  }),
}

