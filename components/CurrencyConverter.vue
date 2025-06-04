<template>
  <div class="flex flex-col md:flex-row gap-4 mb-6">
    <div v-for="(item, index) in items" :key="index" class="bg-gray-700 p-4 rounded">
      <div class="text-sm text-gray-400">{{ item.currency }}</div>
      <div class="font-bold">{{ item.formattedPrice }}</div>
      <div class="text-xs text-gray-500">{{ item.baseCurrency }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
