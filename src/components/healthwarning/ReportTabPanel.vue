<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\ReportTabPanel.vue -->
<template>
  <div class="report-tab-panel">
    <div 
      class="tab-item" 
      :class="{ active: activeTab === 'method' }"
      @click="$emit('tab-change', 'method')"
    >
      随访方式分类统计
    </div>
    <div 
      class="tab-item" 
      :class="{ active: activeTab === 'month' }"
      @click="$emit('tab-change', 'month')"
    >
      随访次数月度统计
    </div>
    <div 
      class="tab-item" 
      :class="{ active: activeTab === 'disease' }"
      @click="$emit('tab-change', 'disease')"
    >
      患者疾病分类统计
    </div>
    <div 
      class="tab-item" 
      :class="{ active: activeTab === 'time' }"
      @click="$emit('tab-change', 'time')"
    >
      随访时间分类统计
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ReportTabPanel',
  props: {
    activeTab: {
      type: String as PropType<'method' | 'month' | 'disease' | 'time'>,
      default: 'method'
    }
  },
  emits: ['tab-change']
});
</script>

<style scoped>
.report-tab-panel {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.tab-item {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  flex: 1;
  text-align: center;
  border-right: 1px solid #e8e8e8;
}

.tab-item:last-child {
  border-right: none;
}

.tab-item:hover {
  background-color: #e0e0e0;
}

.tab-item.active {
  background-color: #1890ff;
  color: white;
}

@media (max-width: 768px) {
  .report-tab-panel {
    flex-direction: column;
  }
  
  .tab-item {
    border-right: none;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .tab-item:last-child {
    border-bottom: none;
  }
}
</style>