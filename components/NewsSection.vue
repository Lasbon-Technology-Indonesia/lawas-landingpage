<template>
  <div class="card">
    <div class="flex items-center mb-6">
      <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M9 15L5 11m0 0l4-4m-4 4h14" />
        </svg>
      </div>
      <h3 class="text-xl font-bold">Latest News & Updates</h3>
    </div>
    
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-8 text-red-400">
      <p>{{ error }}</p>
      <button @click="fetchNews" class="btn-primary mt-4">Try Again</button>
    </div>
    
    <div v-else>
      <div v-for="(item, index) in newsItems" :key="index" class="mb-6 hover-scale transition-all duration-300 cursor-pointer" @click="openNewsItem(item)">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="md:w-1/4 h-40 bg-gray-700 rounded-lg overflow-hidden light-mode:bg-gray-200">
            <img :src="item.image || '/news-placeholder.jpg'" alt="News thumbnail" class="w-full h-full object-cover" />
          </div>
          <div class="md:w-3/4">
            <h4 class="text-lg font-semibold mb-2">{{ item.title }}</h4>
            <p class="text-gray-400 text-sm mb-2 light-mode:text-gray-600">{{ formatDate(item.date) }}</p>
            <p class="text-gray-300 line-clamp-3 light-mode:text-gray-700">{{ item.summary }}</p>
            <div class="flex items-center mt-3">
              <span class="text-primary text-sm font-medium">Read more</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <button class="btn-primary">View All News</button>
      </div>
    </div>
    
    <!-- News Modal -->
    <Transition name="modal">
      <div v-if="selectedNews" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black bg-opacity-75" @click="selectedNews = null"></div>
        <div class="relative bg-dark-lighter rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto light-mode:bg-light-darker">
          <button @click="selectedNews = null" class="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="p-6">
            <div class="mb-6">
              <img :src="selectedNews.image || '/news-placeholder.jpg'" alt="News image" class="w-full h-64 object-cover rounded-lg" />
            </div>
            <h3 class="text-2xl font-bold mb-2">{{ selectedNews.title }}</h3>
            <p class="text-gray-400 mb-6 light-mode:text-gray-600">{{ formatDate(selectedNews.date) }}</p>
            <div class="prose prose-invert max-w-none light-mode:prose-light">
              <p v-html="selectedNews.content"></p>
            </div>
            
            <div class="mt-8 flex justify-between items-center">
              <div class="flex items-center">
                <span class="text-gray-400 mr-4 light-mode:text-gray-600">Share:</span>
                <div class="flex space-x-3">
                  <a href="#" class="text-gray-400 hover:text-primary transition-colors">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-primary transition-colors">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-primary transition-colors">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <button @click="selectedNews = null" class="btn-primary">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

// State
const loading = ref(true)
const error = ref(null)
const newsItems = ref([])
const selectedNews = ref(null)

// Mock news data (in a real app, this would come from an API)
const mockNews = [
  {
    id: 1,
    title: 'LAWAS Coin Reaches New All-Time High',
    date: '2025-06-01T10:30:00Z',
    image: 'https://via.placeholder.com/800x400/00c2b3/ffffff?text=LAWAS+ATH',
    summary: 'LAWAS Coin has reached a new all-time high price of $0.0000035 today, marking a significant milestone for the project.',
    content: `<p>LAWAS Coin has reached a new all-time high price of $0.0000035 today, marking a significant milestone for the project. This represents a 75% increase from the previous high set just last month.</p>
              <p>The price surge comes amid growing adoption of the token on the XRP Ledger and increased interest from institutional investors. Trading volume has also seen a substantial increase, with 24-hour volume exceeding $2.5 million.</p>
              <p>"We're thrilled to see the growing interest in LAWAS Coin," said the project lead. "This price movement reflects the strong fundamentals of our project and the utility we're building on the XRP Ledger."</p>
              <p>Market analysts attribute the price increase to several factors, including recent partnership announcements, technical improvements, and the overall positive sentiment in the cryptocurrency market.</p>
              <p>The team has also hinted at upcoming major announcements that could further drive adoption and utility of the token.</p>`
  },
  {
    id: 2,
    title: 'LAWAS Partners with Major Payment Provider',
    date: '2025-05-25T14:15:00Z',
    image: 'https://via.placeholder.com/800x400/3498db/ffffff?text=LAWAS+Partnership',
    summary: 'LAWAS Coin has announced a strategic partnership with a major payment provider to enable seamless cross-border transactions.',
    content: `<p>LAWAS Coin has announced a strategic partnership with a major payment provider to enable seamless cross-border transactions using the LAWAS token on the XRP Ledger.</p>
              <p>The partnership will allow users to make instant payments across borders with minimal fees, leveraging the speed and efficiency of the XRP Ledger combined with the widespread reach of the payment provider's network.</p>
              <p>"This partnership represents a significant step forward in our mission to make cross-border payments faster, cheaper, and more accessible," said the LAWAS team. "By combining our technology with the established infrastructure of our partner, we're creating a powerful solution for global transactions."</p>
              <p>The integration is expected to be completed within the next quarter, with a phased rollout planned for key markets in Asia, Europe, and North America.</p>
              <p>This development comes as LAWAS continues to expand its ecosystem and use cases, further solidifying its position in the digital asset space.</p>`
  },
  {
    id: 3,
    title: 'LAWAS Community Reaches 1,000 Active Members',
    date: '2025-05-15T09:45:00Z',
    image: 'https://via.placeholder.com/800x400/9b59b6/ffffff?text=LAWAS+Community',
    summary: 'The LAWAS community has reached a significant milestone with 1,000 active members participating in the ecosystem.',
    content: `<p>The LAWAS community has reached a significant milestone with 1,000 active members participating in the ecosystem. This growth represents a 150% increase in community size over the past three months.</p>
              <p>Active community members are contributing to various aspects of the project, including development, marketing, and governance. The community-driven approach has been a cornerstone of LAWAS's philosophy since its inception.</p>
              <p>"Our community is the backbone of everything we do," said the community manager. "Reaching 1,000 active members is not just a number—it's a testament to the shared vision and passion that drives LAWAS forward."</p>
              <p>To celebrate this milestone, the team has announced a series of community events, including hackathons, AMAs with the core team, and special rewards for long-standing community members.</p>
              <p>The growing community is expected to play a crucial role in the upcoming governance proposals and the continued development of the LAWAS ecosystem.</p>`
  }
]

// Methods
const fetchNews = async () => {
  loading.value = true
  error.value = null
  
  try {
    // In a real app, this would be an API call
    // const response = await fetch('https://api.example.com/news')
    // const data = await response.json()
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Use mock data
    newsItems.value = mockNews
  } catch (err) {
    console.error('Error fetching news:', err)
    error.value = 'Failed to load news. Please try again later.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const openNewsItem = (item) => {
  selectedNews.value = item
}

// Lifecycle
onMounted(() => {
  fetchNews()
})

// Watch for theme changes to refresh content if needed
watch(() => props.isDarkMode, () => {
  // In a real app, you might want to refresh content based on theme
  // or apply different styling
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Line clamp for truncating text */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
