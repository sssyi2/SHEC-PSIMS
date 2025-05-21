<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\home\UpcomingFollowupsPanel.vue -->
<template>
  <div class="panel followups-panel">
    <div class="panel-header">
      <h2 class="panel-title">即将到期随访</h2>
      <button class="more-button" @click="viewMore">查看更多</button>
    </div>
    
    <div class="panel-content">
      <div v-if="loading" class="loading-placeholder">
        <div class="spinner"></div>
        <span>加载中...</span>
      </div>
      
      <ul v-else-if="followups.length > 0" class="followup-list">
        <li 
          v-for="followup in followups" 
          :key="followup.id" 
          class="followup-item"
          :class="{'urgent': isUrgent(followup.followupDate)}"
        >
          <div class="followup-date">
            {{ formatDate(followup.followupDate) }}
          </div>
          <div class="followup-info">
            <div class="patient-name">
              {{ followup.patientName }} 
              <span class="patient-age">{{ followup.patientAge }}岁</span>
            </div>
            <div class="followup-reason">{{ followup.reason }}</div>
          </div>
          <div class="followup-action">
            <button class="action-button" @click.stop="completeFollowup(followup.id)">
              完成
            </button>
          </div>
        </li>
      </ul>
      
      <div v-else class="empty-placeholder">
        <div class="empty-icon">📅</div>
        <span>暂无即将到期的随访</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Followup {
  id: number;
  patientId: string;
  patientName: string;
  patientAge: number;
  reason: string;
  followupDate: string;
  status: 'pending' | 'completed' | 'canceled';
}

export default defineComponent({
  name: 'UpcomingFollowupsPanel',
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const followups = ref<Followup[]>([]);
    
    // 获取随访数据
    const fetchFollowups = () => {
      loading.value = true;
      
      // 模拟API请求
      setTimeout(() => {
        followups.value = [
          {
            id: 1,
            patientId: 'P2024001',
            patientName: '李明',
            patientAge: 65,
            reason: '高血压复查',
            followupDate: '2025-05-22', // 明天
            status: 'pending'
          },
          {
            id: 2,
            patientId: 'P2024015',
            patientName: '张华',
            patientAge: 72,
            reason: '糖尿病管理随访',
            followupDate: '2025-05-24', // 3天后
            status: 'pending'
          },
          {
            id: 3,
            patientId: 'P2024042',
            patientName: '王芳',
            patientAge: 68,
            reason: '心脏病术后随访',
            followupDate: '2025-05-26', // 5天后
            status: 'pending'
          },
          {
            id: 4,
            patientId: 'P2024056',
            patientName: '赵小明',
            patientAge: 75,
            reason: '关节炎治疗随访',
            followupDate: '2025-05-28', // 7天后
            status: 'pending'
          }
        ];
        loading.value = false;
      }, 1000);
    };
    
    // 格式化日期显示
    const formatDate = (dateString: string) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const followupDate = new Date(dateString);
      const diffTime = followupDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return '今天';
      } else if (diffDays === 1) {
        return '明天';
      } else {
        return `${diffDays}天后`;
      }
    };
    
    // 检查是否紧急（3天内）
    const isUrgent = (dateString: string) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const followupDate = new Date(dateString);
      const diffTime = followupDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= 2; // 2天或更短时间
    };
    
    // 完成随访
    const completeFollowup = (id: number) => {
      // 在实际应用中，这里应该调用API
      console.log(`完成随访: ${id}`);
      
      // 移除完成的随访
      followups.value = followups.value.filter(item => item.id !== id);
    };
    
    // 查看更多随访
    const viewMore = () => {
      router.push('/health-warning/followup');
    };
    
    onMounted(() => {
      fetchFollowups();
    });
    
    return {
      loading,
      followups,
      formatDate,
      isUrgent,
      completeFollowup,
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

.followup-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.followup-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.followup-item:last-child {
  border-bottom: none;
}

.followup-item.urgent .followup-date {
  color: #f5222d;
  font-weight: bold;
}

.followup-date {
  width: 60px;
  font-size: 14px;
  color: #1890ff;
}

.followup-info {
  flex: 1;
}

.patient-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.patient-age {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

.followup-reason {
  font-size: 12px;
  color: #666;
}

.followup-action {
  margin-left: 15px;
}

.action-button {
  padding: 4px 12px;
  background-color: #52c41a;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button:hover {
  background-color: #73d13d;
}

.empty-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 10px;
}
</style>