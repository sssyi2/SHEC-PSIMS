<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FollowupTimeStatPanel.vue -->
<template>
  <div class="time-stat-panel">
    <h3 class="panel-title">随访时间分类统计</h3>
    
    <div class="panel-content">
      <div class="stats-table">
        <table>
          <tr class="header-row">
            <th>时间段</th>
            <th>次数</th>
          </tr>
          <tr v-for="(item, index) in timeStats" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>
      </div>
      
      <div class="chart-container">
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <span>加载中...</span>
        </div>
        <div v-else class="donut-chart" ref="donutChartRef"></div>
      </div>
    </div>
    
    <div class="time-stat-blocks">
      <div 
        v-for="(item, index) in timeStats" 
        :key="index"
        class="time-block"
        :style="{ backgroundColor: blockColors[index] }"
      >
        <h4 class="time-range">{{ item.name }}</h4>
        <div class="time-value">{{ item.value }}</div>
        <div class="time-percent">{{ calculatePercent(item.value) }}%</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
])

export default defineComponent({
  name: 'FollowupTimeStatPanel',
  props: {
    timeStats: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const donutChartRef = ref<HTMLDivElement | null>(null);
    let chart: echarts.ECharts | null = null;
    
    // 时间段块颜色
    const blockColors = ['#5470c6', '#91cc75', '#ee6666'];
    
    // 计算总数
    const totalValue = computed(() => {
      return props.timeStats.reduce((sum, item) => sum + item.value, 0);
    });
    
    // 计算百分比
    const calculatePercent = (value: number) => {
      if (totalValue.value === 0) return 0;
      return Math.round((value / totalValue.value) * 100);
    };
    
    // 初始化图表
    const initChart = () => {
      if (!donutChartRef.value) return;
      
      chart = echarts.init(donutChartRef.value);
      
      const option = {
        title: {
          text: '随访时间段分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          top: 'center',
          data: props.timeStats.map(item => item.name)
        },
        series: [
          {
            name: '随访时间段',
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
            data: props.timeStats
          }
        ],
        color: blockColors
      };
      
      chart.setOption(option);
    };
    
    // 更新图表数据
    const updateChart = () => {
      if (!chart) return;
      
      chart.setOption({
        legend: {
          data: props.timeStats.map(item => item.name)
        },
        series: [
          {
            data: props.timeStats
          }
        ]
      });
    };
    
    // 监听数据变化更新图表
    watch(() => props.timeStats, () => {
      if (chart) {
        updateChart();
      } else {
        initChart();
      }
    }, { deep: true });
    
    // 监听加载状态变化
    watch(() => props.loading, (newVal) => {
      if (!newVal && !chart && donutChartRef.value) {
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
      donutChartRef,
      blockColors,
      calculatePercent
    };
  }
});
</script>

<style scoped>
.time-stat-panel {
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

.panel-content {
  display: flex;
  align-items: stretch;
}

.stats-table {
  width: 40%;
  padding-right: 20px;
}

.stats-table table {
  width: 100%;
  border-collapse: collapse;
}

.stats-table th, 
.stats-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.stats-table .header-row {
  background-color: #f5f5f5;
}

.chart-container {
  width: 60%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.donut-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.time-stat-blocks {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;
}

.time-block {
  flex: 1;
  border-radius: 8px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.time-range {
  font-size: 16px;
  margin: 0 0 10px 0;
}

.time-value {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.time-percent {
  font-size: 18px;
  opacity: 0.8;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
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
  .panel-content {
    flex-direction: column;
  }
  
  .stats-table,
  .chart-container {
    width: 100%;
    padding-right: 0;
  }
  
  .stats-table {
    margin-bottom: 20px;
  }
  
  .time-stat-blocks {
    flex-direction: column;
  }
}
</style>