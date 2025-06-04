<template>
  <div class="card">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" :class="iconBgClass">
        <slot name="icon"></slot>
      </div>
      <h3 class="text-xl font-bold">{{ title }}</h3>
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
  iconBgClass: {
    type: String,
    default: 'bg-primary'
  }
})
</script>
