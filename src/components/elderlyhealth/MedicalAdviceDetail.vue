<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\MedicalAdviceDetail.vue -->
<template>
  <div class="medical-advice-detail">
    <div class="detail-header">
      <div class="header-title">病人医嘱信息</div>
      <div class="header-actions">
        <button class="action-btn edit-btn" @click="handleEdit">修改医嘱</button>
        <button class="action-btn delete-btn" @click="handleDelete">删除医嘱</button>
        <button class="action-btn send-btn" @click="handleSend">发送医嘱</button>
      </div>
    </div>
    
    <div class="detail-content">
      <table class="detail-table">
        <tr>
          <td class="label-cell">医嘱id</td>
          <td class="value-cell">{{ advice.id }}</td>
        </tr>
        <tr>
          <td class="label-cell">病人id</td>
          <td class="value-cell">{{ advice.patientId }}</td>
        </tr>
        <tr>
          <td class="label-cell">姓名</td>
          <td class="value-cell">{{ advice.name }}</td>
        </tr>
        <tr>
          <td class="label-cell">用药说明</td>
          <td class="value-cell medication-cell">
            <pre>{{ advice.medication }}</pre>
          </td>
        </tr>
        <tr>
          <td class="label-cell">其余备注</td>
          <td class="value-cell notes-cell">
            <pre>{{ advice.notes }}</pre>
          </td>
        </tr>
        <tr>
          <td class="label-cell">开始日期</td>
          <td class="value-cell">{{ advice.startDate }}</td>
        </tr>
        <tr>
          <td class="label-cell">结束日期</td>
          <td class="value-cell">{{ advice.endDate }}</td>
        </tr>
        <tr>
          <td class="label-cell">创建时间</td>
          <td class="value-cell">{{ advice.createTime }}</td>
        </tr>
        <tr>
          <td class="label-cell">更新时间</td>
          <td class="value-cell">{{ advice.updateTime }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MedicalAdviceDetail',
  props: {
    advice: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete', 'send'],
  setup(props, { emit }) {
    // 处理编辑
    const handleEdit = () => {
      emit('edit', props.advice)
    }
    
    // 处理删除
    const handleDelete = () => {
      emit('delete', props.advice.id)
    }
    
    // 处理发送
    const handleSend = () => {
      emit('send', props.advice.id)
    }
    
    return {
      handleEdit,
      handleDelete,
      handleSend
    }
  }
})
</script>

<style scoped>
.medical-advice-detail {
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
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.edit-btn {
  background-color: #52c41a;
  color: white;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}

.send-btn {
  background-color: #1890ff;
  color: white;
}

.detail-content {
  width: 100%;
  overflow-x: auto;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table tr {
  border-bottom: 1px solid #f0f0f0;
}

.detail-table td {
  padding: 12px 8px;
}

.label-cell {
  width: 100px;
  font-weight: 500;
  color: #333;
  vertical-align: top;
}

.value-cell {
  color: #333;
}

.medication-cell, .notes-cell {
  min-height: 80px;
  max-width: 600px;
  vertical-align: top;
}

.medication-cell pre, .notes-cell pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
}
</style>