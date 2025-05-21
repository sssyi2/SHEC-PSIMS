<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\HealthWarningSidebar.vue -->
<template>
  <aside class="health-warning-sidebar">
    <div class="sidebar-title">健康预警与随访管理</div>
    
    <div class="sidebar-menu">
      <router-link to="/warning-settings" class="menu-item" :class="{ active: activeMenu === 'warning-settings' }">
        预警提醒设置
      </router-link>
      
      <router-link to="/warning-information" class="menu-item" :class="{ active: activeMenu === 'warning-information' }">
        预警信息
      </router-link>
      
      <router-link to="/followup-plan" class="menu-item" :class="{ active: activeMenu === 'followup-plan' }">
        随访计划
      </router-link>
      
      <router-link to="/followup-record" class="menu-item" :class="{ active: activeMenu === 'followup-record' }">
        随访干预记录
      </router-link>
      
      <router-link to="/followup-report" class="menu-item" :class="{ active: activeMenu === 'followup-report' }">
        随访工作报告
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HealthWarningSidebar',
  props: {
    activeMenu: {
      type: String,
      default: 'warning-settings'
    }
  }
})
</script>

<style scoped>
.health-warning-sidebar {
  width: 230px;
  background-color: #f3f4f6;
  height: 100%;
  position: fixed;
  top: 73px;
  left: 0;
  z-index: 90;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  padding: 20px;
  background-color: #dfdfdf;
}

.sidebar-menu {
  padding: 20px 0;
}

.menu-item {
  display: block;
  padding: 15px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #e6e8eb;
}

.menu-item.active {
  background-color: #2c8ce3;
  color: white;
}
</style>