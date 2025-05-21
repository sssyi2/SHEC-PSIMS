<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\healthwarning\WarningInformation.vue -->
<template>
  <div class="warning-information">
    <TheHeader />
    
    <div class="main-container">
      <HealthWarningSidebar :active-menu="'warning-information'" />
      
      <div class="content-area">
        <div class="page-header">
          <h1 class="page-title">预警信息</h1>
          <button class="filter-button" @click="toggleFilter">
            <i class="filter-icon"></i>
          </button>
        </div>
        
        <DiseaseTypeFilter 
          :selected-type="selectedDiseaseType"
          @type-change="handleDiseaseTypeChange"
        />
        
        <FilterPanel 
          v-if="showFilterPanel"
          :sort-options="sortOptions"
          :selected-sort-option="sortOption"
          :age-range="ageRange"
          @sort-change="handleSortChange"
          @age-range-change="handleAgeRangeChange"
          @close="showFilterPanel = false"
        />
        
        <div class="warning-list">
          <WarningCard
            v-for="warning in filteredWarnings"
            :key="warning.id"
            :warning="warning"
            @view-detail="handleViewDetail"
            @mark-processed="handleMarkProcessed"
          />
        </div>
        
        <WarningDetail
          v-if="showDetailDialog"
          :warning="selectedWarning"
          @close="showDetailDialog = false"
          @process="handleProcessWarning"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import HealthWarningSidebar from '@/components/healthwarning/HealthWarningSidebar.vue'
import DiseaseTypeFilter from '@/components/healthwarning/DiseaseTypeFilter.vue'
import FilterPanel from '@/components/healthwarning/FilterPanel.vue'
import WarningCard from '@/components/healthwarning/WarningCard.vue'
import WarningDetail from '@/components/healthwarning/WarningDetail.vue'
import type { WarningInfo, Patient } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'WarningInformation',
  components: {
    TheHeader,
    HealthWarningSidebar,
    DiseaseTypeFilter,
    FilterPanel,
    WarningCard,
    WarningDetail
  },
  setup() {
    // 筛选面板显示状态
    const showFilterPanel = ref(false);
    
    // 详情对话框显示状态
    const showDetailDialog = ref(false);
    
    // 当前选中的预警信息
    const selectedWarning = ref<WarningInfo | null>(null);
    
    // 筛选条件
    const selectedDiseaseType = ref<string>('全部');
    const sortOption = ref<string>('预警时间');
    const ageRange = ref<[string, string]>(['', '']);
    
    // 排序选项
    const sortOptions = [
      '患者编号',
      '患者姓名',
      '患者年龄',
      '疾病名称',
      '预警等级',
      '预警时间'
    ];
    
    // 模拟预警数据
    const warningList = ref<WarningInfo[]>([
      {
        id: 1,
        patientId: 1001,
        patientName: '张三',
        diseaseType: '内科',
        diseaseName: '高血压',
        warningLevel: '二级',
        warningTime: '2024-05-20 08:30',
        status: 'unread',
        content: '血压持续升高，超过预警阈值',
        indicator: '血压',
        monitorValue: '150/95mmHg',
        thresholdValue: '140/90mmHg',
        patient: {
          id: 1001,
          name: '张三',
          gender: '男',
          age: 65,
          phone: '13812345678',
          address: '上海市浦东新区',
          medicalRecordNo: 'P202405001'
        }
      },
      {
        id: 2,
        patientId: 1002,
        patientName: '李四',
        diseaseType: '内科',
        diseaseName: '糖尿病',
        warningLevel: '三级',
        warningTime: '2024-05-20 09:15',
        status: 'read',
        content: '血糖水平异常，需要及时处理',
        indicator: '血糖',
        monitorValue: '9.8mmol/L',
        thresholdValue: '7.0mmol/L',
        patient: {
          id: 1002,
          name: '李四',
          gender: '男',
          age: 58,
          phone: '13987654321',
          address: '上海市徐汇区',
          medicalRecordNo: 'P202405002'
        }
      },
      {
        id: 3,
        patientId: 1003,
        patientName: '王五',
        diseaseType: '外科',
        diseaseName: '骨折',
        warningLevel: '一级',
        warningTime: '2024-05-19 15:40',
        status: 'processed',
        content: '伤口愈合异常，可能存在感染风险',
        indicator: '体温',
        monitorValue: '38.5°C',
        thresholdValue: '37.5°C',
        processedTime: '2024-05-19 16:30',
        processedBy: '医生李某',
        processingNote: '已开具抗生素处方，密切观察',
        patient: {
          id: 1003,
          name: '王五',
          gender: '男',
          age: 72,
          phone: '13599887766',
          address: '上海市静安区',
          medicalRecordNo: 'P202405003'
        }
      }
    ]);
    
    // 根据筛选条件过滤预警信息
    const filteredWarnings = computed(() => {
      let result = [...warningList.value];
      
      // 筛选疾病分类
      if (selectedDiseaseType.value !== '全部') {
        result = result.filter(warning => warning.diseaseType === selectedDiseaseType.value);
      }
      
      // 筛选年龄范围
      if (ageRange.value[0] && ageRange.value[1]) {
        const minAge = parseInt(ageRange.value[0]);
        const maxAge = parseInt(ageRange.value[1]);
        if (!isNaN(minAge) && !isNaN(maxAge)) {
          result = result.filter(warning => {
            const age = warning.patient?.age || 0;
            return age >= minAge && age <= maxAge;
          });
        }
      }
      
      // 排序
      result.sort((a, b) => {
        switch (sortOption.value) {
          case '患者编号':
            return (a.patientId as number) - (b.patientId as number);
          case '患者姓名':
            return a.patientName.localeCompare(b.patientName);
          case '患者年龄':
            return (a.patient?.age || 0) - (b.patient?.age || 0);
          case '疾病名称':
            return a.diseaseName.localeCompare(b.diseaseName);
          case '预警等级': {
            // 预警等级转为数字进行比较
            const levelMap: Record<string, number> = { '一级': 1, '二级': 2, '三级': 3, '四级': 4, '五级': 5 };
            return levelMap[a.warningLevel] - levelMap[b.warningLevel];
          }
          case '预警时间':
          default:
            // 默认按预警时间倒序排列
            return new Date(b.warningTime).getTime() - new Date(a.warningTime).getTime();
        }
      });
      
      return result;
    });
    
    // 切换筛选面板显示
    const toggleFilter = () => {
      showFilterPanel.value = !showFilterPanel.value;
    };
    
    // 处理疾病类型变更
    const handleDiseaseTypeChange = (type: string) => {
      selectedDiseaseType.value = type;
    };
    
    // 处理排序选项变更
    const handleSortChange = (option: string) => {
      sortOption.value = option;
    };
    
    // 处理年龄范围变更
    const handleAgeRangeChange = (range: [string, string]) => {
      ageRange.value = range;
    };
    
    // 查看详情
    const handleViewDetail = (warning: WarningInfo) => {
      selectedWarning.value = warning;
      showDetailDialog.value = true;
      
      // 如果是未读状态，标记为已读
      if (warning.status === 'unread') {
        const index = warningList.value.findIndex(w => w.id === warning.id);
        if (index !== -1) {
          warningList.value[index].status = 'read';
        }
      }
    };
    
    // 标记为已处理
    const handleMarkProcessed = (warningId: number | string) => {
      const index = warningList.value.findIndex(w => w.id === warningId);
      if (index !== -1) {
        warningList.value[index].status = 'processed';
        warningList.value[index].processedTime = new Date().toLocaleString();
        warningList.value[index].processedBy = '当前医生';
      }
    };
    
    // 处理预警
    const handleProcessWarning = (warningId: number | string, note: string) => {
      const index = warningList.value.findIndex(w => w.id === warningId);
      if (index !== -1) {
        warningList.value[index].status = 'processed';
        warningList.value[index].processedTime = new Date().toLocaleString();
        warningList.value[index].processedBy = '当前医生';
        warningList.value[index].processingNote = note;
      }
      
      showDetailDialog.value = false;
    };
    
    return {
      showFilterPanel,
      showDetailDialog,
      selectedWarning,
      selectedDiseaseType,
      sortOption,
      ageRange,
      sortOptions,
      warningList,
      filteredWarnings,
      toggleFilter,
      handleDiseaseTypeChange,
      handleSortChange,
      handleAgeRangeChange,
      handleViewDetail,
      handleMarkProcessed,
      handleProcessWarning
    };
  }
});
</script>

<style scoped>
.warning-information {
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

.filter-button {
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-button:hover {
  background-color: #e0e0e0;
}

.filter-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  /* 替换为内联SVG或Unicode字符 */
  background: none;
  position: relative;
}

.filter-icon:before {
  content: "⚙️";
  font-size: 18px;
}

.warning-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding: 10px;
  }
}
</style>