<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PointsManagement.vue -->
<template>
  <div class="points-management">
    <div class="points-header">
      <div class="title">积分管理</div>
    </div>
    
    <div class="points-summary">
      <div class="points-card">
        <div class="points-value">{{ userPoints }}</div>
        <div class="points-label">当前积分</div>
      </div>
      
      <div class="points-info">
        <div class="info-item">
          <div class="info-label">本月获得</div>
          <div class="info-value">+{{ monthlyPoints }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">积分等级</div>
          <div class="info-value">{{ pointsLevel }}</div>
        </div>
      </div>
    </div>
    
    <div class="points-history">
      <div class="section-title">积分明细</div>
      
      <div class="history-list">
        <div class="history-item" v-for="(item, index) in pointsHistory" :key="index">
          <div class="history-content">
            <div class="history-title">{{ item.title }}</div>
            <div class="history-time">{{ item.time }}</div>
          </div>
          <div 
            class="history-points" 
            :class="{ 'points-add': item.points > 0, 'points-minus': item.points < 0 }"
          >
            {{ item.points > 0 ? '+' : '' }}{{ item.points }}
          </div>
        </div>
      </div>
      
      <div class="load-more" v-if="hasMoreHistory" @click="loadMoreHistory">
        加载更多
      </div>
    </div>
    
    <div class="points-rules">
      <div class="section-title">积分规则</div>
      
      <div class="rules-list">
        <div class="rule-item" v-for="(rule, index) in pointsRules" :key="index">
          <div class="rule-icon">●</div>
          <div class="rule-text">{{ rule }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'PointsManagement',
  setup() {
    // 用户积分
    const userPoints = ref(1250)
    
    // 本月获得积分
    const monthlyPoints = ref(320)
    
    // 积分等级
    const pointsLevel = ref('黄金会员')
    
    // 是否有更多历史记录
    const hasMoreHistory = ref(true)
    
    // 积分历史记录
    const pointsHistory = reactive([
      {
        title: '完成随访任务',
        time: '2025-05-18 14:30',
        points: 50
      },
      {
        title: '咨询答复',
        time: '2025-05-15 09:12',
        points: 30
      },
      {
        title: '健康档案创建',
        time: '2025-05-10 16:45',
        points: 100
      },
      {
        title: '积分兑换礼品',
        time: '2025-05-05 11:20',
        points: -200
      }
    ])
    
    // 积分规则
    const pointsRules = reactive([
      '创建健康档案：+100积分',
      '完成随访任务：+50积分/次',
      '回答健康咨询：+30积分/次',
      '参与健康讲座：+80积分/次',
      '积分可兑换礼品或服务优惠'
    ])
    
    // 加载更多历史记录
    const loadMoreHistory = () => {
      // 模拟加载更多数据
      const moreHistory = [
        {
          title: '参与健康讲座',
          time: '2025-04-28 15:00',
          points: 80
        },
        {
          title: '健康档案更新',
          time: '2025-04-22 10:35',
          points: 40
        }
      ]
      
      pointsHistory.push(...moreHistory)
      
      // 假设没有更多数据了
      hasMoreHistory.value = false
    }
    
    return {
      userPoints,
      monthlyPoints,
      pointsLevel,
      pointsHistory,
      pointsRules,
      hasMoreHistory,
      loadMoreHistory
    }
  }
})
</script>

<style scoped>
.points-management {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.points-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.title, .section-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.points-summary {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.points-card {
  padding: 20px;
  background-color: #e6f7ff;
  border-radius: 8px;
  text-align: center;
  width: 150px;
}

.points-value {
  font-size: 28px;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 5px;
}

.points-label {
  color: #666;
  font-size: 14px;
}

.points-info {
  margin-left: 30px;
}

.info-item {
  margin-bottom: 15px;
}

.info-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.info-value {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.section-title {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 16px;
}

.history-list {
  border: 1px solid #eee;
  border-radius: 4px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.history-item:last-child {
  border-bottom: none;
}

.history-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.history-time {
  font-size: 12px;
  color: #999;
}

.history-points {
  font-weight: 500;
  font-size: 16px;
}

.points-add {
  color: #52c41a;
}

.points-minus {
  color: #ff4d4f;
}

.load-more {
  text-align: center;
  padding: 10px;
  color: #1890ff;
  cursor: pointer;
  margin-top: 10px;
}

.load-more:hover {
  text-decoration: underline;
}

.rules-list {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}

.rule-item {
  display: flex;
  margin-bottom: 10px;
}

.rule-icon {
  color: #1890ff;
  margin-right: 10px;
  font-size: 10px;
  line-height: 1.5;
}

.rule-text {
  color: #333;
  line-height: 1.5;
}
</style>