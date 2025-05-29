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
           v-for="medicine in displayedMedicines" 
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
    
    <!-- 分页控件 -->
    <div class="pagination-container" v-if="medicineData.length > itemsPerPage">
      <div class="pagination-info">
        显示 {{ startIndex + 1 }}-{{ endIndex }} 条，共 {{ medicineData.length }} 条
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-button" 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
        >
          上一页
        </button>
        
        <template v-if="totalPages <= 7">
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="pagination-button" 
            :class="{ active: currentPage === page }" 
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </template>
        
        <template v-else>
          <!-- 首页 -->
          <button 
            class="pagination-button" 
            :class="{ active: currentPage === 1 }" 
            @click="changePage(1)"
          >
            1
          </button>
          
          <!-- 省略号 -->
          <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>
          
          <!-- 中间页码 -->
          <template v-for="page in middlePages" :key="page">
            <button 
              class="pagination-button" 
              :class="{ active: currentPage === page }" 
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </template>
          
          <!-- 省略号 -->
          <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>
          
          <!-- 尾页 -->
          <button 
            class="pagination-button" 
            :class="{ active: currentPage === totalPages }" 
            @click="changePage(totalPages)"
          >
            {{ totalPages }}
          </button>
        </template>
        
        <button 
          class="pagination-button" 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
        >
          下一页
        </button>
      </div>
      
      <div class="pagination-size-selector">
        <span>每页显示：</span>
        <select v-model="itemsPerPage" @change="handlePerPageChange">
          <option :value="6">6 条</option>
          <option :value="9">9 条</option>
          <option :value="12">12 条</option>
          <option :value="24">24 条</option>
        </select>
      </div>
    </div>
    
    <div class="panel-footer" v-if="medicineData.length > 0">
      <button class="export-button" @click="exportInventory">导出报表</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
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
    
    // 分页相关状态
    const currentPage = ref(1)
    const itemsPerPage = ref(6)
    
    // 计算总页数
    const totalPages = computed(() => {
      return Math.ceil(medicineData.value.length / itemsPerPage.value)
    })
    
    // 计算当前页显示的药品
    const displayedMedicines = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return medicineData.value.slice(start, end)
    })
    
    // 计算当前显示的开始和结束索引
    const startIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value
    })
    
    const endIndex = computed(() => {
      const end = startIndex.value + itemsPerPage.value
      return end > medicineData.value.length ? medicineData.value.length : end
    })
    
    // 计算中间显示的页码
    const middlePages = computed(() => {
      if (totalPages.value <= 7) return []
      
      let start, end
      
      if (currentPage.value <= 4) {
        start = 2
        end = 6
      } else if (currentPage.value >= totalPages.value - 3) {
        start = totalPages.value - 5
        end = totalPages.value - 1
      } else {
        start = currentPage.value - 2
        end = currentPage.value + 2
      }
      
      // 确保页码在有效范围内
      start = Math.max(2, start)
      end = Math.min(totalPages.value - 1, end)
      
      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })
    
    // 切换页码
    const changePage = (page: number) => {
      if (page < 1 || page > totalPages.value) return
      currentPage.value = page
      
      // 如果当前页已经没有数据（可能是因为更改了每页条数），则回到第一页
      if (startIndex.value >= medicineData.value.length) {
        currentPage.value = 1
      }
    }
    
    // 改变每页显示条数
    const handlePerPageChange = () => {
      currentPage.value = 1  // 重置到第一页
    }
    
    // 获取所有药品库存数据
    const fetchMedicineInventory = async () => {
      loading.value = true
      error.value = ''
      
      try {
        medicineData.value = await getAllMedicineInventory()
        currentPage.value = 1  // 重置到第一页
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
        currentPage.value = 1  // 重置到第一页
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
      fetchAllData,
      
      // 分页相关
      currentPage,
      itemsPerPage,
      totalPages,
      displayedMedicines,
      startIndex,
      endIndex,
      middlePages,
      changePage,
      handlePerPageChange
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

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #f0f0f0;
}

.pagination-info {
  color: #666;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  align-items: center;
}

.pagination-button {
  min-width: 32px;
  height: 32px;
  margin: 0 4px;
  padding: 0 8px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
}

.pagination-button:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.pagination-button:disabled {
  color: rgba(0, 0, 0, 0.25);
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.pagination-button.active {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.pagination-ellipsis {
  display: inline-block;
  width: 24px;
  line-height: 32px;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}

.pagination-size-selector {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
}

.pagination-size-selector select {
  margin-left: 8px;
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
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
  
  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>