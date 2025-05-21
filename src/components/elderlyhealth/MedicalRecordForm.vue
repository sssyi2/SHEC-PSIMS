<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\MedicalRecordForm.vue -->
<template>
  <div class="medical-record-form">
    <div class="form-header">
      <h2 class="form-title">{{ isCreateMode ? '电子病历建设' : '修改电子病历' }}</h2>
    </div>
    
    <div class="form-content">
      <div class="form-row">
        <div class="form-group">
          <label>病历id：</label>
          <input 
            type="text" 
            v-model="formData.id"
            class="form-input"
            :disabled="!isCreateMode"
          />
        </div>
        
        <div class="form-group">
          <label>病人id：</label>
          <input 
            type="text" 
            v-model="formData.patientId"
            class="form-input"
            :disabled="!isCreateMode"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>姓名：</label>
          <input 
            type="text" 
            v-model="formData.name"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>性别：</label>
          <input 
            type="text" 
            v-model="formData.gender"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>年龄：</label>
          <input 
            type="text" 
            v-model="formData.age"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group full-width">
          <label>诊断信息：</label>
          <textarea 
            v-model="formData.diagnosis"
            class="form-textarea"
            placeholder="请输入诊断信息"
          ></textarea>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group full-width">
          <label>治疗方案：</label>
          <textarea 
            v-model="formData.treatment"
            class="form-textarea"
            placeholder="请输入治疗方案"
          ></textarea>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>创建时间：</label>
          <input 
            type="text" 
            v-model="formData.createTime"
            class="form-input"
            disabled
          />
        </div>
        
        <div class="form-group">
          <label>更新时间：</label>
          <input 
            type="text" 
            v-model="formData.updateTime"
            class="form-input"
            disabled
          />
        </div>
      </div>
    </div>
    
    <div class="form-actions">
      <button 
        class="btn btn-primary" 
        @click="handleSubmit"
      >
        {{ isCreateMode ? '新建病历档案' : '修改病历档案' }}
      </button>
      
      <button 
        class="btn btn-cancel" 
        @click="handleCancel"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'

export default defineComponent({
  name: 'MedicalRecordForm',
  props: {
    record: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'create'
    }
  },
  emits: ['save-record', 'update-record', 'cancel'],
  setup(props, { emit }) {
    // 表单数据
    type FormData = {
      id: string;
      patientId: string;
      name: string;
      gender: string;
      age: string;
      diagnosis: string;
      treatment: string;
      createTime: string;
      updateTime: string;
      [key: string]: string; // 添加索引签名以允许通过字符串索引
    }
    const formData = reactive<FormData>({
      id: '',
      patientId: '',
      name: '',
      gender: '',
      age: '',
      diagnosis: '',
      treatment: '',
      createTime: '',
      updateTime: ''
    })
    const isCreateMode = computed(() => props.mode === 'create')
    
    // 当props.record变化时，更新表单数据
    watch(() => props.record, (newValue) => {
      if (newValue) {
        Object.assign(formData, newValue)
      } else {
        Object.keys(formData).forEach(key => {
          formData[key as keyof FormData] = ''
        })
      }
    }, { immediate: true, deep: true })
    
    // 表单提交处理
    const handleSubmit = () => {
      // 简单表单验证
      if (!formData.name) {
        alert('请输入患者姓名')
        return
      }
      
      if (isCreateMode.value) {
        emit('save-record', { ...formData })
      } else {
        emit('update-record', { ...formData })
      }
    }
    
    // 取消
    const handleCancel = () => {
      emit('cancel')
    }
    
    return {
      formData,
      isCreateMode,
      handleSubmit,
      handleCancel
    }
  }
})
// TypeScript interfaces for props and emits
interface MedicalRecord {
  id: string;
  patientId: string;
  name: string;
  gender: string;
  age: string;
  diagnosis: string;
  treatment: string;
  createTime: string;
  updateTime: string;
  [key: string]: string;
}

interface MedicalRecordFormProps {
  record: MedicalRecord | null;
  mode: string;
}

interface MedicalRecordFormEmits {
  (e: 'save-record', record: MedicalRecord): void;
  (e: 'update-record', record: MedicalRecord): void;
  (e: 'cancel'): void;
}
</script>

<style scoped>
.medical-record-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.form-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group.full-width {
  flex: 1 0 100%;
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
  padding: 0 12px;
}

.form-textarea {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 12px;
  min-height: 80px;
  resize: vertical;
}

.form-input:disabled, .form-textarea:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
}
</style>