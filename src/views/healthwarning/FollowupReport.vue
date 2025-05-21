<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\healthwarning\FollowupReport.vue -->
<template>
  <div class="followup-report">
    <TheHeader />
    
    <div class="main-container">
      <HealthWarningSidebar :active-menu="'followup-report'" />
      
      <div class="content-area">
        <div class="page-header">
          <h1 class="page-title">随访工作报告</h1>
          
          <div class="date-filter">
            <date-range-picker
              v-model="dateRange"
              @update:date-range="handleDateRangeChange"
              :ranges="predefinedRanges"
            />
          </div>
        </div>
        
        <div class="report-container">
          <report-tab-panel
            :active-tab="activeTab"
            @tab-change="handleTabChange"
          />
          
          <!-- 随访方式统计面板 -->
          <div v-show="activeTab === 'method'" class="report-panel">
            <FollowupMethodStatPanel
              :method-stats="methodStats"
              :total-followups="totalFollowups"
              :loading="loading"
            />
          </div>
          
          <!-- 月度统计面板 -->
          <div v-show="activeTab === 'month'" class="report-panel">
            <FollowupMonthlyStatPanel
              :monthly-stats="monthlyStats"
              :loading="loading"
            />
          </div>
          
          <!-- 疾病分类统计面板 -->
          <div v-show="activeTab === 'disease'" class="report-panel">
            <FollowupDiseaseStatPanel
              :disease-stats="diseaseStats"
              :loading="loading"
            />
          </div>
          
          <!-- 时间段统计面板 -->
          <div v-show="activeTab === 'time'" class="report-panel">
            <FollowupTimeStatPanel
              :time-stats="timeStats"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import HealthWarningSidebar from '@/components/healthwarning/HealthWarningSidebar.vue'
import DateRangePicker from '@/components/common/DateRangePicker.vue'
import ReportTabPanel from '@/components/healthwarning/ReportTabPanel.vue'
import FollowupMethodStatPanel from '@/components/healthwarning/FollowupMethodStatPanel.vue'
import FollowupMonthlyStatPanel from '@/components/healthwarning/FollowupMonthlyStatPanel.vue'
import FollowupDiseaseStatPanel from '@/components/healthwarning/FollowupDiseaseStatPanel.vue'
import FollowupTimeStatPanel from '@/components/healthwarning/FollowupTimeStatPanel.vue'


export default defineComponent({
  name: 'FollowupReport',
  components: {
    TheHeader,
    HealthWarningSidebar,
    DateRangePicker,
    ReportTabPanel,
    FollowupMethodStatPanel,
    FollowupMonthlyStatPanel,
    FollowupDiseaseStatPanel,
    FollowupTimeStatPanel
  },
  setup() {
    const loading = ref(true);
    
    // 活跃标签页
    const activeTab = ref('method');
    
    // 日期范围
    const dateRange = ref({
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date()
    });
    
    // 预定义日期范围
    const predefinedRanges = reactive({
      '今日': [new Date(), new Date()],
      '本周': [
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
        new Date()
      ],
      '本月': [
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        new Date()
      ],
      '今年': [
        new Date(new Date().getFullYear(), 0, 1),
        new Date()
      ]
    });
    
    // 随访方式统计数据
    const methodStats = ref([
      { name: '电话随访', value: 158 },
      { name: '门诊随访', value: 89 },
      { name: '家庭访视', value: 42 },
      { name: '视频随访', value: 36 },
      { name: '其他方式', value: 15 }
    ]);
    
    // 随访月度统计数据
    const monthlyStats = ref([
      { month: '1月', value: 12 },
      { month: '2月', value: 15 },
      { month: '3月', value: 21 },
      { month: '4月', value: 25 },
      { month: '5月', value: 32 },
      { month: '6月', value: 28 },
      { month: '7月', value: 35 },
      { month: '8月', value: 40 },
      { month: '9月', value: 37 },
      { month: '10月', value: 45 },
      { month: '11月', value: 43 },
      { month: '12月', value: 38 }
    ]);
    
    // 疾病分类统计数据
    const diseaseStats = ref([
      { name: '内科', value: 145 },
      { name: '外科', value: 68 },
      { name: '妇产科', value: 42 },
      { name: '儿科', value: 35 },
      { name: '眼科', value: 20 },
      { name: '口腔科', value: 15 },
      { name: '耳鼻喉科', value: 12 },
      { name: '精神科', value: 8 },
      { name: '其他', value: 5 }
    ]);
    
    // 时间段统计数据
    const timeStats = ref([
      { name: '上午 (8:00-12:00)', value: 180 },
      { name: '下午 (12:00-18:00)', value: 125 },
      { name: '晚间 (18:00-22:00)', value: 45 }
    ]);
    
    // 总随访次数
    const totalFollowups = ref(350);
    
    // 切换标签页
    const handleTabChange = (tab: string) => {
      activeTab.value = tab;
    };
    
    // 处理日期范围变更
    const handleDateRangeChange = async () => {
      loading.value = true;
      
      try {
        // 这里调用API获取新的统计数据
        const result = await fetchStatisticsData();
        updateStatistics(result);
        loading.value = false;
      } catch (error) {
        console.error('获取统计数据失败:', error);
        loading.value = false;
      }
    };
    
    // 模拟获取统计数据
    const fetchStatisticsData = async () => {
      // 在实际应用中，这里应该调用真实API获取数据
      // 例如: const result = await fetchFollowupStatistics(dateRange.value.startDate, dateRange.value.endDate);
      
      // 为演示模拟异步调用
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            methodStats: [
              { name: '电话随访', value: Math.floor(Math.random() * 200) + 100 },
              { name: '门诊随访', value: Math.floor(Math.random() * 100) + 50 },
              { name: '家庭访视', value: Math.floor(Math.random() * 50) + 30 },
              { name: '视频随访', value: Math.floor(Math.random() * 40) + 20 },
              { name: '其他方式', value: Math.floor(Math.random() * 20) + 10 }
            ],
            monthlyStats: Array(12).fill(0).map((_, index) => ({
              month: `${index + 1}月`,
              value: Math.floor(Math.random() * 50) + 10
            })),
            diseaseStats: [
              { name: '内科', value: Math.floor(Math.random() * 150) + 100 },
              { name: '外科', value: Math.floor(Math.random() * 80) + 50 },
              { name: '妇产科', value: Math.floor(Math.random() * 50) + 30 },
              { name: '儿科', value: Math.floor(Math.random() * 40) + 20 },
              { name: '眼科', value: Math.floor(Math.random() * 30) + 10 },
              { name: '口腔科', value: Math.floor(Math.random() * 20) + 10 },
              { name: '耳鼻喉科', value: Math.floor(Math.random() * 15) + 8 },
              { name: '精神科', value: Math.floor(Math.random() * 10) + 5 },
              { name: '其他', value: Math.floor(Math.random() * 8) + 3 }
            ],
            timeStats: [
              { name: '上午 (8:00-12:00)', value: Math.floor(Math.random() * 200) + 150 },
              { name: '下午 (12:00-18:00)', value: Math.floor(Math.random() * 150) + 100 },
              { name: '晚间 (18:00-22:00)', value: Math.floor(Math.random() * 50) + 30 }
            ],
            totalFollowups: Math.floor(Math.random() * 300) + 300
          });
        }, 800);
      });
    };
    
    // 更新统计数据
    const updateStatistics = (data: any) => {
      methodStats.value = data.methodStats;
      monthlyStats.value = data.monthlyStats;
      diseaseStats.value = data.diseaseStats;
      timeStats.value = data.timeStats;
      totalFollowups.value = data.totalFollowups;
    };
    
    // 组件挂载后获取数据
    onMounted(async () => {
      try {
        const result = await fetchStatisticsData();
        updateStatistics(result);
      } catch (error) {
        console.error('获取统计数据失败:', error);
      } finally {
        loading.value = false;
      }
    });
    
    return {
      loading,
      activeTab,
      dateRange,
      predefinedRanges,
      methodStats,
      monthlyStats,
      diseaseStats,
      timeStats,
      totalFollowups,
      handleTabChange,
      handleDateRangeChange
    };
  }
});
</script>

<style scoped>
.followup-report {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.main-container {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.date-filter {
  display: flex;
  align-items: center;
}

.report-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.report-panel {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding: 10px;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .date-filter {
    margin-top: 10px;
  }
}
</style>