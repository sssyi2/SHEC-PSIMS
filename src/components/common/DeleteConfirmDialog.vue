<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\common\DeleteConfirmDialog.vue -->
<template>
  <div class="delete-confirm-overlay" @click="$emit('cancel')">
    <div class="delete-confirm-container" @click.stop>
      <div class="confirm-header">
        <h3 class="confirm-title">删除确认</h3>
      </div>
      
      <div class="confirm-body">
        <p>您确定要删除{{ itemName }}吗？</p>
        <p class="warning-text">此操作不可逆，请谨慎操作！</p>
      </div>
      
      <div class="confirm-footer">
        <button class="confirm-button" @click="$emit('confirm')">确认删除</button>
        <button class="cancel-button" @click="$emit('cancel')">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeleteConfirmDialog',
  props: {
    itemName: {
      type: String,
      default: '此项'
    }
  },
  emits: ['confirm', 'cancel']
});
</script>

<style scoped>
.delete-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.delete-confirm-container {
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.confirm-header {
  padding: 15px 20px;
  background-color: #ff4d4f;
  color: white;
}

.confirm-title {
  margin: 0;
  font-size: 18px;
}

.confirm-body {
  padding: 20px;
  text-align: center;
}

.warning-text {
  color: #ff4d4f;
  font-weight: 500;
}

.confirm-footer {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.confirm-button {
  padding: 8px 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #ff7875;
}

.cancel-button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}
</style>