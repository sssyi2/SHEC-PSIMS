<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientSidebar.vue -->
<template>
  <div class="patient-sidebar" :class="{ 'open': isSidebarOpen }">
    <div class="sidebar-header">
      <div class="patient-info">
        <div class="patient-avatar">
          <img v-if="avatarUrl" :src="avatarUrl" alt="用户头像" />
          <div v-else class="avatar-placeholder">{{ avatarPlaceholder }}</div>
        </div>
        <div class="patient-details">
          <p class="patient-name">{{ patientName }}</p>
          <p class="patient-id">ID: {{ patientId }}</p>
        </div>
      </div>
    </div>
    
    <div class="sidebar-title">用户中心</div>
    
    <div class="sidebar-menu">
      <router-link 
        to="/patient-personal-center/basic-info" 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'basic-info' }"
      >
        <i class="icon icon-profile"></i>
        <span>账号基础信息</span>
      </router-link>
      
      <router-link 
        to="/patient-personal-center/change-password" 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'change-password' }"
      >
        <i class="icon icon-password"></i>
        <span>修改密码</span>
      </router-link>
      
      <router-link 
        to="/patient-personal-center/points" 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'points' }"
      >
        <i class="icon icon-points"></i>
        <span>积分管理</span>
      </router-link>
      
      <router-link 
        to="/patient-personal-center/contact-support" 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'contact-support' }"
      >
        <i class="icon icon-support"></i>
        <span>联系客服</span>
      </router-link>
      
      <router-link 
        to="/logout" 
        class="menu-item"
      >
        <i class="icon icon-logout"></i>
        <span>退出登录</span>
      </router-link>
      
      <router-link 
        to="/patient-personal-center/delete-account" 
        class="menu-item danger" 
        :class="{ 'active': activeMenu === 'delete-account' }"
      >
        <i class="icon icon-delete"></i>
        <span>注销账户</span>
      </router-link>
    </div>
    
    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="icon" :class="isSidebarOpen ? 'icon-close' : 'icon-menu'"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'PatientSidebar',
  props: {
    activeMenu: {
      type: String,
      default: 'basic-info'
    }
  },
  setup() {
    const userStore = useUserStore();
    
    // 移动端侧边栏状态
    const isSidebarOpen = ref(false);
    
    // 用户信息
    const patientName = ref('张涛');
    const patientId = ref('P1001');
    const avatarUrl = ref('');
    
    // 如果没有头像，显示名字首字母
    const avatarPlaceholder = computed(() => {
      if (patientName.value) {
        return patientName.value.charAt(0);
      }
      return 'P';
    });
    
    // 切换侧边栏显示（移动端）
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };
    
    return {
      patientName,
      patientId,
      avatarUrl,
      avatarPlaceholder,
      isSidebarOpen,
      toggleSidebar
    };
  }
});
</script>

<style scoped>
.patient-sidebar {
  width: 230px;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 73px; /* 顶部导航高度 */
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  z-index: 900;
  transition: all 0.3s;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.patient-info {
  display: flex;
  align-items: center;
}

.patient-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  background-color: #f5f5f5;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  background-color: #1890ff;
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-details {
  flex: 1;
}

.patient-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 5px 0;
}

.patient-id {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.sidebar-title {
  padding: 15px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #999;
}

.sidebar-menu {
  padding: 0 0 20px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  color: #1890ff;
  background-color: #e6f7ff;
  border-right: 3px solid #1890ff;
}

.menu-item.danger {
  color: #ff4d4f;
}

.menu-item.danger:hover {
  background-color: #fff1f0;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-profile {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='currentColor'/%3E%3C/svg%3E");
}

.icon-password {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-2 0V7a4 4 0 1 0-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z' fill='currentColor'/%3E%3C/svg%3E");
}

.icon-points {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5v-1h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z' fill='currentColor'/%3E%3C/svg%3E");
}

.icon-support {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19.938 8H21a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1.062A8.001 8.001 0 0 1 12 2a8.001 8.001 0 0 1 7.938 6zM3 10v10h18V10H3zm10-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-4 5v2h8v-2H9zm0 4v2h8v-2H9z' fill='currentColor'/%3E%3C/svg%3E");
}

.icon-logout {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5zm10-6l5-4-5-4v3H9v2h6v3z' fill='currentColor'/%3E%3C/svg%3E");
}

.icon-delete {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z' fill='%23ff4d4f'/%3E%3C/svg%3E");
}

.toggle-sidebar {
  display: none;
  position: fixed;
  top: 80px;
  left: 230px;
  width: 32px;
  height: 32px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  z-index: 901;
}

@media (max-width: 768px) {
  .patient-sidebar {
    transform: translateX(-100%);
  }
  
  .patient-sidebar.open {
    transform: translateX(0);
  }
  
  .toggle-sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
  }
  
  .patient-sidebar.open .toggle-sidebar {
    left: 230px;
  }
  
  .icon-menu {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z' fill='currentColor'/%3E%3C/svg%3E");
  }
  
  .icon-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' fill='currentColor'/%3E%3C/svg%3E");
  }
}
</style>