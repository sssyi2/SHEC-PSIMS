<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FollowupDiseaseStatPanel.vue -->
<template>
  <div class="disease-stat-panel">
    <h3 class="panel-title">患者疾病分类统计</h3>
    
    <div class="panel-content">
      <div class="stats-table">
        <table>
          <tr class="header-row">
            <th>疾病分类</th>
            <th>患者人数</th>
          </tr>
          <tr v-for="(item, index) in diseaseStats" :key="index">
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
        <div v-else class="pie-chart" ref="pieChartRef"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
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
  name: 'FollowupDiseaseStatPanel',
  props: {
    diseaseStats: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const pieChartRef = ref<HTMLDivElement | null>(null);
    let chart: echarts.ECharts | null = null;
    
    // 颜色列表，确保不同分类有不同颜色
    const colors = [
      '#5470c6', '#91cc75', '#fac858', '#ee6666',
      '#73c0de', '#3ba272', '#fc8452', '#9a60b4',
      '#ea7ccc', '#4ea397'
    ];
    
    // 初始化图表
    const initChart = () => {
      if (!pieChartRef.value) return;
      
      chart = echarts.init(pieChartRef.value);
      
      const option = {
        title: {
          text: '患者疾病分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'middle',
          data: props.diseaseStats.map(item => item.name)
        },
        series: [
          {
            name: '疾病分类',
            type: 'pie',
            radius: '65%',
            center: ['40%', '50%'],
            data: props.diseaseStats,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)'
            }
          }
        ],
        color: colors
      };
      
      chart.setOption(option);
    };
    
    // 更新图表数据
    const updateChart = () => {
      if (!chart) return;
      
      chart.setOption({
        legend: {
          data: props.diseaseStats.map(item => item.name)
        },
        series: [
          {
            data: props.diseaseStats
          }
        ]
      });
    };
    
    // 监听数据变化更新图表
    watch(() => props.diseaseStats, () => {
      if (chart) {
        updateChart();
      } else {
        initChart();
      }
    }, { deep: true });
    
    // 监听加载状态变化
    watch(() => props.loading, (newVal) => {
      if (!newVal && !chart && pieChartRef.value) {
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
      pieChartRef
    };
  }
});
</script>

<style scoped>
.disease-stat-panel {
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
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pie-chart {
  width: 100%;
  height: 100%;
  min-height: 350px;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
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
}
</style>