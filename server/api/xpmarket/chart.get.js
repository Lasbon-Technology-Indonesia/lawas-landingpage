import { $fetch } from 'ofetch'
import { defineEventHandler, createError, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const period = String(query.period || '1d').toLowerCase()
    const url = `https://api.xpmarket.com/api/currency/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC/prices/${period}`
    return await $fetch(url, {
      headers: {
        accept: "application/json,text/plain,*/*",
      }
    })
  } catch (err) {
    throw createError({ statusCode: 502, message: 'Gagal fetch chart dari xpmarket', data: err })
  }
})
