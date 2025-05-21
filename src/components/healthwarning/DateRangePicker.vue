<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\common\DateRangePicker.vue -->
<template>
  <div class="date-range-picker">
    <div class="current-range" @click="toggleCalendar">
      <span>{{ formattedDateRange }}</span>
      <span class="calendar-icon">📅</span>
    </div>
    
    <div v-if="showCalendar" class="calendar-container">
      <div class="preset-ranges">
        <div
          v-for="(range, label) in ranges"
          :key="label"
          class="preset-range-item"
          @click="selectPresetRange(label, range)"
        >
          {{ label }}
        </div>
      </div>
      
      <div class="calendar-content">
        <div class="calendar-header">
          <button class="close-btn" @click="showCalendar = false">×</button>
        </div>
        
        <div class="date-inputs">
          <div class="date-input-group">
            <label>开始日期</label>
            <input 
              type="date" 
              v-model="startDateStr"
              @change="updateDateRange"
            />
          </div>
          
          <div class="date-separator">至</div>
          
          <div class="date-input-group">
            <label>结束日期</label>
            <input 
              type="date" 
              v-model="endDateStr"
              @change="updateDateRange"
            />
          </div>
        </div>
        
        <div class="calendar-footer">
          <button class="apply-btn" @click="applyDateRange">确定</button>
          <button class="cancel-btn" @click="showCalendar = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DateRangePicker',
  props: {
    modelValue: {
      type: Object as PropType<{ startDate: Date; endDate: Date }>,
      default: () => ({
        startDate: new Date(),
        endDate: new Date()
      })
    },
    ranges: {
      type: Object as PropType<Record<string, [Date, Date]>>,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'update:date-range'],
  setup(props, { emit }) {
    const showCalendar = ref(false);
    
    // 日期字符串格式
    const startDateStr = ref(formatDateForInput(props.modelValue.startDate));
    const endDateStr = ref(formatDateForInput(props.modelValue.endDate));
    
    // 格式化展示的日期范围
    const formattedDateRange = computed(() => {
      const start = formatDate(props.modelValue.startDate);
      const end = formatDate(props.modelValue.endDate);
      return `${start} 至 ${end}`;
    });
    
    // 监听props变化
    watch(() => props.modelValue, (newValue) => {
      startDateStr.value = formatDateForInput(newValue.startDate);
      endDateStr.value = formatDateForInput(newValue.endDate);
    }, { deep: true });
    
    // 切换日历显示
    const toggleCalendar = () => {
      showCalendar.value = !showCalendar.value;
    };
    
    // 选择预设日期范围
    const selectPresetRange = (label: string, range: [Date, Date]) => {
      startDateStr.value = formatDateForInput(range[0]);
      endDateStr.value = formatDateForInput(range[1]);
      applyDateRange();
    };
    
    // 更新日期范围
    const updateDateRange = () => {
      // 这里只更新本地状态，不触发事件
    };
    
    // 应用日期范围
    const applyDateRange = () => {
      const startDate = new Date(startDateStr.value);
      const endDate = new Date(endDateStr.value);
      
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        if (startDate > endDate) {
          alert('开始日期不能晚于结束日期');
          return;
        }
        
        const dateRange = {
          startDate,
          endDate
        };
        
        emit('update:modelValue', dateRange);
        emit('update:date-range', dateRange);
        showCalendar.value = false;
      }
    };
    
    // 格式化日期为展示格式
    function formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    // 格式化日期为input value格式
    function formatDateForInput(date: Date): string {
      return formatDate(date);
    }
    
    return {
      showCalendar,
      startDateStr,
      endDateStr,
      formattedDateRange,
      toggleCalendar,
      selectPresetRange,
      updateDateRange,
      applyDateRange
    };
  }
});
</script>

<style scoped>
.date-range-picker {
  position: relative;
  display: inline-block;
}

.current-range {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  cursor: pointer;
  transition: all 0.3s;
}

.current-range:hover {
  border-color: #40a9ff;
}

.calendar-icon {
  margin-left: 8px;
}

.calendar-container {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  min-width: 600px;
}

.preset-ranges {
  border-right: 1px solid #f0f0f0;
  padding: 12px;
  width: 120px;
  background-color: #f9f9f9;
}

.preset-range-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  transition: all 0.3s;
}

.preset-range-item:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.calendar-content {
  padding: 16px;
  flex: 1;
}

.calendar-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.date-inputs {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.date-input-group {
  display: flex;
  flex-direction: column;
}

.date-input-group label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
}

.date-input-group input {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px;
  width: 150px;
}

.date-separator {
  margin: 0 12px;
  padding-top: 20px;
}

.calendar-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.apply-btn, .cancel-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.apply-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
}

.cancel-btn {
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  color: #666;
}

@media (max-width: 768px) {
  .calendar-container {
    flex-direction: column;
    min-width: 300px;
  }
  
  .preset-ranges {
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .preset-range-item {
    margin-bottom: 0;
  }
  
  .date-inputs {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .date-input-group {
    margin-bottom: 10px;
    width: 100%;
  }
  
  .date-input-group input {
    width: 100%;
  }
  
  .date-separator {
    margin: 0;
    padding: 0;
  }
}
</style>