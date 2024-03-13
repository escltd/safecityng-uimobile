import {defineNuxtPlugin} from '#app'

export default defineNuxtPlugin ((nuxtApp) => {
  (nuxtApp.$router as any).options.scrollBehaviour = (to: {hash: any}, from: any, savedPosition: any ) => {
    if (to.hash) {
      return {
        el: to.hash,
        top: 30,
        behaviour: 'smooth',
      }
    }
  }
})