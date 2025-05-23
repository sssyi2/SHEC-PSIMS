import { defineStore } from 'pinia';
import { ref } from 'vue';
//import { api } from '@/api';
import type { User } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  // 状态
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  // 获取所有用户
  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // const response = await api.get('/users');
      // users.value = response.data;
      
      // 模拟数据
      users.value = [
        { id: 1, username: 'test', password: '******', name: '系统管理员', role: 'admin' },
        { id: 2, username: 'admin', password: '******', name: '医生', role: 'doctor' },
        { id: 3, username: 'zhangsan', password: '******', name: '病人', role: 'patient' },
        { id: 4, username: 'lisi', password: '******', name: '病人', role: 'patient' }
      ];
    } catch (e) {
      error.value = '获取用户列表失败';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  
  // 添加用户
  const addUser = async (user: User) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // const response = await api.post('/users', user);
      // const newUser = response.data;
      // users.value.push(newUser);
      
      // 模拟数据
      const newUser = {
        ...user,
        id: Math.max(...users.value.map(u => u.id)) + 1
      };
      users.value.push(newUser);
      
      return newUser;
    } catch (e) {
      error.value = '添加用户失败';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  // 更新用户
  const updateUser = async (user: User) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // await api.put(`/users/${user.id}`, user);
      
      // 模拟数据更新
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users.value[index] = { ...user };
      }
      
      return user;
    } catch (e) {
      error.value = '更新用户失败';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  // 删除用户
  const deleteUser = async (userId: number) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // await api.delete(`/users/${userId}`);
      
      // 模拟数据删除
      users.value = users.value.filter(user => user.id !== userId);
      
      return true;
    } catch (e) {
      error.value = '删除用户失败';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
});