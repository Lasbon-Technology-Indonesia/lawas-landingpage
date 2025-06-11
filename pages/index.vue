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
            <div class="relative w-128 h-128">
              <!-- Pulsing Gradient Background -->
              <div class="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 animate-pulse-slow"></div>

              <!-- White Transparent Inner Circle with Logo -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-96 h-96 rounded-full bg-white bg-opacity-10 flex items-center justify-center logo-pulse">
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
            <div class="text-gray-400 text-lg">People Joined</div>
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
        </div>
        
        <!-- Current Price Display -->
        <div class="card mb-8">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div class="md:col-span-2">
              <h3 class="text-lg font-semibold text-gray-400 mb-2">Current Price</h3>
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold animate-number">${{ formatPrice(currentPrice) }}</div>
                <select v-model="selectedCurrency" class="bg-gray-700 text-white px-3 py-2 rounded">
                  <option value="USD">USD</option>
                  <!-- <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option> -->
                </select>
                <div class="text-green-400 font-semibold">+5.2% ↗</div>
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
            <div :class="stat.change >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm">
              {{ stat.change >= 0 ? '+' : '' }}{{ stat.change }}% ({{ stat.period }})
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
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Set Trustline</h3>
            <p class="text-gray-300 text-sm text-center">
              Set a trustline to the LAWAS token issuer address. This allows your wallet to hold LAWAS tokens. Click the "Set Trustline" button on our website to do this easily.
            </p>
          </div>

          <!-- Step 3: Buy on DEX -->
          <div class="card hover-scale relative p-6">
             <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold">3</div>
             <div class="flex justify-center mb-4 mt-4">
                <!-- DEX Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Buy on DEX</h3>
            <p class="text-gray-300 text-sm text-center">
              Use the XRP Ledger\'s built-in decentralized exchange (DEX) to swap XRP for LAWAS tokens. You can do this through your wallet app or through services like XPMarket.
            </p>
          </div>

          <!-- Step 4: Store Securely -->
          <div class="card hover-scale relative p-6">
             <div class="absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold">4</div>
             <div class="flex justify-center mb-4 mt-4">
                <!-- Secure Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
             </div>
            <h3 class="text-xl font-bold mb-3 text-center">Store Securely</h3>
            <p class="text-gray-300 text-sm text-center">
              After purchasing, your LAWAS tokens will be stored in your XRP wallet. Make sure to keep your recovery phrase and private keys secure.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Holders Section -->
    <section id="holders" class="py-20 bg-dark-lighter">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">
            Token <span class="gradient-text">Holders</span>
          </h2>
          <p class="section-subtitle">
            Explore the distribution of LAWAS token holders and community growth.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Holders Growth -->
          <div class="card hover-scale">
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 animate-spin-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="text-xl font-bold">Holders Growth</h3>
            </div>
            <div class="text-4xl font-bold gradient-text mb-4 animate-number">{{ holders }}</div>
            <div class="h-32 bg-gray-700 rounded mb-4 flex items-end justify-between px-2 pb-2">
              <!-- Enhanced bar chart representation with animation -->
              <div class="w-8 bg-primary h-8 rounded-t transform transition-all duration-700 hover:h-10 animate-bar-1"></div>
              <div class="w-8 bg-primary h-12 rounded-t transform transition-all duration-700 hover:h-14 animate-bar-2"></div>
              <div class="w-8 bg-primary h-16 rounded-t transform transition-all duration-700 hover:h-18 animate-bar-3"></div>
              <div class="w-8 bg-primary h-20 rounded-t transform transition-all duration-700 hover:h-22 animate-bar-4"></div>
              <div class="w-8 bg-primary h-24 rounded-t transform transition-all duration-700 hover:h-26 animate-bar-5"></div>
              <div class="w-8 bg-primary h-28 rounded-t transform transition-all duration-700 hover:h-30 animate-bar-6"></div>
            </div>
            <p class="text-gray-300">
              The LAWAS community has been growing steadily since launch, with new holders joining every day. 
              Our goal is to reach 1,000 holders by the end of the year.
            </p>
          </div>

          <!-- Holders Distribution -->
          <div class="card hover-scale">
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3 animate-bounce-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold">Holders Distribution</h3>
            </div>
            
            <!-- Pie Chart Representation with enhanced hover effects -->
            <div class="flex justify-center mb-6">
              <div class="relative w-48 h-48 transform transition-all duration-500 hover:scale-110 animate-rotate-slow">
                <div class="absolute inset-0 rounded-full" style="background: conic-gradient(#00c2b3 0deg 234deg, #3498db 234deg 324deg, #9b59b6 324deg 353deg, #e74c3c 353deg 360deg);"></div>
                <div class="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-2xl font-bold animate-number">{{ holders }}</div>
                    <div class="text-sm text-gray-400">Total</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between hover-scale">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-primary rounded-full mr-2 animate-pulse"></div>
                  <span class="text-sm">Small Holders</span>
                </div>
                <span class="font-semibold">65% (282 holders)</span>
              </div>
              <div class="text-xs text-gray-400 ml-5">< 10,000 LAWAS</div>
              
              <div class="flex items-center justify-between hover-scale">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-secondary rounded-full mr-2 animate-pulse"></div>
                  <span class="text-sm">Medium Holders</span>
                </div>
                <span class="font-semibold">25% (108 holders)</span>
              </div>
              <div class="text-xs text-gray-400 ml-5">10,000 - 100,000 LAWAS</div>
              
              <div class="flex items-center justify-between hover-scale">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  <span class="text-sm">Large Holders</span>
                </div>
                <span class="font-semibold">8% (35 holders)</span>
              </div>
              <div class="text-xs text-gray-400 ml-5">100,000 - 1,000,000 LAWAS</div>
              
              <div class="flex items-center justify-between hover-scale">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span class="text-sm">Whales</span>
                </div>
                <span class="font-semibold">2% (8 holders)</span>
              </div>
              <div class="text-xs text-gray-400 ml-5">> 1,000,000 LAWAS</div>
            </div>

            <p class="text-gray-300 text-sm mt-4">
              The distribution of LAWAS tokens shows a healthy balance between retail investors and larger stakeholders, 
              ensuring good token circulation and reduced risk of price manipulation.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import PriceChart from '~/components/PriceChart.vue'
import ContractAddress from '~/components/ContractAddress.vue'

/**
 * * Variables
 */
const tokenData = ref({
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
})

const chartData = ref([])
const selectedPeriod = ref('1D')
const selectedCurrency = ref('USD')
const chartPeriods = ['1D', '1W', '1M', '1Y']
const currencyRates = ref({})

const ohlcData = ref({
  open: 0.000001240,
  close: 0.000002350,
  high: 0.000002350,
  low: 0.000001240
})

// Computed properties
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
  const currencies = ['IDR', 'EUR', 'JPY', 'GBP']
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
      value: `$${formatPrice(tokenData.value.priceUsd)}`,
      change: 5.2,
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
  const radius_percentage = (208 / 256) * 50; // Calculate radius as percentage of container half-width/height
  const centerX = 50 // Center position (50% of container)
  const centerY = 50 // Center position (50% of container)
  
  // Calculate x and y positions using trigonometry
  const x = centerX + (radius_percentage * Math.cos(angle))
  const y = centerY + (radius_percentage * Math.sin(angle))
  
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
      showNotificationMessage('Price data updated')
    }
  } catch (error) {
    console.error('Error fetching token data:', error)
    showNotificationMessage('Failed to fetch token data', true)
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
    console.error('Error fetching chart data:', error)
    showNotificationMessage('Failed to fetch chart data', true)
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
    console.error('Error fetching currency rates:', error)
    showNotificationMessage('Failed to fetch currency rates', true)
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
  showNotificationMessage(`Chart period changed to ${period}`)
}

const showNotificationMessage = (message, isError = false) => {
  // Emit notification event to parent component
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { message, isError } 
    }))
  }
}

const redirectToXPM = () => {
  window.open(`https://xpmarket.com/token/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC`, '_blank').focus();
}


/**
 * * Watchers
 */
// Watch for currency changes
watch(selectedCurrency, (newCurrency) => {
  showNotificationMessage(`Currency changed to ${newCurrency}`)
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
