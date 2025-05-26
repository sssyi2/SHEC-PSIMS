<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\auth\RegisterView.vue -->
<template>
  <div class="register-container">
    <div class="auth-background"></div>
    
    <div class="auth-card">
      <h1 class="auth-title">智慧医疗教育平台注册页面</h1>
      
      <RegisterForm 
        @register="handleRegister" 
        @navigate-to-login="navigateToLogin"
        :is-loading="isLoading"
        :register-error="registerError"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import { useAuthStore } from '@/store/auth/auth.ts';

export default defineComponent({
  name: 'RegisterView',
  components: {
    RegisterForm
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const isLoading = ref(false);
    const registerError = ref('');
    
    // 处理注册表单提交
    const handleRegister = async (username: string, password: string, confirmPassword: string) => {
      // 表单验证
      if (!username || !password || !confirmPassword) {
        registerError.value = '所有字段都是必填的';
        return;
      }
      
      if (password !== confirmPassword) {
        registerError.value = '两次输入的密码不一致';
        return;
      }
      
      try {
        isLoading.value = true;
        await authStore.register(username, password);
        
        // 注册成功后跳转到登录页
        router.push('/login');
      } catch (error) {
        registerError.value = '注册失败，请稍后重试';
        console.error('注册失败:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    // 导航到登录页面
    const navigateToLogin = () => {
      router.push('/login');
    };
    
    return {
      isLoading,
      registerError,
      handleRegister,
      navigateToLogin
    };
  }
});
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f2f5;
  background-image: linear-gradient(to right, rgba(114, 46, 209, 0.1), rgba(114, 46, 209, 0.05));
  z-index: -1;
}

.auth-card {
  width: 420px;
  background-color: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.auth-title {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
}

@media (max-width: 480px) {
  .auth-card {
    width: 90%;
    padding: 25px;
  }
  
  .auth-title {
    font-size: 20px;
  }
}
</style>