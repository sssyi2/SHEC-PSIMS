<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\charts\StackedBarChart.vue -->
<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, PropType } from 'vue'
import * as echarts from 'echarts'

interface SeriesItem {
  name: string;
  data: number[];
}

interface ChartData {
  categories: string[];
  series: SeriesItem[];
}

interface ChartOptions {
  colors?: string[];
  title?: string;
  legend?: {
    position?: string;
  };
  stacked?: boolean;
}

export default defineComponent({
  name: 'StackedBarChart',
  props: {
    chartData: {
      type: Object as PropType<ChartData>,
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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          orient: legendPosition === 'bottom' ? 'horizontal' : 'vertical',
          [legendPosition]: 10,
          data: props.chartData.series.map(item => item.name)
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: props.chartData.categories
        },
        yAxis: {
          type: 'value'
        },
        series: props.chartData.series.map(item => ({
          name: item.name,
          type: 'bar',
          stack: props.chartOptions.stacked ? 'total' : undefined,
          label: {
            show: false
          },
          emphasis: {
            focus: 'series'
          },
          data: item.data
        }))
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