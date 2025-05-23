
<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\feedback\FeedbackDetailDialog.vue -->
<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>反馈详情</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="dialog-body">
        <div v-if="feedback" class="feedback-details">
          <div class="user-section">
            <div class="avatar">{{ feedback.avatar }}</div>
            <div class="user-info">
              <div class="username">{{ feedback.username }}</div>
              <div class="date">{{ feedback.date }}</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">评分:</div>
            <div class="detail-value">
              <div class="stars-container">
                <span 
                  v-for="star in 5" 
                  :key="star" 
                  class="star"
                  :class="{ active: star <= feedback.rating }"
                >
                  ★
                </span>
                <span class="rating-text">{{ feedback.rating }} 颗星</span>
              </div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">标签:</div>
            <div class="detail-value">
              <div v-if="feedback.tags && feedback.tags.length > 0" class="tags-container">
                <span 
                  v-for="(tag, index) in feedback.tags" 
                  :key="index"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <div v-else class="no-tags">未选择标签</div>
            </div>
          </div>
          
          <div class="detail-item content-item">
            <div class="detail-label">反馈内容:</div>
            <div class="detail-value">
              <p>{{ feedback.content || '用户未留下评价内容' }}</p>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">设备信息:</div>
            <div class="detail-value">{{ deviceInfo }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">提交时间:</div>
            <div class="detail-value">{{ feedback.date }} {{ getRandomTime() }}</div>
          </div>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="reply-btn">回复用户</button>
        <button class="close-btn-footer" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import type { Feedback } from '@/types/feedback';

export default defineComponent({
  name: 'FeedbackDetailDialog',
  props: {
    feedback: {
      type: Object as PropType<Feedback | null>,
      default: null
    }
  },
  emits: ['close'],
  setup() {
    const deviceInfo = ref('Windows 11 / Chrome 120.0.6099.130');
    
    // 生成随机时间（用于模拟展示）
    const getRandomTime = () => {
      const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
      const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
    
    return {
      deviceInfo,
      getRandomTime
    };
  }
});
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  width: 550px;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.dialog-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.dialog-body {
  padding: 20px 16px;
  max-height: 60vh;
  overflow-y: auto;
}

.feedback-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-section {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  font-size: 18px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.date {
  font-size: 12px;
  color: #999;
}

.detail-item {
  display: flex;
  margin-bottom: 12px;
}

.detail-label {
  width: 80px;
  font-weight: 500;
  color: #666;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
  flex: 1;
}

.content-item {
  align-items: flex-start;
}

.content-item .detail-value {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  min-height: 60px;
}

.stars-container {
  display: flex;
  align-items: center;
}

.star {
  color: #d9d9d9;
  font-size: 18px;
  margin-right: 2px;
}

.star.active {
  color: #fadb14;
}

.rating-text {
  margin-left: 8px;
  color: #666;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e6f7ff;
  color: #1890ff;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.no-tags {
  color: #999;
  font-style: italic;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.reply-btn {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 12px;
  transition: background-color 0.3s;
}

.reply-btn:hover {
  background-color: #40a9ff;
}

.close-btn-footer {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn-footer:hover {
  background-color: #e6e6e6;
}
</style>