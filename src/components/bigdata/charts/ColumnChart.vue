<template>
  <div class="chart-container">
    <h3 class="chart-title">{{ title }}</h3>
    <div class="chart-box" ref="chartContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { 
  TitleComponent, 
  TooltipComponent, 
  GridComponent, 
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent, 
  TooltipComponent, 
  GridComponent, 
  LegendComponent,
  ToolboxComponent,
  BarChart,
  CanvasRenderer
])

type ChartData = {
  categories: string[];
  series: { name: string; data: number[] }[];
}

export default defineComponent({
  name: 'ColumnChart',
  props: {
    title: {
      type: String,
      required: true
    },
    chartData: {
      type: Object as PropType<ChartData>,
      required: true
    }
  },
  setup(props) {
    const chartContainer = ref<HTMLElement | null>(null)
    let chart: echarts.ECharts | null = null
    
    const initChart = () => {
      if (chartContainer.value) {
        chart = echarts.init(chartContainer.value)
        updateChart()
      }
    }
    
    const updateChart = () => {
      if (!chart) return
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: '5%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '3%',
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
          data: item.data
        }))
      }
      
      chart.setOption(option)
    }
    
    const handleResize = () => {
      chart?.resize()
    }
    
    onMounted(() => {
      initChart()
      window.addEventListener('resize', handleResize)
    })
    
    watch(() => props.chartData, () => {
      updateChart()
    }, { deep: true })
    
    return {
      chartContainer
    }
  }
})
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  height: 100%;
}

.chart-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 15px;
}

.chart-box {
  width: 100%;
  height: 300px;
}
</style>