import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LogEntry, LogQueryParams } from '@/types/log';
//import { api } from '@/api';

export const useLogStore = defineStore('log', () => {
  // 状态
  const logs = ref<LogEntry[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
    totalPages: 1
  });
  
  // 获取所有日志
  const fetchLogs = async (params: LogQueryParams) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // const response = await api.get('/logs', { params });
      // logs.value = response.data.items;
      // pagination.value = {
      //   total: response.data.total,
      //   current: params.page,
      //   pageSize: params.pageSize,
      //   totalPages: Math.ceil(response.data.total / params.pageSize)
      // };
      
      // 模拟数据
      // 在实际应用中，这里应该从API获取数据
      
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 模拟日志数据
      const dummyLogs: LogEntry[] = Array.from({ length: params.pageSize }, (_, i) => {
        const id = (params.page - 1) * params.pageSize + i + 1;
        return {
          id,
          timestamp: new Date(Date.now() - i * 3600000).toLocaleString(),
          user: ['管理员', '医生', '患者'][Math.floor(Math.random() * 3)],
          action: ['登录系统', '查看病历', '修改权限', '添加诊断', '预约'][Math.floor(Math.random() * 5)],
          message: `示例日志消息 ${id}`,
          ip: `192.168.1.${100 + Math.floor(Math.random() * 100)}`,
        };
      });
      
      logs.value = dummyLogs;
      
      // 假设总共有95条日志
      const total = 95;
      pagination.value = {
        total,
        current: params.page,
        pageSize: params.pageSize,
        totalPages: Math.ceil(total / params.pageSize)
      };
      
      return {
        logs: dummyLogs,
        pagination: pagination.value
      };
    } catch (e: any) {
      error.value = e.message || '获取日志列表失败';
      console.error('Error fetching logs:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  // 获取单条日志详情
  const fetchLogById = async (id: number) => {
    loading.value = true;
    error.value = null;
    
    try {
      // 实际项目中应该发起API请求
      // const response = await api.get(`/logs/${id}`);
      // return response.data;
      
      // 模拟数据
      const log = logs.value.find(log => log.id === id);
      if (log) {
        return {
          ...log,
          deviceInfo: 'Windows 11 x64',
          browserInfo: 'Chrome 120.0.6099.130',
          details: {
            requestData: JSON.stringify({ page: 1, pageSize: 10 }),
            responseCode: 200,
            duration: '125ms'
          }
        };
      }
      
      throw new Error('找不到对应的日志记录');
    } catch (e: any) {
      error.value = e.message || '获取日志详情失败';
      console.error('Error fetching log details:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  return {
    logs,
    loading,
    error,
    pagination,
    fetchLogs,
    fetchLogById
  };
});