export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-lawas.png' }
      ]
    },
  },

  // Global CSS
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  // Build Configuration
  build: {},

  // Server configuration
  server: {
    host: '0.0.0.0'
  },
  
  // Compatibility date for Nitro
  nitro: {
    compatibilityDate: '2025-06-03'
  }
})
