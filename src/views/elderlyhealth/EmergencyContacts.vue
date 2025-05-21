<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\elderlyhealth\EmergencyContacts.vue -->
<template>
  <div class="emergency-contacts">
    <TheHeader />
    
    <div class="main-container">
      <HealthSidebar :active-menu="'emergency-contacts'" />
      
      <div class="content-area">
        <div class="page-title">紧急联系人</div>
        
        <div class="container">
          <div class="left-section">
            <div class="search-bar">
              <input 
                type="text" 
                v-model="searchQuery"
                class="search-input" 
                placeholder="输入病人id"
              />
              <button class="search-button" @click="searchPatient">搜索</button>
            </div>
            
            <PatientManagement 
              :patients="patientList"
              @add-patient="addPatient"
              @delete-patient="deletePatient"
              @view-contacts="viewEmergencyContacts"
            />
          </div>
          
          <div class="right-section">
            <EmergencyContactsTable 
              v-if="selectedPatient"
              :contacts="emergencyContacts"
              :patient="selectedPatient"
              @add-contact="showAddContactForm"
              @edit-contact="showEditContactForm"
              @delete-contact="deleteContact"
            />
            
            <EmergencyContactForm 
              v-if="showContactForm"
              :contact="currentContact"
              :patient="selectedPatient"
              :mode="formMode"
              @save="saveContact"
              @cancel="closeContactForm"
            />
            
            <div v-if="!selectedPatient && !showContactForm" class="empty-state">
              <p>请选择患者查看紧急联系人信息</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import HealthSidebar from '@/components/elderlyhealth/HealthSidebar.vue'
import PatientManagement from '@/components/elderlyhealth/PatientManagement.vue'
import EmergencyContactsTable from '@/components/elderlyhealth/EmergencyContactsTable.vue'
import EmergencyContactForm from '@/components/elderlyhealth/EmergencyContactForm.vue'
import type { Patient, EmergencyContact } from '@/types/emergency-contact.ts'

export default defineComponent({
  name: 'EmergencyContacts',
  components: {
    TheHeader,
    HealthSidebar,
    PatientManagement,
    EmergencyContactsTable,
    EmergencyContactForm
  },
  setup() {
    // 搜索查询
    const searchQuery = ref('')
    
    // 患者列表
    const patientList = ref<Patient[]>([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' }
    ])
    
    // 当前选中的患者
    const selectedPatient = ref<Patient | null>(null)
    
    // 紧急联系人数据
    const emergencyContacts = ref<EmergencyContact[]>([])
    
    // 当前编辑的联系人
    const currentContact = ref<EmergencyContact | null>(null)
    
    // 是否显示联系人表单
    const showContactForm = ref(false)
    
    // 表单模式：新增或编辑
    const formMode = ref<'add' | 'edit'>('add')
    
    // 查询患者
    const searchPatient = () => {
      if (!searchQuery.value.trim()) {
        return
      }
      
      // 模拟搜索功能，实际应调用API
      const patientId = parseInt(searchQuery.value)
      const patient = patientList.value.find(p => p.id === patientId)
      
      if (patient) {
        selectedPatient.value = patient
        loadEmergencyContacts(patientId)
      } else {
        alert('未找到该患者')
      }
    }
    
    // 添加患者
    const addPatient = (patient: Patient) => {
      // 模拟添加患者，实际应调用API
      const newId = patientList.value.length > 0 
        ? Math.max(...patientList.value.map(p => p.id)) + 1 
        : 1
      
      patientList.value.push({
        id: newId,
        name: patient.name
      })
    }
    
    // 删除患者
    const deletePatient = (patientId: number) => {
      // 确认删除
      if (!confirm(`确定要删除ID为${patientId}的患者吗？`)) {
        return
      }
      
      patientList.value = patientList.value.filter(p => p.id !== patientId)
      
      // 如果删除的是当前选中的患者，清空联系人数据
      if (selectedPatient.value && selectedPatient.value.id === patientId) {
        selectedPatient.value = null
        emergencyContacts.value = []
      }
    }
    
    // 查看紧急联系人
    const viewEmergencyContacts = (patientId: number) => {
      const patient = patientList.value.find(p => p.id === patientId)
      
      if (patient) {
        selectedPatient.value = patient
        loadEmergencyContacts(patientId)
      }
    }
    
    // 加载紧急联系人数据
    const loadEmergencyContacts = (patientId: number) => {
      // 模拟加载数据，实际应调用API
      if (patientId === 1) {
        emergencyContacts.value = [
          {
            id: 1,
            patientId: 1,
            patientName: '张三',
            name: '张xx',
            phone: '15263748252',
            relationship: '父女'
          }
        ]
      } else if (patientId === 2) {
        emergencyContacts.value = [
          {
            id: 2,
            patientId: 2,
            patientName: '李四',
            name: '李xx',
            phone: '18364263724',
            relationship: '父子'
          }
        ]
      } else {
        emergencyContacts.value = []
      }
    }
    
    // 显示添加联系人表单
    const showAddContactForm = () => {
      if (!selectedPatient.value) {
        return
      }
      
      currentContact.value = {
        id: 0,
        patientId: selectedPatient.value.id,
        patientName: selectedPatient.value.name,
        name: '',
        phone: '',
        relationship: ''
      }
      
      formMode.value = 'add'
      showContactForm.value = true
    }
    
    // 显示编辑联系人表单
    const showEditContactForm = (contactId: number) => {
      const contact = emergencyContacts.value.find(c => c.id === contactId)
      
      if (contact) {
        currentContact.value = { ...contact }
        formMode.value = 'edit'
        showContactForm.value = true
      }
    }
    
    // 关闭联系人表单
    const closeContactForm = () => {
      showContactForm.value = false
      currentContact.value = null
    }
    
    // 保存联系人
    const saveContact = (contact: EmergencyContact) => {
      // 检查表单数据
      if (!contact.name || !contact.phone || !contact.relationship) {
        alert('请填写完整的联系人信息')
        return
      }
      
      if (formMode.value === 'add') {
        // 模拟添加联系人，实际应调用API
        const newId = emergencyContacts.value.length > 0 
          ? Math.max(...emergencyContacts.value.map(c => c.id)) + 1 
          : 1
        
        emergencyContacts.value.push({
          ...contact,
          id: newId
        })
      } else {
        // 模拟更新联系人，实际应调用API
        const index = emergencyContacts.value.findIndex(c => c.id === contact.id)
        
        if (index !== -1) {
          emergencyContacts.value[index] = contact
        }
      }
      
      // 关闭表单
      closeContactForm()
    }
    
    // 删除联系人
    const deleteContact = (contactId: number) => {
      // 确认删除
      if (!confirm(`确定要删除此紧急联系人吗？`)) {
        return
      }
      
      emergencyContacts.value = emergencyContacts.value.filter(c => c.id !== contactId)
    }
    
    return {
      searchQuery,
      patientList,
      selectedPatient,
      emergencyContacts,
      currentContact,
      showContactForm,
      formMode,
      searchPatient,
      addPatient,
      deletePatient,
      viewEmergencyContacts,
      showAddContactForm,
      showEditContactForm,
      closeContactForm,
      saveContact,
      deleteContact
    }
  }
})
</script>

<style scoped>
.emergency-contacts {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.main-container {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  padding: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

.container {
  display: flex;
  gap: 20px;
}

.left-section {
  width: 330px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.right-section {
  flex-grow: 1;
}

.search-bar {
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

.empty-state {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  color: #666;
}

@media (max-width: 1200px) {
  .container {
    flex-direction: column;
  }
  
  .left-section {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding: 10px;
  }
}
</style>