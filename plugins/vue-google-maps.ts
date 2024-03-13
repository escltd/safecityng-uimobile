import { GoogleMap } from 'vue3-google-map';


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  nuxtApp.vueApp.use(GoogleMap, {
    load: {
      key: config.GOOGLE_MAPS_API_KEY,
    },
  })
})
