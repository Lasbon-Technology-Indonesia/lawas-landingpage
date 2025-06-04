<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div v-for="(stat, index) in stats" :key="index" class="card text-center">
      <h4 class="text-lg font-semibold text-gray-400 mb-2">{{ stat.label }}</h4>
      <div class="text-2xl font-bold">{{ stat.value }}</div>
      <div :class="stat.change >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm">
        {{ stat.change >= 0 ? '+' : '' }}{{ stat.change }}% {{ stat.period ? `(${stat.period})` : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>
