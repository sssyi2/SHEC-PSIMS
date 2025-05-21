<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\auth\LoginForm.vue -->
<template>
  <form class="login-form" @submit.prevent="submitForm">
    <div v-if="loginError" class="error-message">
      {{ loginError }}
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
        autocomplete="current-password"
      />
    </div>
    
    <div class="action-container">
      <button 
        type="submit" 
        class="login-button" 
        :disabled="isLoading"
      >
        <span v-if="isLoading">登录中...</span>
        <span v-else>登 录</span>
      </button>
      
      <p class="register-text">
        还没有账号？
        <a href="#" class="register-link" @click.prevent="$emit('navigate-to-register')">
          点击这里进行注册
        </a>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    loginError: {
      type: String,
      default: ''
    }
  },
  emits: ['login', 'navigate-to-register'],
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');
    
    const submitForm = () => {
      emit('login', username.value, password.value);
    };
    
    return {
      username,
      password,
      submitForm
    };
  }
});
</script>

<style scoped>
.login-form {
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

.login-button {
  width: 100%;
  height: 40px;
  background-color: #1890ff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #40a9ff;
}

.login-button:disabled {
  background-color: #91caff;
  cursor: not-allowed;
}

.register-text {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.register-link {
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
}

.register-link:hover {
  color: #40a9ff;
  text-decoration: underline;
}
</style>