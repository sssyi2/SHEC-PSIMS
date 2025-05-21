<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\PatientManagement.vue -->
<template>
  <div class="patient-management">
    <div class="search-bar">
      <input 
        type="text" 
        class="search-input" 
        v-model="searchQuery"
        placeholder="输入病人id"
      />
      <button class="search-button" @click="handleSearch">搜索</button>
    </div>
    
    <div class="add-patient-section">
      <div class="section-title">新增主管病人</div>
      
      <div class="form-group">
        <label>id：</label>
        <input 
          type="text" 
          v-model="newPatient.id" 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>姓名：</label>
        <input 
          type="text" 
          v-model="newPatient.name" 
          class="form-input"
        />
      </div>
      
      <button class="add-button" @click="handleAddPatient">新增</button>
    </div>
    
    <div class="patient-list">
      <div class="list-header">
        <div class="header-cell id-cell">id</div>
        <div class="header-cell name-cell">姓名</div>
        <div class="header-cell action-cell">操作</div>
      </div>
      
      <div 
        v-for="patient in patients" 
        :key="patient.id" 
        class="list-row"
      >
        <div class="row-cell id-cell">{{ patient.id }}</div>
        <div class="row-cell name-cell">{{ patient.name }}</div>
        <div class="row-cell action-cell">
          <button class="action-btn delete-btn" @click="handleDelete(patient.id)">删除</button>
          <button class="action-btn view-btn" @click="handleViewRecord(patient.id)">查档</button>
          <button class="action-btn delete-record-btn" @click="handleDeleteRecord(patient.id)">删档</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { Patient } from '@/types/medical-advice'

export default defineComponent({
  name: 'PatientManagement',
  props: {
    patients: {
      type: Array as () => Patient[],
      default: () => []
    }
  },
  emits: ['add-patient', 'search-patient', 'delete-patient', 'view-record', 'delete-record'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    
    const newPatient = reactive({
      id: '',
      name: ''
    })
    
    // 处理搜索
    const handleSearch = () => {
      emit('search-patient', searchQuery.value)
    }
    
    // 处理添加患者
    const handleAddPatient = () => {
      if (!newPatient.id || !newPatient.name) {
        alert('请填写完整的病人信息')
        return
      }
      
      emit('add-patient', { ...newPatient })
      
      // 清空表单
      newPatient.id = ''
      newPatient.name = ''
    }
    
    // 处理删除患者
    const handleDelete = (patientId: number) => {
      emit('delete-patient', patientId)
    }
    
    // 处理查看患者健康档案
    const handleViewRecord = (patientId: number) => {
      emit('view-record', patientId)
    }
    
    // 处理删除患者健康档案
    const handleDeleteRecord = (patientId: number) => {
      emit('delete-record', patientId)
    }
    
    return {
      searchQuery,
      newPatient,
      handleSearch,
      handleAddPatient,
      handleDelete,
      handleViewRecord,
      handleDeleteRecord
    }
  }
})
</script>

<style scoped>
.patient-management {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.search-bar {
  display: flex;
  margin-bottom: 15px;
}

.search-input {
  flex-grow: 1;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
  margin-right: 10px;
}

.search-button {
  padding: 0 15px;
  height: 36px;
  background: #1890ff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.form-group label {
  width: 60px;
  text-align: right;
  margin-right: 10px;
}

.form-input {
  flex-grow: 1;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.add-button {
  width: 100%;
  height: 36px;
  background: #1890ff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
}

.patient-list {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.list-header {
  display: flex;
  background-color: #fafafa;
  padding: 10px;
  font-weight: 500;
}

.header-cell, .row-cell {
  padding: 8px;
}

.id-cell {
  width: 50px;
}

.name-cell {
  flex-grow: 1;
}

.action-cell {
  width: 150px;
  display: flex;
  justify-content: space-between;
}

.list-row {
  display: flex;
  border-top: 1px solid #e8e8e8;
  padding: 10px;
}

.action-btn {
  padding: 4px 8px;
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.view-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.delete-record-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
</style>