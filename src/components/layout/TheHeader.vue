<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-area">
        <h1 class="system-name">智慧医养医生服务智能管理系统</h1>
        <div class="system-subtitle">SHEC-PSIMS</div>
      </div>
      
      <nav class="main-nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/health-records" class="nav-item">健康档案管理</router-link>
        <router-link to="/warning-settings" class="nav-item">健康预警与随访管理</router-link>
        <router-link to="/data-analysis" class="nav-item">数据分析</router-link>
        <router-link to="/health-consultation" class="nav-item">健康咨询</router-link>
        <router-link to="/personal-center" class="nav-item">个人中心</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeader'
})
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 73px;
}

.logo-area {
  display: flex;
  flex-direction: column;
}

.system-name {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.system-subtitle {
  font-size: 14px;
  color: #666;
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover, .router-link-active {
  background-color: #f0f0f0;
  color: #2c8ce3;
}
</style>