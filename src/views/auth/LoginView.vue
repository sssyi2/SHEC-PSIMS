<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\auth\LoginView.vue -->
<template>
  <div class="login-container">
    <div class="auth-background"></div>
    
    <div class="auth-card">
      <h1 class="auth-title">欢迎登录智慧医疗教育平台</h1>
      
      <LoginForm 
        @login="handleLogin" 
        @navigate-to-register="navigateToRegister" 
        :is-loading="isLoading"
        :login-error="loginError"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LoginForm from '@/components/auth/LoginForm.vue';
import { useAuthStore } from '@/store/auth/auth';

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginForm
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    
    const isLoading = ref(false);
    const loginError = ref('');
    
    // 处理登录表单提交
    const handleLogin = async (username: string, password: string) => {
      if (!username || !password) {
        loginError.value = '用户名和密码不能为空';
        return;
      }
      
      try {
        isLoading.value = true;
        await authStore.login(username, password);
        
        // 登录成功后重定向
        const redirectPath = route.query.redirect as string || '/';
        router.push(redirectPath);
      } catch (error) {
        loginError.value = '用户名或密码错误，请重试';
        console.error('登录失败:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    // 导航到注册页面
    const navigateToRegister = () => {
      router.push('/register');
    };
    
    return {
      isLoading,
      loginError,
      handleLogin,
      navigateToRegister
    };
  }
});
</script>

<style scoped>
.login-container {
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
  background-image: linear-gradient(to right, rgba(24, 144, 255, 0.1), rgba(24, 144, 255, 0.05));
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