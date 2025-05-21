<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\PatientInfoPanel.vue -->
<template>
  <div class="patient-info-panel">
    <div class="panel-header">
      <h3 class="panel-title">患者信息</h3>
    </div>
    
    <div class="patient-avatar">
      <div class="avatar-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </div>
    </div>
    
    <div class="patient-details">
      <table class="info-table">
        <tbody>
          <tr>
            <td class="label-cell">姓名：</td>
            <td class="value-cell">{{ patientInfo.name }}</td>
            <td class="label-cell">性别：</td>
            <td class="value-cell">{{ patientInfo.gender }}</td>
          </tr>
          <tr>
            <td class="label-cell">年龄：</td>
            <td class="value-cell">{{ patientInfo.age }}</td>
            <td class="label-cell">电话：</td>
            <td class="value-cell">{{ patientInfo.phone }}</td>
          </tr>
          <tr>
            <td class="label-cell">疾病分类：</td>
            <td class="value-cell">{{ diseaseTypesText }}</td>
            <td class="label-cell">病历号：</td>
            <td class="value-cell">{{ patientInfo.medicalRecordNo }}</td>
          </tr>
          <tr>
            <td class="label-cell">疾病名称：</td>
            <td class="value-cell" colspan="3">{{ diseaseNamesText }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { Patient } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'PatientInfoPanel',
  props: {
    patientInfo: {
      type: Object as PropType<Patient>,
      required: true
    }
  },
  setup(props) {
    // 计算疾病分类文本
    const diseaseTypesText = computed(() => {
      if (!props.patientInfo.diseaseHistory || props.patientInfo.diseaseHistory.length === 0) {
        return '无';
      }
      
      // 获取唯一的疾病分类
      const types = new Set(props.patientInfo.diseaseHistory.map(d => d.type));
      return Array.from(types).join('、');
    });
    
    // 计算疾病名称文本
    const diseaseNamesText = computed(() => {
      if (!props.patientInfo.diseaseHistory || props.patientInfo.diseaseHistory.length === 0) {
        return '无';
      }
      
      return props.patientInfo.diseaseHistory.map(d => d.name).join('、');
    });
    
    return {
      diseaseTypesText,
      diseaseNamesText
    };
  }
});
</script>

<style scoped>
.patient-info-panel {
  display: flex;
  margin-bottom: 30px;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}

.panel-header {
  position: absolute;
  top: -12px;
  left: 20px;
  background-color: #1890ff;
  color: white;
  padding: 4px 15px;
  border-radius: 4px;
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.patient-avatar {
  width: 130px;
  height: 170px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 20px;
  margin-top: 10px;
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-details {
  flex-grow: 1;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.label-cell {
  width: 90px;
  text-align: right;
  padding: 10px 0;
  color: #555;
  font-weight: 500;
}

.value-cell {
  padding: 10px;
  color: #333;
}

@media (max-width: 768px) {
  .patient-info-panel {
    flex-direction: column;
  }
  
  .patient-avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>