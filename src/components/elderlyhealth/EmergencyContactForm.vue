<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\EmergencyContactForm.vue -->
<template>
  <div class="emergency-contact-form">
    <div class="form-header">
      <div class="form-title">{{ isAddMode ? '添加紧急联系人' : '编辑紧急联系人' }}</div>
    </div>
    
    <div class="form-body">
      <div class="form-row">
        <div class="form-group">
          <label>病人id：</label>
          <input 
            type="text"
            v-model="formData.patientId"
            class="form-input"
            disabled
          />
        </div>
        
        <div class="form-group">
          <label>病人姓名：</label>
          <input 
            type="text"
            v-model="formData.patientName"
            class="form-input"
            disabled
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>联系人姓名：</label>
          <input 
            type="text"
            v-model="formData.name"
            class="form-input"
            placeholder="请输入紧急联系人姓名"
          />
        </div>
        
        <div class="form-group">
          <label>联系人电话：</label>
          <input 
            type="text"
            v-model="formData.phone"
            class="form-input"
            placeholder="请输入紧急联系人电话"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>关系：</label>
          <input 
            type="text"
            v-model="formData.relationship"
            class="form-input"
            placeholder="请输入与患者的关系"
          />
        </div>
      </div>
    </div>
    
    <div class="form-footer">
      <button class="form-btn submit-btn" @click="handleSubmit">{{ isAddMode ? '添加' : '保存' }}</button>
      <button class="form-btn cancel-btn" @click="$emit('cancel')">取消</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import type { Patient, EmergencyContact } from '@/types/emergency-contact.ts'

export default defineComponent({
  name: 'EmergencyContactForm',
  props: {
    contact: {
      type: Object as () => EmergencyContact | null,
      default: null
    },
    patient: {
      type: Object as () => Patient,
      required: true
    },
    mode: {
      type: String as () => 'add' | 'edit',
      default: 'add'
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    // 表单数据
    const formData = reactive<EmergencyContact>({
      id: props.contact?.id || 0,
      patientId: props.contact?.patientId || props.patient.id,
      patientName: props.contact?.patientName || props.patient.name,
      name: props.contact?.name || '',
      phone: props.contact?.phone || '',
      relationship: props.contact?.relationship || ''
    })
    
    // 是否为添加模式
    const isAddMode = computed(() => props.mode === 'add')
    
    // 提交表单
    const handleSubmit = () => {
      // 验证表单
      if (!formData.name) {
        alert('请输入联系人姓名')
        return
      }
      
      if (!formData.phone) {
        alert('请输入联系人电话')
        return
      }
      
      if (!formData.relationship) {
        alert('请输入与患者的关系')
        return
      }
      
      // 电话号码格式验证
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(formData.phone)) {
        alert('请输入有效的手机号码')
        return
      }
      
      emit('save', { ...formData })
    }
    
    return {
      formData,
      isAddMode,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.emergency-contact-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-header {
  margin-bottom: 20px;
}

.form-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group label {
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
}

.form-input {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-footer {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.form-btn {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.submit-btn {
  background-color: #1890ff;
  color: white;
}

.submit-btn:hover {
  background-color: #40a9ff;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
}
</style>