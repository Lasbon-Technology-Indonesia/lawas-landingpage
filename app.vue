<template>
  <div>
    <div class="min-h-screen">
      <header class="container mx-auto px-4 py-4">
        <link rel="icon" type="image/png" href="/logo.png" />

        <!-- Mobile menu (hidden on desktop) -->
        <div class="md:hidden">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="/logo.png" alt="LAWAS Coin" class="h-10 w-10 mr-2 logo-pulse" />
              <h1 class="text-2xl font-bold gradient-text">LawasCoin</h1>
            </div>
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <Transition name="mobile-menu">
            <nav v-if="mobileMenuOpen" class="bg-dark-lighter mt-4 rounded-lg p-4 transition-all duration-300">
              <div class="flex flex-col space-y-4">
                <a href="#about" @click="mobileMenuOpen = false" class="hover:text-primary transition-colors">About</a>
                <a href="#token" @click="mobileMenuOpen = false" class="hover:text-primary transition-colors">Token</a>
                <a href="#chart" @click="mobileMenuOpen = false" class="hover:text-primary transition-colors">Chart</a>
                <a href="#holders" @click="mobileMenuOpen = false" class="hover:text-primary transition-colors">Holders</a>
                <a href="#how-to-buy" @click="mobileMenuOpen = false" class="hover:text-primary transition-colors">How to Buy</a>
              </div>
            </nav>
          </Transition>
        </div>
        
        <!-- Desktop navigation -->
        <nav class="hidden md:flex items-center justify-between">
          <div class="flex items-center">
            <img src="/logo.png" alt="LAWAS Coin" class="h-10 w-10 mr-2 logo-pulse" />
            <h1 class="text-2xl font-bold gradient-text">LawasCoin</h1>
          </div>
          <div class="hidden md:flex space-x-6">
            <a href="#about" class="hover:text-primary transition-colors">About</a>
            <a href="#token" class="hover:text-primary transition-colors">Token</a>
            <a href="#chart" class="hover:text-primary transition-colors">Chart</a>
            <a href="#holders" class="hover:text-primary transition-colors">Holders</a>
            <a href="#how-to-buy" class="hover:text-primary transition-colors">How to Buy</a>
          </div>
          <div class="flex space-x-2 items-center">
            <button class="btn-primary" @click="redirectToXPM">Get LAWAS</button>
          </div>
        </nav>
      </header>
      
      <main>
        <NuxtPage />
      </main>
      
      <EnhancedFooter />
      
      <!-- Notification system -->
      <Transition name="notification">
        <div v-if="showNotification" class="notification">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ notificationMessage }}</span>
            </div>
            <button @click="showNotification = false" class="ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
      
      <!-- Background particles -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div v-for="(particle, index) in particles" :key="index" 
             :class="['particle', `bg-${particle.color}`, `opacity-${particle.opacity}`]"
             :style="{
               width: `${particle.size}px`,
               height: `${particle.size}px`,
               left: `${particle.x}%`,
               top: `${particle.y}%`,
               animationDelay: `${particle.delay}s`
             }">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EnhancedFooter from '~/components/EnhancedFooter.vue'

/**
 * * Variables
 */
const mobileMenuOpen = ref(false)
const showNotification = ref(false)
const notificationMessage = ref('')
const particles = ref([])


/**
 * * Methods
 */
const showNotificationMessage = (message) => {
  notificationMessage.value = message
  showNotification.value = true
  
  // Auto-hide notification after 3 seconds
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

// Generate background particles
const generateParticles = () => {
  const colors = ['primary', 'secondary', 'gray-400', 'gray-600']
  const opacities = [10, 15, 20, 25]
  
  for (let i = 0; i < 20; i++) {
    particles.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: opacities[Math.floor(Math.random() * opacities.length)],
      delay: Math.random() * 5
    })
  }
}

const redirectToXPM = () => {
  window.open(`https://xpmarket.com/token/LAWAS-rfAWYnEAkQGAhbESWAMdNccWJvdcrgugMC`, '_blank').focus();
}


/**
 * * Hooks
 */
// Lifecycle
onMounted(() => {
  generateParticles()
  
  // Show welcome notification
  setTimeout(() => {
    showNotification.value = true
    notificationMessage.value = 'Welcome to LAWAS Coin!'
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
  }, 1000)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
