<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\bigdata\DataTrend.vue -->
<template>
  <div class="datatrend-view">
    <TheHeader />
    
    <div class="main-container">
      <TheSidebar @menuChange="handleMenuChange" />
      
      <div class="content-area">
        <PatientInfoForm 
          @start-predict="startPredict"
          @import-patient="importPatient"
        />
        
        <PredictionResults 
          v-if="showResults"
          :predictionData="predictionData"
          :predictionAnalysis="predictionAnalysis"
        />
        
        <div class="export-button-container" v-if="showResults">
          <button class="primary-button" @click="exportReport">导出为报告</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSidebar from '@/components/layout/TheSidebar.vue'
import PatientInfoForm from '@/components/bigdata/datatrend/PatientInfoForm.vue'
import PredictionResults from '@/components/bigdata/datatrend/PredictionResults.vue'

export default defineComponent({
  name: 'DataTrend',
  components: {
    TheHeader,
    TheSidebar,
    PatientInfoForm,
    PredictionResults
  },
  setup() {
    const showResults = ref(false)
    
    // 预测数据
    const predictionData = reactive({
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      series: [
        {
          name: '血压',
          data: [120, 125, 128, 130, 135, 140, 145, 150]
        },
        {
          name: '预测趋势',
          data: [null, null, null, null, 135, 140, 145, 150],
          lineStyle: { type: 'dashed' }
        }
      ]
    })
    
    // 预测分析结果
    const predictionAnalysis = reactive([
      {
        id: 1,
        content: '该患者的高血压在未来有30%概率恶化。'
      },
      {
        id: 2,
        content: '该患者在未来30天有20%概率出现跌倒事件，注意预防。'
      }
    ])
    
    // 开始预测
    const startPredict = (formData: any) => {
      console.log('开始预测，表单数据：', formData)
      // 这里应该发起API请求获取预测结果
      // 模拟API请求延迟
      setTimeout(() => {
        showResults.value = true
      }, 500)
    }
    
    // 导入患者信息
    const importPatient = (patientId: string) => {
      console.log('导入患者信息：', patientId)
      // 这里应该发起API请求获取患者信息
    }
    
    // 导出报告
    const exportReport = () => {
      console.log('导出报告')
      // 实现导出功能
    }
    
    // 菜单切换处理
    const handleMenuChange = (menu: any) => {
      console.log('菜单切换:', menu)
    }
    
    return {
      showResults,
      predictionData,
      predictionAnalysis,
      startPredict,
      importPatient,
      exportReport,
      handleMenuChange
    }
  }
})
</script>

<style scoped>
.datatrend-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.main-container {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  padding: 20px;
}

.export-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.primary-button {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #40a9ff;
}
</style>