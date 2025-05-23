import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
//import { api } from '@/api';

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<any>(JSON.parse(localStorage.getItem('user') || 'null'));
  
  // getters
  const isAuthenticated = computed(() => !!token.value);
  const userProfile = computed(() => user.value);
  
  // actions
  const login = async (username: string, password: string) => {
    try {
      // 实际项目中应该发起 API 请求
      // const response = await api.post('/auth/login', { username, password });
      // const { token: authToken, user: userData } = response.data;
      
      // 模拟 API 响应
      if (username === 'admin' && password === 'admin123') {
        const authToken = 'mock-jwt-token-12345';
        const userData = {
          id: 1,
          username: 'admin',
          name: '陈医生',
          role: 'doctor'
        };
        
        // 存储 token 和用户信息
        token.value = authToken;
        user.value = userData;
        
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
      } else {
        throw new Error('用户名或密码错误');
      }
    } catch (error) {
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  };
  
  const register = async (username: string, password: string) => {
    try {
      // 实际项目中应该发起 API 请求
      // const response = await api.post('/auth/register', { username, password });
      // const { success } = response.data;
      
      // 模拟 API 响应
      // 这里仅模拟注册过程，实际项目中应与后端交互
      const canRegister = username !== 'admin'; // 假设 admin 已被注册
      
      if (canRegister) {
        return { success: true };
      } else {
        throw new Error('用户名已存在');
      }
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    // 清除认证状态
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  const checkAuth = () => {
    // 检查本地存储中的令牌是否有效
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      token.value = storedToken;
      user.value = JSON.parse(localStorage.getItem('user') || 'null');
      return true;
    }
    return false;
  };
  
  return {
    token,
    user,
    isAuthenticated,
    userProfile,
    login,
    register,
    logout,
    checkAuth
  };
});