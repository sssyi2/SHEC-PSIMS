<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\charts\DonutChart.vue -->
<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, PropType } from 'vue'
import * as echarts from 'echarts'

interface ChartDataItem {
  name: string;
  value: number;
}

interface ChartOptions {
  colors?: string[];
  title?: string;
  legend?: {
    position?: string;
  };
}

export default defineComponent({
  name: 'DonutChart',
  props: {
    chartData: {
      type: Object as PropType<{
        series: ChartDataItem[];
      }>,
      required: true
    },
    chartOptions: {
      type: Object as PropType<ChartOptions>,
      default: () => ({})
    }
  },
  setup(props) {
    const chartContainer = ref<HTMLElement | null>(null)
    let chart: echarts.ECharts | null = null
    
    const initChart = () => {
      if (chartContainer.value) {
        chart = echarts.init(chartContainer.value)
        renderChart()
      }
    }
    
    const renderChart = () => {
      if (!chart) return
      
      const legendPosition = props.chartOptions.legend?.position || 'right'
      
      const option = {
        color: props.chartOptions.colors,
        title: props.chartOptions.title ? {
          text: props.chartOptions.title,
          left: 'center'
        } : undefined,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: legendPosition === 'bottom' ? 'horizontal' : 'vertical',
          [legendPosition]: 10,
          data: props.chartData.series.map(item => item.name)
        },
        series: [
          {
            name: '使用情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: props.chartData.series
          }
        ]
      }
      
      chart.setOption(option)
    }
    
    onMounted(() => {
      initChart()
      window.addEventListener('resize', () => {
        chart?.resize()
      })
    })
    
    watch(() => props.chartData, () => {
      renderChart()
    }, { deep: true })
    
    watch(() => props.chartOptions, () => {
      renderChart()
    }, { deep: true })
    
    return {
      chartContainer
    }
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 240px;
}
</style>