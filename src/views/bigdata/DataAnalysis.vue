<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\bigdata\DataAnalysis.vue -->
<template>
  <div class="dashboard">
    <TheHeader />
    
    <div class="main-container">
      <TheSidebar @menuChange="handleMenuChange" />
      
      <div class="content-area">
        <StatsCards />
        
        <div class="charts-container">
          <ColumnChart 
            title="每日就诊人数柱状图" 
            :chartData="dailyVisitData" 
            class="chart" />
          <PieChart 
            title="各科室患者数量分布图" 
            :chartData="departmentData" 
            class="chart" />
        </div>

        <!-- 成本效益分析组件 -->
        <CostBenefitAnalysis title="医疗成本效益分析" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSidebar from '@/components/layout/TheSidebar.vue'
import StatsCards from '@/components//bigdata/dashboard/StatsCards.vue'
import ColumnChart from '@/components/bigdata/charts/ColumnChart.vue'
import PieChart from '@/components//bigdata/charts/PieChart.vue'
import CostBenefitAnalysis from '@/components/bigdata/charts/CostBenefitAnalysis.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    TheHeader,
    TheSidebar,
    StatsCards,
    ColumnChart,
    PieChart,
    CostBenefitAnalysis // 添加新组件
  },
  setup() {
    const dailyVisitData = reactive({
      categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [
        {
          name: '就诊人数',
          data: [120, 132, 101, 134, 90, 80, 70]
        }
      ]
    })
    
    const departmentData = reactive({
      series: [
        { name: '内科', value: 35 },
        { name: '外科', value: 25 },
        { name: '儿科', value: 15 },
        { name: '妇科', value: 20 },
        { name: '眼科', value: 5 }
      ]
    })
    
    const handleMenuChange = (menu: any) => {
      console.log('Selected menu:', menu)
      // 这里可以处理菜单切换逻辑，如路由跳转
    }
    
    return {
      dailyVisitData,
      departmentData,
      handleMenuChange
    }
  }
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.main-container {
  display: flex;
  padding-top: 73px;
}

.content-area {
  flex-grow: 1;
  margin-left: 230px;
  padding: 20px;
}

.charts-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.chart {
  flex: 1;
}

@media (max-width: 1200px) {
  .charts-container {
    flex-direction: column;
  }
}
</style>