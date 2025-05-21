<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\elderlyhealth\ElectronicMedicalRecords.vue -->
<template>
  <div class="medical-records">
    <TheHeader />
    
    <div class="main-container">
      <HealthSidebar :active-menu="'electronic-medical-records'" />
      
      <div class="content-area">
        <div class="page-title">电子病历</div>
        
        <div class="records-container">
          <div class="left-panel">
            <PatientManagement 
              :patients="patientList"
              @add-patient="addPatient"
              @search-patient="searchPatient"
              @delete-patient="deletePatient"
              @view-record="viewMedicalRecord"
              @delete-record="deleteMedicalRecord"
            />
          </div>
          
          <div class="right-panel">
            <MedicalRecordForm
              v-if="showMedicalRecordForm"
              :record="selectedRecord"
              :mode="formMode"
              @save-record="saveMedicalRecord"
              @update-record="updateMedicalRecord"
              @cancel="cancelEdit"
            />
            
            <MedicalRecordDetail
              v-else-if="selectedRecord"
              :record="selectedRecord"
              @edit-record="startEditRecord"
              @delete-record="deleteMedicalRecord"
            />
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
import MedicalRecordForm from '@/components/elderlyhealth/MedicalRecordForm.vue'
import MedicalRecordDetail from '@/components/elderlyhealth/MedicalRecordDetail.vue'

export default defineComponent({
  name: 'ElectronicMedicalRecords',
  components: {
    TheHeader,
    HealthSidebar,
    PatientManagement,
    MedicalRecordForm,
    MedicalRecordDetail
  },
  setup() {
    // 患者列表
    const patientList = ref([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' }
    ])
    
    // 选中的病历记录
    const selectedRecord = ref(null)
    
    // 表单模式：'create'(新建) 或 'edit'(编辑)
    const formMode = ref('create')
    
    // 是否显示病历表单
    const showMedicalRecordForm = ref(false)
    
    // 添加患者
    const addPatient = (patient: any) => {
      console.log('添加患者:', patient)
      
      // 模拟添加成功，并更新列表
      const newId = patientList.value.length > 0 
        ? Math.max(...patientList.value.map(p => p.id)) + 1 
        : 1
      
      patientList.value.push({
        id: newId,
        name: patient.name
      })
    }
    
    // 搜索患者
    const searchPatient = (keyword: string) => {
      console.log('搜索患者:', keyword)
      // 实际应用中应调用API进行搜索
    }
    
    // 删除患者
    const deletePatient = (patientId: number) => {
      console.log('删除患者:', patientId)
      
      // 确认删除
      if (!confirm(`确定要删除ID为${patientId}的患者吗？`)) {
        return
      }
      
      patientList.value = patientList.value.filter(p => p.id !== patientId)
      
      // 如果正在查看被删除患者的记录，则清空
      if (selectedRecord.value && selectedRecord.value.patientId === patientId) {
        selectedRecord.value = null
        showMedicalRecordForm.value = false
      }
    }
    
    // 查看患者电子病历
    const viewMedicalRecord = (patientId: number) => {
      console.log('查看患者电子病历:', patientId)
      
      // 实际应用中应调用API获取电子病历
      // 这里模拟获取病历数据
      if (patientId === 1) {
        selectedRecord.value = {
          id: 1,
          patientId: 1,
          name: '张三',
          gender: '男',
          age: 56,
          diagnosis: '高血压，2型糖尿病',
          treatment: '降压药物治疗，口服降糖药物，控制饮食，增加适度运动',
          createTime: '2024-03-15 09:30:45',
          updateTime: '2024-05-10 14:22:30'
        }
      } else if (patientId === 2) {
        selectedRecord.value = {
          id: 2,
          patientId: 2,
          name: '李四',
          gender: '男',
          age: 59,
          diagnosis: '冠心病，血脂异常',
          treatment: '他汀类药物治疗，抗血小板聚集药物，低盐低脂饮食',
          createTime: '2024-02-20 11:15:20',
          updateTime: '2024-04-18 16:05:12'
        }
      }
      
      showMedicalRecordForm.value = false
    }
    
    // 删除电子病历
    const deleteMedicalRecord = (recordId: number) => {
      console.log('删除电子病历:', recordId)
      
      // 确认删除
      if (!confirm(`确定要删除ID为${recordId}的电子病历吗？`)) {
        return
      }
      
      // 实际应用中应调用API
      // 清空选中记录
      if (selectedRecord.value && selectedRecord.value.id === recordId) {
        selectedRecord.value = null
        showMedicalRecordForm.value = false
      }
    }
    
    // 开始编辑病历
    const startEditRecord = (record: any) => {
      selectedRecord.value = { ...record }
      formMode.value = 'edit'
      showMedicalRecordForm.value = true
    }
    
    // 新建病历表单
    const createNewMedicalRecord = () => {
      selectedRecord.value = {
        id: '',
        patientId: '',
        name: '',
        gender: '',
        age: '',
        diagnosis: '',
        treatment: '',
        createTime: new Date().toLocaleString(),
        updateTime: new Date().toLocaleString()
      }
      formMode.value = 'create'
      showMedicalRecordForm.value = true
    }
    
    // 保存新病历
    const saveMedicalRecord = (record: any) => {
      console.log('保存电子病历:', record)
      // 实际应用中应调用API
      showMedicalRecordForm.value = false
    }
    
    // 更新病历
    const updateMedicalRecord = (record: any) => {
      console.log('更新电子病历:', record)
      // 实际应用中应调用API
      record.updateTime = new Date().toLocaleString()
      selectedRecord.value = { ...record }
      showMedicalRecordForm.value = false
    }
    
    // 取消编辑
    const cancelEdit = () => {
      showMedicalRecordForm.value = false
    }
    
    return {
      patientList,
      selectedRecord,
      formMode,
      showMedicalRecordForm,
      addPatient,
      searchPatient,
      deletePatient,
      viewMedicalRecord,
      deleteMedicalRecord,
      startEditRecord,
      createNewMedicalRecord,
      saveMedicalRecord,
      updateMedicalRecord,
      cancelEdit
    }
  }
})
</script>

<style scoped>
.medical-records {
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

.records-container {
  display: flex;
  gap: 20px;
}

.left-panel {
  width: 330px;
  flex-shrink: 0;
}

.right-panel {
  flex-grow: 1;
}

@media (max-width: 1200px) {
  .records-container {
    flex-direction: column;
  }
  
  .left-panel {
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