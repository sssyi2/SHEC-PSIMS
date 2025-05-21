<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FollowupPlanCard.vue -->
<template>
  <div class="followup-plan-card" :class="{ 'completed': plan.status === 'completed' }">
    <div class="card-content">
      <div class="info-table">
        <table>
          <tbody>
            <tr>
              <td class="label-cell">患者编号：</td>
              <td class="value-cell">{{ plan.patientId }}</td>
              <td class="label-cell">随访日期：</td>
              <td class="value-cell">{{ plan.nextFollowupDate }}</td>
            </tr>
            <tr>
              <td class="label-cell">姓名：</td>
              <td class="value-cell">{{ plan.patientName }}</td>
              <td class="label-cell">随访时间：</td>
              <td class="value-cell">{{ plan.followupTime }}</td>
            </tr>
            <tr>
              <td class="label-cell">年龄：</td>
              <td class="value-cell">{{ plan.patient?.age }}</td>
              <td class="label-cell">随访医生：</td>
              <td class="value-cell">{{ plan.responsiblePerson }}</td>
            </tr>
            <tr>
              <td class="label-cell">性别：</td>
              <td class="value-cell">{{ plan.patient?.gender }}</td>
              <td class="label-cell">备注：</td>
              <td class="value-cell">{{ plan.remarks || '无' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card-image">
        <div class="patient-avatar">
          <!-- 改为直接使用内联SVG或者FontAwesome图标 -->
          <div class="avatar-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card-actions">
      <button class="action-button edit-button" @click="$emit('edit', plan)">修改</button>
      <button class="action-button delete-button" @click="$emit('delete', plan)">删除</button>
    </div>
    
    <div v-if="plan.status === 'completed'" class="status-badge completed">已完成</div>
    <div v-else-if="isUpcoming" class="status-badge upcoming">即将到期</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { FollowupPlan } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'FollowupPlanCard',
  props: {
    plan: {
      type: Object as PropType<FollowupPlan>,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  setup(props) {
    // 计算随访计划是否即将到期（3天内）
    const isUpcoming = computed(() => {
      const today = new Date();
      const followupDate = new Date(props.plan.nextFollowupDate);
      const diffTime = followupDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    });
    
    return {
      isUpcoming
    };
  }
});
</script>

<style scoped>

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbb;
}

.followup-plan-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  position: relative;
  transition: all 0.3s;
  border-left: 4px solid #1890ff;
}

.followup-plan-card.completed {
  border-left-color: #52c41a;
  opacity: 0.8;
}

.card-content {
  display: flex;
}

.info-table {
  flex-grow: 1;
}

.info-table table {
  width: 100%;
  border-collapse: collapse;
}

.label-cell {
  width: 100px;
  font-weight: 500;
  color: #333;
  padding: 8px 0;
}

.value-cell {
  padding: 8px;
  color: #666;
}

.card-image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 130px;
  height: 170px;
}

.patient-avatar {
  width: 130px;
  height: 170px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
  padding-right: 150px;
}

.action-button {
  padding: 4px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-button {
  background-color: #1890ff;
  color: white;
}

.edit-button:hover {
  background-color: #40a9ff;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}

.delete-button:hover {
  background-color: #ff7875;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: white;
}

.status-badge.completed {
  background-color: #52c41a;
}

.status-badge.upcoming {
  background-color: #faad14;
}
</style>