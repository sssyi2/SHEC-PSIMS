<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\user\PatientPersonalCenterView.vue -->
<template>
  <div class="patient-personal-center">
    <TheHeader active-menu="personal-center" user-type="patient" />
    
    <div class="main-content">
      <PatientSidebar active-menu="basic-info" />
      
      <div class="content-area">
        <h1 class="page-title">{{ pageTitle }}</h1>
        
        <PatientBasicInfoForm 
          v-if="currentView === 'basic-info'"
          :user-info="userInfo"
          :is-editing="isEditing"
          @edit="startEditing"
          @save="saveUserInfo"
          @cancel="cancelEditing"
        />
        
        <PatientPasswordForm 
          v-else-if="currentView === 'change-password'"
          @save="changePassword"
        />
        
        <PatientPointsManagement 
          v-else-if="currentView === 'points'"
          :points="userPoints"
          :points-history="pointsHistory"
        />
        
        <PatientContactSupport 
          v-else-if="currentView === 'contact-support'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import PatientSidebar from '@/components/user/PatientSidebar.vue';
import PatientBasicInfoForm from '@/components/user/PatientBasicInfoForm.vue';
import PatientPasswordForm from '@/components/user/PatientPasswordForm.vue';
import PatientPointsManagement from '@/components/user/PatientPointsManagement.vue';
import PatientContactSupport from '@/components/user/PatientContactSupport.vue';
import { useUserStore } from '@/store/user';
import { useRoute } from 'vue-router';
import type { UserInfo, PasswordChangeRequest, PointsHistory } from '@/types/user';

export default defineComponent({
  name: 'PatientPersonalCenterView',
  components: {
    TheHeader,
    PatientSidebar,
    PatientBasicInfoForm,
    PatientPasswordForm,
    PatientPointsManagement,
    PatientContactSupport
  },
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    
    // 当前显示的视图
    const currentView = ref('basic-info');
    
    // 用户信息
    const userInfo = ref<UserInfo>({
      id: '',
      username: '',
      name: '',
      age: '',
      gender: '男',
      phone: '',
      email: '',
      country: '中国',
      province: '北京',
      city: '北京市',
      address: ''
    });
    
    // 积分信息
    const userPoints = ref(0);
    const pointsHistory = ref<PointsHistory[]>([]);
    
    // 编辑状态
    const isEditing = ref(false);
    
    // 页面标题
    const pageTitle = computed(() => {
      switch (currentView.value) {
        case 'basic-info':
          return '基本资料';
        case 'change-password':
          return '修改密码';
        case 'points':
          return '积分管理';
        case 'contact-support':
          return '联系客服';
        case 'delete-account':
          return '注销账户';
        default:
          return '基本资料';
      }
    });
    
    // 从路由中获取当前视图
    onMounted(() => {
      if (route.query.view) {
        currentView.value = route.query.view as string;
      }
      
      fetchUserInfo();
      fetchPointsInfo();
    });
    
    // 获取用户信息
    const fetchUserInfo = async () => {
      try {
        // 在实际应用中应该调用API获取用户信息
        // const response = await userStore.getUserInfo();
        // userInfo.value = response;
        
        // 模拟数据
        userInfo.value = {
          id: '1001',
          username: 'patient001',
          name: '张涛',
          age: '65',
          gender: '男',
          phone: '13812345678',
          email: 'patient001@example.com',
          country: '中国',
          province: '北京',
          city: '北京市',
          address: '海淀区西二旗大街1号'
        };
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    // 获取积分信息
    const fetchPointsInfo = async () => {
      try {
        // 在实际应用中应该调用API获取积分信息
        // const response = await userStore.getPointsInfo();
        // userPoints.value = response.points;
        // pointsHistory.value = response.history;
        
        // 模拟数据
        userPoints.value = 285;
        pointsHistory.value = [
          {
            id: 1,
            date: '2025-05-20',
            type: 'earn',
            points: 20,
            description: '完成健康问卷'
          },
          {
            id: 2,
            date: '2025-05-18',
            type: 'earn',
            points: 5,
            description: '每日登录'
          },
          {
            id: 3,
            date: '2025-05-15',
            type: 'spend',
            points: -50,
            description: '兑换健康服务'
          }
        ];
      } catch (error) {
        console.error('Error fetching points info:', error);
      }
    };
    
    // 开始编辑
    const startEditing = () => {
      isEditing.value = true;
    };
    
    // 保存用户信息
    const saveUserInfo = async (updatedInfo: UserInfo) => {
      try {
        // 在实际应用中应该调用API保存用户信息
        // await userStore.updateUserInfo(updatedInfo);
        
        // 模拟保存
        userInfo.value = { ...updatedInfo };
        isEditing.value = false;
        
        // 显示成功提示
        alert('个人信息已成功更新');
      } catch (error) {
        console.error('Error saving user info:', error);
        alert('保存失败，请稍后再试');
      }
    };
    
    // 取消编辑
    const cancelEditing = () => {
      isEditing.value = false;
      // 重新获取用户信息，恢复原始值
      fetchUserInfo();
    };
    
    // 修改密码
    const changePassword = async (passwordData: PasswordChangeRequest) => {
      try {
        // 在实际应用中应该调用API修改密码
        // await userStore.changePassword(passwordData);
        
        // 模拟成功
        alert('密码已成功修改，请使用新密码重新登录');
        
        // 重定向到登录页
        // router.push('/login');
      } catch (error) {
        console.error('Error changing password:', error);
        alert('密码修改失败，请确认当前密码是否正确');
      }
    };
    
    // 切换视图
    const switchView = (view: string) => {
      currentView.value = view;
    };
    
    return {
      currentView,
      userInfo,
      userPoints,
      pointsHistory,
      isEditing,
      pageTitle,
      switchView,
      startEditing,
      saveUserInfo,
      cancelEditing,
      changePassword
    };
  }
});
</script>

<style scoped>
.patient-personal-center {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  padding: 24px;
}

.page-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 24px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }
}
</style>