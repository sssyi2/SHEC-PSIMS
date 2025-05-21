<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\UserSidebar.vue -->
<template>
  <aside class="user-sidebar">
    <div class="user-info">
      <div class="avatar">
        <div class="avatar-circle"></div>
      </div>
      <div class="username">{{ username }}</div>
    </div>
    
    <div class="sidebar-title">用户中心</div>
    
    <div class="sidebar-menu">
      <div 
        v-for="(item, index) in menuItems" 
        :key="index" 
        class="menu-item"
        :class="{ active: activeMenu === item.key }"
        @click="selectMenu(item.key)">
        {{ item.label }}
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UserSidebar',
  props: {
    activeMenu: {
      type: String,
      default: 'profile'
    }
  },
  emits: ['menu-change'],
  setup(props, { emit }) {
    const username = ref('uersname')
    
    const menuItems = [
      { key: 'profile', label: '账号基础信息' },
      { key: 'password', label: '修改密码' },
      { key: 'logout', label: '退出登录' },
      { key: 'delete', label: '注销账户' },
      { key: 'service', label: '联系客服' },
      { key: 'points', label: '积分管理' }
    ]
    
    const selectMenu = (key: string) => {
      emit('menu-change', key)
      
      // 如果是退出登录，执行特殊处理
      if (key === 'logout') {
        handleLogout()
      }
      
      // 如果是注销账户，执行特殊处理
      if (key === 'delete') {
        handleDeleteAccount()
      }
    }
    
    const handleLogout = () => {
      if (confirm('确定要退出登录吗？')) {
        // 实际应用中应该清除token，并跳转到登录页
        console.log('用户退出登录')
        localStorage.removeItem('user-token')
        window.location.href = '/login'
      }
    }
    
    const handleDeleteAccount = () => {
      if (confirm('确定要注销账户吗？此操作不可逆！')) {
        // 实际应用中应该调用注销账户API
        console.log('用户请求注销账户')
        alert('已提交注销请求，请等待审核')
      }
    }
    
    return {
      username,
      menuItems,
      selectMenu
    }
  }
})
</script>

<style scoped>
.user-sidebar {
  width: 230px;
  background-color: #fff;
  height: 100%;
  position: fixed;
  top: 73px;
  left: 0;
  z-index: 90;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.user-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.avatar-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #dddddd;
}

.username {
  font-size: 16px;
  color: #333;
  margin-top: 10px;
}

.sidebar-title {
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  background-color: #f9f9f9;
}

.sidebar-menu {
  padding: 10px 0;
}

.menu-item {
  padding: 12px 20px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border-right: 3px solid #1890ff;
}
</style>