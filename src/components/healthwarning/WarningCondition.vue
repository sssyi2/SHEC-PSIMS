<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\WarningCondition.vue -->
<template>
  <div class="warning-condition">
    <div class="condition-header">
      <button 
        v-if="showDeleteButton"
        class="delete-btn" 
        @click="$emit('delete:condition')"
      >
        <span class="delete-icon">×</span>
      </button>
    </div>
    
    <div class="condition-body">
      <!-- 监控指标 -->
      <div class="form-group">
        <label class="form-label">监控指标</label>
        <select 
          v-model="localCondition.indicatorType" 
          class="form-select"
          @change="emitUpdate"
        >
          <option value="">--请选择--</option>
          <option 
            v-for="indicator in indicatorOptions" 
            :key="indicator.id" 
            :value="indicator.id"
          >
            {{ indicator.name }}
          </option>
        </select>
      </div>
      
      <!-- 预警范围 -->
      <div class="form-group">
        <label class="form-label">预警范围</label>
        <div class="range-group">
          <select 
            v-model="localCondition.compareMethod" 
            class="method-select"
            @change="handleCompareMethodChange"
          >
            <option value="大于">大于</option>
            <option value="小于">小于</option>
            <option value="等于">等于</option>
            <option value="介于">介于</option>
          </select>
          
          <!-- 单值输入 -->
          <div v-if="isSingleValueMethod" class="value-input-wrapper">
            <input 
              type="text" 
              v-model="localCondition.rangeValues.single" 
              class="form-input value-input"
              @input="emitUpdate"
            />
          </div>
          
          <!-- 范围值输入 -->
          <div v-else class="range-input-wrapper">
            <input 
              type="text" 
              v-model="localCondition.rangeValues.min" 
              class="form-input range-input"
              @input="emitUpdate"
            />
            <span class="range-separator">~</span>
            <input 
              type="text" 
              v-model="localCondition.rangeValues.max" 
              class="form-input range-input"
              @input="emitUpdate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue'
import type { PropType } from 'vue'
import type { WarningCondition } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'WarningCondition',
  props: {
    condition: {
      type: Object as PropType<WarningCondition>,
      required: true
    },
    indicatorOptions: {
      type: Array as PropType<{ id: string; name: string }[]>,
      default: () => []
    },
    showDeleteButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:condition', 'delete:condition'],
  setup(props, { emit }) {
    // 本地条件对象
    const localCondition = reactive<WarningCondition>({
      indicatorType: props.condition.indicatorType,
      compareMethod: props.condition.compareMethod,
      rangeValues: {
        single: props.condition.rangeValues.single,
        min: props.condition.rangeValues.min,
        max: props.condition.rangeValues.max
      }
    })
    
    // 监听props变化
    watch(() => props.condition, (newCondition) => {
      localCondition.indicatorType = newCondition.indicatorType
      localCondition.compareMethod = newCondition.compareMethod
      localCondition.rangeValues.single = newCondition.rangeValues.single
      localCondition.rangeValues.min = newCondition.rangeValues.min
      localCondition.rangeValues.max = newCondition.rangeValues.max
    }, { deep: true })
    
    // 判断是否为单值比较方法
    const isSingleValueMethod = computed(() => {
      return localCondition.compareMethod !== '介于'
    })
    
    // 处理比较方法变化
    const handleCompareMethodChange = () => {
      if (localCondition.compareMethod === '介于') {
        // 切换到范围比较模式，清空单值
        localCondition.rangeValues.single = ''
      } else {
        // 切换到单值比较模式，清空范围值
        localCondition.rangeValues.min = ''
        localCondition.rangeValues.max = ''
      }
      emitUpdate()
    }
    
    // 发送更新事件
    const emitUpdate = () => {
      emit('update:condition', { ...localCondition })
    }
    
    return {
      localCondition,
      isSingleValueMethod,
      handleCompareMethodChange,
      emitUpdate
    }
  }
})
</script>

<style scoped>
.warning-condition {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
}

.condition-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ff4d4f;
  font-size: 16px;
}

.delete-icon {
  font-size: 18px;
}

.condition-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-label {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  flex-shrink: 0;
}

.form-select,
.form-input {
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.range-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.method-select {
  width: 80px;
}

.value-input-wrapper,
.range-input-wrapper {
  display: flex;
  align-items: center;
}

.value-input {
  width: 275px;
}

.range-input {
  width: 120px;
}

.range-separator {
  margin: 0 5px;
}
</style>