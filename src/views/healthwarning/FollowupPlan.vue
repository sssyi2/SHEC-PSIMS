<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\healthwarning\FollowupPlan.vue -->
<template>
  <div class="followup-plan">
    <TheHeader />
    
    <div class="main-container">
      <HealthWarningSidebar :active-menu="'followup-plan'" />
      
      <div class="content-area">
        <div class="page-header">
          <h1 class="page-title">随访计划</h1>
          <button class="filter-button" @click="toggleFilterPanel">
            <i class="filter-icon"></i>
          </button>
        </div>
        
        <FilterPanel 
          v-if="showFilterPanel"
          :sort-options="sortOptions"
          :selected-sort-option="sortOption"
          :age-range="ageRange"
          @sort-change="handleSortChange"
          @age-range-change="handleAgeRangeChange"
          @close="showFilterPanel = false"
        />
        
        <div class="plan-list">
          <FollowupPlanCard
            v-for="plan in filteredPlans"
            :key="plan.id"
            :plan="plan"
            @edit="openEditDialog"
            @delete="confirmDelete"
          />
          
          <div v-if="filteredPlans.length === 0" class="empty-message">
            暂无随访计划数据
          </div>
        </div>
      </div>
    </div>
    
    <!-- 编辑随访计划对话框 -->
    <FollowupPlanForm
      v-if="showPlanForm"
      :plan="currentPlan"
      :mode="formMode"
      @save="savePlan"
      @cancel="showPlanForm = false"
    />
    
    <!-- 删除确认对话框 -->
    <DeleteConfirmDialog
      v-if="showDeleteConfirm"
      :item-name="`ID为${planToDelete?.id || ''}的随访计划`"
      @confirm="deletePlan"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import HealthWarningSidebar from '@/components/healthwarning/HealthWarningSidebar.vue'
import FilterPanel from '@/components/healthwarning/FilterPanel.vue'
import FollowupPlanCard from '@/components/healthwarning/FollowupPlanCard.vue'
import FollowupPlanForm from '@/components/healthwarning/FollowupPlanForm.vue'
import DeleteConfirmDialog from '@/components/common/DeleteConfirmDialog.vue'
import type { FollowupPlan } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'FollowupPlan',
  components: {
    TheHeader,
    HealthWarningSidebar,
    FilterPanel,
    FollowupPlanCard,
    FollowupPlanForm,
    DeleteConfirmDialog
  },
  setup() {
    // 筛选面板显示状态
    const showFilterPanel = ref(false);
    
    // 随访计划表单显示状态
    const showPlanForm = ref(false);
    
    // 删除确认对话框显示状态
    const showDeleteConfirm = ref(false);
    
    // 表单模式：新建/编辑
    const formMode = ref<'add' | 'edit'>('add');
    
    // 当前编辑的计划
    const currentPlan = ref<FollowupPlan | null>(null);
    
    // 将要删除的计划
    const planToDelete = ref<FollowupPlan | null>(null);
    
    // 筛选条件
    const sortOption = ref<string>('随访日期');
    const ageRange = ref<[string, string]>(['', '']);
    
    // 排序选项
    const sortOptions = [
      '患者编号',
      '患者姓名',
      '患者年龄',
      '随访日期',
      '随访时间',
      '随访医生'
    ];
    
    // 模拟随访计划数据
    const planList = ref<FollowupPlan[]>([
      {
        id: 1,
        patientId: 1001,
        patientName: '张三',
        patient: {
          id: 1001,
          name: '张三',
          gender: '男',
          age: 65,
          phone: '13812345678',
          address: '上海市浦东新区',
          medicalRecordNo: 'P202405001'
        },
        followupType: '高血压随访',
        followupCycle: '每月',
        nextFollowupDate: '2024-05-25',
        followupTime: '09:30',
        content: '按时服用降压药，每日测量血压两次',
        responsiblePerson: '李医生',
        createdAt: '2024-05-01',
        status: 'pending',
        remarks: '患者近期血压偏高，需要密切关注'
      },
      {
        id: 2,
        patientId: 1002,
        patientName: '李四',
        patient: {
          id: 1002,
          name: '李四',
          gender: '男',
          age: 58,
          phone: '13987654321',
          address: '上海市徐汇区',
          medicalRecordNo: 'P202405002'
        },
        followupType: '糖尿病随访',
        followupCycle: '两周',
        nextFollowupDate: '2024-06-01',
        followupTime: '10:00',
        content: '监测血糖水平，调整胰岛素用量',
        responsiblePerson: '王医生',
        createdAt: '2024-04-15',
        status: 'pending',
        remarks: '患者血糖波动较大，需要加强饮食管理'
      },
      {
        id: 3,
        patientId: 1003,
        patientName: '王五',
        patient: {
          id: 1003,
          name: '王五',
          gender: '男',
          age: 72,
          phone: '13599887766',
          address: '上海市静安区',
          medicalRecordNo: 'P202405003'
        },
        followupType: '骨折术后随访',
        followupCycle: '每周',
        nextFollowupDate: '2024-05-28',
        followupTime: '14:30',
        content: '评估恢复情况，进行康复训练指导',
        responsiblePerson: '赵医生',
        createdAt: '2024-05-10',
        status: 'completed',
        remarks: '恢复情况良好，可以适当增加活动量'
      }
    ]);
    
    // 根据筛选条件过滤随访计划
    const filteredPlans = computed(() => {
      let result = [...planList.value];
      
      // 筛选年龄范围
      if (ageRange.value[0] && ageRange.value[1]) {
        const minAge = parseInt(ageRange.value[0]);
        const maxAge = parseInt(ageRange.value[1]);
        if (!isNaN(minAge) && !isNaN(maxAge)) {
          result = result.filter(plan => {
            const age = plan.patient?.age || 0;
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
          case '随访日期':
            return new Date(a.nextFollowupDate).getTime() - new Date(b.nextFollowupDate).getTime();
          case '随访时间':
            return a.followupTime.localeCompare(b.followupTime);
          case '随访医生':
            return a.responsiblePerson.localeCompare(b.responsiblePerson);
          default:
            return 0;
        }
      });
      
      return result;
    });
    
    // 切换筛选面板显示
    const toggleFilterPanel = () => {
      showFilterPanel.value = !showFilterPanel.value;
    };
    
    // 处理排序选项变更
    const handleSortChange = (option: string) => {
      sortOption.value = option;
    };
    
    // 处理年龄范围变更
    const handleAgeRangeChange = (range: [string, string]) => {
      ageRange.value = range;
    };
    
    // 打开编辑对话框
    const openEditDialog = (plan: FollowupPlan) => {
      currentPlan.value = { ...plan };
      formMode.value = 'edit';
      showPlanForm.value = true;
    };
    
    // 确认删除
    const confirmDelete = (plan: FollowupPlan) => {
      planToDelete.value = plan;
      showDeleteConfirm.value = true;
    };
    
    // 保存随访计划
    const savePlan = (plan: FollowupPlan) => {
      if (formMode.value === 'add') {
        // 模拟添加随访计划
        const newId = planList.value.length > 0 
          ? Math.max(...planList.value.map(p => p.id as number)) + 1 
          : 1;
        
        planList.value.push({
          ...plan,
          id: newId,
          createdAt: new Date().toISOString().split('T')[0]
        });
      } else {
        // 模拟更新随访计划
        const index = planList.value.findIndex(p => p.id === plan.id);
        if (index !== -1) {
          planList.value[index] = plan;
        }
      }
      
      showPlanForm.value = false;
    };
    
    // 删除随访计划
    const deletePlan = () => {
      if (planToDelete.value) {
        planList.value = planList.value.filter(p => p.id !== planToDelete.value?.id);
        showDeleteConfirm.value = false;
        planToDelete.value = null;
      }
    };
    
    return {
      showFilterPanel,
      showPlanForm,
      showDeleteConfirm,
      formMode,
      currentPlan,
      planToDelete,
      sortOption,
      ageRange,
      sortOptions,
      planList,
      filteredPlans,
      toggleFilterPanel,
      handleSortChange,
      handleAgeRangeChange,
      openEditDialog,
      confirmDelete,
      savePlan,
      deletePlan
    };
  }
});
</script>

<style scoped>
.followup-plan {
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
  background: url('@/assets/icons/filter.svg') no-repeat center;
  background-size: contain;
}

.plan-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.empty-message {
  background-color: #fff;
  padding: 30px;
  text-align: center;
  color: #999;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding: 10px;
  }
}
</style>