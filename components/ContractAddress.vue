<template>
  <div>
    <!-- Contract Address section with copy button -->
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold">Contract Address</h3>
    </div>
    <p class="text-gray-300 mb-4 dark:text-gray-300 light-mode:text-gray-600">
      The LAWAS token is issued on the XRP Ledger. You can view the token details and transactions on the XRPL explorer.
    </p>
    <div class="space-y-3">
      <div>
        <div class="text-sm text-gray-400">Currency:</div>
        <div class="bg-gray-700 p-2 rounded text-sm font-mono break-all flex justify-between items-center light-mode:bg-gray-200">
          <span>{{ tokenData.code }}</span>
          <button @click="copyToClipboard(tokenData.code)" class="copy-button ml-2 hover-scale">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div class="text-sm text-gray-400">Issuer:</div>
        <div class="bg-gray-700 p-2 rounded text-sm font-mono break-all flex justify-between items-center light-mode:bg-gray-200">
          <span>{{ tokenData.issuer }}</span>
          <button @click="copyToClipboard(tokenData.issuer)" class="copy-button ml-2 hover-scale">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400">Currency Code</span>
        <span class="font-semibold">{{ tokenData.code }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400">Hex Format</span>
        <span class="font-semibold">4C415741...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tokenData: {
    type: Object,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['notification'])

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    // Emit notification event to parent component
    emit('notification', 'Copied to clipboard!')
  }).catch(err => {
    console.error('Could not copy text: ', err)
    emit('notification', 'Failed to copy to clipboard')
  })
}
</script>
