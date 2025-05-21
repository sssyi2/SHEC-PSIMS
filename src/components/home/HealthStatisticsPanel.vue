<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\home\HealthStatisticsPanel.vue -->
<template>
  <div class="panel health-stats-panel">
    <div class="panel-header">
      <h2 class="panel-title">健康统计</h2>
      <button class="more-button" @click="viewMoreStats">查看详情</button>
    </div>
    
    <div class="panel-content">
      <div v-if="loading" class="loading-placeholder">
        <div class="spinner"></div>
        <span>加载中...</span>
      </div>
      
      <div v-else class="stats-container">
        <div class="stats-row">
          <div class="stats-card">
            <div class="stats-number">{{ stats.totalPatients }}</div>
            <div class="stats-label">管理的老人总数</div>
            <div class="stats-trend" :class="{'up': stats.patientsTrend > 0, 'down': stats.patientsTrend < 0}">
              {{ stats.patientsTrend > 0 ? '+' : '' }}{{ stats.patientsTrend }}%
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-number">{{ stats.activeConsultations }}</div>
            <div class="stats-label">本月咨询次数</div>
            <div class="stats-trend" :class="{'up': stats.consultationsTrend > 0, 'down': stats.consultationsTrend < 0}">
              {{ stats.consultationsTrend > 0 ? '+' : '' }}{{ stats.consultationsTrend }}%
            </div>
          </div>
        </div>
        
        <div class="stats-row">
          <div class="stats-card">
            <div class="stats-number">{{ stats.followupsCompleted }}</div>
            <div class="stats-label">本月完成随访</div>
            <div class="stats-trend" :class="{'up': stats.followupsTrend > 0, 'down': stats.followupsTrend < 0}">
              {{ stats.followupsTrend > 0 ? '+' : '' }}{{ stats.followupsTrend }}%
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-number">{{ stats.healthWarnings }}</div>
            <div class="stats-label">本月健康预警</div>
            <div class="stats-trend" :class="{'up': stats.warningsTrend > 0, 'down': stats.warningsTrend < 0}">
              {{ stats.warningsTrend > 0 ? '+' : '' }}{{ stats.warningsTrend }}%
            </div>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-title">近6个月随访趋势</div>
          <div class="chart-placeholder" ref="chartContainer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer
]);

interface HealthStats {
  totalPatients: number;
  patientsTrend: number;
  activeConsultations: number;
  consultationsTrend: number;
  followupsCompleted: number;
  followupsTrend: number;
  healthWarnings: number;
  warningsTrend: number;
  trendData: {
    months: string[];
    followups: number[];
    warnings: number[];
  };
}

export default defineComponent({
  name: 'HealthStatisticsPanel',
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const stats = ref<HealthStats>({
      totalPatients: 0,
      patientsTrend: 0,
      activeConsultations: 0,
      consultationsTrend: 0,
      followupsCompleted: 0,
      followupsTrend: 0,
      healthWarnings: 0,
      warningsTrend: 0,
      trendData: {
        months: [],
        followups: [],
        warnings: []
      }
    });
    const chartContainer = ref<HTMLElement | null>(null);
    let chart: echarts.ECharts | null = null;
    
    // 获取统计数据
    const fetchStats = () => {
      loading.value = true;
      
      // 模拟API请求
      setTimeout(() => {
        stats.value = {
          totalPatients: 286,
          patientsTrend: 5.2,
          activeConsultations: 124,
          consultationsTrend: 12.8,
          followupsCompleted: 215,
          followupsTrend: 3.4,
          healthWarnings: 18,
          warningsTrend: -8.6,
          trendData: {
            months: ['12月', '1月', '2月', '3月', '4月', '5月'],
            followups: [142, 156, 178, 195, 208, 215],
            warnings: [24, 32, 28, 22, 19, 18]
          }
        };
        
        loading.value = false;
        
        // 数据加载完成后初始化图表
        nextTick(() => {
          initChart();
        });
      }, 1000);
    };
    
    // 初始化图表
    const initChart = () => {
      if (!chartContainer.value) return;
      
      chart = echarts.init(chartContainer.value);
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['随访次数', '预警次数'],
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: stats.value.trendData.months
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '随访次数',
            type: 'line',
            smooth: true,
            data: stats.value.trendData.followups,
            itemStyle: {
              color: '#1890ff'
            }
          },
          {
            name: '预警次数',
            type: 'line',
            smooth: true,
            data: stats.value.trendData.warnings,
            itemStyle: {
              color: '#ff4d4f'
            }
          }
        ]
      };
      
      chart.setOption(option);
      
      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        chart?.resize();
      });
    };
    
    // 查看更多统计
    const viewMoreStats = () => {
      router.push('/data-analysis');
    };
    
    onMounted(() => {
      fetchStats();
    });
    
    // 组件卸载时销毁图表
    onUnmounted(() => {
      if (chart) {
        chart.dispose();
        chart = null;
      }
    });
    
    return {
      loading,
      stats,
      chartContainer,
      viewMoreStats
    };
  }
});
</script>

<style scoped>
.panel {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.more-button {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
}

.more-button:hover {
  text-decoration: underline;
}

.panel-content {
  padding: 20px;
  height: 400px;
  overflow: auto;
}

.loading-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.stats-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stats-row {
  display: flex;
  margin-bottom: 15px;
}

.stats-card {
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  margin-right: 15px;
  position: relative;
}

.stats-card:last-child {
  margin-right: 0;
}

.stats-number {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.stats-label {
  font-size: 12px;
  color: #666;
}

.stats-trend {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 12px;
}

.stats-trend.up {
  color: #52c41a;
}

.stats-trend.down {
  color: #f5222d;
}

.chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.chart-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.chart-placeholder {
  flex: 1;
  width: 100%;
  min-height: 200px;
}
</style>