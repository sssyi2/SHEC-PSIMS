<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\common\DateRangePicker.vue -->
<template>
  <div class="date-range-picker">
    <div class="date-picker-wrapper">
      <input 
        type="date"
        v-model="startDateValue"
        class="date-input"
        @change="emitChange"
      />
      <span class="date-separator">至</span>
      <input 
        type="date"
        v-model="endDateValue"
        class="date-input"
        @change="emitChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DateRangePicker',
  props: {
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    shortcuts: {
      type: Array as PropType<Array<{ text: string, value: () => [Date, Date] }>>,
      default: () => []
    }
  },
  emits: ['update:startDate', 'update:endDate', 'change'],
  setup(props, { emit }) {
    const startDateValue = ref(props.startDate);
    const endDateValue = ref(props.endDate);

    // 监听属性变化
    watch(() => props.startDate, (newVal) => {
      startDateValue.value = newVal;
    });

    watch(() => props.endDate, (newVal) => {
      endDateValue.value = newVal;
    });

    // 监听内部值变化
    watch(startDateValue, (newVal) => {
      emit('update:startDate', newVal);
    });

    watch(endDateValue, (newVal) => {
      emit('update:endDate', newVal);
    });

    // 发送变更事件
    const emitChange = () => {
      emit('change', [startDateValue.value, endDateValue.value]);
    };

    return {
      startDateValue,
      endDateValue,
      emitChange
    };
  }
});
</script>

<style scoped>
.date-range-picker {
  display: flex;
  align-items: center;
}

.date-picker-wrapper {
  display: flex;
  align-items: center;
}

.date-input {
  width: 140px;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.date-separator {
  margin: 0 10px;
  color: #999;
}
</style>