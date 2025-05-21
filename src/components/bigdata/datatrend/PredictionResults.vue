<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\bigdata\datatrend\PredictionResults.vue -->
<template>
  <div class="prediction-results">
    <div class="chart-section">
      <h3 class="section-title">预测结果折线图</h3>
      <div class="chart-container" ref="lineChartRef"></div>
    </div>
    
    <div class="analysis-section">
      <div class="analysis-cards">
        <div class="analysis-card" v-for="item in predictionAnalysis" :key="item.id">
          <div class="card-content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, PropType } from 'vue'
import * as echarts from 'echarts'

interface PredictionSeries {
  name: string;
  data: (number | null)[];
  lineStyle?: {
    type: string;
  };
}

interface PredictionData {
  labels: string[];
  series: PredictionSeries[];
}

interface AnalysisItem {
  id: number;
  content: string;
}

export default defineComponent({
  name: 'PredictionResults',
  props: {
    predictionData: {
      type: Object as PropType<PredictionData>,
      required: true
    },
    predictionAnalysis: {
      type: Array as PropType<AnalysisItem[]>,
      required: true
    }
  },
  setup(props) {
    const lineChartRef = ref<HTMLElement | null>(null)
    let lineChart: echarts.ECharts | null = null
    
    const initCharts = () => {
      if (lineChartRef.value) {
        lineChart = echarts.init(lineChartRef.value)
        updateLineChart()
      }
    }
    
    const updateLineChart = () => {
      if (!lineChart) return
      
      const series = props.predictionData.series.map(item => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          lineStyle: item.lineStyle
        }
      })
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: props.predictionData.series.map(item => item.name),
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '60px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.predictionData.labels
        },
        yAxis: {
          type: 'value'
        },
        series: series
      }
      
      lineChart.setOption(option)
    }
    
    onMounted(() => {
      initCharts()
      
      window.addEventListener('resize', () => {
        lineChart?.resize()
      })
    })
    
    watch(() => props.predictionData, () => {
      updateLineChart()
    }, { deep: true })
    
    return {
      lineChartRef
    }
  }
})
</script>

<style scoped>
.prediction-results {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.chart-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.chart-container {
  height: 350px;
  width: 100%;
}

.analysis-section {
  margin-top: 20px;
}

.analysis-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.analysis-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: calc(50% - 10px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.card-content {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

@media (max-width: 768px) {
  .analysis-card {
    width: 100%;
  }
}
</style>