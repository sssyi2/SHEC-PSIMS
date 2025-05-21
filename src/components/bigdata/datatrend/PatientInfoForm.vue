<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\bigdata\datatrend\PatientInfoForm.vue -->
<template>
  <div class="patient-info-form">
    <div class="form-section">
      <div class="form-header">
        <div class="patient-import">
          <div class="form-label">输入病人id</div>
          <input 
            type="text" 
            class="form-input" 
            v-model="patientId" 
            placeholder="请输入患者ID"
          />
          <button class="form-button" @click="importPatient">导入档案</button>
        </div>
      </div>
      
      <div class="form-header">患者信息录入：</div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">
            <span class="required">* </span>年龄
          </label>
          <div class="number-input">
            <input 
              type="number" 
              class="form-input" 
              v-model="formData.age" 
              min="1"
            />
            <div class="number-controls">
              <button @click="increaseAge" class="number-btn">
                <span class="arrow up"></span>
              </button>
              <button @click="decreaseAge" class="number-btn">
                <span class="arrow down"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group radio-group">
          <label class="form-label">
            <span class="required">* </span>性别
          </label>
          <div class="radio-options">
            <div class="radio-option">
              <input 
                type="radio" 
                id="male" 
                name="gender" 
                value="male" 
                v-model="formData.gender"
              />
              <label for="male">男</label>
            </div>
            <div class="radio-option">
              <input 
                type="radio" 
                id="female" 
                name="gender" 
                value="female" 
                v-model="formData.gender"
              />
              <label for="female">女</label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-header">医疗指标录入：</div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">
            <span class="required">* </span>疾病名
          </label>
          <input 
            type="text" 
            class="form-input" 
            v-model="formData.disease" 
            placeholder="请输入疾病名称"
          />
        </div>
      </div>
      
      <div class="form-row three-columns">
        <div class="form-group">
          <label class="form-label">
            <span class="required">* </span>血压
          </label>
          <input 
            type="text" 
            class="form-input" 
            v-model="formData.bloodPressure" 
            placeholder="例如：120/80"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">
            <span class="required">* </span>血糖
          </label>
          <input 
            type="text" 
            class="form-input" 
            v-model="formData.bloodSugar" 
            placeholder="例如：5.6"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">
            <span class="required">* </span>BMI
          </label>
          <input 
            type="text" 
            class="form-input" 
            v-model="formData.bmi" 
            placeholder="例如：23.5"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">其它</label>
          <input 
            type="text" 
            class="form-input" 
            v-model="formData.other" 
            placeholder="其它需要录入的指标"
          />
        </div>
      </div>
      
      <div class="form-header">时间范围选择：</div>
      
      <div class="form-row date-range">
        <div class="date-range-group">
          <label class="range-label">从</label>
          <input 
            type="date" 
            class="form-input date-input" 
            v-model="formData.startDate"
          />
          
          <label class="range-label">到</label>
          <input 
            type="date" 
            class="form-input date-input" 
            v-model="formData.endDate"
          />
        </div>
      </div>
      
      <div class="form-actions">
        <button class="primary-button" @click="startPredict">开始预测</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'PatientInfoForm',
  emits: ['start-predict', 'import-patient'],
  setup(_, { emit }) {
    const patientId = ref('')
    
    const formData = reactive({
      age: 1,
      gender: 'male',
      disease: '',
      bloodPressure: '',
      bloodSugar: '',
      bmi: '',
      other: '',
      startDate: '',
      endDate: ''
    })
    
    const increaseAge = () => {
      formData.age++
    }
    
    const decreaseAge = () => {
      if (formData.age > 1) {
        formData.age--
      }
    }
    
    const importPatient = () => {
      if (patientId.value.trim()) {
        emit('import-patient', patientId.value)
      }
    }
    
    const startPredict = () => {
      // 简单验证
      if (!formData.disease || !formData.bloodPressure || !formData.bloodSugar || !formData.bmi) {
        alert('请填写所有必填项！')
        return
      }
      
      emit('start-predict', formData)
    }
    
    return {
      patientId,
      formData,
      increaseAge,
      decreaseAge,
      importPatient,
      startPredict
    }
  }
})
</script>

<style scoped>
.patient-info-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.form-section {
  margin-bottom: 20px;
}

.form-header {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #333;
}

.form-row {
  display: flex;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  align-items: center;
  flex: 1;
}

.three-columns .form-group {
  margin-right: 15px;
}

.three-columns .form-group:last-child {
  margin-right: 0;
}

.form-label {
  width: 80px;
  text-align: right;
  margin-right: 10px;
}

.required {
  color: #ff4d4f;
}

.form-input {
  flex: 1;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
}

.form-button {
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #e6e6e6;
}

.patient-import {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.number-input {
  display: flex;
  flex: 1;
}

.number-controls {
  display: flex;
  flex-direction: column;
  margin-left: -1px;
}

.number-btn {
  width: 20px;
  height: 20px;
  border: 1px solid #d9d9d9;
  background-color: #f7f7f7;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.arrow.up {
  border-bottom: 4px solid #666;
}

.arrow.down {
  border-top: 4px solid #666;
}

.radio-group {
  margin-bottom: 20px;
}

.radio-options {
  display: flex;
}

.radio-option {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.radio-option input[type="radio"] {
  margin-right: 5px;
}

.date-range {
  margin-top: 10px;
}

.date-range-group {
  display: flex;
  align-items: center;
}

.range-label {
  margin: 0 10px;
}

.date-input {
  width: 180px;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.primary-button {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #40a9ff;
}
</style>