<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\UserTable.vue -->
<template>
  <div class="user-table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>序号</th>
          <th>用户名</th>
          <th>密码</th>
          <th>姓名</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.name }}</td>
          <td class="actions-cell">
            <button class="edit-btn" @click="$emit('edit-user', user)">修改</button>
            <button class="delete-btn" @click="$emit('delete-user', user.id)">删除</button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="5" class="no-data">暂无用户数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { User } from '@/types/user.ts';

export default defineComponent({
  name: 'UserTable',
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true
    }
  },
  emits: ['edit-user', 'delete-user']
});
</script>

<style scoped>
.user-table-container {
  width: 100%;
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.user-table th,
.user-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.user-table th {
  background-color: #fafafa;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.user-table tr:last-child td {
  border-bottom: none;
}

.actions-cell {
  white-space: nowrap;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.edit-btn {
  color: #1890ff;
}

.delete-btn {
  color: #f5222d;
}

.edit-btn:hover {
  background-color: #e6f7ff;
}

.delete-btn:hover {
  background-color: #fff1f0;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 24px;
}
</style>