<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\common\ConfirmDialog.vue -->
<template>
  <div class="confirm-overlay">
    <div class="confirm-container">
      <div class="confirm-header">
        <h2>{{ title }}</h2>
      </div>
      
      <div class="confirm-body">
        <p>{{ message }}</p>
      </div>
      
      <div class="confirm-footer">
        <button class="cancel-btn" @click="$emit('cancel')">取消</button>
        <button class="confirm-btn" @click="$emit('confirm')">确认</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmDialog',
  props: {
    title: {
      type: String,
      default: '确认'
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ['confirm', 'cancel']
});
</script>

<style scoped>
.confirm-overlay {
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

.confirm-container {
  width: 400px;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.confirm-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.confirm-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.confirm-body {
  padding: 20px 16px;
}

.confirm-body p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.confirm-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #d9d9d9;
  margin-right: 8px;
}

.confirm-btn {
  background-color: #f5222d;
  color: white;
  border: none;
}

.confirm-btn:hover {
  background-color: #ff4d4f;
}

.cancel-btn:hover {
  border-color: #d9d9d9;
  background-color: #f5f5f5;
}
</style>