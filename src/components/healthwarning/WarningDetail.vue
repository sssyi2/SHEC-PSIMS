<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\WarningDetail.vue -->
<template>
  <div class="warning-detail-overlay" @click="closeModal">
    <div class="warning-detail-dialog" @click.stop>
      <div class="dialog-header">
        <h2 class="dialog-title">预警详情</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      
      <div class="dialog-body">
        <div class="detail-section">
          <h3 class="section-title">患者信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">患者编号：</span>
              <span class="value">{{ warning.patientId }}</span>
            </div>
            <div class="info-item">
              <span class="label">姓名：</span>
              <span class="value">{{ warning.patientName }}</span>
            </div>
            <div class="info-item">
              <span class="label">性别：</span>
              <span class="value">{{ warning.patient?.gender }}</span>
            </div>
            <div class="info-item">
              <span class="label">年龄：</span>
              <span class="value">{{ warning.patient?.age }}</span>
            </div>
            <div class="info-item">
              <span class="label">联系电话：</span>
              <span class="value">{{ warning.patient?.phone }}</span>
            </div>
            <div class="info-item">
              <span class="label">住址：</span>
              <span class="value">{{ warning.patient?.address }}</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3 class="section-title">预警信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">疾病分类：</span>
              <span class="value">{{ warning.diseaseType }}</span>
            </div>
            <div class="info-item">
              <span class="label">疾病名称：</span>
              <span class="value">{{ warning.diseaseName }}</span>
            </div>
            <div class="info-item">
              <span class="label">预警等级：</span>
              <span class="value warning-level">{{ warning.warningLevel }}</span>
            </div>
            <div class="info-item">
              <span class="label">预警时间：</span>
              <span class="value">{{ warning.warningTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">监测指标：</span>
              <span class="value">{{ warning.indicator }}</span>
            </div>
            <div class="info-item">
              <span class="label">监测值：</span>
              <span class="value">{{ warning.monitorValue }}</span>
            </div>
            <div class="info-item">
              <span class="label">阈值：</span>
              <span class="value">{{ warning.thresholdValue }}</span>
            </div>
            <div class="info-item">
              <span class="label">预警内容：</span>
              <span class="value">{{ warning.content }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="warning.status === 'processed'" class="detail-section">
          <h3 class="section-title">处理信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">处理时间：</span>
              <span class="value">{{ warning.processedTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">处理人：</span>
              <span class="value">{{ warning.processedBy }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">处理意见：</span>
              <span class="value">{{ warning.processingNote }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="warning.status !== 'processed'" class="detail-section">
          <h3 class="section-title">处理意见</h3>
          <textarea 
            class="processing-note" 
            v-model="processingNote" 
            placeholder="请输入处理意见"
          ></textarea>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button 
          v-if="warning.status !== 'processed'"
          class="process-button" 
          @click="processWarning"
          :disabled="!processingNote"
        >
          确认处理
        </button>
        <button class="close-button-text" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { WarningInfo } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'WarningDetail',
  props: {
    warning: {
      type: Object as PropType<WarningInfo>,
      required: true
    }
  },
  emits: ['close', 'process'],
  setup(props, { emit }) {
    const processingNote = ref('');
    
    const closeModal = (e: Event) => {
      if ((e.target as HTMLElement).classList.contains('warning-detail-overlay')) {
        emit('close');
      }
    };
    
    const processWarning = () => {
      if (!processingNote.value) return;
      emit('process', props.warning.id, processingNote.value);
    };
    
    return {
      processingNote,
      closeModal,
      processWarning
    };
  }
});
</script>

<style scoped>
.warning-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.warning-detail-dialog {
  width: 800px;
  max-width: 90%;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.dialog-body {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.detail-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  border-left: 4px solid #1890ff;
  padding-left: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: flex-start;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.label {
  width: 100px;
  font-size: 14px;
  color: #666;
}

.value {
  flex-grow: 1;
  font-size: 14px;
  color: #333;
}

.warning-level {
  color: #ff4d4f;
  font-weight: 500;
}

.processing-note {
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  color: #333;
}

.dialog-footer {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.process-button {
  padding: 8px 16px;
  background-color: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.process-button:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.close-button-text {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
}
</style>