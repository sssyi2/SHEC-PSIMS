<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\healthwarning\WarningSettings.vue -->
<template>
  <div class="warning-settings">
    <TheHeader />
    
    <div class="main-container">
      <HealthWarningSidebar :active-menu="'warning-settings'" />
      
      <div class="content-area">
        <div class="page-title">预警提醒设置</div>
        
        <div class="settings-container">
          <WarningForm 
            :patient-id="currentPatientId"
            :disease-types="diseaseTypes"
            :warning-levels="warningLevels"
            :alert-methods="alertMethods"
            @save-warning="handleSaveWarning"
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
import WarningForm from '@/components/healthwarning/WarningForm.vue'
import type { WarningSettings, WarningCondition } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'WarningSettings',
  components: {
    TheHeader,
    HealthWarningSidebar,
    WarningForm
  },
  setup() {
    // 当前患者ID
    const currentPatientId = ref<string>('')
    
    // 疾病分类列表
    const diseaseTypes = ref([
      '内科', '外科', '妇产科', '急诊科', '儿科', 
      '眼科', '口腔科', '耳鼻喉科', '精神科'
    ])
    
    // 预警等级列表
    const warningLevels = ref([
      '一级', '二级', '三级', '四级', '五级'
    ])
    
    // 预警方式列表
    const alertMethods = ref([
      { id: 'popup', label: '弹窗提醒' },
      { id: 'email', label: '邮件提醒' },
      { id: 'sms', label: '短信提醒' },
      { id: 'none', label: '不另外提醒' }
    ])
    
    // 监测指标选项（可以从API获取）
    const monitoringIndicators = ref([
      { id: 1, name: '血压' },
      { id: 2, name: '血糖' },
      { id: 3, name: '心率' },
      { id: 4, name: '体温' },
      { id: 5, name: '血氧' }
    ])
    
    // 处理保存设置
    const handleSaveWarning = (warningSettings: WarningSettings) => {
      console.log('保存预警设置:', warningSettings)
      
      // 这里应该调用API保存预警设置
      // 示例：api.saveWarningSettings(warningSettings)
      
      alert('预警设置保存成功！')
    }
    
    return {
      currentPatientId,
      diseaseTypes,
      warningLevels,
      alertMethods,
      monitoringIndicators,
      handleSaveWarning
    }
  }
})
</script>

<style scoped>
.warning-settings {
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
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

.settings-container {
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