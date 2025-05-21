<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\elderlyhealth\HealthSidebar.vue -->
<template>
  <aside class="health-sidebar">
    <div class="sidebar-title">健康档案管理</div>
    
    <div class="sidebar-menu">
      <router-link to="/health-records" class="menu-item" :class="{ active: activeMenu === 'health-records' }">
        健康档案
      </router-link>
      
      <router-link to="/electronic-medical-records" class="menu-item" :class="{ active: activeMenu === 'electronic-medical-records' }">
        电子病历
      </router-link>
      
      <router-link to="/medical-advice" class="menu-item" :class="{ active: activeMenu === 'medical-advice' }">
        医嘱信息
      </router-link>
      
      <router-link to="/emergency-contacts" class="menu-item" :class="{ active: activeMenu === 'emergency-contacts' }">
        紧急联系人
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HealthSidebar',
  props: {
    activeMenu: {
      type: String,
      default: 'health-records'
    }
  }
})
</script>

<style scoped>
.health-sidebar {
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