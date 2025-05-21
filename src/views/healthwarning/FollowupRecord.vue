<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\healthwarning\FollowupRecord.vue -->
<template>
  <div class="followup-record">
    <TheHeader />
    
    <div class="main-container">
      <HealthWarningSidebar :active-menu="'followup-record'" />
      
      <div class="content-area">
        <div class="page-header">
          <h1 class="page-title">随访干预记录</h1>
        </div>
        
        <div class="record-form-container">
          <PatientInfoPanel 
            v-if="patientInfo" 
            :patient-info="patientInfo" 
          />
          
          <FollowupRecordForm
            :patient-id="patientId"
            :disease-types="diseaseTypes"
            :loading="loading"
            @patient-change="handlePatientChange"
            @save-record="handleSaveRecord"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import HealthWarningSidebar from '@/components/healthwarning/HealthWarningSidebar.vue'
import PatientInfoPanel from '@/components/healthwarning/PatientInfoPanel.vue'
import FollowupRecordForm from '@/components/healthwarning/FollowupRecordForm.vue'
import type { Patient, FollowupRecord } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'FollowupRecord',
  components: {
    TheHeader,
    HealthWarningSidebar,
    PatientInfoPanel,
    FollowupRecordForm
  },
  setup() {
    // 加载状态
    const loading = ref(false);
    
    // 患者ID
    const patientId = ref('');
    
    // 患者信息
    const patientInfo = ref<Patient | null>(null);
    
    // 疾病分类列表
    const diseaseTypes = [
      '内科', '外科', '妇产科', '急诊科', '儿科', 
      '眼科', '口腔科', '耳鼻喉科', '精神科'
    ];
    
    // 处理患者变更
    const handlePatientChange = async (id: string) => {
      if (!id) {
        patientInfo.value = null;
        return;
      }
      
      patientId.value = id;
      loading.value = true;
      
      try {
        // 模拟API调用获取患者信息
        // const response = await api.getPatientById(id);
        // patientInfo.value = response.data;
        
        // 模拟数据
        setTimeout(() => {
          patientInfo.value = {
            id: parseInt(id),
            name: '张三',
            gender: '男',
            age: 65,
            phone: '13812345678',
            address: '上海市浦东新区',
            medicalRecordNo: `P${id}`,
            diseaseHistory: [
              { type: '内科', name: '高血压' },
              { type: '内科', name: '糖尿病' }
            ]
          };
          loading.value = false;
        }, 500);
      } catch (error) {
        console.error('获取患者信息失败:', error);
        patientInfo.value = null;
        loading.value = false;
      }
    };
    
    // 处理保存随访记录
    const handleSaveRecord = async (record: FollowupRecord) => {
      loading.value = true;
      
      try {
        // 模拟API调用保存随访记录
        // await api.saveFollowupRecord(record);
        
        // 模拟保存操作
        setTimeout(() => {
          console.log('保存的随访记录:', record);
          alert('随访干预记录保存成功！');
          loading.value = false;
        }, 800);
      } catch (error) {
        console.error('保存随访记录失败:', error);
        alert('保存失败，请重试！');
        loading.value = false;
      }
    };
    
    return {
      loading,
      patientId,
      patientInfo,
      diseaseTypes,
      handlePatientChange,
      handleSaveRecord
    };
  }
});
</script>

<style scoped>
.followup-record {
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

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.record-form-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding: 10px;
  }
}
</style>