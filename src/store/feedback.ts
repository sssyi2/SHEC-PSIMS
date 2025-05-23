import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Feedback, FeedbackQueryParams } from '@/types/feedback';
// import { api } from '@/api';

export const useFeedbackStore = defineStore('feedback', () => {
  // 状态
  const feedbacks = ref<Feedback[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10
  });
  
  // 计算属性
  const totalFeedbacks = computed(() => pagination.value.total);
  
  // 获取反馈列表
  const fetchFeedbacks = async (params: FeedbackQueryParams) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // const response = await api.get('/feedbacks', { params });
      // feedbacks.value = response.data.items;
      // pagination.value = {
      //   total: response.data.total,
      //   current: params.page,
      //   pageSize: params.pageSize
      // };
      
      // 模拟数据
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 根据过滤条件模拟数据
      const mockFeedbacks: Feedback[] = [];
      const ratingsMap: Record<string, number[]> = {
        'all': [1, 2, 3, 4, 5],
        'good': [4, 5],
        'medium': [3],
        'bad': [1, 2]
      };
      
      const ratings = ratingsMap[params.filter || 'all'];
      
      for (let i = 0; i < params.pageSize; i++) {
        const id = (params.page - 1) * params.pageSize + i + 1;
        
        // 根据过滤条件生成对应评分
        const rating = ratings[Math.floor(Math.random() * ratings.length)];
        
        // 模拟不同的标签
        let tags: string[] = [];
        if (rating >= 4) {
          tags = ['实用性强', '界面友好', '功能全面'].slice(0, Math.floor(Math.random() * 3) + 1);
        } else if (rating === 3) {
          tags = ['功能较全', '有待改进'].slice(0, Math.floor(Math.random() * 2) + 1);
        }
        
        // 模拟用户名
        const prefix = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'][Math.floor(Math.random() * 5)];
        const suffix = ['小李', '小王', '小张', '小赵', '小钱'][Math.floor(Math.random() * 5)];
        
        // 模拟日期
        const year = 2024 + Math.floor(Math.random() * 2);
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        const date = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
        
        // 模拟内容
        let content = '';
        if (rating >= 4) {
          content = ['系统反应很快', '使用体验很好', '功能全面，很方便', '界面设计很友好'][Math.floor(Math.random() * 4)];
        } else if (rating === 3) {
          content = ['功能还可以，但体验一般', '可以满足基本需求', '有些地方需要改进'][Math.floor(Math.random() * 3)];
        } else {
          content = ['操作复杂', '系统反应慢', '功能不全面', '使用起来比较困难'][Math.floor(Math.random() * 4)];
        }
        
        mockFeedbacks.push({
          id,
          username: `${prefix}${suffix}`,
          content,
          rating,
          tags,
          date,
          avatar: '👤'
        });
      }
      
      feedbacks.value = mockFeedbacks;
      pagination.value = {
        total: 35,  // 假设总共有35条反馈
        current: params.page,
        pageSize: params.pageSize
      };
      
      return {
        feedbacks: mockFeedbacks,
        pagination: pagination.value
      };
    } catch (e: any) {
      error.value = e.message || '获取反馈列表失败';
      console.error('Error fetching feedbacks:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  // 回复反馈
  const replyToFeedback = async (feedbackId: number, content: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // await api.post(`/feedbacks/${feedbackId}/reply`, { content });
      
      // 模拟更新本地状态
      const index = feedbacks.value.findIndex(f => f.id === feedbackId);
      if (index !== -1) {
        feedbacks.value[index] = {
          ...feedbacks.value[index],
          replyStatus: 'replied',
          replyContent: content,
          replyDate: new Date().toISOString()
        };
      }
      
      return true;
    } catch (e: any) {
      error.value = e.message || '回复反馈失败';
      console.error('Error replying to feedback:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  return {
    feedbacks,
    loading,
    error,
    pagination,
    totalFeedbacks,
    fetchFeedbacks,
    replyToFeedback
  };
});