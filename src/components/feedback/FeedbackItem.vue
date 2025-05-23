<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\feedback\FeedbackItem.vue -->
<template>
  <div class="feedback-item">
    <div class="feedback-header">
      <div class="user-info">
        <div class="avatar">{{ feedback.avatar }}</div>
        <div class="username">{{ feedback.username }}</div>
      </div>
      
      <div class="feedback-meta">
        <div class="tags-container" v-if="feedback.tags && feedback.tags.length > 0">
          <span class="tags-label">标签选择：</span>
          <span class="tags">{{ feedback.tags.join('，') }}</span>
        </div>
        <div class="tags-container" v-else>
          <span class="tags-label">标签选择：</span>
          <span class="tags"></span>
        </div>
        
        <div class="rating-container">
          <span class="rating-label">评分：</span>
          <span class="rating">{{ feedback.rating }}</span>
          <span>颗星</span>
        </div>
        
        <div class="date">{{ feedback.date }}</div>
      </div>
    </div>
    
    <div class="feedback-content">
      <p>{{ feedback.content || '用户未留下评价内容' }}</p>
    </div>
    
    <div class="feedback-footer">
      <button class="view-btn" @click="$emit('view-details', feedback)">查看详情</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Feedback } from '@/types/feedback.ts';

export default defineComponent({
  name: 'FeedbackItem',
  props: {
    feedback: {
      type: Object as PropType<Feedback>,
      required: true
    }
  },
  emits: ['view-details']
});
</script>

<style scoped>
.feedback-item {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.feedback-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.feedback-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 16px;
}

.username {
  font-weight: 500;
  color: #333;
}

.feedback-meta {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.tags-container,
.rating-container {
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.tags-label,
.rating-label {
  margin-right: 4px;
}

.tags {
  color: #1890ff;
}

.rating {
  color: #ff4d4f;
  font-weight: 500;
  margin: 0 2px;
}

.date {
  color: #999;
}

.feedback-content {
  padding: 16px;
  color: #333;
  min-height: 60px;
}

.feedback-content p {
  margin: 0;
  line-height: 1.6;
}

.feedback-footer {
  padding: 8px 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.view-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.view-btn:hover {
  background-color: #e6f7ff;
}

@media (max-width: 768px) {
  .feedback-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .feedback-meta {
    margin-top: 10px;
    flex-wrap: wrap;
  }
  
  .tags-container,
  .rating-container {
    margin-bottom: 6px;
  }
}
</style>