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
            <button class="btn-exchange">兑换积分</button>
            <button class="btn-rules">积分规则</button>
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
            <button class="earn-btn">去登录</button>
          </div>
          
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-survey"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">健康问卷</div>
              <div class="earn-value">+20积分</div>
            </div>
            <button class="earn-btn">去完成</button>
          </div>
          
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-record"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">健康记录</div>
              <div class="earn-value">+10积分</div>
            </div>
            <button class="earn-btn">去记录</button>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import type { PointsHistory } from '@/types/user';

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
  setup(props) {
    // 筛选类型
    const filter = ref('all');
    
    // 根据筛选类型过滤积分记录
    const filteredHistory = computed(() => {
      if (filter.value === 'all') {
        return props.pointsHistory;
      }
      return props.pointsHistory.filter(record => record.type === filter.value);
    });
    
    return {
      filter,
      filteredHistory
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientPointsManagement.vue -->
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
            <button class="btn-exchange">兑换积分</button>
            <button class="btn-rules">积分规则</button>
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
            <button class="earn-btn">去登录</button>
          </div>
          
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-survey"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">健康问卷</div>
              <div class="earn-value">+20积分</div>
            </div>
            <button class="earn-btn">去完成</button>
          </div>
          
          <div class="earn-method">
            <div class="earn-icon">
              <i class="icon-record"></i>
            </div>
            <div class="earn-info">
              <div class="earn-title">健康记录</div>
              <div class="earn-value">+10积分</div>
            </div>
            <button class="earn-btn">去记录</button>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import type { PointsHistory } from '@/types/user';

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
  setup(props) {
    // 筛选类型
    const filter = ref('all');
    
    // 根据筛选类型过滤积分记录
    const filteredHistory = computed(() => {
      if (filter.value === 'all') {
        return props.pointsHistory;
      }
      return props.pointsHistory.filter(record => record.type === filter.value);
    });
    
    return {
      filter,
      filteredHistory
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0