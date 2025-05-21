<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\WarningCard.vue -->
<template>
  <div class="warning-card" :class="{ 'read': warning.status === 'read', 'processed': warning.status === 'processed' }">
    <div class="card-content">
      <div class="info-table">
        <table>
          <tr>
            <td class="label-cell">患者编号：</td>
            <td class="value-cell">{{ warning.patientId }}</td>
            <td class="label-cell">预警等级：</td>
            <td class="value-cell">{{ warning.warningLevel }}</td>
          </tr>
          <tr>
            <td class="label-cell">姓名：</td>
            <td class="value-cell">{{ warning.patientName }}</td>
            <td class="label-cell">疾病分类：</td>
            <td class="value-cell">{{ warning.diseaseType }}</td>
          </tr>
          <tr>
            <td class="label-cell">年龄：</td>
            <td class="value-cell">{{ warning.patient?.age }}</td>
            <td class="label-cell">预警时间：</td>
            <td class="value-cell">{{ warning.warningTime }}</td>
          </tr>
          <tr>
            <td class="label-cell">性别：</td>
            <td class="value-cell">{{ warning.patient?.gender }}</td>
            <td class="label-cell">疾病名称：</td>
            <td class="value-cell">{{ warning.diseaseName }}</td>
          </tr>
        </table>
      </div>
      
      <div class="card-actions">
        <button class="action-button view-button" @click="viewDetail">查看详情</button>
        <button 
          v-if="warning.status !== 'processed'"
          class="action-button process-button" 
          @click="markProcessed"
        >
          标记已处理
        </button>
      </div>
    </div>
    
    <!-- 未读标记 -->
    <div v-if="warning.status === 'unread'" class="unread-marker"></div>
    
    <!-- 已处理标记 -->
    <div v-if="warning.status === 'processed'" class="processed-marker">已处理</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { WarningInfo } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'WarningCard',
  props: {
    warning: {
      type: Object as PropType<WarningInfo>,
      required: true
    }
  },
  emits: ['view-detail', 'mark-processed'],
  setup(props, { emit }) {
    const viewDetail = () => {
      emit('view-detail', props.warning);
    };
    
    const markProcessed = () => {
      emit('mark-processed', props.warning.id);
    };
    
    return {
      viewDetail,
      markProcessed
    };
  }
});
</script>

<style scoped>
.warning-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  position: relative;
  transition: all 0.3s;
  border-left: 4px solid #ff4d4f; /* 未读标记 */
}

.warning-card.read {
  border-left-color: #faad14; /* 已读标记 */
}

.warning-card.processed {
  border-left-color: #52c41a; /* 已处理标记 */
}

.card-content {
  display: flex;
}

.info-table {
  flex-grow: 1;
}

.info-table table {
  width: 100%;
  border-collapse: collapse;
}

.label-cell {
  width: 100px;
  font-weight: 500;
  color: #333;
  padding: 8px 0;
}

.value-cell {
  padding: 8px;
  color: #666;
}

.card-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-left: 20px;
  min-width: 120px;
}

.action-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-button {
  background-color: #1890ff;
  color: white;
}

.view-button:hover {
  background-color: #40a9ff;
}

.process-button {
  background-color: #52c41a;
  color: white;
}

.process-button:hover {
  background-color: #73d13d;
}

.unread-marker {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  background-color: #ff4d4f;
  border-radius: 50%;
}

.processed-marker {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  background-color: #52c41a;
  color: white;
  font-size: 12px;
  border-radius: 4px;
}
</style>