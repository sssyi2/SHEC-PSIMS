<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\user\PersonalCenter.vue -->
<template>
  <div class="personal-center">
    <TheHeader />
    
    <div class="main-container">
      <UserSidebar :active-menu="activeMenu" @menu-change="handleMenuChange" />
      
      <div class="content-area">
        <UserProfileForm 
          v-if="activeMenu === 'profile'" 
          :user-info="userInfo"
          :is-editing="isEditing"
          @save="saveUserInfo"
          @edit="startEditing"
        />
        
        <ChangePasswordForm 
          v-else-if="activeMenu === 'password'" 
          @change-password="handleChangePassword"
        />
        
        <PointsManagement 
          v-else-if="activeMenu === 'points'" 
          :points="userPoints"
          :points-history="pointsHistory"
          @update:points="updatePoints"
          @add-points-record="addPointsRecord"
        />
        
        <CustomerService 
          v-else-if="activeMenu === 'service'" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import UserSidebar from '@/components/user/UserSidebar.vue'
import UserProfileForm from '@/components/user/UserProfileForm.vue'
import ChangePasswordForm from '@/components/user/ChangePasswordForm.vue'
import PointsManagement from '@/components/user/PointsManagement.vue'
import CustomerService from '@/components/user/CustomerService.vue'
import type { userInfo, PointsHistory, PasswordChangeRequest } from '@/types/user'

export default defineComponent({
  name: 'PersonalCenter',
  components: {
    TheHeader,
    UserSidebar,
    UserProfileForm,
    ChangePasswordForm,
    PointsManagement,
    CustomerService
  },
  setup() {
    // 当前激活的菜单项
    const activeMenu = ref('profile')
    
    // 是否处于编辑状态
    const isEditing = ref(false)
    
    // 用户信息 - 修改为符合 userInfo 接口
    const userInfo = reactive<userInfo>({
      id: 1,
      UserName: 'user001',
      age: 28,
      email: 'user001@example.com',
      phoneNumber: '13800138000',
      address: '朝阳区建国路88号',
      gender: '男',
      country: '中国',
      city: '北京市',
      area: '朝阳区',
      passwordHash: '******',
      real_name: '张涛',
      role: 'user',
      department: '内科'
    })
    
    // 积分相关 - 添加积分管理所需的状态
    const userPoints = ref(120)
    const pointsHistory = ref<PointsHistory[]>([
      {
        id: 1,
        date: '2025-05-20',
        type: 'earn',
        points: 10,
        description: '每日登录'
      },
      {
        id: 2,
        date: '2025-05-19',
        type: 'earn',
        points: 20,
        description: '完成健康问卷'
      },
      {
        id: 3,
        date: '2025-05-15',
        type: 'spend',
        points: -50,
        description: '兑换营养餐券'
      }
    ])
    
    // 处理菜单切换
    const handleMenuChange = (menu: string) => {
      activeMenu.value = menu
      isEditing.value = false
    }
    
    // 开始编辑
    const startEditing = () => {
      isEditing.value = true
    }
    
    // 保存用户信息
    const saveUserInfo = (updatedInfo: userInfo) => {
      Object.assign(userInfo, updatedInfo)
      isEditing.value = false
      
      // 在实际应用中，这里应该发送请求到后端保存用户信息
      console.log('保存用户信息:', userInfo)
    }
    
    // 处理修改密码
    const handleChangePassword = (passwordData: PasswordChangeRequest) => {
      // 在实际应用中，这里应该发送请求到后端修改密码
      console.log('修改密码:', passwordData)
      
      // 密码修改成功后的操作，例如显示提示或跳转
      alert('密码修改成功，请重新登录')
    }
    
    // 更新用户积分
    const updatePoints = (newPoints: number) => {
      userPoints.value = newPoints
      
      // 在实际应用中，这里应该发送请求到后端更新积分
      console.log('更新积分:', newPoints)
    }
    
    // 添加积分记录
    const addPointsRecord = (record: PointsHistory) => {
      pointsHistory.value.unshift(record)
      
      // 在实际应用中，这里应该发送请求到后端添加积分记录
      console.log('添加积分记录:', record)
    }
    
    return {
      activeMenu,
      isEditing,
      userInfo,
      userPoints,
      pointsHistory,
      handleMenuChange,
      startEditing,
      saveUserInfo,
      handleChangePassword,
      updatePoints,
      addPointsRecord
    }
  }
})
</script>

<style scoped>
.personal-center {
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

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>