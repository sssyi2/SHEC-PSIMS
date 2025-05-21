<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FollowupMonthlyStatPanel.vue -->
<template>
  <div class="monthly-stat-panel">
    <h3 class="panel-title">随访次数月度统计</h3>
    
    <div class="chart-container">
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
      <div v-else class="line-chart" ref="lineChartRef"></div>
    </div>
    
    <div class="stats-grid">
      <div 
        v-for="(item, index) in monthlyStats" 
        :key="index"
        class="month-stat-item"
      >
        <div class="month-name">{{ item.month }}</div>
        <div class="month-value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LineChart,
  CanvasRenderer
])

export default defineComponent({
  name: 'FollowupMonthlyStatPanel',
  props: {
    monthlyStats: {
      type: Array as PropType<Array<{ month: string; value: number }>>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const lineChartRef = ref<HTMLDivElement | null>(null);
    let chart: echarts.ECharts | null = null;
    
    // 初始化图表
    const initChart = () => {
      if (!lineChartRef.value) return;
      
      chart = echarts.init(lineChartRef.value);
      
      const months = props.monthlyStats.map(item => item.month);
      const values = props.monthlyStats.map(item => item.value);
      
      const option = {
        title: {
          text: '全年月度随访趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '随访次数',
          nameLocation: 'middle',
          nameGap: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: '随访次数',
            type: 'line',
            data: values,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#1890ff'
            },
            lineStyle: {
              width: 3
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(24,144,255,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(24,144,255,0.05)'
                  }
                ]
              }
            }
          }
        ]
      };
      
      chart.setOption(option);
    };
    
    // 更新图表数据
    const updateChart = () => {
      if (!chart) return;
      
      const months = props.monthlyStats.map(item => item.month);
      const values = props.monthlyStats.map(item => item.value);
      
      chart.setOption({
        xAxis: {
          data: months
        },
        series: [
          {
            data: values
          }
        ]
      });
    };
    
    // 监听数据变化更新图表
    watch(() => props.monthlyStats, () => {
      if (chart) {
        updateChart();
      } else {
        initChart();
      }
    }, { deep: true });
    
    // 监听加载状态变化
    watch(() => props.loading, (newVal) => {
      if (!newVal && !chart && lineChartRef.value) {
        initChart();
      }
    });
    
    // 组件挂载后初始化图表
    onMounted(() => {
      if (!props.loading) {
        initChart();
      }
      
      // 窗口大小变化时，重新调整图表大小
      window.addEventListener('resize', () => {
        chart?.resize();
      });
    });
    
    return {
      lineChartRef
    };
  }
});
</script>

<style scoped>
.monthly-stat-panel {
  background-color: #fff;
  border-radius: 8px;
}

.panel-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

.chart-container {
  height: 400px;
  margin-bottom: 20px;
}

.line-chart {
  width: 100%;
  height: 100%;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.month-stat-item {
  width: calc(100% / 12 - 10px);
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.month-name {
  font-size: 14px;
  color: #666;
}

.month-value {
  font-size: 20px;
  font-weight: 500;
  color: #1890ff;
  margin-top: 5px;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .month-stat-item {
    width: calc(100% / 4 - 10px);
  }
  
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .month-stat-item {
    width: calc(100% / 3 - 10px);
  }
}
</style>