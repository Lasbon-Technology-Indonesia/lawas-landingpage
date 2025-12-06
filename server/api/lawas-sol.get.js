import { $fetch } from 'ofetch'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  try {
    const url = 'https://www.mexc.fm/api/dex/v1/data/get_market_info?chain_id=100000&pair_ca=CXHDQoQPRwLrR3ShqPbgBemhKpmAhkhHBCuQxmKbN2uP&token_ca=G32DYT2PpDsq5t8RLPVHMagtBKYAa2DSohFhkSjJs7C6'
    const res = await $fetch(url)
    const price = Number(res?.data?.token_price)
    if (!Number.isFinite(price)) {
      throw createError({ statusCode: 502, message: 'Harga SOL tidak tersedia' })
    }
    return { priceUsd: price }
  } catch (err) {
    throw createError({ statusCode: 502, message: 'Gagal fetch harga LAWAS SOL', data: err })
  }
})
