<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\log\LogDetailDialog.vue -->
<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>日志详情</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="dialog-body">
        <div v-if="log" class="log-details">
          <div class="detail-item">
            <div class="detail-label">ID:</div>
            <div class="detail-value">{{ log.id }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">时间:</div>
            <div class="detail-value">{{ log.timestamp }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">用户:</div>
            <div class="detail-value">{{ log.user }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">操作:</div>
            <div class="detail-value">{{ log.action }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">详情:</div>
            <div class="detail-value">{{ log.message }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">IP地址:</div>
            <div class="detail-value">{{ log.ip }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">设备信息:</div>
            <div class="detail-value">{{ deviceInfo || 'Unknown' }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">浏览器:</div>
            <div class="detail-value">{{ browserInfo || 'Unknown' }}</div>
          </div>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="close-btn-footer" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import type { LogEntry } from '@/types/log';

export default defineComponent({
  name: 'LogDetailDialog',
  props: {
    log: {
      type: Object as PropType<LogEntry | null>,
      default: null
    }
  },
  emits: ['close'],
  setup(props) {
    // 模拟额外的日志信息
    const deviceInfo = computed(() => {
      return props.log ? 'Windows 11 x64' : '';
    });
    
    const browserInfo = computed(() => {
      return props.log ? 'Chrome 120.0.6099.130' : '';
    });
    
    return {
      deviceInfo,
      browserInfo
    };
  }
});
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  width: 550px;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.dialog-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.dialog-body {
  padding: 20px 16px;
  max-height: 400px;
  overflow-y: auto;
}

.log-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  display: flex;
}

.detail-label {
  width: 100px;
  font-weight: 500;
  color: #666;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
  word-break: break-word;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.close-btn-footer {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn-footer:hover {
  background-color: #e6e6e6;
}
</style>