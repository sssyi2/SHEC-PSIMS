<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\bigdata\resource-advice\MedicineInventoryPanel.vue -->
<template>
  <div class="panel medicine-inventory-panel">
    <div class="panel-header">
      <div class="search-container">
        <label>查询药品存量：</label>
        <input 
          type="text" 
          v-model="searchQuery" 
          class="search-input" 
          placeholder="输入药品名称或编号"
        />
        <button class="search-button" @click="searchMedicine">查询</button>
      </div>
    </div>
    
    <div class="medicine-cards">
      <div class="medicine-card" v-for="(medicine, index) in medicineData" :key="index">
        <h3 class="card-title">药品名：{{ medicine.name }}</h3>
        <p class="medicine-type">{{ medicine.type }}</p>
        <p class="medicine-info">当前库存：{{ medicine.stock }}{{ medicine.unit }}</p>
        <p class="medicine-info">日均用量：{{ medicine.dailyUsage }}{{ medicine.unit }}/天</p>
        <p class="medicine-forecast">预计{{ medicine.daysRemaining }}天后耗尽</p>
      </div>
      
      <div class="medicine-advice-card">
        <h3 class="card-title">药品采购建议</h3>
        <p class="advice-content">{{ purchaseAdvice }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'MedicineInventoryPanel',
  setup() {
    const searchQuery = ref('')
    
    const medicineData = reactive([
      {
        name: '复方感冒药',
        type: '感冒类',
        stock: 100,
        unit: '瓶',
        dailyUsage: 5,
        daysRemaining: 20
      }
    ])
    
    const purchaseAdvice = ref('药品余量充足，无需采购。')
    
    const searchMedicine = () => {
      console.log('搜索药品:', searchQuery.value)
      // 这里添加API调用逻辑来获取药品数据
    }
    
    return {
      searchQuery,
      medicineData,
      purchaseAdvice,
      searchMedicine
    }
  }
})
</script>

<style scoped>
.panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.panel-header {
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-container label {
  font-size: 14px;
  color: #333;
}

.search-input {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  flex-grow: 1;
  max-width: 400px;
}

.search-button {
  height: 36px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #40a9ff;
}

.medicine-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.medicine-card, .medicine-advice-card {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  width: 30%;
  min-width: 200px;
}

.card-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.medicine-type {
  color: #666;
  margin-bottom: 10px;
}

.medicine-info {
  margin: 5px 0;
  color: #333;
}

.medicine-forecast {
  margin-top: 10px;
  color: #ff4d4f;
  font-weight: 500;
}

.advice-content {
  color: #333;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-input {
    width: 100%;
    max-width: none;
    margin: 10px 0;
  }
  
  .medicine-card, .medicine-advice-card {
    width: 100%;
  }
}
</style>