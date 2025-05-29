<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientPointsManagement.vue -->
<template>
  <div class="points-management">
    <div class="points-summary">
      <div class="points-card">
        <div class="points-icon">
          <i class="icon-points"></i>
        </div>
        <div class="points-info">
          <h3>我的积分</h3>
          <div class="points-value">{{ points }}</div>
          <div class="points-actions">
            <button class="btn-exchange" @click="showExchangeDialog = true">兑换积分</button>
            <button class="btn-rules" @click="showRulesDialog = true">积分规则</button>
          </div>
        </div>
      </div>
      
      <div class="earn-points-card">
        <h3>获取更多积分</h3>
        <div class="earn-methods">
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-signin"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">每日登录</div>
              <div class="earn-value">+5积分</div>
            </div>
            <button 
              class="earn-btn" 
              :disabled="dailySignInCompleted" 
              @click="completeTask('signin')"
            >
              {{ dailySignInCompleted ? '已完成' : '去登录' }}
            </button>
          </div>
          
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-survey"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">健康问卷</div>
              <div class="earn-value">+20积分</div>
            </div>
            <button 
              class="earn-btn" 
              :disabled="healthSurveyCompleted" 
              @click="completeTask('survey')"
            >
              {{ healthSurveyCompleted ? '已完成' : '去完成' }}
            </button>
          </div>
          
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-record"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">健康记录</div>
              <div class="earn-value">+10积分</div>
            </div>
            <button 
              class="earn-btn" 
              :disabled="healthRecordCompleted" 
              @click="completeTask('record')"
            >
              {{ healthRecordCompleted ? '已完成' : '去记录' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="points-history">
      <div class="history-header">
        <h3>积分记录</h3>
        <div class="history-filters">
          <select v-model="filter" class="filter-select">
            <option value="all">全部</option>
            <option value="earn">获取</option>
            <option value="spend">消费</option>
          </select>
        </div>
      </div>
      
      <div class="history-table">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>类型</th>
              <th>积分变动</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredHistory" :key="record.id">
              <td>{{ record.date }}</td>
              <td>
                <span 
                  class="type-badge" 
                  :class="record.type === 'earn' ? 'type-earn' : 'type-spend'"
                >
                  {{ record.type === 'earn' ? '获取' : '消费' }}
                </span>
              </td>
              <td :class="record.type === 'earn' ? 'points-earn' : 'points-spend'">
                {{ record.type === 'earn' ? '+' : '' }}{{ record.points }}
              </td>
              <td>{{ record.description }}</td>
            </tr>
            <tr v-if="filteredHistory.length === 0">
              <td colspan="4" class="no-records">暂无积分记录</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页控件 -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          上一页
        </button>
        
        <button 
          v-for="page in pageNumbers" 
          :key="page" 
          class="pagination-btn" 
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>
    
    <!-- 积分兑换对话框 -->
    <div class="modal-overlay" v-if="showExchangeDialog" @click="closeExchangeDialog">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>积分兑换</h3>
          <button class="modal-close" @click="closeExchangeDialog">×</button>
        </div>
        <div class="modal-body">
          <div class="exchange-options">
            <div 
              v-for="(item, index) in exchangeItems" 
              :key="index" 
              class="exchange-item"
              :class="{ disabled: points < item.points }"
            >
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="item-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-points">{{ item.points }} 积分</div>
              </div>
              <button 
                class="item-exchange-btn" 
                :disabled="points < item.points"
                @click="exchangeItem(item)"
              >
                兑换
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 积分规则对话框 -->
    <div class="modal-overlay" v-if="showRulesDialog" @click="closeRulesDialog">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>积分规则</h3>
          <button class="modal-close" @click="closeRulesDialog">×</button>
        </div>
        <div class="modal-body">
          <div class="rules-content">
            <h4>积分获取方式</h4>
            <ul>
              <li>每日登录：+5积分（每天限一次）</li>
              <li>完成健康问卷：+20积分（每月限一次）</li>
              <li>健康记录：+10积分（每天限一次）</li>
              <li>完成随访：+15积分（每次随访）</li>
              <li>健康咨询反馈：+10积分（每次咨询后）</li>
            </ul>
            
            <h4>积分使用规则</h4>
            <ul>
              <li>积分可用于兑换健康服务、医疗器材和健康礼品</li>
              <li>积分无过期时间，长期有效</li>
              <li>积分不可转让，仅限本人使用</li>
              <li>最终解释权归智慧医养平台所有</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import type { PropType } from 'vue';
import type { PointsHistory } from '@/types/user';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'PatientPointsManagement',
  props: {
    points: {
      type: Number,
      default: 0
    },
    pointsHistory: {
      type: Array as PropType<PointsHistory[]>,
      default: () => []
    }
  },
  emits: ['update:points', 'add-points-record'],
  setup(props, { emit }) {
    const router = useRouter();
    
    // 添加简单消息提示功能
    const messageRef = ref<HTMLDivElement | null>(null);
    const showMessage = (message: string) => {
      // 创建消息元素
      const messageEl = document.createElement('div');
      messageEl.className = 'toast-message';
      messageEl.textContent = message;
      
      // 添加到文档
      document.body.appendChild(messageEl);
      
      // 显示消息
      setTimeout(() => {
        messageEl.classList.add('show');
      }, 10);
      
      // 3秒后移除
      setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(messageEl);
        }, 300);
      }, 3000);
    };
    // 筛选类型
    const filter = ref('all');
    
    // 分页
    const currentPage = ref(1);
    const pageSize = ref(5);
    
    // 任务完成状态
    const dailySignInCompleted = ref(false);
    const healthSurveyCompleted = ref(false);
    const healthRecordCompleted = ref(false);
    
    // 对话框
    const showExchangeDialog = ref(false);
    const showRulesDialog = ref(false);
    
    // 兑换物品
    const exchangeItems = ref([
      { 
        name: '血压计', 
        points: 200, 
        image: 'https://via.placeholder.com/80x80?text=血压计' 
      },
      { 
        name: '健康咨询服务', 
        points: 100, 
        image: 'https://via.placeholder.com/80x80?text=咨询服务' 
      },
      { 
        name: '营养餐券', 
        points: 50, 
        image: 'https://via.placeholder.com/80x80?text=餐券' 
      },
      { 
        name: '健康礼包', 
        points: 150, 
        image: 'https://via.placeholder.com/80x80?text=礼包' 
      }
    ]);
    
    // 检查任务完成状态
    onMounted(() => {
      checkCompletedTasks();
    });
    
    // 根据筛选类型和分页过滤积分记录
    const filteredHistory = computed(() => {
      let filtered = props.pointsHistory;
      if (filter.value !== 'all') {
        filtered = filtered.filter(record => record.type === filter.value);
      }
      
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      
      return filtered.slice(start, end);
    });
    
    // 总页数
    const totalPages = computed(() => {
      const filtered = filter.value === 'all' 
        ? props.pointsHistory 
        : props.pointsHistory.filter(record => record.type === filter.value);
        
      return Math.max(1, Math.ceil(filtered.length / pageSize.value));
    });
    
    // 页码数组
    const pageNumbers = computed(() => {
      const pages = [];
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
      return pages;
    });
    
    // 切换页码
    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };
    
    // 检查任务完成状态
    const checkCompletedTasks = () => {
      // 在实际应用中，应该从后端或本地存储获取任务完成状态
      // 这里用简单的逻辑模拟，检查今天的记录中是否有相应任务
      const today = new Date().toISOString().split('T')[0];
      
      dailySignInCompleted.value = props.pointsHistory.some(
        record => record.date.includes(today) && record.description.includes('登录')
      );
      
      healthSurveyCompleted.value = props.pointsHistory.some(
        record => record.date.includes(today) && record.description.includes('问卷')
      );
      
      healthRecordCompleted.value = props.pointsHistory.some(
        record => record.date.includes(today) && record.description.includes('记录')
      );
    };
    
    // 完成任务并获取积分
    const completeTask = (taskType: 'signin' | 'survey' | 'record') => {
      let pointsToAdd = 0;
      let description = '';
      
      switch (taskType) {
        case 'signin':
          pointsToAdd = 5;
          description = '完成每日登录';
          dailySignInCompleted.value = true;
          router.push('/patient/home'); // 跳转到首页完成登录
          break;
        case 'survey':
          pointsToAdd = 20;
          description = '完成健康问卷';
          healthSurveyCompleted.value = true;
          router.push('/patient/survey'); // 跳转到问卷页面
          break;
        case 'record':
          pointsToAdd = 10;
          description = '记录健康数据';
          healthRecordCompleted.value = true;
          router.push('/patient/health-record'); // 跳转到健康记录页面
          break;
      }
      
      // 更新积分并添加积分记录
      emit('update:points', props.points + pointsToAdd);
      
      // 添加积分记录
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      
      emit('add-points-record', {
        id: Date.now(), // 使用时间戳作为临时ID
        date: dateStr,
        type: 'earn',
        points: pointsToAdd,
        description: description
      });
      
      // 使用原生消息提示
      showMessage(`恭喜获得 ${pointsToAdd} 积分`);
    };
    
    // 关闭兑换对话框
    const closeExchangeDialog = () => {
      showExchangeDialog.value = false;
    };
    
    // 关闭规则对话框
    const closeRulesDialog = () => {
      showRulesDialog.value = false;
    };
    
    // 兑换物品
   const exchangeItem = (item: { name: string; points: number }) => {
      if (props.points < item.points) {
        showMessage('积分不足，无法兑换');
        return;
      }
      
      // 扣除积分
      emit('update:points', props.points - item.points);
      
      // 添加积分记录
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      
      emit('add-points-record', {
        id: Date.now(),
        date: dateStr,
        type: 'spend',
        points: -item.points,
        description: `兑换 ${item.name}`
      });
      
      showMessage(`成功兑换 ${item.name}`);
      closeExchangeDialog();
    };
    
    return {
      filter,
      filteredHistory,
      currentPage,
      totalPages,
      pageNumbers,
      changePage,
      dailySignInCompleted,
      healthSurveyCompleted,
      healthRecordCompleted,
      completeTask,
      showExchangeDialog,
      showRulesDialog,
      closeExchangeDialog,
      closeRulesDialog,
      exchangeItems,
      exchangeItem
    };
  }
});
</script>

<style scoped>
.points-management {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.points-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.points-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  align-items: center;
}

.points-icon {
  width: 64px;
  height: 64px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.icon-points {
  width: 32px;
  height: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5v-1h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z' fill='%231890ff'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.points-info {
  flex: 1;
}

.points-info h3 {
  font-size: 16px;
  color: #666;
  margin: 0 0 5px 0;
  font-weight: 400;
}

.points-value {
  font-size: 36px;
  font-weight: 500;
  color: #1890ff;
  margin-bottom: 12px;
}

.points-actions {
  display: flex;
  gap: 10px;
}

.btn-exchange,
.btn-rules {
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-exchange {
  background-color: #1890ff;
  color: white;
  border: none;
}

.btn-exchange:hover {
  background-color: #40a9ff;
}

.btn-rules {
  background-color: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-rules:hover {
  color: #40a9ff;
  border-color: #40a9ff;
}

.earn-points-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.earn-points-card h3 {
  font-size: 16px;
  color: #666;
  margin: 0 0 15px 0;
  font-weight: 400;
}

.earn-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.earn-method {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.earn-icon {
  width: 36px;
  height: 36px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-signin,
.icon-survey,
.icon-record {
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-signin {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7h2v5h-2v-5zm0-3h2v2h-2V10z' fill='%231890ff'/%3E%3C/svg%3E");
}

.icon-survey {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z' fill='%231890ff'/%3E%3C/svg%3E");
}

.icon-record {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19 2v2h-2v3a4 4 0 0 1-4 4H9.828l-2 2H9v6H7v-6H5v9H3V3h4V1h12v1h2zm-2 2h-8v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4z' fill='%231890ff'/%3E%3C/svg%3E");
}

.earn-info {
  flex: 1;
  margin-right: 12px;
}

.earn-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.earn-value {
  font-size: 12px;
  color: #52c41a;
}

.earn-btn {
  padding: 4px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.earn-btn:hover:not(:disabled) {
  background-color: #40a9ff;
}

.earn-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.points-history {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.history-header h3 {
  font-size: 16px;
  color: #666;
  margin: 0;
  font-weight: 400;
}

.filter-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  background-color: #fff;
}

.history-table {
  width: 100%;
  overflow-x: auto;
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th, 
.history-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.history-table th {
  font-weight: 500;
  color: #333;
  background-color: #fafafa;
}

.type-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.type-earn {
  background-color: #e6f7ff;
  color: #1890ff;
}

.type-spend {
  background-color: #fff2e8;
  color: #fa8c16;
}

.points-earn {
  color: #52c41a;
}

.points-spend {
  color: #fa8c16;
}

.no-records {
  text-align: center;
  color: #999;
  padding: 30px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
}

.pagination-btn {
  min-width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  color: #d9d9d9;
}

.pagination-btn.active {
  background-color: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

/* 模态对话框样式 */
.modal-overlay {
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

.modal-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  line-height: 1;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

/* 积分兑换样式 */
.exchange-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.exchange-item {
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
}

.exchange-item.disabled {
  opacity: 0.6;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 12px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.item-points {
  font-size: 12px;
  color: #1890ff;
}

.item-exchange-btn {
  padding: 4px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.item-exchange-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

/* 积分规则样式 */
.rules-content h4 {
  font-size: 16px;
  color: #333;
  margin: 16px 0 8px;
}

.rules-content h4:first-child {
  margin-top: 0;
}

.rules-content ul {
  padding-left: 20px;
  margin: 8px 0;
}

.rules-content li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .points-summary {
    grid-template-columns: 1fr;
  }
  
  .earn-method {
    flex-wrap: wrap;
  }
  
  .earn-info {
    margin-bottom: 8px;
  }
  
  .earn-btn {
    width: 100%;
    margin-top: 8px;
  }
  
  .exchange-options {
    grid-template-columns: 1fr;
  }

  .toast-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 2000;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
}

.toast-message.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
}
</style>