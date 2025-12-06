import { $fetch } from 'ofetch'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  try {
    // Sumber utama: Dexscreener (pilih pair berlikuiditas tertinggi)
    const url = 'https://api.dexscreener.com/latest/dex/tokens/0xc6e6b78A08613768572255BC859204542346b879'
    const res = await $fetch(url)
    const pairs = Array.isArray(res?.pairs) ? res.pairs : []
    const sorted = pairs
      .map(p => ({
        price: Number(p?.priceUsd),
        liq: Number(p?.liquidity?.usd || 0)
      }))
    const best = sorted.sort((a, b) => (b.liq || 0) - (a.liq || 0))[0]
    if (best && Number.isFinite(best.price)) {
      return { priceUsd: best.price }
    }

    // Fallback: OKX holder ranking API (ambil harga dari response contoh)
    const okxUrl = 'https://web3.okx.com/priapi/v1/dx/market/v2/holders/ranking-list?chainId=56&tokenAddress=0xc6e6b78a08613768572255bc859204542346b879'
    const okx = await $fetch(okxUrl)
    const fallbackPrice = Number(okx?.data?.price || okx?.data?.summaryVO?.top100BoughtAvgPrice || okx?.data?.summaryVO?.top100SoldAvgPrice)
    if (Number.isFinite(fallbackPrice)) {
      return { priceUsd: fallbackPrice }
    }

    throw createError({ statusCode: 502, message: 'Harga BNB tidak tersedia' })
  } catch (err) {
    throw createError({ statusCode: 502, message: 'Gagal fetch harga LAWAS BNB', data: err })
  }
})
