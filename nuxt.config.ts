// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale-1, user-scalable=0',
    }
  },
  runtimeConfig: {
    // Private keys are only available on the server
    // apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.API_BASE_URL
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
    "@vite-pwa/nuxt",
  ],
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
        target: process.env.API_BASE_URL+'/images',
        changeOrigin: true
      }
    }
  },
  pwa: {
    registerType: 'autoUpdate',

    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },

    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
    manifest: {
      "name": "Safecity",
      "short_name": "Safecity",
      "theme_color": "#FF850A",
      "icons": [
        {
          "src": "icon-48x48.png",
          "sizes": "48x48",
          "type": "image/png",
        },
        {
          "src": "icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
        },
        {
          "src": "icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
        },
        {
          "src": "icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
        },
        {
          "src": "icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
        },
        {
          "src": "icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
        },
        {
          "src": "icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
        },
        {
          "src": "icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
        },
        {
          "src": "icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        }
      ]
    },
  },
})
