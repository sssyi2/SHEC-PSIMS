<template>
  <div class="stats-cards">
    <div class="stats-card" v-for="(card, index) in cards" :key="index">
      <h3 class="card-title">{{ card.title }}</h3>
      <div class="card-value">{{ card.value }}</div>
      <div class="card-trend" v-if="card.trend" :class="card.trend.type">
        {{ card.trend.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'StatsCards',
  setup() {
    const cards = reactive([
      { 
        title: '在院患者', 
        value: '127', 
        trend: { 
          text: '较昨日 ↑3%', 
          type: 'up' 
        } 
      },
      { 
        title: '预警数量', 
        value: '30', 
        trend: null
      },
      { 
        title: '随访完成率', 
        value: '80%', 
        trend: null
      }
    ])
    
    return { cards }
  }
})
</script>

<style scoped>
.stats-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stats-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  min-width: 200px;
}

.card-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #666;
  font-weight: normal;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-trend {
  font-size: 14px;
}

.card-trend.up {
  color: #52c41a;
}

.card-trend.down {
  color: #f5222d;
}

@media (max-width: 768px) {
  .stats-cards {
    flex-direction: column;
  }
}
</style>