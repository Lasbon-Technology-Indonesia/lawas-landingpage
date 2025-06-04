<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <div v-if="showTimeframes" class="flex space-x-2">
        <button 
          v-for="period in timeframes" 
          :key="period"
          @click="$emit('period-change', period)"
          :class="[
            'px-3 py-1 rounded text-sm font-medium transition-colors',
            selectedPeriod === period 
              ? 'bg-primary text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          ]"
        >
          {{ period }}
        </button>
      </div>
    </div>
    
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  showTimeframes: {
    type: Boolean,
    default: false
  },
  timeframes: {
    type: Array,
    default: () => ['1H', '1D', '1W', '1M', '1Y']
  },
  selectedPeriod: {
    type: String,
    default: '1D'
  }
})

defineEmits(['period-change'])
</script>
