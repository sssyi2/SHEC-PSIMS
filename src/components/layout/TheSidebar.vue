<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <router-link 
        v-for="(item, index) in menuItems" 
        :key="index"
        :to="item.route"
        custom
        v-slot="{ navigate, isActive }">
        <div 
          class="menu-item" 
          :class="{ active: isActive }"
          @click="handleMenuClick(index, navigate)">
          {{ item.label }}
        </div>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TheSidebar',
  emits: ['menuChange'],
  setup(_, { emit }) {
    const router = useRouter()
    const currentIndex = ref(0)
    
    const menuItems = [
      { label: '数据分析仪表盘', route: '/data-analysis' },
      { label: '数据趋势预测', route: '/data-trend' },
      { label: '医疗资源分配建议', route: '/resource-advice' }
    ]
    
    // 根据当前路由设置初始选中项
    const initActiveItem = () => {
      const currentPath = router.currentRoute.value.path
      const foundIndex = menuItems.findIndex(item => currentPath.startsWith(item.route))
      if (foundIndex >= 0) {
        currentIndex.value = foundIndex
      }
    }
    
    // 在组件挂载后初始化选中项
    initActiveItem()
    
    const handleMenuClick = (index: number, navigate: Function) => {
      currentIndex.value = index
      emit('menuChange', menuItems[index])
      navigate()  // 执行路由导航
    }
    
    return {
      menuItems,
      currentIndex,
      handleMenuClick
    }
  }
})
</script>

<style scoped>
.sidebar {
  width: 230px;
  background-color: #f3f4f6;
  height: 100%;
  position: fixed;
  top: 73px;
  left: 0;
  z-index: 90;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-content {
  padding: 20px 0;
}

.menu-item {
  padding: 15px 20px;
  cursor: pointer;
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