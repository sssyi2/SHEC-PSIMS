<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FilterPanel.vue -->
<template>
  <div class="filter-panel">
    <div class="filter-content">
      <div class="filter-section">
        <h3 class="section-title">排序方式</h3>
        <div class="sort-options">
          <button 
            v-for="option in sortOptions" 
            :key="option"
            class="sort-button"
            :class="{ active: selectedSortOption === option }"
            @click="selectSortOption(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
      
      <div class="filter-section">
        <h3 class="section-title">按条件筛选</h3>
        <div class="filter-item">
          <span class="label">年龄：</span>
          <div class="age-range">
            <input 
              type="text" 
              class="range-input" 
              v-model="minAge" 
              placeholder="最小"
              @change="updateAgeRange"
            />
            <span class="range-separator">~</span>
            <input 
              type="text" 
              class="range-input" 
              v-model="maxAge" 
              placeholder="最大"
              @change="updateAgeRange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'FilterPanel',
  props: {
    sortOptions: {
      type: Array as () => string[],
      default: () => []
    },
    selectedSortOption: {
      type: String,
      default: ''
    },
    ageRange: {
      type: Array as unknown as PropType<[string, string]>,
      default: () => ['', '']
    }
  },
  emits: ['sort-change', 'age-range-change', 'close'],
  setup(props, { emit }) {
    // 年龄范围本地状态
    const minAge = ref(props.ageRange[0]);
    const maxAge = ref(props.ageRange[1]);
    
    // 监听prop变化
    watch(() => props.ageRange, ([newMin, newMax]) => {
      minAge.value = newMin;
      maxAge.value = newMax;
    });
    
    // 选择排序选项
    const selectSortOption = (option: string) => {
      emit('sort-change', option);
    };
    
    // 更新年龄范围
    const updateAgeRange = () => {
      emit('age-range-change', [minAge.value, maxAge.value]);
    };
    
    return {
      minAge,
      maxAge,
      selectSortOption,
      updateAgeRange
    };
  }
});
</script>

<style scoped>
.filter-panel {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}

.filter-content {
  padding: 20px;
}

.filter-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #333;
}

.sort-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sort-button {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.sort-button:hover {
  background-color: #e0e0e0;
}

.sort-button.active {
  background-color: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 60px;
  font-size: 14px;
  color: #333;
}

.age-range {
  display: flex;
  align-items: center;
}

.range-input {
  width: 80px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.range-separator {
  margin: 0 10px;
}
</style>