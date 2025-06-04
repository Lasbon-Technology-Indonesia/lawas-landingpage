<template>
  <div class="flex flex-col md:flex-row items-center p-4 bg-dark-lighter rounded-lg shadow-md mb-6">
    <div class="w-full md:w-auto flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <img :src="logoUrl" alt="LAWAS Coin" class="h-16 w-16 rounded-full bg-white p-1" />
    </div>
    <div class="flex-grow">
      <div class="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h3 class="text-xl font-bold">{{ name }}</h3>
          <div class="flex items-center text-gray-400 text-sm">
            <span>{{ symbol }}</span>
            <span class="mx-2">•</span>
            <span>XRP Ledger</span>
          </div>
        </div>
        <div class="mt-3 md:mt-0">
          <div class="text-2xl font-bold">${{ formatPrice(price) }}</div>
          <div :class="priceChange >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm font-medium">
            {{ priceChange >= 0 ? '+' : '' }}{{ priceChange.toFixed(2) }}% (24h)
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div>
          <div class="text-gray-400 text-xs">Market Cap</div>
          <div class="font-semibold">${{ formatNumber(marketCap) }}</div>
        </div>
        <div>
          <div class="text-gray-400 text-xs">Volume (24h)</div>
          <div class="font-semibold">${{ formatNumber(volume) }}</div>
        </div>
        <div>
          <div class="text-gray-400 text-xs">Circulating Supply</div>
          <div class="font-semibold">{{ formatNumber(circulatingSupply) }}</div>
        </div>
        <div>
          <div class="text-gray-400 text-xs">Total Supply</div>
          <div class="font-semibold">{{ formatNumber(totalSupply) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'LAWAS'
  },
  symbol: {
    type: String,
    default: 'LAWAS'
  },
  price: {
    type: Number,
    default: 0
  },
  priceChange: {
    type: Number,
    default: 0
  },
  marketCap: {
    type: Number,
    default: 0
  },
  volume: {
    type: Number,
    default: 0
  },
  circulatingSupply: {
    type: Number,
    default: 0
  },
  totalSupply: {
    type: Number,
    default: 0
  },
  logoUrl: {
    type: String,
    default: 'https://api.xpmarket.com/storage/meme/LAWAS.png'
  }
})

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  }
  return num.toLocaleString()
}

const formatPrice = (price) => {
  if (price < 0.000001) {
    return price.toExponential(2)
  }
  return price.toFixed(8)
}
</script>
