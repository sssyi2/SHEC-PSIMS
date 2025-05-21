<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\home\FeatureCard.vue -->
<template>
  <div class="feature-card" @click="$emit('click')">
    <div class="card-icon">
      <component :is="iconComponent" v-if="iconComponent" />
      <div class="icon-placeholder" v-else>
        <img :src="getIconUrl()" alt="功能图标" v-if="icon" />
        <div class="default-icon" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="card-title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

// 导入图标组件
import HealthRecordsIcon from '@/components/icons/HealthRecordsIcon.vue';
import HealthWarningIcon from '@/components/icons/HealthWarningIcon.vue';
import HealthConsultationIcon from '@/components/icons/HealthConsultationIcon.vue';
import DataAnalysisIcon from '@/components/icons/DataAnalysisIcon.vue';

export default defineComponent({
  name: 'FeatureCard',
  components: {
    HealthRecordsIcon,
    HealthWarningIcon,
    HealthConsultationIcon,
    DataAnalysisIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    route: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props) {
    // 根据传入的icon名称确定使用哪个组件
    const iconComponent = computed(() => {
      switch (props.icon) {
        case 'health-records':
          return 'HealthRecordsIcon';
        case 'health-warning':
          return 'HealthWarningIcon';
        case 'health-consultation':
          return 'HealthConsultationIcon';
        case 'data-analysis':
          return 'DataAnalysisIcon';
        default:
          return null;
      }
    });
    
    // 获取图标URL
    const getIconUrl = () => {
      try {
        return new URL(`../../assets/icons/${props.icon}.svg`, import.meta.url).href;
      } catch (error) {
        console.error('Icon not found:', error);
        return '';
      }
    };
    
    return {
      iconComponent,
      getIconUrl
    };
  }
});
</script>

<style scoped>
.feature-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890ff;
}

.default-icon {
  width: 40px;
  height: 40px;
  color: #1890ff;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}
</style>