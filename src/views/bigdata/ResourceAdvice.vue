<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\bigdata\ResourceAdvice.vue -->
<template>
  <div class="resource-advice">
    <TheHeader />
    
    <div class="main-container">
      <TheSidebar />
      
      <div class="content-area">
        <EquipmentUsagePanel />
        <MedicineInventoryPanel />
        <ResourceAllocationPanel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSidebar from '@/components/layout/TheSidebar.vue'
import EquipmentUsagePanel from '@/components/bigdata/resource-advice/EquipmentUsagePanel.vue'
import MedicineInventoryPanel from '@/components/bigdata/resource-advice/MedicineInventoryPanel.vue'
import ResourceAllocationPanel from '@/components/bigdata/resource-advice/ResourceAllocationPanel.vue'

export default defineComponent({
  name: 'ResourceAdvice',
  components: {
    TheHeader,
    TheSidebar,
    EquipmentUsagePanel,
    MedicineInventoryPanel,
    ResourceAllocationPanel
  }
})
</script>

<style scoped>
.resource-advice {
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

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>