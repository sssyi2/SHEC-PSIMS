<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\WarningForm.vue -->
<template>
  <div class="warning-form">
    <h2 class="form-title">预警提醒设置</h2>
    
    <div class="form-body">
      <!-- 患者信息 -->
      <div class="form-group">
        <label class="form-label">患者编号</label>
        <input 
          type="text" 
          v-model="formData.patientId" 
          class="form-input"
          placeholder="请输入患者编号"
        />
      </div>
      
      <!-- 疾病分类 -->
      <div class="form-group">
        <label class="form-label">疾病分类</label>
        <select v-model="formData.diseaseType" class="form-select">
          <option v-for="type in diseaseTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      
      <!-- 疾病名称 -->
      <div class="form-group">
        <label class="form-label">疾病名称</label>
        <input 
          type="text" 
          v-model="formData.diseaseName" 
          class="form-input"
          placeholder="请输入疾病名称"
        />
      </div>
      
      <!-- 预警方式 -->
      <div class="form-group">
        <label class="form-label">预警方式</label>
        <div class="checkbox-group">
          <div 
            v-for="method in alertMethods" 
            :key="method.id"
            class="checkbox-item"
          >
            <input 
              type="checkbox" 
              :id="method.id" 
              v-model="formData.alertMethods" 
              :value="method.id"
            />
            <label :for="method.id">{{ method.label }}</label>
          </div>
        </div>
      </div>
      
      <!-- 预警等级 -->
      <div class="form-group">
        <label class="form-label">预警等级</label>
        <select v-model="formData.warningLevel" class="form-select">
          <option v-for="level in warningLevels" :key="level" :value="level">
            {{ level }}
          </option>
        </select>
      </div>
      
      <!-- 预警条件组 -->
      <div class="warning-condition-group">
        <div class="group-header">
          <h3>预警条件组</h3>
          <button class="add-condition-btn" @click="addCondition">新建监测指标</button>
        </div>
        
        <WarningCondition 
          v-for="(condition, index) in formData.conditions"
          :key="index"
          :condition="condition"
          :indicator-options="monitoringIndicators"
          @update:condition="updateCondition(index, $event)"
          @delete:condition="deleteCondition(index)"
        />
      </div>
      
      <!-- 保存按钮 -->
      <div class="form-actions">
        <button class="save-btn" @click="handleSubmit">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import type { PropType } from 'vue'
import WarningCondition from '@/components/healthwarning/WarningCondition.vue'
import type { WarningSettings, WarningCondition as WarningConditionType } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'WarningForm',
  components: {
    WarningCondition
  },
  props: {
    patientId: {
      type: String,
      default: ''
    },
    diseaseTypes: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    warningLevels: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    alertMethods: {
      type: Array as PropType<{ id: string; label: string }[]>,
      default: () => []
    }
  },
  emits: ['save-warning'],
  setup(props, { emit }) {
    // 监测指标选项
    const monitoringIndicators = ref([
      { id: 'blood_pressure', name: '血压' },
      { id: 'blood_sugar', name: '血糖' },
      { id: 'heart_rate', name: '心率' },
      { id: 'temperature', name: '体温' },
      { id: 'blood_oxygen', name: '血氧' }
    ])
    
    // 表单数据
    const formData = reactive<WarningSettings>({
      patientId: props.patientId,
      diseaseType: props.diseaseTypes.length > 0 ? props.diseaseTypes[0] : '',
      diseaseName: '',
      alertMethods: [],
      warningLevel: props.warningLevels.length > 0 ? props.warningLevels[0] : '',
      conditions: [
        {
          indicatorType: '',
          compareMethod: '大于',
          rangeValues: {
            single: '',
            min: '',
            max: ''
          }
        }
      ]
    })
    
    // 监听患者ID变化
    watch(() => props.patientId, (newValue) => {
      formData.patientId = newValue
    })
    
    // 添加预警条件
    const addCondition = () => {
      formData.conditions.push({
        indicatorType: '',
        compareMethod: '大于',
        rangeValues: {
          single: '',
          min: '',
          max: ''
        }
      })
    }
    
    // 更新预警条件
    const updateCondition = (index: number, condition: WarningConditionType) => {
      formData.conditions[index] = condition
    }
    
    // 删除预警条件
    const deleteCondition = (index: number) => {
      formData.conditions.splice(index, 1)
    }
    
    // 提交表单
    const handleSubmit = () => {
      // 表单验证
      if (!formData.patientId) {
        alert('请输入患者编号')
        return
      }
      
      if (!formData.diseaseName) {
        alert('请输入疾病名称')
        return
      }
      
      if (formData.alertMethods.length === 0) {
        alert('请选择至少一种预警方式')
        return
      }
      
      // 验证条件组
      for (let i = 0; i < formData.conditions.length; i++) {
        const condition = formData.conditions[i]
        
        if (!condition.indicatorType) {
          alert(`请为条件 ${i + 1} 选择监测指标`)
          return
        }
        
        if (condition.compareMethod === '介于') {
          if (!condition.rangeValues.min || !condition.rangeValues.max) {
            alert(`请为条件 ${i + 1} 设置完整的范围值`)
            return
          }
        } else {
          if (!condition.rangeValues.single) {
            alert(`请为条件 ${i + 1} 设置值`)
            return
          }
        }
      }
      
      emit('save-warning', { ...formData })
    }
    
    return {
      formData,
      monitoringIndicators,
      addCondition,
      updateCondition,
      deleteCondition,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.warning-form {
  width: 100%;
}

.form-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-label {
  width: 100px;
  text-align: right;
  margin-right: 15px;
  flex-shrink: 0;
  font-size: 14px;
}

.form-input,
.form-select {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 15px;
  width: 100%;
  max-width: 450px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}

.warning-condition-group {
  margin-top: 20px;
  border-top: 1px dashed #d9d9d9;
  padding-top: 20px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.group-header h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.add-condition-btn {
  padding: 6px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.save-btn {
  padding: 8px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.save-btn:hover {
  background: #40a9ff;
}
</style>