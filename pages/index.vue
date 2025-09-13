<template>
  <div>
    <!-- ============================== HERO ============================== -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              <div class="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 animate-pulse-slow"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-80 h-80 rounded-full bg-white/10 flex items-center justify-center logo-pulse">
                  <img src="/lawas-logo.png" alt="LAWAS Logo" class="w-64 h-64 object-contain" />
                </div>
              </div>
              <div class="absolute top-4 right-4 w-4 h-4 bg-white rounded-full opacity-60 animate-float-1"></div>
              <div class="absolute bottom-8 left-8 w-3 h-3 bg-primary rounded-full opacity-80 animate-float-2"></div>
              <div class="absolute top-1/2 left-4 w-2 h-2 bg-secondary rounded-full opacity-70 animate-float-3"></div>
              <div class="absolute bottom-4 right-12 w-3 h-3 bg-white rounded-full opacity-50 animate-float-4"></div>
              <div class="absolute inset-0 origin-center will-change-transform animate-orbit-rotation">
                <div v-for="i in 12" :key="i" class="absolute w-3 h-3 bg-white rounded-full" :style="getDotStyle(i - 1)"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
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

    <!-- ============================== CHART ============================== -->
    <section id="chart" class="py-20 bg-dark-lighter">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">Price <span class="gradient-text">Chart</span></h2>
          <p class="section-subtitle">Track LAWAS token performance with real-time price charts and market data.</p>

        <!-- Toggle -->
        <div class="flex justify-center mt-8 mb-8">
          <div class="bg-gray-800 rounded-lg p-1 flex">
            <button @click="setDataSource('xpm')"          :class="['chip', dataSource === 'xpm' ? 'chip--active' : '']">XPM Market</button>
            <button @click="setDataSource('dexscreener')"   :class="['chip', dataSource === 'dexscreener' ? 'chip--active' : '']">Dexscreener</button>
            <button @click="setDataSource('geckoterminal')" :class="['chip', dataSource === 'geckoterminal' ? 'chip--active' : '']">GeckoTerminal</button>
          </div>
        </div>
        </div>

        <!-- XPM -->
        <div v-if="dataSource === 'xpm'">
          <div class="card mb-8">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div class="md:col-span-2">
                <h3 class="text-lg font-semibold text-gray-400 mb-2">Current Price</h3>
                <div class="flex items-center justify-between">
                  <div class="text-3xl font-bold animate-number">
                    {{ selectedCurrency === 'IDR' ? 'Rp' : '$' }}{{ formatPrice(currentPrice * (selectedCurrency === 'IDR' ? currencyRates['IDR'] : 1)) }}
                  </div>
                  <select v-model="selectedCurrency" class="select">
                    <option value="USD">USD</option><option value="IDR">IDR</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="JPY">JPY</option>
                  </select>
                </div>
              </div>
              <div class="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="c in currencyItems" :key="c.currency" class="tile">
                  <div class="text-sm text-gray-400">{{ c.currency }}</div>
                  <div class="font-bold">{{ c.formattedPrice }}</div>
                  <div class="text-xs text-gray-500">{{ c.baseCurrency }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">LAWAS/USD Price Chart</h3>
              <div class="flex space-x-2">
                <button v-for="p in chartPeriods" :key="p" @click="setSelectedPeriod(p)" :class="['chip', selectedPeriod === p ? 'chip--active' : '']">{{ p }}</button>
              </div>
            </div>

            <div class="h-96">
              <PriceChart :chart-data="chartData" :period="selectedPeriod" :is-dark-mode="true" />
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div class="has-tooltip hover-scale"><div class="text-sm text-gray-400">Open</div>  <div class="font-bold">${{ formatPrice(ohlcData.open) }}</div></div>
              <div class="has-tooltip hover-scale"><div class="text-sm text-gray-400">Close</div> <div class="font-bold">${{ formatPrice(ohlcData.close) }}</div></div>
              <div class="has-tooltip hover-scale"><div class="text-sm text-gray-400">High</div>  <div class="font-bold">${{ formatPrice(ohlcData.high) }}</div></div>
              <div class="has-tooltip hover-scale"><div class="text-sm text-gray-400">Low</div>   <div class="font-bold">${{ formatPrice(ohlcData.low) }}</div></div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div v-for="stat in marketStats" :key="stat.label" class="card text-center hover-scale">
              <h4 class="text-lg font-semibold text-gray-400 mb-2">{{ stat.label }}</h4>
              <div class="text-2xl font-bold animate-number">{{ stat.value }}</div>
            </div>
          </div>
        </div>

        <!-- Dexscreener -->
        <div v-else-if="dataSource === 'dexscreener'">
          <div class="card">
            <div class="text-center mb-6">
              <h3 class="text-xl font-bold mb-2">LAWAS Chart - Dexscreener</h3>
              <p class="text-gray-400">Real-time data from Dexscreener</p>
            </div>
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

        <!-- GeckoTerminal -->
        <div v-else-if="dataSource === 'geckoterminal'">
          <div class="card">
            <div class="text-center mb-6">
              <h3 class="text-xl font-bold mb-2">LAWAS Chart - GeckoTerminal</h3>
              <p class="text-gray-400">Real-time data from GeckoTerminal API</p>
            </div>

            <div v-if="geckoLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p class="text-gray-400">Loading GeckoTerminal data...</p>
            </div>

            <div v-else-if="geckoError" class="text-center py-8">
              <div class="text-red-400 mb-4">
                <svg class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-red-400">{{ geckoError }}</p>
              <button @click="fetchGeckoData" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Retry</button>
            </div>

            <div v-else-if="geckoData" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="tile"><div class="text-sm text-gray-400 mb-1">Current Price</div><div class="text-xl font-bold text-primary">${{ geckoData.price_usd }}</div></div>
                <div class="tile"><div class="text-sm text-gray-400 mb-1">24h Change</div><div :class="['text-xl font-bold', geckoData.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400']">{{ geckoData.price_change_24h >= 0 ? '+' : '' }}{{ geckoData.price_change_24h }}%</div></div>
                <div class="tile"><div class="text-sm text-gray-400 mb-1">24h Volume</div><div class="text-xl font-bold">${{ formatNumber(geckoData.volume_24h) }}</div></div>
                <div class="tile"><div class="text-sm text-gray-400 mb-1">Liquidity</div><div class="text-xl font-bold">${{ formatNumber(geckoData.reserve_usd) }}</div></div>
              </div>
              <div class="bg-gray-800 rounded-lg p-6">
                <div class="text-center">
                  <h4 class="text-lg font-semibold mb-4">Price Chart</h4>
                  <div class="h-[600px] rounded-lg overflow-hidden">
                    <iframe
                      height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed"
                      src="https://www.geckoterminal.com/id/xrpl/pools/4C41574153000000000000000000000000000000.rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC_XRP?embed=1&info=1&swaps=1&grayscale=0&light_chart=0&chart_type=price&resolution=15m"
                      frameborder="0" allow="clipboard-write" allowfullscreen class="w-full h-full rounded-lg">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ============================== TOKEN INFO ============================== -->
    <section id="token" class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">Token <span class="gradient-text">Information</span></h2>
          <p class="section-subtitle">Learn about LAWAS token, its features, and how it powers our ecosystem.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Token Details -->
          <div class="card hover-scale">
            <div class="flex items-center mb-5">
              <div class="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold">Token Details</h3>
            </div>

            <div class="space-y-2">
              <div class="row"><span class="row__label">Token Name</span><span class="row__value">{{ tokenData.title }}</span></div>
              <div class="row"><span class="row__label">Symbol</span><span class="row__value">{{ tokenData.code }}</span></div>
              <div class="row"><span class="row__label">Network</span><span class="row__value">XRPL (Primary)</span></div>
              <div class="row"><span class="row__label">Total Supply</span><span class="row__value">{{ formatNumber(tokenData.total) }}</span></div>
              <div class="row"><span class="row__label">Circulating Supply</span><span class="row__value">{{ formatNumber(tokenData.circulating) }}</span></div>
              <div class="row"><span class="row__label">Other Networks</span><span class="row__value">BSC • SOL • ARB • BASE • ETH • TON • SUI</span></div>
            </div>
          </div>

          <!-- Contract Addresses (no selector, no badges, only grid) -->
          <div class="card hover-scale">
            <div class="flex items-center mb-5">
              <div class="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold">Contract Addresses</h3>
            </div>

            <!-- hanya grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="item in tokenAddresses" :key="item.short" class="address-tile">
                <div class="flex items-center justify-between mb-1">
                  <div>
                    <div class="text-xs text-gray-400">{{ item.short }}</div>
                    <div class="font-semibold">{{ item.chain }}</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <a v-if="item.explorer" :href="item.explorer" target="_blank" rel="noopener" class="tile-link">Open in Explorer</a>
                    <button class="btn-ghost btn-ghost-xs" @click="copyToClipboard(item.address)">Copy</button>
                  </div>
                </div>
                <div class="mono text-xs text-gray-300">{{ shortAddress(item.address) }}</div>
              </div>
            </div>
          </div>

          <!-- Token Utility -->
          <div class="card hover-scale">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 animate-bounce-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold">Token Utility</h3>
            </div>
            <p class="text-gray-300 mb-4">LAWAS token serves multiple purposes within our ecosystem:</p>
            <ul class="space-y-3">
              <li class="flex items-center hover-scale"><i class="dot"></i><span>Trading Fee Discounts</span></li>
              <li class="flex items-center hover-scale"><i class="dot"></i><span>Governance Voting</span></li>
              <li class="flex items-center hover-scale"><i class="dot"></i><span>Platform Rewards</span></li>
              <li class="flex items-center hover-scale"><i class="dot"></i><span>Staking Benefits</span></li>
              <li class="flex items-center hover-scale"><i class="dot"></i><span>Access to Premium Features</span></li>
            </ul>
            <button class="btn-primary w-full mt-6 hover-scale">Read Whitepaper</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== HOW TO BUY ============================== -->
    <section id="how-to-buy" class="py-20 bg-dark">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">How to <span class="gradient-text">Buy</span></h2>
          <p class="section-subtitle">Follow these simple steps to buy LAWAS token on the XRP Ledger.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="card hover-scale relative p-6">
            <div class="step">1</div>
            <div class="flex justify-center mb-4 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m12 0V6a3 3 0 00-3-3H9a3 3 0 00-3 3v3h12z" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-center">Create XRP Wallet</h3>
            <p class="text-gray-300 text-sm text-center">Create an XRPL wallet using XUMM, Sologenic, or other XRPL-compatible wallets. Fund with minimum 10 XRP for activation.</p>
          </div>

          <div class="card hover-scale relative p-6">
            <div class="step">2</div>
            <div class="flex justify-center mb-4 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-center">Set Trustline</h3>
            <p class="text-gray-300 text-sm text-center">Set a trustline to LAWAS in your XRPL wallet to hold LAWAS securely.</p>
            <button class="btn-primary w-full mt-4 hover-scale" @click="redirectToXPM">Set Trustline</button>
          </div>

          <div class="card hover-scale relative p-6">
            <div class="step">3</div>
            <div class="flex justify-center mb-4 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.794 2.101c.745.185 1.485-.355 1.485-1.101v-1.5L21.75 15V4.75a2.25 2.25 0 00-2.25-2.25H15a3 3 0 01-3-3V2.25A2.25 2.25 0 009.75 0H4.5A2.25 2.25 0 002.25 2.25v16.5z" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-center">Buy LAWAS</h3>
            <p class="text-gray-300 text-sm text-center">Buy LAWAS on supported DEXs or trusted liquidity providers. Always verify token address.</p>
            <button class="btn-primary w-full mt-4 hover-scale" @click="redirectToXPM">Buy LAWAS</button>
          </div>

          <div class="card hover-scale relative p-6">
            <div class="step">4</div>
            <div class="flex justify-center mb-4 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-center">Secure Your Assets</h3>
            <p class="text-gray-300 text-sm text-center">Store your LAWAS in secure wallets; consider hardware wallets for extra safety.</p>
            <button class="btn-secondary w-full mt-4 hover-scale">Learn About Security</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== FAQ ============================== -->
    <section id="faq" class="py-20 bg-dark-lighter">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>
          <p class="section-subtitle">Find answers to common questions about LAWAS token and its ecosystem.</p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div v-for="(faq, idx) in faqs" :key="idx" class="mb-4">
            <button class="w-full text-left p-4 bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors" @click="toggleFaq(idx)">
              <span class="font-semibold text-lg">{{ faq.question }}</span>
              <svg :class="{'rotate-180': faq.open}" class="w-6 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div v-if="faq.open" class="p-4 bg-gray-700 rounded-b-lg text-gray-300">{{ faq.answer }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== CONTACT ============================== -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="section-title">Get in <span class="gradient-text">Touch</span></h2>
        </div>
        <div class="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-300 text-sm font-bold mb-2">Name</label>
              <input id="name" v-model="form.name" type="text" class="input" required>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input id="email" v-model="form.email" type="email" class="input" required>
            </div>
            <div class="mb-6">
              <label for="message" class="block text-gray-300 text-sm font-bold mb-2">Message</label>
              <textarea id="message" v-model="form.message" rows="5" class="input" required></textarea>
            </div>
            <button type="submit" class="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>

    <!-- ============================== FOOTER ============================== -->
    <footer class="bg-dark-lighter py-8 text-center text-gray-400">
      <div class="container mx-auto px-4">
        <p>&copy; 2024 LAWAS. All rights reserved.</p>
        <div class="flex justify-center space-x-4 mt-4">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import PriceChart from '@/components/PriceChart.vue'

/* ------ State ------ */
const selectedCurrency = ref('USD')
const selectedPeriod = ref('1D')
const chartPeriods = ['1D', '1W', '1M', '1Y', 'ALL']
const dataSource = ref('xpm')

/* ------ Token & Market ------ */
const geckoData = ref(null)
const geckoLoading = ref(false)
const geckoError = ref(null)

const tokenData = ref({
  title: 'LAWAS',
  code: 'LAWAS',
  total: 100000000000,
  circulating: 0,
  priceUsd: 0,
  marketcap: 0,
  holders: 0,
  trustlines: 0,
  change24h: 0,
  issuer: 'rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC'
})

/* ------ Multi-chain addresses ------ */
const tokenAddresses = ref([
  { chain: 'XRP Ledger', short: 'XRPL', type: 'Issuer',   address: 'rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC', currency: 'LAWAS', explorer: 'https://livenet.xrpl.org/accounts/rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC' },
  { chain: 'BNB Smart Chain', short: 'BSC', type: 'Contract', address: '0xC6E6b78A08613768572255BC859204542346b879', currency: 'LAWAS', explorer: 'https://bscscan.com/token/0xC6E6b78A08613768572255BC859204542346b879' },
  { chain: 'Solana', short: 'SOL', type: 'Mint', address: 'G32DYT2PpDsq5t8RLPVHMagtBKYAa2DSohFhkSjJs7C6', currency: 'LAWAS', explorer: 'https://solscan.io/token/G32DYT2PpDsq5t8RLPVHMagtBKYAa2DSohFhkSjJs7C6' },
  { chain: 'Arbitrum One', short: 'ARB', type: 'Contract', address: '0x31a531666e0e391e83eb64cda5d9f8633347e5ea', currency: 'LAWAS', explorer: 'https://arbiscan.io/token/0x31a531666e0e391e83eb64cda5d9f8633347e5ea' },
  { chain: 'Base', short: 'BASE', type: 'Contract', address: '0x31a531666e0e391e83eb64cda5d9f8633347e5ea', currency: 'LAWAS', explorer: 'https://basescan.org/token/0x31a531666e0e391e83eb64cda5d9f8633347e5ea' },
  { chain: 'Ethereum', short: 'ETH', type: 'Contract', address: '0x31a531666e0e391e83eb64cda5d9f8633347e5ea', currency: 'LAWAS', explorer: 'https://etherscan.io/token/0x31a531666e0e391e83eb64cda5d9f8633347e5ea' },
  { chain: 'TON Network', short: 'TON', type: 'Jetton', address: 'UQAvljuNWp_K9lioD1GQ4pQw1mALhG9u6s8PkqkEkjg1_84_', currency: 'LAWAS', explorer: 'https://tonviewer.com/UQAvljuNWp_K9lioD1GQ4pQw1mALhG9u6s8PkqkEkjg1_84_' },
  { chain: 'Sui', short: 'SUI', type: 'Object', address: '0xd78f9894aa38030af550289da46e1c1515dc8450813c6d91254ac6fbcf52b7bd::lawas::LAWAS', currency: 'LAWAS', explorer: 'https://suiexplorer.com/object/0xd78f9894aa38030af550289da46e1c1515dc8450813c6d91254ac6fbcf52b7bd?module=lawas&network=mainnet' }
])

/* ------ Chart & currency ------ */
const chartData = ref([])
const currencyRates = ref({})
const ohlcData = ref({ open: 0.00000125, high: 0.00000128, close: 0.00000126, low: 0.00000124 })

/* ------ FAQs & Contact ------ */
const faqs = ref([
  { question: 'What is LAWAS token?', answer: 'LAWAS token is a digital asset built on the XRP Ledger, designed for secure and efficient cross-border transactions. It aims to provide institutional-grade security and reliability.', open: false },
  { question: 'How can I buy LAWAS token?', answer: 'Create an XRP Ledger wallet, set a trustline to LAWAS, then purchase it on supported DEXs or through trusted liquidity providers.', open: false },
  { question: 'What are the use cases for LAWAS token?', answer: 'Trading fee discounts, governance voting, platform rewards, staking benefits, and access to premium features.', open: false },
  { question: 'Is LAWAS token secure?', answer: 'LAWAS leverages XRPL security. Use secure wallets—hardware wallets recommended for enhanced security.', open: false }
])
const form = ref({ name: '', email: '', message: '' })

/* ------ Computed ------ */
const marketCap    = computed(() => formatNumber(tokenData.value.marketcap))
const holders      = computed(() => tokenData.value.holders)
const trustlines   = computed(() => tokenData.value.trustlines)
const currentPrice = computed(() => tokenData.value.priceUsd)

const currencyItems = computed(() => {
  const currencies = ['IDR', 'EUR', 'JPY', 'GBP']
  return currencies.map(cur => {
    const rate = currencyRates.value[cur] || 1
    return { currency: cur, price: currentPrice.value * rate, formattedPrice: formatPrice(currentPrice.value * rate), baseCurrency: cur }
  })
})

const marketStats = computed(() => ([
  { label: 'Current Price', value: `${selectedCurrency.value === 'IDR' ? 'Rp' : '$'}${formatPrice(currentPrice.value * (selectedCurrency.value === 'IDR' ? currencyRates.value['IDR'] : 1))}` },
  { label: 'Market Cap', value: `$${formatNumber(tokenData.value.marketcap)}` },
  { label: '24h Volume', value: `$${formatNumber(1250.45)}` },
  { label: 'All-Time High', value: `$${formatPrice(0.0000018)}` }
]))

/* ------ Utils ------ */
const getDotStyle = (index) => {
  const angle = (index * 30) * (Math.PI / 180)
  const radius = 130
  const centerX = 50, centerY = 50
  const x = centerX + (radius * Math.cos(angle)) / 3.2
  const y = centerY + (radius * Math.sin(angle)) / 3.2
  return { position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', opacity: index % 2 === 0 ? 0.8 : 0.4, animation: `orbitPulse ${2 + (index * 0.1)}s ease-in-out infinite` }
}
const formatNumber = (num) => { if (!Number.isFinite(Number(num))) return '0'; const n=Number(num); if (n>=1_000_000) return (n/1_000_000).toFixed(2)+'M'; if (n>=1_000) return (n/1_000).toFixed(2)+'K'; return n.toLocaleString() }
const formatPrice = (v) => { const p=Number(v)||0; return p<0.000001 ? p.toFixed(10).replace(/\.?0+$/,'') : p.toFixed(8).replace(/\.?0+$/,'') }
const shortAddress = (addr) => !addr ? '' : (addr.length>22 ? `${addr.slice(0,10)}…${addr.slice(-10)}` : addr)
const copyToClipboard = async (text) => { try { await navigator.clipboard.writeText(text) ; console.log('[NOTIFY] Address copied') } catch { console.log('[NOTIFY] Copy failed') } }
const showNotificationMessage = (msg) => { console.log('[NOTIFY]', msg) }

/* ------ Fetchers ------ */
const fetchTokenData = async () => {
  try {
    const r = await fetch('https://api.xpmarket.com/api/currency/widget?token=LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC')
    const d = await r.json()
    if (d.success) tokenData.value = { ...tokenData.value, ...d.data, priceUsd: Number(d.data.priceUsd) }
  } catch (e) { console.error('Error fetching token data:', e) }
}
const fetchChartData = async (period='1d') => {
  try {
    const r = await fetch(`https://api.xpmarket.com/api/currency/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC/prices/${period}`)
    const d = await r.json()
    if (d.success) chartData.value = d.data.map(it => ({ x: it.x, y: Number(it.y) }))
  } catch (e) { console.error('Error fetching chart data:', e) }
}
const fetchCurrencyRates = async () => {
  try {
    const r = await fetch('https://api.xpmarket.com/api/stats/main')
    const d = await r.json()
    if (d.success) { const rates={}; d.rates.forEach(rt => rates[rt.iso]=parseFloat(rt.rate)); currencyRates.value=rates }
  } catch (e) { console.error('Error fetching currency rates:', e) }
}

/* ------ Actions ------ */
const setSelectedPeriod = (period) => {
  let param = period
  if (period==='1W') param='7d'; else if (period==='1M') param='30d'; else if (period==='1Y') param='365d'; else if (period==='ALL') param='365d'
  selectedPeriod.value = period
  fetchChartData(String(param).toLowerCase())
}
const setDataSource = (src) => { dataSource.value = src; if (src === 'geckoterminal') fetchGeckoData() }
const fetchGeckoData = async () => {
  geckoLoading.value = true; geckoError.value = null
  try {
    const pool='4C41574153000000000000000000000000000000.rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC_XRP'
    const r=await fetch(`https://api.geckoterminal.com/api/v2/networks/xrpl/pools/${pool}`,{headers:{'Accept':'application/json;version=20230302'}})
    if(!r.ok) throw new Error(`HTTP ${r.status}`)
    const d=await r.json()
    if(d.data?.attributes){ const a=d.data.attributes; geckoData.value={price_usd:parseFloat(a.base_token_price_usd||0).toFixed(8),price_change_24h:parseFloat(a.price_change_percentage?.h24||0).toFixed(2),volume_24h:parseFloat(a.volume_usd?.h24||0),reserve_usd:parseFloat(a.reserve_in_usd||0)} }
    else throw new Error('Invalid data')
  } catch(e){ geckoError.value=e.message||'Failed to fetch data' } finally{ geckoLoading.value=false }
}
const redirectToXPM = () => window.open('https://xpmarket.com/token/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC','_blank')
const toggleFaq = (i) => { faqs.value[i].open = !faqs.value[i].open }
watch(selectedCurrency, () => {})

/* ------ Lifecycle ------ */
let intId = null
onMounted(async () => {
  await fetchTokenData(); await fetchChartData(selectedPeriod.value.toLowerCase()); await fetchCurrencyRates()
  intId = setInterval(async () => { await fetchTokenData(); await fetchChartData(selectedPeriod.value.toLowerCase()) }, 60000)
  document.querySelectorAll('.animate-number').forEach(el => el.classList.add('number-animation'))
})
onUnmounted(() => { if (intId) clearInterval(intId) })
</script>

<style scoped>
/* ==== helpers (aman Tailwind v3) ==== */
.input{ @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary; }
.select{ @apply bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary; }
.tile{ @apply bg-gray-700 p-4 rounded hover:scale-[1.01] transition; }
.row{ @apply flex justify-between py-1; }
.row__label{ @apply text-gray-400; }
.row__value{ @apply font-semibold; }
.mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
.address-tile{ @apply bg-gray-800 rounded p-3 border border-gray-700/50; }
.tile-link{ @apply text-xs text-primary hover:underline; }
.btn-ghost{ @apply px-3 py-1.5 rounded-md text-xs bg-gray-700 hover:bg-gray-600 transition; }
.btn-ghost-xs{ @apply px-2 py-1 text-[11px]; }
.chip{ @apply px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 transition; }
.chip--active{ @apply bg-primary text-white shadow-sm; }
.step{ @apply absolute top-0 left-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-lg font-bold; }
.no-scrollbar::-webkit-scrollbar{ display:none; } .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }

/* ==== animations ==== */
.animate-number{ position:relative; display:inline-block; }
.number-animation{ animation:numberPop .5s ease-out; }
@keyframes numberPop{ 0%{transform:scale(.8);opacity:0} 50%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }

.animate-float-1{ animation:float1 4s ease-in-out infinite; }
.animate-float-2{ animation:float2 5s ease-in-out infinite; }
.animate-float-3{ animation:float3 6s ease-in-out infinite; }
.animate-float-4{ animation:float4 7s ease-in-out infinite; }
@keyframes float1{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-15px) translateX(10px)}}
@keyframes float2{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(15px) translateX(-10px)}}
@keyframes float3{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-10px) translateX(-15px)}}
@keyframes float4{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(10px) translateX(15px)}}

.animate-spin-slow{ animation:spin 8s linear infinite; } @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)} }
.animate-bounce-slow{ animation:bounce 2s ease infinite; } @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
.animate-orbit-rotation{ animation:orbitRotation 30s linear infinite; }
@keyframes orbitRotation{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
@keyframes orbitPulse{ 0%,100%{ transform:translate(-50%,-50%) scale(1); opacity:.6 } 50%{ transform:translate(-50%,-50%) scale(1.2); opacity:1 } }
</style>
