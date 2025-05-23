<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\bigdata\charts\CostBenefitAnalysis.vue -->
<template>
  <div class="cost-benefit-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-actions">
        <select v-model="selectedPeriod" class="period-select" @change="handlePeriodChange">
          <option value="month">本月</option>
          <option value="quarter">本季度</option>
          <option value="year">本年度</option>
        </select>
      </div>
    </div>
    
    <div class="card-content">
      <!-- 核心指标 -->
      <div class="key-metrics">
        <div class="metric-item">
          <div class="metric-value">{{ formattedROI }}</div>
          <div class="metric-label">投资回报率</div>
        </div>
        
        <div class="metric-item">
          <div class="metric-value">{{ formatCurrency(totalRevenue) }}</div>
          <div class="metric-label">总收入</div>
        </div>
        
        <div class="metric-item">
          <div class="metric-value">{{ formatCurrency(totalCost) }}</div>
          <div class="metric-label">总成本</div>
        </div>
      </div>
      
      <!-- 简化图表 -->
      <div class="chart-container" ref="chartContainer"></div>
      
      <!-- 简化成本细分 -->
      <div class="cost-breakdown">
        <h4 class="breakdown-title">成本细分</h4>
        <div class="breakdown-items">
          <div 
            v-for="(item, index) in costBreakdown" 
            :key="index" 
            class="breakdown-item"
          >
            <div class="item-name">
              <span 
                class="color-dot" 
                :style="{ backgroundColor: costColors[index % costColors.length] }"
              ></span>
              {{ item.name }}
            </div>
            <div class="item-value">{{ formatCurrency(item.value) }}</div>
            <div class="item-percent">{{ ((item.value / totalCost) * 100).toFixed(1) }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'CostBenefitAnalysis',
  props: {
    title: {
      type: String,
      default: '成本效益分析'
    }
  },
  setup() {
    const chartContainer = ref<HTMLElement | null>(null);
    let chart: echarts.ECharts | null = null;
    
    const selectedPeriod = ref('month');
    
    // 基础数据 - 实际应用中应该从API获取
    const totalRevenue = ref(1250000);
    const totalCost = ref(850000);
    const costBreakdown = ref([
      { name: '人力成本', value: 480000 },
      { name: '设备投入', value: 180000 },
      { name: '药品耗材', value: 110000 },
      { name: '其他', value: 80000 }
    ]);
    
    // 计算ROI
    const roi = computed(() => ((totalRevenue.value - totalCost.value) / totalCost.value) * 100);
    const formattedROI = computed(() => `${roi.value.toFixed(1)}%`);
    
    // 基础图表颜色
    const costColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];
    
    // 格式化货币
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };
    
    // 简化的月度数据
    const monthlyData = [
      { month: '1月', revenue: 980000, cost: 750000 },
      { month: '2月', revenue: 1050000, cost: 790000 },
      { month: '3月', revenue: 1120000, cost: 810000 },
      { month: '4月', revenue: 1080000, cost: 820000 },
      { month: '5月', revenue: 1150000, cost: 830000 },
      { month: '6月', revenue: 1200000, cost: 840000 },
      { month: '7月', revenue: 1250000, cost: 850000 }
    ];
    
    // 初始化图表
    const initChart = () => {
      if (chartContainer.value) {
        chart = echarts.init(chartContainer.value);
        updateChart();
      }
    };
    
    // 更新图表数据 - 简化版
    const updateChart = () => {
      if (!chart) return;
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['收入', '成本'],
          bottom: 0
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
          data: monthlyData.map(item => item.month)
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function(value: number) {
              return (value / 10000) + '万';
            }
          }
        },
        series: [
          {
            name: '收入',
            type: 'bar',
            data: monthlyData.map(item => item.revenue),
            itemStyle: {
              color: '#5470c6'
            }
          },
          {
            name: '成本',
            type: 'bar',
            data: monthlyData.map(item => item.cost),
            itemStyle: {
              color: '#91cc75'
            }
          }
        ]
      };
      
      chart.setOption(option);
    };
    
    // 处理周期变化 - 简化版
    const handlePeriodChange = () => {
      switch (selectedPeriod.value) {
        case 'month':
          totalRevenue.value = 1250000;
          totalCost.value = 850000;
          break;
        case 'quarter':
          totalRevenue.value = 3450000;
          totalCost.value = 2460000;
          break;
        case 'year':
          totalRevenue.value = 14200000;
          totalCost.value = 9800000;
          break;
      }
      
      // 更新图表
      updateChart();
    };
    
    // 监听窗口大小变化，调整图表大小
    const handleResize = () => {
      chart?.resize();
    };
    
    onMounted(() => {
      initChart();
      window.addEventListener('resize', handleResize);
    });
    
    // 组件卸载时移除事件监听
    const beforeUnmount = () => {
      window.removeEventListener('resize', handleResize);
      chart?.dispose();
    };
    
    return {
      chartContainer,
      selectedPeriod,
      totalRevenue,
      totalCost,
      formattedROI,
      costBreakdown,
      costColors,
      formatCurrency,
      handlePeriodChange,
      beforeUnmount
    };
  }
});
</script>

<style scoped>
.cost-benefit-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.period-select {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}

.key-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.metric-item {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
}

.metric-value {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 14px;
  color: #666;
}

.chart-container {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
}

.cost-breakdown {
  margin-top: 20px;
}

.breakdown-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
}

.breakdown-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.item-name {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.item-value {
  font-weight: 500;
  color: #333;
}

.item-percent {
  color: #666;
  width: 60px;
  text-align: right;
}

@media (max-width: 768px) {
  .key-metrics {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>