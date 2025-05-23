<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\common\PaginationControl.vue -->
<template>
  <div class="pagination-container">
    <span class="pagination-info">
      共 {{ total }} 条记录，每页 {{ pageSize }} 条
    </span>
    <div class="pagination-controls">
      <button 
        class="pagination-btn prev-btn" 
        :disabled="currentPage <= 1"
        @click="changePage(currentPage - 1)"
      >
        上一页
      </button>
      
      <div class="pagination-numbers">
        <template v-for="page in displayedPages" :key="page">
          <span 
            v-if="page === '...'" 
            class="pagination-ellipsis"
          >
            ...
          </span>
          <button 
            v-else 
            class="pagination-number" 
            :class="{ active: page === currentPage }"
            v-if="typeof page === 'number'"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </template>
      </div>
      
      <button 
        class="pagination-btn next-btn" 
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'PaginationControl',
  props: {
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const totalPages = computed(() => {
      return Math.ceil(props.total / props.pageSize);
    });
    
    const displayedPages = computed(() => {
      const total = totalPages.value;
      const current = props.currentPage;
      
      // 如果总页数少于7，显示所有页码
      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }
      
      // 否则，显示带省略号的页码
      const pages = [];
      
      if (current <= 3) {
        // 当前页接近开头
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 2) {
        // 当前页接近结尾
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
      
      return pages;
    });
    
    const changePage = (page: number) => {
      emit('page-change', page);
    };
    
    return {
      totalPages,
      displayedPages,
      changePage
    };
  }
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
}

.pagination-btn {
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.pagination-btn:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
}

.prev-btn {
  margin-right: 8px;
}

.next-btn {
  margin-left: 8px;
}

.pagination-numbers {
  display: flex;
  align-items: center;
}

.pagination-number {
  display: inline-block;
  min-width: 32px;
  height: 32px;
  margin: 0 4px;
  padding: 0 6px;
  text-align: center;
  line-height: 32px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.pagination-number.active {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.pagination-ellipsis {
  display: inline-block;
  min-width: 32px;
  text-align: center;
  line-height: 32px;
}

@media (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .pagination-info {
    margin-bottom: 10px;
  }
  
  .pagination-number {
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    margin: 0 2px;
  }
}
</style>