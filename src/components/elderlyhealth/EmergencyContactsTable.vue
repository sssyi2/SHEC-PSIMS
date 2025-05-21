<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\EmergencyContactsTable.vue -->
<template>
  <div class="emergency-contacts-table">
    <div class="table-header">
      <div class="table-title">紧急联系人表</div>
      <button class="add-contact-btn" @click="$emit('add-contact')">添加联系人</button>
    </div>
    
    <div class="table-container">
      <table class="contacts-table">
        <thead>
          <tr>
            <th>病人id</th>
            <th>病人姓名</th>
            <th>紧急联系人姓名</th>
            <th>紧急联系人电话</th>
            <th>关系</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.patientId }}</td>
            <td>{{ contact.patientName }}</td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.relationship }}</td>
            <td class="action-column">
              <button class="action-btn edit-btn" @click="$emit('edit-contact', contact.id)">编辑</button>
              <button class="action-btn delete-btn" @click="$emit('delete-contact', contact.id)">删除</button>
            </td>
          </tr>
          <tr v-if="contacts.length === 0">
            <td colspan="6" class="empty-message">暂无紧急联系人数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Patient, EmergencyContact } from '@/types/emergency-contact.ts'

export default defineComponent({
  name: 'EmergencyContactsTable',
  props: {
    contacts: {
      type: Array as () => EmergencyContact[],
      default: () => []
    },
    patient: {
      type: Object as () => Patient,
      required: true
    }
  },
  emits: ['add-contact', 'edit-contact', 'delete-contact']
})
</script>

<style scoped>
.emergency-contacts-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.table-title {
  font-size: 16px;
  font-weight: 500;
}

.add-contact-btn {
  padding: 6px 12px;
  background: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.contacts-table {
  width: 100%;
  border-collapse: collapse;
}

.contacts-table th, .contacts-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.contacts-table th {
  background-color: #fafafa;
  font-weight: 500;
}

.action-column {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
  background: #f0f0f0;
}

.edit-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.delete-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 20px 0;
}
</style>