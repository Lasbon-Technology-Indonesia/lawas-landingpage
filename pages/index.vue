<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Animation -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary opacity-20 rounded-full animate-pulse-slow"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-secondary opacity-30 rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-32 left-1/4 w-40 h-40 bg-primary opacity-15 rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-20 right-1/3 w-28 h-28 bg-secondary opacity-25 rounded-full animate-pulse-slow"></div>
      </div>
      
      <div class="container mx-auto px-4 z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-6xl lg:text-8xl font-bold mb-6">
              LAWAS
              <span class="gradient-text block">COIN</span>
            </h1>
            <p class="text-xl lg:text-2xl text-gray-300 mb-8 max-w-lg">
              The premier digital asset on the XRP Ledger, designed for institutional-grade security and seamless cross-border transactions.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button class="btn-primary text-lg px-8 py-3 hover-scale" @click="redirectToXPM">Set Trustline</button>
              <button class="btn-secondary text-lg px-8 py-3 hover-scale">Learn More</button>
            </div>
          </div>
          
          <div class="flex justify-center lg:justify-end">
            <div class="relative w-96 h-96">
              <!-- Pulsing Gradient Background -->
              <div class="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 animate-pulse-slow"></div>

              <!-- White Transparent Inner Circle with Logo -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-80 h-80 rounded-full bg-white bg-opacity-10 flex items-center justify-center logo-pulse">
                  <img src="/lawas-logo.png" alt="LAWAS Logo" class="w-64 h-64 object-contain" />
                </div>
              </div>

              <!-- Floating dots with enhanced animation -->
              <div class="absolute top-4 right-4 w-4 h-4 bg-white rounded-full opacity-60 animate-float-1"></div>
              <div class="absolute bottom-8 left-8 w-3 h-3 bg-primary rounded-full opacity-80 animate-float-2"></div>
              <div class="absolute top-1/2 left-4 w-2 h-2 bg-secondary rounded-full opacity-70 animate-float-3"></div>
              <div class="absolute bottom-4 right-12 w-3 h-3 bg-white rounded-full opacity-50 animate-float-4"></div>

              <!-- Orbiting dots -->
              <div
                class="absolute inset-0 origin-center will-change-transform animate-orbit-rotation"
              >
                <div
                  v-for="i in 12"
                  :key="i"
                  class="absolute w-3 h-3 bg-white rounded-full"
                  :style="getDotStyle(i - 1)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Stats Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div class="text-center hover-scale">
            <div class="text-4xl lg:text-5xl font-bold gradient-text mb-2 animate-number">
              ${{ marketCap }}
            </div>
            <div class="text-gray-400 text-lg">Market Cap</div>
          </div>
          <div class="text-center hover-scale">
            <div class="text-4xl lg:text-5xl font-bold gradient-text mb-2 animate-number">
              {{ holders }}
            </div>
            <div class="text-gray-400 text-lg">Holders</div>
          </div>
          <div class="text-center hover-scale">
            <div class="text-4xl lg:text-5xl font-bold gradient-text mb-2 animate-number">
              {{ trustlines }}+
            </div>
            <div class="text-gray-400 text-lg">Trustlines</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Price Chart Section -->
    <section id="chart" class="py-20 bg-dark-lighter">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">
            Price <span class="gradient-text">Chart</span>
          </h2>
          <p class="section-subtitle">
            Track LAWAS token performance with real-time price charts and market data.
          </p>
          
          <!-- Data Source Toggle -->
          <div class="flex justify-center mt-8 mb-8">
            <div class="bg-gray-800 rounded-lg p-1 flex">
              <button 
                @click="setDataSource('xpm')"
                :class="[
                  'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  dataSource === 'xpm' 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                ]"
              >
                XPM Market
              </button>
              <button 
                @click="setDataSource('dexscreener')"
                :class="[
                  'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  dataSource === 'dexscreener' 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                ]"
              >
                Dexscreener
              </button>
              <button 
                @click="setDataSource('geckoterminal')"
                :class="[
                  'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  dataSource === 'geckoterminal' 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                ]"
              >
                GeckoTerminal
              </button>
            </div>
          </div>
        </div>
        
        <!-- XPM Market Data (Original) -->
        <div v-if="dataSource === 'xpm'">
          <!-- Current Price Display -->
          <div class="card mb-8">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div class="md:col-span-2">
                <h3 class="text-lg font-semibold text-gray-400 mb-2">Current Price</h3>
                <div class="flex items-center justify-between">
                  <div class="text-3xl font-bold animate-number">{{ selectedCurrency === 'IDR' ? 'Rp' : '$' }}{{ formatPrice(currentPrice * (selectedCurrency === 'IDR' ? currencyRates['IDR'] : 1)) }}</div>
                  <select v-model="selectedCurrency" class="bg-gray-700 text-white px-3 py-2 rounded">
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
              </div>
              
              <!-- Currency Conversion -->
              <div class="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="currency in currencyItems" :key="currency.currency" class="bg-gray-700 p-4 rounded hover-scale">
                  <div class="text-sm text-gray-400">{{ currency.currency }}</div>
                  <div class="font-bold">{{ currency.formattedPrice }}</div>
                  <div class="text-xs text-gray-500">{{ currency.baseCurrency }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chart Component -->
          <div class="card">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">LAWAS/USD Price Chart</h3>
              <div class="flex space-x-2">
                <button 
                  v-for="period in chartPeriods" 
                  :key="period"
                  @click="setSelectedPeriod(period)"
                  :class="[
                    'px-3 py-1 rounded text-sm font-medium transition-colors hover-scale',
                    selectedPeriod === period 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  ]"
                >
                  {{ period }}
                </button>
              </div>
            </div>
            
            <!-- Chart Container -->
            <div class="h-96">
              <PriceChart :chart-data="chartData" :period="selectedPeriod" :is-dark-mode="true" />
            </div>
            
            <!-- OHLC Data -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div class="has-tooltip hover-scale">
                <div class="text-sm text-gray-400">Open</div>
                <div class="font-bold">${{ formatPrice(ohlcData.open) }}</div>
                <span class="tooltip">Opening price for the selected period</span>
              </div>
              <div class="has-tooltip hover-scale">
                <div class="text-sm text-gray-400">Close</div>
                <div class="font-bold">${{ formatPrice(ohlcData.close) }}</div>
                <span class="tooltip">Closing price for the selected period</span>
              </div>
              <div class="has-tooltip hover-scale">
                <div class="text-sm text-gray-400">High</div>
                <div class="font-bold">${{ formatPrice(ohlcData.high) }}</div>
                <span class="tooltip">Highest price during the selected period</span>
              </div>
              <div class="has-tooltip hover-scale">
                <div class="text-sm text-gray-400">Low</div>
                <div class="font-bold">${{ formatPrice(ohlcData.low) }}</div>
                <span class="tooltip">Lowest price during the selected period</span>
              </div>
            </div>
          </div>

          <!-- Market Stats -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div v-for="stat in marketStats" :key="stat.label" class="card text-center hover-scale">
              <h4 class="text-lg font-semibold text-gray-400 mb-2">{{ stat.label }}</h4>
              <div class="text-2xl font-bold animate-number">{{ stat.value }}</div>
            </div>
          </div>
        </div>
               
        <!-- Dexscreener Data -->
        <div v-else-if="dataSource === 'dexscreener'">
          <div class="card">
            <div class="text-center mb-6">
              <h3 class="text-xl font-bold mb-2">LAWAS Chart - Dexscreener</h3>
              <p class="text-gray-400">Real-time data from Dexscreener</p>
            </div>
            
            <!-- Dexscreener Embed -->
            <div class="dexscreener-embed">
              <iframe 
                src="https://dexscreener.com/xrpl/4C41574153000000000000000000000000000000.rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC_XRP?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                title="LAWAS Dexscreener Chart"
                class="w-full rounded-lg"
                style="height: 600px; border: 0;"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- GeckoTerminal Data -->
        <div v-else-if="dataSource === 'geckoterminal'">
          <div class="card">
            <div class="text-center mb-6">
              <h3 class="text-xl font-bold mb-2">LAWAS Chart - GeckoTerminal</h3>
              <p class="text-gray-400">Real-time data from GeckoTerminal API</p>
            </div>
            
            <!-- Loading State -->
            <div v-if="geckoLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p class="text-gray-400">Loading GeckoTerminal data...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="geckoError" class="text-center py-8">
              <div class="text-red-400 mb-4">
                <svg class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-red-400">{{ geckoError }}</p>
              <button @click="fetchGeckoData" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Retry
              </button>
            </div>

            <!-- GeckoTerminal Data Display -->
            <div v-else-if="geckoData" class="space-y-6">
              <!-- Price Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-gray-800 rounded-lg p-4">
                  <div class="text-sm text-gray-400 mb-1">Current Price</div>
                  <div class="text-xl font-bold text-primary">${{ geckoData.price_usd }}</div>
                </div>
                <div class="bg-gray-800 rounded-lg p-4">
                  <div class="text-sm text-gray-400 mb-1">24h Change</div>
                  <div :class="['text-xl font-bold', geckoData.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400']">
                    {{ geckoData.price_change_24h >= 0 ? '+' : '' }}{{ geckoData.price_change_24h }}%
                  </div>
                </div>
                <div class="bg-gray-800 rounded-lg p-4">
                  <div class="text-sm text-gray-400 mb-1">24h Volume</div>
                  <div class="text-xl font-bold">${{ formatNumber(geckoData.volume_24h) }}</div>
                </div>
                <div class="bg-gray-800 rounded-lg p-4">
                  <div class="text-sm text-gray-400 mb-1">Liquidity</div>
                  <div class="text-xl font-bold">${{ formatNumber(geckoData.reserve_usd) }}</div>
                </div>
              </div>

              <!-- Chart Embed -->
              <div class="bg-gray-800 rounded-lg p-6">
                <div class="text-center">
                  <h4 class="text-lg font-semibold mb-4">Price Chart</h4>
                  <div class="h-96 rounded-lg overflow-hidden">
                    <iframe 
                      height="100%" 
                      width="100%" 
                      id="geckoterminal-embed" 
                      title="GeckoTerminal Embed" 
                      src="https://www.geckoterminal.com/id/xrpl/pools/4C41574153000000000000000000000000000000.rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC_XRP?embed=1&info=1&swaps=1&grayscale=0&light_chart=0&chart_type=price&resolution=15m" 
                      frameborder="0" 
                      allow="clipboard-write" 
                      allowfullscreen
                      class="w-full h-full rounded-lg">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Information Section -->
    <section id="token" class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">
            Token <span class="gradient-text">Information</span>
          </h2>
          <p class="section-subtitle">
            Learn about LAWAS token, its features, and how it powers our ecosystem.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Token Details -->
          <div class="card hover-scale">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 animate-spin-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold">Token Details</h3>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Token Name</span>
                <span class="font-semibold">{{ tokenData.title }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Symbol</span>
                <span class="font-semibold">{{ tokenData.code }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Network</span>
                <span class="font-semibold">XRP Ledger</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Total Supply</span>
                <span class="font-semibold">{{ formatNumber(tokenData.total) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Circulating Supply</span>
                <span class="font-semibold">{{ formatNumber(tokenData.circulating) }}</span>
              </div>
            </div>
          </div>

          <!-- Contract Address -->
          <div class="card hover-scale">
            <ContractAddress 
              :token-data="tokenData" 
              :is-dark-mode="true" 
              @notification="showNotificationMessage" 
            />
          </div>

          <!-- Token Utility -->
          <div class="card hover-scale">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 animate-bounce-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold">Token Utility</h3>
            </div>
            <p class="text-gray-300 mb-4">
              LAWAS token serves multiple purposes within our ecosystem:
            </p>
            <div class="space-y-3">
              <div class="flex items-center hover-scale">
                <div class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span>Trading Fee Discounts</span>
              </div>
              <div class="flex items-center hover-scale">
                <div class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span>Governance Voting</span>
              </div>
              <div class="flex items-center hover-scale">
                <div class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span>Platform Rewards</span>
              </div>
              <div class="flex items-center hover-scale">
                <div class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span>Staking Benefits</span>
              </div>
              <div class="flex items-center hover-scale">
                <div class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span>Access to Premium Features</span>
              </div>
            </div>

            <button class="btn-primary w-full mt-6 hover-scale">Read Whitepaper</button>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Buy Section -->
    <section id="how-to-buy" class="py-20 bg-dark"> <!-- Using bg-dark, adjust if needed -->
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">
            How to <span class="gradient-text">Buy</span>
          </h2>
          <p class="section-subtitle">
            Follow these simple steps to buy LAWAS token on the XRP Ledger.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Step 1: Create XRP Wallet -->
          <div class="card hover-scale relative p-6">
             <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold">1</div>
             <div class="flex justify-center mb-4 mt-4">
                <!-- Wallet Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m12 0V6a3 3 0 00-3-3H9a3 3 0 00-3 3v3h12z" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Create XRP Wallet</h3>
            <p class="text-gray-300 text-sm text-center">
              Create an XRP Ledger wallet using XUMM, Sologenic, or any other XRPL-compatible wallet. Fund your wallet with a minimum of 10 XRP for account activation.
            </p>
          </div>

          <!-- Step 2: Set Trustline -->
          <div class="card hover-scale relative p-6">
            <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold">2</div>
             <div class="flex justify-center mb-4 mt-4">
                <!-- Trustline Icon -->
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Set Trustline</h3>
            <p class="text-gray-300 text-sm text-center">
              Establish a trustline to LAWAS token in your XRP Ledger wallet. This allows you to hold LAWAS tokens and ensures secure transactions.
            </p>
            <button class="btn-primary w-full mt-4 hover-scale" @click="redirectToXPM">Set Trustline</button>
          </div>

          <!-- Step 3: Buy LAWAS -->
          <div class="card hover-scale relative p-6">
            <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold">3</div>
             <div class="flex justify-center mb-4 mt-4">
                <!-- Buy Icon -->
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.794 2.101c.745.185 1.485-.355 1.485-1.101v-1.5L21.75 15V4.75a2.25 2.25 0 00-2.25-2.25H15a3 3 0 01-3-3V2.25A2.25 2.25 0 009.75 0H4.5A2.25 2.25 0 002.25 2.25v16.5z" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Buy LAWAS</h3>
            <p class="text-gray-300 text-sm text-center">
              Purchase LAWAS tokens on supported decentralized exchanges (DEXs) or through trusted liquidity providers. Ensure you are using the correct token address.
            </p>
            <button class="btn-primary w-full mt-4 hover-scale" @click="redirectToXPM">Buy LAWAS</button>
          </div>

          <!-- Step 4: Secure Your Assets -->
          <div class="card hover-scale relative p-6">
            <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold">4</div>
             <div class="flex justify-center mb-4 mt-4">
                <!-- Secure Icon -->
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.959 11.959 0 0112 2.714z" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Secure Your Assets</h3>
            <p class="text-gray-300 text-sm text-center">
              Store your LAWAS tokens securely in your XRP Ledger wallet. Consider using a hardware wallet for enhanced security.
            </p>
            <button class="btn-secondary w-full mt-4 hover-scale">Learn About Security</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-dark-lighter">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">
            Frequently Asked <span class="gradient-text">Questions</span>
          </h2>
          <p class="section-subtitle">
            Find answers to common questions about LAWAS token and its ecosystem.
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
            <button 
              class="w-full text-left p-4 bg-gray-800 rounded-lg flex justify-between items-center focus:outline-none hover:bg-gray-700 transition-colors duration-300"
              @click="toggleFaq(index)"
            >
              <span class="font-semibold text-lg">{{ faq.question }}</span>
              <svg 
                :class="{'rotate-180': faq.open}" 
                class="w-6 h-6 transform transition-transform duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="faq.open" class="p-4 bg-gray-700 rounded-b-lg text-gray-300">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">
            Get in <span class="gradient-text">Touch</span>
          </h2>
          <p class="section-subtitle">
            Have questions or need support? Reach out to us.
          </p>
        </div>

        <div class="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-300 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" v-model="form.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600" required>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600" required>
            </div>
            <div class="mb-6">
              <label for="message" class="block text-gray-300 text-sm font-bold mb-2">Message</label>
              <textarea id="message" v-model="form.message" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600" required></textarea>
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="btn-primary w-full">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark-lighter py-8 text-center text-gray-400">
      <div class="container mx-auto px-4">
        <p>&copy; 2024 LAWAS. All rights reserved.</p>
        <div class="flex justify-center space-x-4 mt-4">
          <a href="#" class="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>


  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PriceChart from '@/components/PriceChart.vue'
import ContractAddress from '@/components/ContractAddress.vue'


/**
 * * State
 */
const selectedCurrency = ref("USD")
const selectedPeriod = ref("1D")
const chartPeriods = ["1D", "1W", "1M", "1Y", "ALL"]
const dataSource = ref("xpm") // Default to XPM Market

// GeckoTerminal state
const geckoData = ref(null)
const geckoLoading = ref(false)
const geckoError = ref(null)

const tokenData = ref({
  title: "LAWAS",
  code: "LAWAS",
  total: 100000000000,
  circulating: 0,
  priceUsd: 0,
  marketcap: 0,
  holders: 0,
  trustlines: 0,
  change24h: 0,
  issuer: "rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC"
})

const chartData = ref([])
const currencyRates = ref({})

const ohlcData = ref({
  open: 0.000001250,
  high: 0.000001280,
  close: 0.000001260,
  low: 0.000001240
})

const faqs = ref([
  {
    question: "What is LAWAS token?",
    answer: "LAWAS token is a digital asset built on the XRP Ledger, designed for secure and efficient cross-border transactions. It aims to provide institutional-grade security and reliability.",
    open: false
  },
  {
    question: "How can I buy LAWAS token?",
    answer: "You can buy LAWAS token by first creating an XRP Ledger wallet, setting a trustline to LAWAS, and then purchasing it on supported decentralized exchanges (DEXs) or through trusted liquidity providers.",
    open: false
  },
  {
    question: "What are the use cases for LAWAS token?",
    answer: "LAWAS token offers various utilities including trading fee discounts, governance voting rights, platform rewards, staking benefits, and access to premium features within our ecosystem.",
    open: false
  },
  {
    question: "Is LAWAS token secure?",
    answer: "Yes, LAWAS token leverages the robust security features of the XRP Ledger. We also recommend users to store their tokens in secure XRP Ledger wallets, preferably hardware wallets, for enhanced security.",
    open: false
  }
])

const form = ref({
  name: "",
    email: "", message: ""
})

/**
 * * Computed properties
 */
const marketCap = computed(() => {
  return formatNumber(tokenData.value.marketcap)
})

const holders = computed(() => {
  return tokenData.value.holders
})

const trustlines = computed(() => {
  return tokenData.value.trustlines
})

const currentPrice = computed(() => {
  return tokenData.value.priceUsd
})

const currencyItems = computed(() => {
  const currencies = ["IDR", "EUR", "JPY", "GBP"]
  return currencies.map(currency => {
    const rate = currencyRates.value[currency] || 1
    return {
      currency,
      price: tokenData.value.priceUsd * rate,
      formattedPrice: formatPrice(tokenData.value.priceUsd * rate),
      baseCurrency: currency
    }
  })
})

const marketStats = computed(() => {
  return [
    {
      label: 'Current Price',
      value: `${selectedCurrency.value === 'IDR' ? 'Rp' : '$'}${formatPrice(tokenData.value.priceUsd * (selectedCurrency.value === 'IDR' ? currencyRates.value['IDR'] : 1))}`,
      change: parseFloat(tokenData.value.change24h).toFixed(1),
      period: '24h'
    },
    {
      label: 'Market Cap',
      value: `$${formatNumber(tokenData.value.marketcap)}`,
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
})


/**
 * * Methods
 */
const getDotStyle = (index) => {
  const angle = (index * 30) * (Math.PI / 180) // Convert to radians
  const radius = 130; // Orbit radius in pixels
  const centerX = 50 // Center position (50% of container)
  const centerY = 50 // Center position (50% of container)
  
 // Calculate x and y positions using trigonometry
  const x = centerX + (radius * Math.cos(angle)) / 3.2 // Adjust for percentage
  const y = centerY + (radius * Math.sin(angle)) / 3.2 // Adjust for percentage
  
  return {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    opacity: index % 2 === 0 ? 0.8 : 0.4,
    animation: `orbitPulse ${2 + (index * 0.1)}s ease-in-out infinite`,
  }
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  }
  return num.toLocaleString()
}

const formatPrice = (price) => {
  if (!price || isNaN(price)) return '0.00000000'
  
  if (price < 0.000001) {
    // For very small numbers, use fixed notation instead of scientific
    return price.toFixed(10).replace(/\.?0+$/, '')
  }
  return price.toFixed(8).replace(/\.?0+$/, '')
}

const fetchTokenData = async () => {
  try {
    const response = await fetch('https://api.xpmarket.com/api/currency/widget?token=LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC')
    const data = await response.json()
    
    if (data.success) {
      tokenData.value = { 
        ...tokenData.value, 
        ...data.data,
        // Ensure priceUsd is a number and not scientific notation
        priceUsd: Number(data.data.priceUsd)
      }
    }
  } catch (error) {
    console.error("Error fetching token data:", error)
  }
}

const fetchChartData = async (period = '1d') => {
  try {
    const response = await fetch(`https://api.xpmarket.com/api/currency/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC/prices/${period}`)
    const data = await response.json()
    
    if (data.success) {
      // Ensure we're working with proper numbers, not scientific notation
      chartData.value = data.data.map(item => ({
        x: item.x,
        y: Number(item.y)
      }))
    }
  } catch (error) {
    console.error("Error fetching chart data:", error)
  }
}

const fetchCurrencyRates = async () => {
  try {
    const response = await fetch('https://api.xpmarket.com/api/stats/main')
    const data = await response.json()
    
    if (data.success) {
      // Convert array of rates to object for easier access
      const rates = {}
      data.rates.forEach(rate => {
        rates[rate.iso] = parseFloat(rate.rate)
      })
      
      currencyRates.value = rates
    }
  } catch (error) {
    console.error("Error fetching currency rates:", error)
  }
}

const setSelectedPeriod = (period) => {
  
  let param = period
  if (period == '1W') {
    param = '7d'
  } else if (period == '1M') {
    param = '30d'
  } else if (period == '1Y') {
    param = '365d'
  }
  selectedPeriod.value = period

  fetchChartData(param.toLowerCase())
}

const setDataSource = (source) => {
  dataSource.value = source
  if (source === 'geckoterminal') {
    fetchGeckoData()
  }
}

// Fetch GeckoTerminal data
const fetchGeckoData = async () => {
  geckoLoading.value = true
  geckoError.value = null
  
  try {
    const poolAddress = '4C41574153000000000000000000000000000000.rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC_XRP'
    const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/xrpl/pools/${poolAddress}`, {
      headers: {
        'Accept': 'application/json;version=20230302'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.data && data.data.attributes) {
      const pool = data.data.attributes
      geckoData.value = {
        price_usd: parseFloat(pool.base_token_price_usd || 0).toFixed(8),
        price_change_24h: parseFloat(pool.price_change_percentage?.h24 || 0).toFixed(2),
        volume_24h: parseFloat(pool.volume_usd?.h24 || 0),
        reserve_usd: parseFloat(pool.reserve_in_usd || 0),
        market_cap: parseFloat(pool.market_cap_usd || 0),
        transactions_24h: pool.transactions?.h24?.buys + pool.transactions?.h24?.sells || 0
      }
    } else {
      throw new Error('Invalid data format from GeckoTerminal API')
    }
  } catch (error) {
    console.error('Error fetching GeckoTerminal data:', error)
    geckoError.value = error.message || 'Failed to fetch data from GeckoTerminal'
  } finally {
    geckoLoading.value = false
  }
}



const redirectToXPM = () => {
  window.open(`https://xpmarket.com/token/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC`, '_blank').focus();
}

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}

const submitForm = () => {
  console.log('Form submitted:', form.value)
  showNotificationMessage('Message sent successfully!')
  form.value = { name: '', email: '', message: '' }
}

/**
 * * Watchers
 */
// Watch for currency changes
watch(selectedCurrency, (newCurrency) => {
})


/**
 * * Hooks
 */
// Lifecycle
onMounted(async () => {
  await fetchTokenData()
  await fetchChartData(selectedPeriod.value.toLowerCase())
  await fetchCurrencyRates()
  
  // Set up real-time updates
  setInterval(async () => {
    await fetchTokenData()
    await fetchChartData(selectedPeriod.value.toLowerCase())
  }, 60000) // Update every 60 seconds
  
  // Animate numbers on load
  const animateNumbers = document.querySelectorAll('.animate-number')
  animateNumbers.forEach(el => {
    el.classList.add('number-animation')
  })
})
</script>

<style scoped>
/* Enhanced animations for numbers */
.animate-number {
  position: relative;
  display: inline-block;
}

.number-animation {
  animation: numberPop 0.5s ease-out;
}

@keyframes numberPop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Bar chart animations */
.animate-bar-1 {
  animation: barGrow 1.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.1s;
}

.animate-bar-2 {
  animation: barGrow 1.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.2s;
}

.animate-bar-3 {
  animation: barGrow 1.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.3s;
}

.animate-bar-4 {
  animation: barGrow 1.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.4s;
}

.animate-bar-5 {
  animation: barGrow 1.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.5s;
}

.animate-bar-6 {
  animation: barGrow 1.5s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.6s;
}

@keyframes barGrow {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Floating animations */
.animate-float-1 {
  animation: float1 4s ease-in-out infinite;
}

.animate-float-2 {
  animation: float2 5s ease-in-out infinite;
}

.animate-float-3 {
  animation: float3 6s ease-in-out infinite;
}

.animate-float-4 {
  animation: float4 7s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-15px) translateX(10px);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(15px) translateX(-10px);
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(-15px);
  }
}

@keyframes float4 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(10px) translateX(15px);
  }
}

/* Spin animation */
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Bounce animation */
.animate-bounce-slow {
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Rotate animation */
.animate-rotate-slow {
  animation: rotateSlow 20s linear infinite;
}

@keyframes rotateSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Orbit pulse animation for dots */
@keyframes orbitPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

/* Orbit rotation animation */
.animate-orbit-rotation {
  animation: orbitRotation 30s linear infinite;
}

@keyframes orbitRotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


