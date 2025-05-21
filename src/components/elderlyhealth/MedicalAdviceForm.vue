<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\MedicalAdviceForm.vue -->
<template>
  <div class="medical-advice-form">
    <div class="form-header">
      <div class="header-title">{{ isCreateMode ? '新建医嘱' : '修改医嘱' }}</div>
    </div>
    
    <div class="form-content">
      <div class="form-row">
        <div class="form-group">
          <label>医嘱id：</label>
          <input 
            v-model="formData.id"
            type="text"
            class="form-input"
            :disabled="!isCreateMode"
          />
        </div>
        
        <div class="form-group">
          <label>病人id：</label>
          <input 
            v-model="formData.patientId"
            type="text"
            class="form-input"
            :disabled="!isCreateMode"
          />
        </div>
        
        <div class="form-group">
          <label>姓名：</label>
          <input 
            v-model="formData.name"
            type="text"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group full-width">
          <label>用药说明：</label>
          <textarea 
            v-model="formData.medication"
            class="form-textarea"
            placeholder="请输入详细的用药说明"
            rows="5"
          ></textarea>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group full-width">
          <label>其余备注：</label>
          <textarea 
            v-model="formData.notes"
            class="form-textarea"
            placeholder="请输入其他注意事项"
            rows="3"
          ></textarea>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>开始日期：</label>
          <input 
            v-model="formData.startDate"
            type="date"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label>结束日期：</label>
          <input 
            v-model="formData.endDate"
            type="date"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>创建时间：</label>
          <input 
            v-model="formData.createTime"
            type="text"
            class="form-input"
            disabled
          />
        </div>
        
        <div class="form-group">
          <label>更新时间：</label>
          <input 
            v-model="formData.updateTime"
            type="text"
            class="form-input"
            disabled
          />
        </div>
      </div>
      
      <div class="form-actions">
        <button class="action-btn save-btn" @click="handleSubmit">
          {{ isCreateMode ? '新建医嘱' : '修改医嘱' }}
        </button>
        <button class="action-btn cancel-btn" @click="handleCancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import type { MedicalAdvice } from '@/types/medical-advice'

export default defineComponent({
  name: 'MedicalAdviceForm',
  props: {
    advice: {
      type: Object as () => MedicalAdvice | null,
      default: null
    },
    mode: {
      type: String as () => 'create' | 'edit',
      default: 'create'
    }
  },
  emits: ['save', 'update', 'cancel'],
  setup(props, { emit }) {
    // 创建一个初始表单数据
    const createEmptyForm = (): MedicalAdvice => ({
      id: '', // 空字符串是 string 类型，兼容 string | number
      patientId: '', // 空字符串是 string 类型，兼容 string | number
      name: '',
      medication: '',
      notes: '',
      startDate: '',
      endDate: '',
      createTime: '',
      updateTime: ''
    });
    
    // 表单数据
    const formData = reactive<MedicalAdvice>(createEmptyForm());
    
    // 是否为创建模式
    const isCreateMode = computed(() => props.mode === 'create');
    

    // 当props.advice变化时，更新表单数据
    watch(() => props.advice, (newValue) => {
      if (newValue) {
        // 使用类型安全的方式来复制属性值
        Object.keys(newValue).forEach(key => {
          const typedKey = key as keyof MedicalAdvice;
          // 对于id和patientId字段，确保处理联合类型
          if (typedKey === 'id' || typedKey === 'patientId') {
            // 始终将这些字段转换为字符串，确保v-model绑定安全
            formData[typedKey] = String(newValue[typedKey]);
          } else {
            // 其他字段正常赋值
            formData[typedKey] = newValue[typedKey];
          }
        });
      } else {
        // 重置表单
        const emptyForm = createEmptyForm();
        Object.keys(emptyForm).forEach(key => {
          const typedKey = key as keyof MedicalAdvice;
          if (typedKey === 'id' || typedKey === 'patientId') {
            formData[typedKey] = String(emptyForm[typedKey]);
          } else {
            formData[typedKey] = emptyForm[typedKey];
          }
        });
      }
    }, { immediate: true, deep: true });
    

    // 提交表单
    const handleSubmit = () => {
    // 表单验证
    if (!formData.name) {
        alert('请输入患者姓名')
        return
    }
    
    if (!formData.medication) {
        alert('请输入用药说明')
        return
    }
    
    if (!formData.startDate) {
        alert('请选择开始日期')
        return
    }
    
    if (!formData.endDate) {
        alert('请选择结束日期')
        return
    }
    
    // 处理数据类型转换
    const processedData = { ...formData };
    
    // 尝试将id和patientId转换为数字（如果它们是数字形式的字符串）
    if (typeof processedData.id === 'string' && !isNaN(Number(processedData.id)) && processedData.id.trim() !== '') {
        processedData.id = Number(processedData.id);
    }
    
    if (typeof processedData.patientId === 'string' && !isNaN(Number(processedData.patientId)) && processedData.patientId.trim() !== '') {
        processedData.patientId = Number(processedData.patientId);
    }
    
    // 根据模式提交表单
    if (isCreateMode.value) {
        emit('save', processedData)
    } else {
        emit('update', processedData)
    }
    }
    
    // 取消操作
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
</script>

<style scoped>
.medical-advice-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.form-content {
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

.form-group.full-width {
  flex: 0 0 100%;
}

.form-input {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.form-textarea {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 10px;
  resize: vertical;
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.action-btn {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.save-btn {
  background-color: #1890ff;
  color: white;
}

.save-btn:hover {
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