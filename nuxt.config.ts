// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale-1, user-scalable=0',
      script: [
        { children: 'navigator.serviceWorker.getRegistrations().then(function(registrations) { var registrationslength = registrations.length; for (var i = 0; i < registrationslength; i++) { registrations[i].unregister(); } })' },
      ],
    }
  },
  alias: {
    "@": "~/",
  },
  css: [
    "~/assets/main.css"
  ],
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
  ],
  ssr: false,
  routeRules: {
    // Render these routes on the client (SPA)
    '/dashboard/**': { ssr: false },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    devProxy: {
      '/api': {
        target: process.env.API_BASE_URL + '/api',
        changeOrigin: true
      },
      '/images': {
        target: process.env.API_BASE_URL + '/images',
        changeOrigin: true
      },
      '/documents': {
        target: process.env.API_BASE_URL + '/documents',
        changeOrigin: true
      }
    }
  },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
})
