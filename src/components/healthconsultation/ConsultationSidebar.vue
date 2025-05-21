<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\consultation\ConsultationSidebar.vue -->
<template>
  <div class="consultation-sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">欢迎进入<br>健康咨询！</h2>
    </div>
    
    <div class="sidebar-menu">
      <div 
        class="menu-item" 
        :class="{ 'active': activeMenu === 'consultation-service' }"
        @click="navigateTo('consultation-service')"
      >
        <span class="item-text">健康咨询服务</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ConsultationSidebar',
  props: {
    activeMenu: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup() {
    const router = useRouter();
    
    const navigateTo = (menu: string) => {
      switch (menu) {
        case 'consultation-service':
          router.push('/consultation');
          break;
        default:
          break;
      }
    };
    
    return {
      navigateTo
    };
  }
});
</script>

<style scoped>
.consultation-sidebar {
  width: 230px;
  height: 100vh;
  background-color: #001529;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 73px; /* 顶部导航高度 */
  color: #fff;
}

.sidebar-header {
  padding: 20px;
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 20px;
  margin: 0;
  line-height: 1.4;
}

.sidebar-menu {
  padding: 0 10px;
}

.menu-item {
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: #1890ff;
}

.item-text {
  font-size: 14px;
}

@media (max-width: 768px) {
  .consultation-sidebar {
    display: none;
  }
}
</style>