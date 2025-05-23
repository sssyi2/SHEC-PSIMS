<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\user\PermissionsManageView.vue -->
<template>
  <div class="permissions-manage-view">
    <TheHeader active-menu="user-management" />
    
    <div class="main-content">
      <AdminSidebar active-menu="permissions" />
      
      <div class="content-area">
        <h1 class="page-title">用户权限管理</h1>
        
        <div class="actions-bar">
          <button class="add-user-btn" @click="showAddUserDialog">
            <i class="icon-add"></i>添加用户
          </button>
          <div class="search-container">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索用户..." 
              class="search-input"
            />
            <button class="search-button">
              <i class="icon-search"></i>
            </button>
          </div>
        </div>
        
        <UserTable 
          :users="filteredUsers"
          @edit-user="handleEditUser"
          @delete-user="handleDeleteUser"
        />
        
        <PaginationControl 
          :total="totalUsers"
          :current-page="currentPage"
          :page-size="pageSize"
          @page-change="handlePageChange"
        />
      </div>
    </div>
    
    <!-- 用户表单对话框 -->
    <UserFormDialog 
      v-if="showUserDialog"
      :user="selectedUser"
      :is-edit="isEditMode"
      @save="handleSaveUser"
      @cancel="closeUserDialog"
    />
    
    <!-- 确认删除对话框 -->
    <ConfirmDialog
      v-if="showDeleteConfirm"
      title="确认删除"
      message="确定要删除该用户吗？此操作无法撤销。"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import TheHeader from '@/components/layout/TheHeader3.vue';
import AdminSidebar from '@/components/user/AdminSidebar.vue';
import UserTable from '@/components/user/UserTable.vue';
import PaginationControl from '@/components/common/PaginationControl.vue';
import UserFormDialog from '@/components/user/UserFormDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import { useUserStore } from '@/store/user';
import type { User } from '@/types/user.ts';

export default defineComponent({
  name: 'PermissionsManageView',
  components: {
    TheHeader,
    AdminSidebar,
    UserTable,
    PaginationControl,
    UserFormDialog,
    ConfirmDialog,
  },
  setup() {
    const userStore = useUserStore();
    
    const users = ref<User[]>([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalUsers = ref(0);
    
    // 用户表单对话框状态
    const showUserDialog = ref(false);
    const selectedUser = ref<User | null>(null);
    const isEditMode = ref(false);
    
    // 删除确认对话框状态
    const showDeleteConfirm = ref(false);
    const userToDelete = ref<number | null>(null);
    
    // 根据搜索条件过滤用户
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      
      const query = searchQuery.value.toLowerCase();
      return users.value.filter(user => 
        user.username.toLowerCase().includes(query) || 
        user.name.toLowerCase().includes(query)
      );
    });
    
    // 获取用户数据
    const fetchUsers = async () => {
      try {
        // 在实际应用中应该调用API或store的action
        // await userStore.fetchUsers();
        // users.value = userStore.users;
        
        // 模拟数据
        users.value = [
          { id: 1, username: 'test', password: '******', name: '系统管理员', role: 'admin' },
          { id: 2, username: 'admin', password: '******', name: '医生', role: 'doctor' },
          { id: 3, username: 'zhangsan', password: '******', name: '病人', role: 'patient' },
          { id: 4, username: 'lisi', password: '******', name: '病人', role: 'patient' }
        ];
        
        totalUsers.value = users.value.length;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    // 显示添加用户对话框
    const showAddUserDialog = () => {
      selectedUser.value = {
        id: 0,
        username: '',
        password: '',
        name: '',
        role: 'patient'
      };
      isEditMode.value = false;
      showUserDialog.value = true;
    };
    
    // 处理编辑用户
    const handleEditUser = (user: User) => {
      selectedUser.value = { ...user };
      isEditMode.value = true;
      showUserDialog.value = true;
    };
    
    // 处理删除用户
    const handleDeleteUser = (userId: number) => {
      userToDelete.value = userId;
      showDeleteConfirm.value = true;
    };
    
    // 确认删除用户
    const confirmDelete = async () => {
      if (userToDelete.value) {
        try {
          // 在实际应用中应该调用API或store的action
          // await userStore.deleteUser(userToDelete.value);
          
          // 模拟删除
          users.value = users.value.filter(user => user.id !== userToDelete.value);
          totalUsers.value = users.value.length;
          
          // 关闭确认对话框
          showDeleteConfirm.value = false;
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    };
    
    // 取消删除
    const cancelDelete = () => {
      showDeleteConfirm.value = false;
      userToDelete.value = null;
    };
    
    // 处理保存用户
    const handleSaveUser = async (user: User) => {
      try {
        if (isEditMode.value) {
          // 更新现有用户
          // await userStore.updateUser(user);
          
          // 模拟更新
          const index = users.value.findIndex(u => u.id === user.id);
          if (index !== -1) {
            users.value[index] = { ...user };
          }
        } else {
          // 添加新用户
          // await userStore.addUser(user);
          
          // 模拟添加
          const newUser = {
            ...user,
            id: Math.max(...users.value.map(u => u.id)) + 1
          };
          users.value.push(newUser);
          totalUsers.value = users.value.length;
        }
        
        // 关闭对话框
        closeUserDialog();
      } catch (error) {
        console.error('Error saving user:', error);
      }
    };
    
    // 关闭用户对话框
    const closeUserDialog = () => {
      showUserDialog.value = false;
      selectedUser.value = null;
    };
    
    // 处理分页变化
    const handlePageChange = (page: number) => {
      currentPage.value = page;
      // 在实际应用中，这里应该根据页码获取对应的用户数据
    };
    
    // 组件挂载时获取用户数据
    onMounted(() => {
      fetchUsers();
    });
    
    return {
      users,
      filteredUsers,
      searchQuery,
      currentPage,
      pageSize,
      totalUsers,
      showUserDialog,
      selectedUser,
      isEditMode,
      showDeleteConfirm,
      showAddUserDialog,
      handleEditUser,
      handleDeleteUser,
      handleSaveUser,
      closeUserDialog,
      confirmDelete,
      cancelDelete,
      handlePageChange
    };
  }
});
</script>

<style scoped>
.permissions-manage-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  padding: 24px;
}

.page-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 24px;
  font-weight: 500;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.add-user-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-user-btn:hover {
  background-color: #40a9ff;
}

.icon-add {
  margin-right: 5px;
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.search-container {
  display: flex;
  max-width: 300px;
  width: 100%;
}

.search-input {
  flex-grow: 1;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-right: none;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-button {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
}

.icon-search {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617z' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }
  
  .actions-bar {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-container {
    max-width: 100%;
  }
}
</style>