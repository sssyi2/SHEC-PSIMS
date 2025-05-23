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
          @keyup.enter="searchMedicine"
        />
        <button class="search-button" @click="searchMedicine" :disabled="loading">
          <span v-if="loading">查询中...</span>
          <span v-else>查询</span>
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在加载数据...</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <button class="retry-button" @click="fetchAllData">重试</button>
    </div>
    
    <div v-else class="medicine-cards">
      <div class="medicine-card" 
           v-for="medicine in medicineData" 
           :key="medicine.id"
           :class="{ 
             'warning-level': medicine.warningLevel === 'warning',
             'critical-level': medicine.warningLevel === 'critical'
           }">
        <h3 class="card-title">药品名：{{ medicine.name }}</h3>
        <p class="medicine-code">编号：{{ medicine.code }}</p>
        <p class="medicine-type">{{ medicine.type }}</p>
        <p class="medicine-info">当前库存：{{ medicine.stock }}{{ medicine.unit }}</p>
        <p class="medicine-info">日均用量：{{ medicine.dailyUsage }}{{ medicine.unit }}/天</p>
        <p class="medicine-forecast" :class="getWarningClass(medicine.daysRemaining)">
          预计{{ medicine.daysRemaining }}天后耗尽
        </p>
      </div>
      
      <div class="medicine-advice-card">
        <h3 class="card-title">药品采购建议</h3>
        <p class="advice-content">{{ purchaseAdvice }}</p>
      </div>
    </div>
    
    <div class="panel-footer" v-if="medicineData.length > 0">
      <button class="export-button" @click="exportInventory">导出报表</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { 
  getAllMedicineInventory, 
  searchMedicineInventory, 
  getMedicinePurchaseAdvice, 
  exportMedicineInventory,
  type MedicineInventory 
} from '@/api/medicine'

export default defineComponent({
  name: 'MedicineInventoryPanel',
  setup() {
    const searchQuery = ref('')
    const medicineData = ref<MedicineInventory[]>([])
    const purchaseAdvice = ref('正在加载采购建议...')
    const loading = ref(false)
    const error = ref('')
    
    // 获取所有药品库存数据
    const fetchMedicineInventory = async () => {
      loading.value = true
      error.value = ''
      
      try {
        medicineData.value = await getAllMedicineInventory()
      } catch (err: any) {
        error.value = err.message || '获取药品库存数据失败'
        console.error('获取药品库存数据失败:', err)
      } finally {
        loading.value = false
      }
    }
    
    // 获取采购建议
    const fetchPurchaseAdvice = async () => {
      try {
        const data = await getMedicinePurchaseAdvice()
        purchaseAdvice.value = data.advice
      } catch (err: any) {
        purchaseAdvice.value = '无法获取采购建议，请稍后再试'
        console.error('获取采购建议失败:', err)
      }
    }
    
    // 搜索药品
    const searchMedicine = async () => {
      if (!searchQuery.value.trim()) {
        fetchMedicineInventory()
        return
      }
      
      loading.value = true
      error.value = ''
      
      try {
        medicineData.value = await searchMedicineInventory(searchQuery.value)
      } catch (err: any) {
        error.value = err.message || '搜索药品失败'
        console.error('搜索药品失败:', err)
      } finally {
        loading.value = false
      }
    }
    
    // 根据剩余天数获取样式类
    const getWarningClass = (daysRemaining: number) => {
      if (daysRemaining <= 3) return 'critical-forecast'
      if (daysRemaining <= 7) return 'warning-forecast'
      return 'normal-forecast'
    }
    
    // 导出库存报表
    const exportInventory = async () => {
      try {
        await exportMedicineInventory('excel')
      } catch (err: any) {
        alert('导出报表失败: ' + (err.message || '未知错误'))
        console.error('导出报表失败:', err)
      }
    }
    
    // 获取所有数据
    const fetchAllData = async () => {
      await Promise.all([
        fetchMedicineInventory(),
        fetchPurchaseAdvice()
      ])
    }
    
    onMounted(() => {
      fetchAllData()
    })
    
    return {
      searchQuery,
      medicineData,
      purchaseAdvice,
      loading,
      error,
      searchMedicine,
      getWarningClass,
      exportInventory,
      fetchAllData
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
  min-width: 80px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover:not(:disabled) {
  background-color: #40a9ff;
}

.search-button:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.medicine-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.warning-level {
  background: #fff7e6;
  border-left: 3px solid #faad14;
}

.critical-level {
  background: #fff1f0;
  border-left: 3px solid #ff4d4f;
}

.card-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.medicine-code {
  color: #888;
  font-size: 12px;
  margin-bottom: 8px;
}

.medicine-type {
  color: #666;
  margin-bottom: 10px;
  background: #f0f0f0;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.medicine-info {
  margin: 5px 0;
  color: #333;
}

.medicine-forecast {
  margin-top: 10px;
  font-weight: 500;
}

.normal-forecast {
  color: #52c41a;
}

.warning-forecast {
  color: #faad14;
}

.critical-forecast {
  color: #ff4d4f;
}

.advice-content {
  color: #333;
  line-height: 1.5;
  white-space: pre-line;
}

.panel-footer {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.export-button {
  background-color: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.export-button:hover {
  background-color: #73d13d;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.error-message {
  color: #ff4d4f;
  margin-bottom: 15px;
}

.retry-button {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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