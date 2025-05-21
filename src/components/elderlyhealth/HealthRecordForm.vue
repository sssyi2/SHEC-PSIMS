<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\HealthRecordForm.vue -->
<template>
  <div class="health-record-form">
    <div class="form-title">{{ isCreateMode ? '建档' : '修改' }}</div>
    
    <div class="form-grid">
      <div class="form-row">
        <div class="form-group">
          <label>档案id：</label>
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
        
        <div class="form-group">
          <label>姓名：</label>
          <input 
            type="text" 
            v-model="formData.name"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
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
        <div class="form-group">
          <label>出生日期：</label>
          <input 
            type="text" 
            v-model="formData.birthDate"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>身份证号：</label>
          <input 
            type="text" 
            v-model="formData.idNumber"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>联系方式：</label>
          <input 
            type="text" 
            v-model="formData.contactNumber"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>常住地址：</label>
          <input 
            type="text" 
            v-model="formData.address"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>家族病史：</label>
          <input 
            type="text" 
            v-model="formData.familyHistory"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>过敏史：</label>
          <input 
            type="text" 
            v-model="formData.allergies"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group full-width">
          <label>既往病史：</label>
          <input 
            type="text" 
            v-model="formData.medicalHistory"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row four-columns">
        <div class="form-group">
          <label>身高(cm)：</label>
          <input 
            type="text" 
            v-model="formData.height"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>体重(kg)：</label>
          <input 
            type="text" 
            v-model="formData.weight"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>血压(mmHg)：</label>
          <input 
            type="text" 
            v-model="formData.bloodPressure"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>心率(次/分)：</label>
          <input 
            type="text" 
            v-model="formData.heartRate"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>创建日期：</label>
          <input 
            type="text" 
            v-model="formData.createDate"
            class="form-input"
            :disabled="!isCreateMode"
          />
        </div>
        
        <div class="form-group">
          <label>更新日期：</label>
          <input 
            type="text" 
            v-model="formData.updateDate"
            class="form-input"
            :disabled="!isCreateMode"
          />
        </div>
      </div>
    </div>
    
    <div class="form-actions">
      <button 
        class="action-button" 
        @click="handleSubmit"
      >
        {{ isCreateMode ? '新建档案' : '修改档案' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, watch } from 'vue'

interface HealthRecordFormData {
  id: string
  patientId: string
  name: string
  gender: string
  age: string
  birthDate: string
  idNumber: string
  contactNumber: string
  address: string
  familyHistory: string
  allergies: string
  medicalHistory: string
  height: string
  weight: string
  bloodPressure: string
  heartRate: string
  createDate: string
  updateDate: string
}

export default defineComponent({
  name: 'HealthRecordForm',
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
  emits: ['save-record', 'update-record'],
  setup(props, { emit }) {
    // 表单数据
    const formData = reactive<HealthRecordFormData>({
      id: '',
      patientId: '',
      name: '',
      gender: '',
      age: '',
      birthDate: '',
      idNumber: '',
      contactNumber: '',
      address: '',
      familyHistory: '',
      allergies: '',
      medicalHistory: '',
      height: '',
      weight: '',
      bloodPressure: '',
      heartRate: '',
      createDate: '',
      updateDate: ''
    })
    
    // 是否为创建模式
    const isCreateMode = computed(() => props.mode === 'create')
    
    // 当props.record变化时，更新表单数据
    watch(() => props.record, (newValue) => {
      if (newValue) {
        Object.assign(formData, newValue)
      } else {
        // 重置表单
        (Object.keys(formData) as (keyof HealthRecordFormData)[]).forEach((key) => {
          formData[key] = ''
        })
      }
    }, { immediate: true, deep: true })
    
    // 处理表单提交
    const handleSubmit = () => {
      // 表单验证
      if (!formData.name) {
        alert('请输入姓名')
        return
      }
      
      if (isCreateMode.value) {
        emit('save-record', { ...formData })
      } else {
        emit('update-record', { ...formData })
      }
    }
    
    return {
      formData,
      isCreateMode,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.health-record-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.form-grid {
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
  align-items: center;
  flex: 1;
}

.form-group label {
  width: 90px;
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

.form-group.full-width {
  flex: 2;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.action-button {
  padding: 8px 25px;
  background: #1890ff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.action-button:hover {
  background: #40a9ff;
}

.four-columns .form-group {
  flex: 1;
}

/* 禁用状态的输入框样式 */
.form-input:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .form-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .four-columns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .form-group label {
    width: 120px;
  }
}
</style>