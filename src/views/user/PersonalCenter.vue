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
        />
        
        <PointsManagement 
          v-else-if="activeMenu === 'points'" 
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
    
    // 用户信息
    const userInfo = reactive({
      username: '**涛',
      age: '18',
      gender: '男',
      phone: '110',
      email: '',
      country: '中国',
      province: '北京',
      city: '北京市',
      address: ''
    })
    
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
    const saveUserInfo = (updatedInfo: any) => {
      Object.assign(userInfo, updatedInfo)
      isEditing.value = false
      
      // 在实际应用中，这里应该发送请求到后端保存用户信息
      console.log('保存用户信息:', userInfo)
    }
    
    return {
      activeMenu,
      isEditing,
      userInfo,
      handleMenuChange,
      startEditing,
      saveUserInfo
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