import { $fetch } from 'ofetch'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  try {
    const url = 'https://api.xpmarket.com/api/currency/widget?token=LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC'
    return await $fetch(url, {
      headers: {
        accept: "application/json,text/plain,*/*",
      }
    })
  } catch (err) {
    throw createError({ statusCode: 502, message: 'Gagal fetch token dari xpmarket', data: err })
  }
})
