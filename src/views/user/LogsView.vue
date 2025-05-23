<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\user\LogsView.vue -->
<template>
  <div class="logs-view">
    <TheHeader active-menu="user-management" />
    
    <div class="main-content">
      <AdminSidebar active-menu="logs" />
      
      <div class="content-area">
        <h1 class="page-title">日志查看页面</h1>
        
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="请输入内容" 
            class="search-input"
          />
          <button class="search-button">
            <i class="icon-search"></i>
          </button>
        </div>
        
        <LogTable 
          :logs="filteredLogs"
          @view-log="handleViewLog"
        />
        
        <PaginationControl 
          :total="totalLogs"
          :current-page="currentPage"
          :page-size="pageSize"
          :total-pages="totalPages"
          @page-change="handlePageChange"
          @jump-to-page="handleJumpToPage"
        />
      </div>
    </div>
    
    <!-- 日志详情对话框 -->
    <LogDetailDialog 
      v-if="showLogDialog"
      :log="selectedLog"
      @close="closeLogDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import TheHeader from '@/components/layout/TheHeader3.vue';
import AdminSidebar from '@/components/user/AdminSidebar.vue';
import LogTable from '@/components/log/LogTable.vue';
import PaginationControl from '@/components/common/PaginationControl.vue';
import LogDetailDialog from '@/components/log/LogDetailDialog.vue';
import { useLogStore } from '@/store/log';
import type { LogEntry } from '@/types/log';

export default defineComponent({
  name: 'LogsView',
  components: {
    TheHeader,
    AdminSidebar,
    LogTable,
    PaginationControl,
    LogDetailDialog,
  },
  setup() {
    const logStore = useLogStore();
    
    const logs = ref<LogEntry[]>([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalLogs = ref(0);
    const totalPages = ref(10);
    
    // 日志详情对话框状态
    const showLogDialog = ref(false);
    const selectedLog = ref<LogEntry | null>(null);
    
    // 根据搜索条件过滤日志
    const filteredLogs = computed(() => {
      if (!searchQuery.value) return logs.value;
      
      const query = searchQuery.value.toLowerCase();
      return logs.value.filter(log => 
        log.message.toLowerCase().includes(query) || 
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query)
      );
    });
    
    // 获取日志数据
    const fetchLogs = async () => {
      try {
        // 在实际应用中应该调用API或store的action
        // await logStore.fetchLogs({ page: currentPage.value, pageSize: pageSize.value });
        // logs.value = logStore.logs;
        
        // 模拟数据
        logs.value = [
          { id: 1, timestamp: '2025-05-20 08:30:45', user: '管理员', action: '登录系统', message: '管理员登录系统成功', ip: '192.168.1.100' },
          { id: 2, timestamp: '2025-05-20 09:15:22', user: '医生', action: '查看病历', message: '查看患者ID:10045的病历', ip: '192.168.1.120' },
          { id: 3, timestamp: '2025-05-20 10:24:11', user: '患者', action: '预约', message: '预约2025-05-25 14:00的门诊', ip: '192.168.1.135' },
          { id: 4, timestamp: '2025-05-20 11:42:09', user: '管理员', action: '修改权限', message: '修改用户ID:205的权限', ip: '192.168.1.100' },
          { id: 5, timestamp: '2025-05-20 13:05:18', user: '医生', action: '添加诊断', message: '为患者ID:10078添加诊断记录', ip: '192.168.1.122' },
        ];
        
        totalLogs.value = 95; // 模拟总共有95条日志
        totalPages.value = Math.ceil(totalLogs.value / pageSize.value);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    
    // 处理查看日志详情
    const handleViewLog = (log: LogEntry) => {
      selectedLog.value = { ...log };
      showLogDialog.value = true;
    };
    
    // 关闭日志详情对话框
    const closeLogDialog = () => {
      showLogDialog.value = false;
      selectedLog.value = null;
    };
    
    // 处理分页变化
    const handlePageChange = (page: number) => {
      currentPage.value = page;
      fetchLogs();
    };
    
    // 处理跳转到指定页面
    const handleJumpToPage = (page: number) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        fetchLogs();
      }
    };
    
    // 组件挂载时获取日志数据
    onMounted(() => {
      fetchLogs();
    });
    
    return {
      logs,
      filteredLogs,
      searchQuery,
      currentPage,
      pageSize,
      totalLogs,
      totalPages,
      showLogDialog,
      selectedLog,
      handleViewLog,
      closeLogDialog,
      handlePageChange,
      handleJumpToPage
    };
  }
});
</script>

<style scoped>
.logs-view {
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

.search-container {
  display: flex;
  max-width: 300px;
  width: 100%;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-right: none;
  border-radius: 4px 0 0 4px;
  outline: none;
  font-size: 14px;
}

.search-input::placeholder {
  color: #bfbfbf;
}

.search-button {
  width: 36px;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-search {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617z' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }
  
  .search-container {
    max-width: 100%;
  }
}
</style>