<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\user\FeedbackView.vue -->
<template>
  <div class="feedback-view">
    <TheHeader active-menu="user-management" />
    
    <div class="main-content">
      <AdminSidebar active-menu="feedback" />
      
      <div class="content-area">
        <h1 class="page-title">查看反馈</h1>
        
        <div class="feedback-filters">
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'all' }" 
            @click="setFilter('all')"
          >
            全部
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'good' }" 
            @click="setFilter('good')"
          >
            好评
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'medium' }" 
            @click="setFilter('medium')"
          >
            中评
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'bad' }" 
            @click="setFilter('bad')"
          >
            差评
          </button>
        </div>
        
        <div class="feedback-list">
          <FeedbackItem
            v-for="feedback in filteredFeedbacks"
            :key="feedback.id"
            :feedback="feedback"
            @view-details="handleViewDetails"
          />
          
          <div v-if="filteredFeedbacks.length === 0" class="no-feedback">
            暂无相关反馈
          </div>
        </div>
        
        <PaginationControl 
          :total="totalFeedbacks"
          :current-page="currentPage"
          :page-size="pageSize"
          @page-change="handlePageChange"
        />
      </div>
    </div>
    
    <!-- 反馈详情对话框 -->
    <FeedbackDetailDialog 
      v-if="showDetailDialog"
      :feedback="selectedFeedback"
      @close="closeDetailDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import TheHeader from '@/components/layout/TheHeader3.vue';
import AdminSidebar from '@/components/user/AdminSidebar.vue';
import FeedbackItem from '@/components/feedback/FeedbackItem.vue';
import PaginationControl from '@/components/common/PaginationControl.vue';
import FeedbackDetailDialog from '@/components/feedback/FeedbackDetailDialog.vue';
import { useFeedbackStore } from '@/store/feedback.ts';
import type { Feedback } from '@/types/feedback.ts';

export default defineComponent({
  name: 'FeedbackView',
  components: {
    TheHeader,
    AdminSidebar,
    FeedbackItem,
    PaginationControl,
    FeedbackDetailDialog
  },
  setup() {
    const feedbackStore = useFeedbackStore();
    
    const feedbacks = ref<Feedback[]>([]);
    const activeFilter = ref('all');
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalFeedbacks = ref(0);
    
    // 反馈详情对话框状态
    const showDetailDialog = ref(false);
    const selectedFeedback = ref<Feedback | null>(null);
    
    // 根据评分类型过滤反馈
    const filteredFeedbacks = computed(() => {
      if (activeFilter.value === 'all') {
        return feedbacks.value;
      }
      
      const ratingMap = {
        'good': [4, 5],
        'medium': [3],
        'bad': [1, 2]
      };
      
      const ratings = ratingMap[activeFilter.value as keyof typeof ratingMap] || [];
      return feedbacks.value.filter(feedback => ratings.includes(feedback.rating));
    });
    
    // 设置过滤器
    const setFilter = (filter: string) => {
      activeFilter.value = filter;
      fetchFeedbacks();
    };
    
    // 获取反馈数据
    const fetchFeedbacks = async () => {
      try {
        // 在实际应用中应该调用API或store的action
        // await feedbackStore.fetchFeedbacks({
        //   page: currentPage.value,
        //   pageSize: pageSize.value,
        //   filter: activeFilter.value
        // });
        // feedbacks.value = feedbackStore.feedbacks;
        // totalFeedbacks.value = feedbackStore.totalFeedbacks;
        
        // 模拟数据
        feedbacks.value = [
          {
            id: 1,
            username: 'aaa小李',
            content: '系统反应很快',
            rating: 5,
            tags: ['实用性强'],
            date: '2025.05.06',
            avatar: '👤'
          },
          {
            id: 2,
            username: 'bbb小王',
            content: '界面设计很友好，但有些功能不太好找',
            rating: 3,
            tags: [],
            date: '2024.08.15',
            avatar: '👤'
          },
          {
            id: 3,
            username: 'ccc小赵',
            content: '使用起来比较困难，需要改进',
            rating: 2,
            tags: [],
            date: '2024.04.29',
            avatar: '👤'
          }
        ];
        
        totalFeedbacks.value = 15; // 模拟总共有15条反馈
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    
    // 处理查看详情
    const handleViewDetails = (feedback: Feedback) => {
      selectedFeedback.value = { ...feedback };
      showDetailDialog.value = true;
    };
    
    // 关闭详情对话框
    const closeDetailDialog = () => {
      showDetailDialog.value = false;
      selectedFeedback.value = null;
    };
    
    // 处理分页变化
    const handlePageChange = (page: number) => {
      currentPage.value = page;
      fetchFeedbacks();
    };
    
    // 组件挂载时获取反馈数据
    onMounted(() => {
      fetchFeedbacks();
    });
    
    return {
      feedbacks,
      filteredFeedbacks,
      activeFilter,
      currentPage,
      pageSize,
      totalFeedbacks,
      showDetailDialog,
      selectedFeedback,
      setFilter,
      handleViewDetails,
      closeDetailDialog,
      handlePageChange
    };
  }
});
</script>

<style scoped>
.feedback-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  padding: 24px;
}

.page-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 24px;
  font-weight: 500;
}

.feedback-filters {
  display: flex;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 6px 16px;
  background-color: white;
  border: 1px solid #d9d9d9;
  margin-right: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.filter-btn.active {
  color: white;
  background-color: #1890ff;
  border-color: #1890ff;
}

.feedback-list {
  margin-bottom: 20px;
}

.no-feedback {
  padding: 40px 0;
  text-align: center;
  color: #999;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }
  
  .feedback-filters {
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style>