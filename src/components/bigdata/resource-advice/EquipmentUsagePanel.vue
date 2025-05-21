<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\bigdata\resource-advice\EquipmentUsagePanel.vue -->
<template>
  <div class="panel equipment-usage-panel">
    <div class="panel-header">
      <h2>查询设备使用情况：</h2>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="search-input" 
          placeholder="输入设备名称或ID"
        />
        <button class="search-button" @click="searchEquipment">查询</button>
      </div>
    </div>
    
    <div class="charts-container">
      <div class="chart-wrapper">
        <h3 class="chart-title">设备使用率</h3>
        <DonutChart 
          :chartData="equipmentUsageData" 
          :chartOptions="equipmentUsageOptions" 
        />
      </div>
      
      <div class="chart-wrapper">
        <h3 class="chart-title">设备使用分布</h3>
        <StackedBarChart 
          :chartData="equipmentDistributionData" 
          :chartOptions="equipmentDistributionOptions" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import DonutChart from '@/components/bigdata/charts/DonutChart.vue'
import StackedBarChart from '@/components/bigdata/charts/StackedBarChart.vue'

export default defineComponent({
  name: 'EquipmentUsagePanel',
  components: {
    DonutChart,
    StackedBarChart
  },
  setup() {
    const searchQuery = ref('')
    
    // 设备使用率数据
    const equipmentUsageData = reactive({
      series: [
        { name: '使用中', value: 65 },
        { name: '闲置', value: 25 },
        { name: '维修中', value: 10 }
      ]
    })
    
    const equipmentUsageOptions = reactive({
      colors: ['#4282e6', '#63d954', '#ff7070'],
      legend: {
        position: 'bottom'
      }
    })
    
    // 设备使用分布数据
    const equipmentDistributionData = reactive({
      categories: ['内科', '外科', '儿科', '急诊科', '重症监护'],
      series: [
        { name: '使用中', data: [18, 12, 8, 10, 17] },
        { name: '闲置', data: [5, 8, 4, 3, 5] },
        { name: '维修中', data: [2, 3, 1, 2, 2] }
      ]
    })
    
    const equipmentDistributionOptions = reactive({
      colors: ['#4282e6', '#63d954', '#ff7070'],
      legend: {
        position: 'bottom'
      },
      stacked: true
    })
    
    const searchEquipment = () => {
      console.log('搜索设备:', searchQuery.value)
      // 这里可以添加API调用逻辑来获取搜索结果
    }
    
    return {
      searchQuery,
      equipmentUsageData,
      equipmentUsageOptions,
      equipmentDistributionData,
      equipmentDistributionOptions,
      searchEquipment
    }
  }
})
</script>

<style scoped>
.panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h2 {
  font-size: 16px;
  margin: 0;
  color: #333;
}

.search-container {
  display: flex;
  gap: 10px;
}

.search-input {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  width: 250px;
}

.search-button {
  height: 36px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #40a9ff;
}

.charts-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.chart-wrapper {
  flex: 1;
  min-height: 240px;
}

.chart-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

@media (max-width: 768px) {
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-container {
    margin-top: 10px;
    width: 100%;
  }
  
  .search-input {
    flex-grow: 1;
  }
  
  .charts-container {
    flex-direction: column;
  }
}
</style>