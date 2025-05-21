<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\MedicalRecordDetail.vue -->
<template>
  <div class="medical-record-detail">
    <div class="detail-header">
      <h2 class="detail-title">病人电子病历</h2>
      <div class="action-buttons">
        <button class="action-btn edit-btn" @click="handleEdit">改档</button>
        <button class="action-btn delete-btn" @click="handleDelete">删除</button>
      </div>
    </div>
    
    <div class="detail-content">
      <div class="detail-row">
        <div class="detail-label">病历id：</div>
        <div class="detail-value">{{ record.id }}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">病人id：</div>
        <div class="detail-value">{{ record.patientId }}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">姓名：</div>
        <div class="detail-value">{{ record.name }}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">性别：</div>
        <div class="detail-value">{{ record.gender }}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">年龄：</div>
        <div class="detail-value">{{ record.age }}</div>
      </div>
      
      <div class="detail-row diagnosis-row">
        <div class="detail-label">诊断信息：</div>
        <div class="detail-value">{{ record.diagnosis || '无' }}</div>
      </div>
      
      <div class="detail-row treatment-row">
        <div class="detail-label">治疗方案：</div>
        <div class="detail-value">{{ record.treatment || '无' }}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">创建时间：</div>
        <div class="detail-value">{{ record.createTime }}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">更新时间：</div>
        <div class="detail-value">{{ record.updateTime }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MedicalRecordDetail',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  emits: ['edit-record', 'delete-record'],
  setup(props, { emit }) {
    // 编辑病历
    const handleEdit = () => {
      emit('edit-record', props.record)
    }
    
    // 删除病历
    const handleDelete = () => {
      emit('delete-record', props.record.id)
    }
    
    return {
      handleEdit,
      handleDelete
    }
  }
})
</script>

<style scoped>
.medical-record-detail {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #52c41a;
  color: white;
}

.edit-btn:hover {
  background-color: #73d13d;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}

.delete-btn:hover {
  background-color: #ff7875;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.detail-row.diagnosis-row,
.detail-row.treatment-row {
  flex-direction: column;
}

.detail-label {
  width: 100px;
  color: #666;
  font-weight: 500;
  flex-shrink: 0;
  padding: 5px 0;
}

.detail-value {
  color: #333;
  flex-grow: 1;
  padding: 5px 0;
}

.diagnosis-row .detail-value,
.treatment-row .detail-value {
  margin-top: 5px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  min-height: 60px;
}
</style>