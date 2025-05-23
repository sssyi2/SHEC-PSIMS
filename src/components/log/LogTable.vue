<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\log\LogTable.vue -->
<template>
  <div class="log-table-container">
    <table class="log-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>时间</th>
          <th>用户</th>
          <th>操作</th>
          <th>详情</th>
          <th>IP地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id">
          <td>{{ log.id }}</td>
          <td>{{ log.timestamp }}</td>
          <td>{{ log.user }}</td>
          <td>{{ log.action }}</td>
          <td class="message-cell">{{ log.message }}</td>
          <td>{{ log.ip }}</td>
          <td class="actions-cell">
            <button class="view-btn" @click="$emit('view-log', log)">查看详情</button>
          </td>
        </tr>
        <tr v-if="logs.length === 0">
          <td colspan="7" class="no-data">暂无日志数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { LogEntry } from '@/types/log.ts';

export default defineComponent({
  name: 'LogTable',
  props: {
    logs: {
      type: Array as PropType<LogEntry[]>,
      required: true
    }
  },
  emits: ['view-log']
});
</script>

<style scoped>
.log-table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
}

.log-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.log-table th,
.log-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.log-table th {
  background-color: #fafafa;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.log-table tr:hover {
  background-color: #fafafa;
}

.log-table tr:last-child td {
  border-bottom: none;
}

.message-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions-cell {
  white-space: nowrap;
}

.view-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #1890ff;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.view-btn:hover {
  background-color: #e6f7ff;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 24px;
}
</style>