<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\DiseaseTypeFilter.vue -->
<template>
  <div class="disease-type-filter">
    <button 
      class="type-button" 
      :class="{ active: selectedType === '全部' }"
      @click="selectType('全部')"
    >
      全部
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '内科' }"
      @click="selectType('内科')"
    >
      内科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '外科' }"
      @click="selectType('外科')"
    >
      外科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '妇产科' }"
      @click="selectType('妇产科')"
    >
      妇产科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '急诊科' }"
      @click="selectType('急诊科')"
    >
      急诊科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '儿科' }"
      @click="selectType('儿科')"
    >
      儿科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '眼科' }"
      @click="selectType('眼科')"
    >
      眼科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '口腔科' }"
      @click="selectType('口腔科')"
    >
      口腔科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '耳鼻喉科' }"
      @click="selectType('耳鼻喉科')"
    >
      耳鼻喉科
    </button>
    <button 
      class="type-button" 
      :class="{ active: selectedType === '精神科' }"
      @click="selectType('精神科')"
    >
      精神科
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DiseaseTypeFilter',
  props: {
    selectedType: {
      type: String,
      default: '全部'
    }
  },
  emits: ['type-change'],
  setup(props, { emit }) {
    const selectType = (type: string) => {
      emit('type-change', type);
    };
    
    return {
      selectType
    };
  }
});
</script>

<style scoped>
.disease-type-filter {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.type-button {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.type-button:hover {
  background-color: #e0e0e0;
}

.type-button.active {
  background-color: #1890ff;
  color: #fff;
  border-color: #1890ff;
}
</style>