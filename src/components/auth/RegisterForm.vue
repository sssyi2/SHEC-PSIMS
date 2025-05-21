<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\auth\RegisterForm.vue -->
<template>
  <form class="register-form" @submit.prevent="submitForm">
    <div v-if="registerError" class="error-message">
      {{ registerError }}
    </div>
    
    <div class="form-group">
      <label for="username" class="form-label">用户名：</label>
      <input 
        id="username" 
        v-model="username" 
        type="text" 
        class="form-input" 
        placeholder="请输入用户名" 
        :disabled="isLoading"
        autocomplete="username"
      />
    </div>
    
    <div class="form-group">
      <label for="password" class="form-label">密码：</label>
      <input 
        id="password" 
        v-model="password" 
        type="password" 
        class="form-input" 
        placeholder="请输入密码" 
        :disabled="isLoading"
        autocomplete="new-password"
      />
    </div>
    
    <div class="form-group">
      <label for="confirmPassword" class="form-label">确认密码：</label>
      <input 
        id="confirmPassword" 
        v-model="confirmPassword" 
        type="password" 
        class="form-input" 
        placeholder="请再次输入密码" 
        :disabled="isLoading"
        autocomplete="new-password"
      />
    </div>
    
    <div class="action-container">
      <button 
        type="submit" 
        class="register-button" 
        :disabled="isLoading"
      >
        <span v-if="isLoading">注册中...</span>
        <span v-else>注 册</span>
      </button>
      
      <p class="login-text">
        已有账号？
        <a href="#" class="login-link" @click.prevent="$emit('navigate-to-login')">
          返回登录
        </a>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RegisterForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    registerError: {
      type: String,
      default: ''
    }
  },
  emits: ['register', 'navigate-to-login'],
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    
    const submitForm = () => {
      emit('register', username.value, password.value, confirmPassword.value);
    };
    
    return {
      username,
      password,
      confirmPassword,
      submitForm
    };
  }
});
</script>

<style scoped>
.register-form {
  width: 100%;
}

.error-message {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ff4d4f;
  margin-bottom: 20px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #333;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.action-container {
  margin-top: 30px;
}

.register-button {
  width: 100%;
  height: 40px;
  background-color: #722ed1;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #9254de;
}

.register-button:disabled {
  background-color: #d3adf7;
  cursor: not-allowed;
}

.login-text {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.login-link {
  color: #722ed1;
  text-decoration: none;
  transition: color 0.3s;
}

.login-link:hover {
  color: #9254de;
  text-decoration: underline;
}
</style>