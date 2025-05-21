<template>
  <div class="chart-container">
    <h3 class="chart-title">{{ title }}</h3>
    <div class="chart-box" ref="chartContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { 
  TitleComponent, 
  TooltipComponent, 
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent, 
  TooltipComponent, 
  LegendComponent,
  ToolboxComponent,
  PieChart,
  CanvasRenderer
])

type ChartData = {
  series: { name: string; value: number }[];
}

export default defineComponent({
  name: 'PieChart',
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
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '5%'
        },
        series: [
          {
            name: '患者分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
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