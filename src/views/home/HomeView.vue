<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\home\HomeView.vue -->
<template>
  <div class="home-view">
    <TheHeader :active="'home'" />
    
    <div class="main-content">
      <div class="feature-cards">
        <FeatureCard 
          v-for="feature in features" 
          :key="feature.id"
          :title="feature.title"
          :icon="feature.icon"
          :route="feature.route"
          @click="navigateTo(feature.route)"
        />
      </div>
      
      <div class="dashboard-container">
        <div class="dashboard-row">
          <RecentActivitiesPanel class="dashboard-panel" />
          <UpcomingFollowupsPanel class="dashboard-panel" />
        </div>
        <div class="dashboard-row">
          <HealthStatisticsPanel class="dashboard-panel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from '@/components/layout/TheHeader.vue';
import FeatureCard from '@/components/home/FeatureCard.vue';
import RecentActivitiesPanel from '@/components/home/RecentActivitiesPanel.vue';
import UpcomingFollowupsPanel from '@/components/home/UpcomingFollowupsPanel.vue';
import HealthStatisticsPanel from '@/components/home/HealthStatisticsPanel.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TheHeader,
    FeatureCard,
    RecentActivitiesPanel,
    UpcomingFollowupsPanel,
    HealthStatisticsPanel
  },
  setup() {
    const router = useRouter();
    
    const features = reactive([
      { 
        id: 1, 
        title: '老人健康档案管理', 
        icon: 'health-records', 
        route: '/health-records' 
      },
      { 
        id: 2, 
        title: '健康预警与随访管理', 
        icon: 'health-warning', 
        route: '/health-consultation' 
      },
      { 
        id: 3, 
        title: '健康咨询与互动', 
        icon: 'health-consultation', 
        route: '/health-consultation' 
      },
      { 
        id: 4, 
        title: '数据分析', 
        icon: 'data-analysis', 
        route: '/data-analysis' 
      }
    ]);
    
    const navigateTo = (route: string) => {
      router.push(route);
    };
    
    return {
      features,
      navigateTo
    };
  }
});
</script>

<style scoped>
.home-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-top: 73px; /* 顶部导航高度 */
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-row {
  display: flex;
  gap: 20px;
}

.dashboard-panel {
  flex: 1;
  min-width: 0; /* 防止面板溢出 */
}

@media (max-width: 768px) {
  .dashboard-row {
    flex-direction: column;
  }
}
</style>