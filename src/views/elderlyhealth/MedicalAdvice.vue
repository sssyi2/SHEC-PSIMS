<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\elderlyhealth\MedicalAdvice.vue -->
<template>
  <div class="medical-advice">
    <TheHeader />
    
    <div class="main-container">
      <HealthSidebar :active-menu="'medical-advice'" />
      
      <div class="content-area">
        <div class="page-title">医嘱信息</div>
        
        <div class="advice-container">
          <div class="left-panel">
            <PatientManagement 
              :patients="patientList"
              @add-patient="addPatient"
              @search-patient="searchPatient"
              @delete-patient="deletePatient"
              @view-record="viewMedicalAdvice"
              @delete-record="deleteMedicalAdvice"
            />
          </div>
          
          <div class="right-panel">
            <div v-if="currentView === 'form'">
              <MedicalAdviceForm 
                :advice="currentAdvice"
                :mode="formMode"
                @save="saveAdvice"
                @update="updateAdvice"
                @cancel="cancelEdit"
              />
            </div>
            <div v-else-if="currentView === 'detail'">
              <MedicalAdviceDetail 
                :advice="currentAdvice"
                @edit="editAdvice"
                @delete="deleteAdvice"
                @send="sendAdvice"
              />
            </div>
            <div v-else>
              <div class="empty-state">
                <p>请选择患者查看医嘱信息或点击"新建医嘱"创建新医嘱</p>
                <button class="btn-create" @click="createNewAdvice">新建医嘱</button>
              </div>
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
import MedicalAdviceForm from '@/components/elderlyhealth/MedicalAdviceForm.vue'
import MedicalAdviceDetail from '@/components/elderlyhealth/MedicalAdviceDetail.vue'
import type { Patient, MedicalAdvice } from '@/types/medical-advice'

export default defineComponent({
  name: 'MedicalAdvice',
  components: {
    TheHeader,
    HealthSidebar,
    PatientManagement,
    MedicalAdviceForm,
    MedicalAdviceDetail
  },
  setup() {
    // 患者列表数据
    const patientList = ref<Patient[]>([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' }
    ])
    
    // 当前视图模式: form(表单) 或 detail(详情) 或 empty(空状态)
    const currentView = ref<'form' | 'detail' | 'empty'>('empty')
    
    // 表单模式: create(新建) 或 edit(编辑)
    const formMode = ref<'create' | 'edit'>('create')
    
    // 当前医嘱数据
    const currentAdvice = ref<MedicalAdvice | null>(null)
    
    // 添加患者
    const addPatient = (patient: Patient): void => {
      console.log('添加患者:', patient)
      
      // 模拟添加成功，更新列表
      const newId = patientList.value.length > 0 
        ? Math.max(...patientList.value.map(p => p.id)) + 1 
        : 1
      
      patientList.value.push({
        id: newId,
        name: patient.name
      })
    }
    
    // 搜索患者
    const searchPatient = (keyword: string): void => {
      console.log('搜索患者:', keyword)
      // 实际应用中应调用API搜索
    }
    
    // 删除患者
    const deletePatient = (patientId: number): void => {
      console.log('删除患者:', patientId)
      
      // 确认删除
      if (!confirm(`确定要删除ID为${patientId}的患者吗？`)) {
        return
      }
      
      patientList.value = patientList.value.filter(p => p.id !== patientId)
      
      // 如果正在查看被删除患者的医嘱，则清空
      if (currentAdvice.value && currentAdvice.value.patientId === patientId) {
        currentAdvice.value = null
        currentView.value = 'empty'
      }
    }
    
    // 查看医嘱
    const viewMedicalAdvice = (patientId: number): void => {
      console.log('查看医嘱:', patientId)
      
      // 模拟获取医嘱数据
      let adviceData: MedicalAdvice | null = null
      
      if (patientId === 1) {
        adviceData = {
          id: 1,
          patientId: 1,
          name: '张三',
          medication: '1. 盐酸二甲双胍片，0.5g，每日三次，饭前服用\n2. 格列美脲片，2mg，每日一次，早餐前服用\n3. 阿托伐他汀钙片，20mg，每晚一次',
          notes: '控制饮食，减少碳水化合物和脂肪摄入，定期监测血糖',
          startDate: '2024-05-01',
          endDate: '2024-06-01',
          createTime: '2024-05-01 10:30:45',
          updateTime: '2024-05-01 10:30:45'
        }
      } else if (patientId === 2) {
        adviceData = {
          id: 2,
          patientId: 2,
          name: '李四',
          medication: '1. 硝苯地平缓释片，30mg，每日一次\n2. 氢氯噻嗪片，12.5mg，每日一次，早餐后服用',
          notes: '低盐饮食，控制体重，避免剧烈运动',
          startDate: '2024-04-15',
          endDate: '2024-05-15',
          createTime: '2024-04-15 15:20:30',
          updateTime: '2024-04-15 15:20:30'
        }
      }
      
      if (adviceData) {
        currentAdvice.value = adviceData
        currentView.value = 'detail'
      }
    }
    
    // 删除医嘱
    const deleteMedicalAdvice = (patientId: number): void => {
      console.log('删除医嘱:', patientId)
      
      // 确认删除
      if (!confirm(`确定要删除患者ID为${patientId}的医嘱吗？`)) {
        return
      }
      
      // 实际应用中应调用API删除
      
      // 如果当前显示的是被删除患者的医嘱，则清空
      if (currentAdvice.value && currentAdvice.value.patientId === patientId) {
        currentAdvice.value = null
        currentView.value = 'empty'
      }
    }
    
    // 删除特定医嘱
    const deleteAdvice = (adviceId: number | string): void => {
      console.log('删除医嘱ID:', adviceId)
      
      // 确认删除
      if (!confirm(`确定要删除医嘱ID为${adviceId}吗？`)) {
        return
      }
      
      // 实际应用中应调用API删除
      if (currentAdvice.value && currentAdvice.value.id === adviceId) {
        currentAdvice.value = null
        currentView.value = 'empty'
      }
    }
    
    // 编辑医嘱
    const editAdvice = (advice: MedicalAdvice): void => {
      currentAdvice.value = { ...advice }
      formMode.value = 'edit'
      currentView.value = 'form'
    }
    
    // 创建新医嘱
    const createNewAdvice = (): void => {
      currentAdvice.value = {
        id: '',
        patientId: '',
        name: '',
        medication: '',
        notes: '',
        startDate: '',
        endDate: '',
        createTime: new Date().toLocaleString(),
        updateTime: new Date().toLocaleString()
      }
      formMode.value = 'create'
      currentView.value = 'form'
    }
    
    // 保存医嘱
    const saveAdvice = (advice: MedicalAdvice): void => {
      console.log('保存医嘱:', advice)
      
      // 实际应用中应调用API保存
      currentAdvice.value = { ...advice }
      currentView.value = 'detail'
    }
    
    // 更新医嘱
    const updateAdvice = (advice: MedicalAdvice): void => {
      console.log('更新医嘱:', advice)
      
      // 实际应用中应调用API更新
      advice.updateTime = new Date().toLocaleString()
      currentAdvice.value = { ...advice }
      currentView.value = 'detail'
    }
    
    // 取消编辑
    const cancelEdit = (): void => {
      if (formMode.value === 'create') {
        currentAdvice.value = null
        currentView.value = 'empty'
      } else {
        currentView.value = 'detail'
      }
    }
    
    // 发送医嘱
    const sendAdvice = (adviceId: number | string): void => {
      console.log('发送医嘱:', adviceId)
      
      // 实际应用中应调用API发送医嘱
      alert(`医嘱ID ${adviceId} 已成功发送至患者`)
    }
    
    return {
      patientList,
      currentView,
      formMode,
      currentAdvice,
      addPatient,
      searchPatient,
      deletePatient,
      viewMedicalAdvice,
      deleteMedicalAdvice,
      deleteAdvice,
      editAdvice,
      createNewAdvice,
      saveAdvice,
      updateAdvice,
      cancelEdit,
      sendAdvice
    }
  }
})
</script>