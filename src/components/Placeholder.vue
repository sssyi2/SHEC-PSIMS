<template>
  <div class="placeholder-view">
    <TheHeader />
    
    <div class="content">
      <h1>{{ title }}</h1>
      <p>此页面正在开发中...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'

export default defineComponent({
  name: 'PlaceholderView',
  components: {
    TheHeader
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.placeholder-view {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.content {
  padding: 100px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

p {
  color: #666;
  font-size: 18px;
}
</style>