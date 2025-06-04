// store/currency.js
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    tokenData: {
      code: 'LAWAS',
      title: 'LAWAS',
      issuer: 'rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC',
      price: 0,
      priceUsd: 0,
      trustlines: 508,
      holders: 435,
      marketcap: 11646.176,
      circulating: '798013801',
      total: '994161854',
      logo: 'https://api.xpmarket.com/storage/meme/LAWAS.png'
    },
    chartData: [],
    selectedPeriod: '1D',
    selectedCurrency: 'USD',
    currencyRates: {},
    ohlcData: {
      open: 0.000001240,
      close: 0.000002350,
      high: 0.000002350,
      low: 0.000001240
    },
    loading: {
      tokenData: false,
      chartData: false,
      rates: false
    },
    error: null
  }),
  
  getters: {
    formattedMarketCap: (state) => {
      return formatNumber(state.tokenData.marketcap)
    },
    formattedPrice: (state) => {
      return formatPrice(state.tokenData.priceUsd)
    },
    convertedPrices: (state) => {
      if (!state.currencyRates) return []
      
      const currencies = ['IDR', 'EUR', 'JPY', 'GBP']
      return currencies.map(currency => {
        const rate = state.currencyRates[currency] || 1
        return {
          currency,
          price: state.tokenData.priceUsd * rate,
          formattedPrice: formatPrice(state.tokenData.priceUsd * rate),
          baseCurrency: currency
        }
      })
    },
    marketStats: (state) => {
      return [
        {
          label: 'Current Price',
          value: `$${formatPrice(state.tokenData.priceUsd)}`,
          change: 5.2,
          period: '24h'
        },
        {
          label: 'Market Cap',
          value: `$${formatNumber(state.tokenData.marketcap)}`,
          change: 3.8,
          period: '24h'
        },
        {
          label: '24h Volume',
          value: `$${formatNumber(1250.45)}`,
          change: 12.5,
          period: '24h'
        },
        {
          label: 'All-Time High',
          value: `$${formatPrice(0.0000018)}`,
          change: -35.4,
          period: 'from ATH'
        }
      ]
    }
  },
  
  actions: {
    async fetchTokenData() {
      try {
        this.loading.tokenData = true
        const response = await fetch('https://api.xpmarket.com/api/currency/widget?token=LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC')
        const data = await response.json()
        
        if (data.success) {
          this.tokenData = { 
            ...this.tokenData, 
            ...data.data,
            // Ensure priceUsd is a number and not scientific notation
            priceUsd: Number(data.data.priceUsd)
          }
          this.error = null
        }
      } catch (error) {
        console.error('Error fetching token data:', error)
        this.error = 'Failed to fetch token data'
      } finally {
        this.loading.tokenData = false
      }
    },
    
    async fetchChartData(period = '1d') {
      try {
        this.loading.chartData = true
        const response = await fetch(`https://api.xpmarket.com/api/currency/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC/prices/${period}`)
        const data = await response.json()
        
        if (data.success) {
          // Ensure we're working with proper numbers, not scientific notation
          this.chartData = data.data.map(item => ({
            x: item.x,
            y: Number(item.y)
          }))
          this.error = null
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
        this.error = 'Failed to fetch chart data'
      } finally {
        this.loading.chartData = false
      }
    },
    
    async fetchCurrencyRates() {
      try {
        this.loading.rates = true
        const response = await fetch('https://api.xpmarket.com/api/stats/main')
        const data = await response.json()
        
        if (data.success) {
          // Convert array of rates to object for easier access
          const rates = {}
          data.rates.forEach(rate => {
            rates[rate.iso] = parseFloat(rate.rate)
          })
          
          this.currencyRates = rates
          this.error = null
        }
      } catch (error) {
        console.error('Error fetching currency rates:', error)
        this.error = 'Failed to fetch currency rates'
      } finally {
        this.loading.rates = false
      }
    },
    
    setSelectedPeriod(period) {
      this.selectedPeriod = period
      this.fetchChartData(period.toLowerCase())
    },
    
    setSelectedCurrency(currency) {
      this.selectedCurrency = currency
    },
    
    startRealTimeUpdates() {
      // Update data every 30 seconds
      setInterval(() => {
        this.fetchTokenData()
        this.fetchChartData(this.selectedPeriod.toLowerCase())
      }, 30000)
    }
  }
})

// Helper functions
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  }
  return num.toLocaleString()
}

function formatPrice(price) {
  if (!price || isNaN(price)) return '0.00000000'
  
  if (price < 0.000001) {
    // For very small numbers, use fixed notation instead of scientific
    return price.toFixed(10).replace(/\.?0+$/, '')
  }
  return price.toFixed(8).replace(/\.?0+$/, '')
}
