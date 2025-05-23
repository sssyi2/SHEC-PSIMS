<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\AdminSidebar.vue -->
<template>
  <div class="admin-sidebar">
    <div class="sidebar-header">
      <div class="admin-info">
        <div class="admin-avatar">
          <i class="admin-icon"></i>
        </div>
        <div class="admin-details">
          <p class="admin-role">管理员身份</p>
          <p class="admin-email">{{ adminEmail }}</p>
        </div>
      </div>
    </div>
    
    <div class="sidebar-menu">
      <div 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'permissions' }"
        @click="navigateTo('/user/permissions')"
      >
        <i class="icon icon-permissions"></i>
        <span class="item-text">用户权限管理</span>
      </div>
      
      <div 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'logs' }"
        @click="navigateTo('/user/logs')"
      >
        <i class="icon icon-logs"></i>
        <span class="item-text">日志查看</span>
      </div>
      
      <div 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'feedback' }"
        @click="navigateTo('/user/feedback')"
      >
        <i class="icon icon-feedback"></i>
        <span class="item-text">查看反馈</span>
      </div>
      
      <div 
        class="menu-item" 
        @click="handleLogout"
      >
        <i class="icon icon-logout"></i>
        <span class="item-text">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth/auth';

export default defineComponent({
  name: 'AdminSidebar',
  props: {
    activeMenu: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const adminEmail = ref('AxureUX@qq.com'); // 示例邮箱，实际应从用户信息中获取
    
    const navigateTo = (path: string) => {
      router.push(path);
    };
    
    const handleLogout = () => {
      authStore.logout();
      router.push('/login');
    };
    
    return {
      adminEmail,
      navigateTo,
      handleLogout
    };
  }
});
</script>

<style scoped>
.admin-sidebar {
  width: 230px;
  height: 100vh;
  background-color: #001529;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 73px; /* 顶部导航高度 */
  color: #fff;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-info {
  display: flex;
  align-items: center;
}

.admin-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.admin-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.admin-details {
  flex: 1;
}

.admin-role {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 5px 0;
}

.admin-email {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

.sidebar-menu {
  padding: 15px 0;
}

.menu-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: #1890ff;
}

.icon {
  margin-right: 10px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-permissions {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z' fill='white'/%3E%3C/svg%3E");
}

.icon-logs {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3zm-1-5v2a1 1 0 0 0 2 0v-2h-2zm-2 3V4H4v15a1 1 0 0 0 1 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z' fill='white'/%3E%3C/svg%3E");
}

.icon-feedback {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zm5.53-4.879l4.243-4.242 1.414 1.414-5.657 5.657-3.89-3.89 1.415-1.414 2.475 2.475z' fill='white'/%3E%3C/svg%3E");
}

.icon-logout {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5zm10-6l5-4-5-4v3H9v2h6v3z' fill='white'/%3E%3C/svg%3E");
}

.item-text {
  font-size: 14px;
}

@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 990;
  }
  
  .admin-sidebar.open {
    transform: translateX(0);
  }
}
</style>