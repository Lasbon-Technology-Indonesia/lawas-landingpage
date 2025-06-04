// plugins/axios.js
export default defineNuxtPlugin((nuxtApp) => {
  const axios = $fetch.create({
    baseURL: 'https://api.xpmarket.com/api',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  // Make axios available throughout the app
  nuxtApp.provide('axios', axios)
})
