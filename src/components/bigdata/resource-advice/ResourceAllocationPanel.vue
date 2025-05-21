<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\bigdata\resource-advice\ResourceAllocationPanel.vue -->
<template>
  <div class="panel resource-allocation-panel">
    <h2 class="panel-title">资源分配建议</h2>
    
    <div class="advice-cards">
      <div class="advice-card">
        <h3 class="card-title">人员调配</h3>
        <p class="advice-content">
          将{{ staffRecommendation.nurseName }}从{{ staffRecommendation.currentDept }}
          调到{{ staffRecommendation.targetDept }}，因{{ staffRecommendation.reason }}
          患者数量增加{{ staffRecommendation.increasePercentage }}%
        </p>
      </div>
      
      <div class="advice-card">
        <h3 class="card-title">设备调度</h3>
        <p class="advice-content">
          将{{ equipmentRecommendation.deviceType }}从{{ equipmentRecommendation.currentLocation }}
          移至{{ equipmentRecommendation.targetLocation }}，预计节省{{ equipmentRecommendation.timeSaved }}分钟转运时间
        </p>
      </div>
      
      <div class="advice-card">
        <h3 class="card-title">病床分配</h3>
        <p class="advice-content">
          优先将{{ bedRecommendation.roomNumber }}分配给{{ bedRecommendation.patientType }}，
          因{{ bedRecommendation.reason }}匹配度达{{ bedRecommendation.matchPercentage }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'ResourceAllocationPanel',
  setup() {
    const staffRecommendation = reactive({
      nurseName: '张护士',
      currentDept: '内科',
      targetDept: '外科',
      reason: '外科',
      increasePercentage: 15
    })
    
    const equipmentRecommendation = reactive({
      deviceType: '便携式超声仪',
      currentLocation: '2号楼',
      targetLocation: '1号楼',
      timeSaved: 15
    })
    
    const bedRecommendation = reactive({
      roomNumber: '301',
      patientType: '老年骨折患者',
      reason: '临床特征',
      matchPercentage: 92
    })
    
    return {
      staffRecommendation,
      equipmentRecommendation,
      bedRecommendation
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

.panel-title {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.advice-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.advice-card {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  width: 30%;
  min-width: 200px;
}

.card-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.advice-content {
  color: #333;
  line-height: 1.5;
}

@media (max-width: 992px) {
  .advice-card {
    width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .advice-card {
    width: 100%;
  }
}
</style>