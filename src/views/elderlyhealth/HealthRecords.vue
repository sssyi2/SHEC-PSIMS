<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\elderlyhealth\HealthRecords.vue -->
<template>
  <div class="health-records">
    <TheHeader />
    
    <div class="main-container">
      <HealthSidebar :active-menu="'health-records'" />
      
      <div class="content-area">
        <div class="page-title">健康档案</div>
        
        <div class="records-container">
          <div class="left-panel">
            <PatientManagement 
              :patients="patientList"
              @add-patient="addPatient"
              @search-patient="searchPatient"
              @delete-patient="deletePatient"
              @view-record="viewPatientRecord"
              @delete-record="deletePatientRecord"
            />
          </div>
          
          <div class="right-panel">
            <HealthRecordForm
              :record="selectedRecord"
              :mode="formMode"
              @save-record="saveRecord"
              @update-record="updateRecord"
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
import HealthRecordForm from '@/components/elderlyhealth/HealthRecordForm.vue'

export default defineComponent({
  name: 'HealthRecords',
  components: {
    TheHeader,
    HealthSidebar,
    PatientManagement,
    HealthRecordForm
  },
  setup() {
    // 患者列表数据
    const patientList = ref([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' }
    ])
    
    // 选中的健康记录
    const selectedRecord = ref(null)
    
    // 表单模式：create(新建) 或 edit(编辑)
    const formMode = ref('create')
    
    // 添加患者
    const addPatient = (patient: any) => {
      // 实际应用中应调用API并处理响应
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
      
      // 实际应用中应调用API
      patientList.value = patientList.value.filter(p => p.id !== patientId)
      
      // 如果正在查看被删除患者的记录，则清空
      if (selectedRecord.value && selectedRecord.value.patientId === patientId) {
        selectedRecord.value = null
      }
    }
    
    // 查看患者健康档案
    const viewPatientRecord = (patientId: number) => {
      console.log('查看患者健康档案:', patientId)
      
      // 实际应用中应调用API获取健康档案
      // 模拟获取健康档案
      if (patientId === 1) {
        selectedRecord.value = {
          id: 1,
          patientId: 1,
          name: '张三',
          gender: '男',
          age: 56,
          birthDate: '1969/04/21',
          idNumber: 'xxxxxx19690421xxxx',
          contactNumber: '13746534472',
          address: '四川省成都市郫都区xxxxxx',
          familyHistory: '无',
          allergies: '无',
          medicalHistory: '暂无',
          height: 176,
          weight: 78,
          bloodPressure: '129/83',
          heartRate: 78,
          createDate: '2023/10/01',
          updateDate: '2024/05/15'
        }
      } else if (patientId === 2) {
        selectedRecord.value = {
          id: 2,
          patientId: 2,
          name: '李四',
          gender: '男',
          age: 59,
          birthDate: '1966/02/11',
          idNumber: 'xxxxxx19660211xx',
          contactNumber: '18362453528',
          address: '四川省成都市郫都区xxxxxx',
          familyHistory: '无',
          allergies: '无',
          medicalHistory: '暂无',
          height: 172,
          weight: 69,
          bloodPressure: '133/80',
          heartRate: 84,
          createDate: '2023/09/15',
          updateDate: '2024/04/20'
        }
      }
      
      formMode.value = 'edit'
    }
    
    // 删除患者健康档案
    const deletePatientRecord = (patientId: number) => {
      console.log('删除患者健康档案:', patientId)
      
      // 确认删除
      if (!confirm(`确定要删除ID为${patientId}的患者健康档案吗？`)) {
        return
      }
      
      // 实际应用中应调用API
      // 如果正在查看被删除患者的记录，则清空
      if (selectedRecord.value && selectedRecord.value.patientId === patientId) {
        selectedRecord.value = null
      }
    }
    
    // 保存健康档案
    const saveRecord = (record: any) => {
      console.log('保存健康档案:', record)
      // 实际应用中应调用API
    }
    
    // 更新健康档案
    const updateRecord = (record: any) => {
      console.log('更新健康档案:', record)
      // 实际应用中应调用API
    }
    
    return {
      patientList,
      selectedRecord,
      formMode,
      addPatient,
      searchPatient,
      deletePatient,
      viewPatientRecord,
      deletePatientRecord,
      saveRecord,
      updateRecord
    }
  }
})
</script>

<style scoped>
.health-records {
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