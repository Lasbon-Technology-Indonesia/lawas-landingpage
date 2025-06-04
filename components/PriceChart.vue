<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  chartData: {
    type: Array,
    default: () => []
  },
  period: {
    type: String,
    default: '1D'
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const createChart = () => {
  if (!chartCanvas.value || !props.chartData || props.chartData.length === 0) return

  const ctx = chartCanvas.value.getContext('2d')
  
  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Prepare data
  const labels = props.chartData.map(item => {
    const date = new Date(item.x)
    if (props.period === '1H') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (props.period === '1D') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (props.period === '1W') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  })

  const prices = props.chartData.map(item => item.y)

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(0, 194, 179, 0.3)')
  gradient.addColorStop(1, 'rgba(0, 194, 179, 0.05)')

  // Theme-based colors
  const gridColor = props.isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(200, 200, 200, 0.5)'
  const textColor = props.isDarkMode ? '#9ca3af' : '#4b5563'
  const tooltipBgColor = props.isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'
  const tooltipTextColor = props.isDarkMode ? '#ffffff' : '#000000'

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'LAWAS Price (USD)',
        data: prices,
        borderColor: '#00c2b3',
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#00c2b3',
        pointHoverBorderColor: props.isDarkMode ? '#ffffff' : '#000000',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: tooltipBgColor,
          titleColor: tooltipTextColor,
          bodyColor: tooltipTextColor,
          borderColor: '#00c2b3',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function(context) {
              return context[0].label
            },
            label: function(context) {
              const value = context.parsed.y
              return `Price: $${formatPrice(value)}`
            },
            afterLabel: function(context) {
              // Add timestamp in readable format
              const dataPoint = props.chartData[context.dataIndex]
              if (dataPoint && dataPoint.x) {
                const date = new Date(dataPoint.x)
                return `Time: ${date.toLocaleString()}`
              }
              return ''
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor,
            maxTicksLimit: 8
          }
        },
        y: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor,
            callback: function(value) {
              return formatPrice(value)
            }
          }
        }
      },
      elements: {
        point: {
          hoverRadius: 8
        }
      }
    }
  })
}

// Format price to avoid scientific notation
const formatPrice = (price) => {
  if (!price || isNaN(price)) return '0.00000000'
  
  if (price < 0.000001) {
    // For very small numbers, use fixed notation instead of scientific
    return price.toFixed(10).replace(/\.?0+$/, '')
  }
  return price.toFixed(8).replace(/\.?0+$/, '')
}

// Watch for data changes
watch(() => props.chartData, () => {
  nextTick(() => {
    createChart()
  })
}, { deep: true })

watch(() => props.period, () => {
  nextTick(() => {
    createChart()
  })
})

watch(() => props.isDarkMode, () => {
  nextTick(() => {
    createChart()
  })
})

onMounted(() => {
  nextTick(() => {
    createChart()
  })
})

// Cleanup on unmount
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
