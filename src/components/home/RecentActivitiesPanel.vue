<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\home\RecentActivitiesPanel.vue -->
<template>
  <div class="panel recent-activities-panel">
    <div class="panel-header">
      <h2 class="panel-title">最近活动</h2>
      <button class="more-button" @click="viewMore">查看更多</button>
    </div>
    
    <div class="panel-content">
      <div v-if="loading" class="loading-placeholder">
        <div class="spinner"></div>
        <span>加载中...</span>
      </div>
      
      <ul v-else class="activity-list">
        <li 
          v-for="activity in activities" 
          :key="activity.id" 
          class="activity-item"
        >
          <div class="activity-time">{{ formatTime(activity.time) }}</div>
          <div class="activity-info">
            <div class="activity-type" :class="'type-' + activity.type">
              {{ activity.typeText }}
            </div>
            <div class="activity-content">{{ activity.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Activity {
  id: number;
  type: string;
  typeText: string;
  content: string;
  time: number;
}

export default defineComponent({
  name: 'RecentActivitiesPanel',
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const activities = ref<Activity[]>([]);
    
    // 获取活动数据
    const fetchActivities = () => {
      loading.value = true;
      
      // 模拟API请求
      setTimeout(() => {
        activities.value = [
          {
            id: 1,
            type: 'followup',
            typeText: '随访',
            content: '完成了高血压患者李明的随访记录',
            time: Date.now() - 3600000 * 2 // 2小时前
          },
          {
            id: 2,
            type: 'consultation',
            typeText: '咨询',
            content: '回复了患者张华的健康咨询',
            time: Date.now() - 3600000 * 5 // 5小时前
          },
          {
            id: 3,
            type: 'record',
            typeText: '档案',
            content: '更新了王芳的健康档案信息',
            time: Date.now() - 3600000 * 8 // 8小时前
          },
          {
            id: 4,
            type: 'warning',
            typeText: '预警',
            content: '处理了赵小明的健康异常预警',
            time: Date.now() - 86400000 // 1天前
          },
          {
            id: 5,
            type: 'consultation',
            typeText: '咨询',
            content: '开始了一次新的健康咨询',
            time: Date.now() - 86400000 * 2 // 2天前
          }
        ];
        loading.value = false;
      }, 1000);
    };
    
    // 格式化时间显示
    const formatTime = (timestamp: number) => {
      const now = Date.now();
      const diff = now - timestamp;
      
      // 小于1小时
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}分钟前`;
      } 
      // 小于24小时
      else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}小时前`;
      }
      // 小于30天
      else if (diff < 2592000000) {
        const days = Math.floor(diff / 86400000);
        return `${days}天前`;
      }
      // 其他情况显示具体日期
      else {
        const date = new Date(timestamp);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      }
    };
    
    // 查看更多活动
    const viewMore = () => {
      router.push('/activities');
    };
    
    onMounted(() => {
      fetchActivities();
    });
    
    return {
      loading,
      activities,
      formatTime,
      viewMore
    };
  }
});
</script>

<style scoped>
.panel {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.more-button {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
}

.more-button:hover {
  text-decoration: underline;
}

.panel-content {
  padding: 0;
  height: 300px;
  overflow-y: auto;
}

.loading-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.activity-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.activity-item {
  padding: 12px 20px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  width: 80px;
  font-size: 12px;
  color: #999;
  padding-top: 2px;
}

.activity-info {
  flex: 1;
}

.activity-type {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  margin-bottom: 4px;
}

.type-followup {
  background-color: #1890ff;
}

.type-consultation {
  background-color: #52c41a;
}

.type-record {
  background-color: #722ed1;
}

.type-warning {
  background-color: #fa8c16;
}

.activity-content {
  font-size: 14px;
  color: #333;
}
</style>