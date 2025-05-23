<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\consultation\ConsultationRecord.vue -->
<template>
  <div class="consultation-record">
    <TheHeader active-menu="consultation" />

    <div class="main-container">
      <ConsultationSidebar active-menu="consultation-service" />

      <div class="content-area">
        <div class="record-header">
          <button class="back-button" @click="goBack">
            &lt;&lt; 返回咨询
          </button>
          
          <div class="search-container">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索历史消息..." 
              class="search-input"
            />
            <button class="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.132-7-7-7-3.868 0-7 3.132-7 7 0 3.868 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="chat-history">
          <div class="history-title">
            <h2>历史记录</h2>
          </div>
          
          <div class="messages-container">
            <ChatMessage 
              v-for="message in filteredMessages" 
              :key="message.id" 
              :message="message"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from '@/components/layout/TheHeader.vue';
import ConsultationSidebar from '@/components/healthconsultation/ConsultationSidebar.vue';
import ChatMessage from '@/components/healthconsultation/ChatMessage.vue';
import type { ChatMessage as ChatMessageType } from '@/types/consultation.ts';

export default defineComponent({
  name: 'ConsultationRecord',
  components: {
    TheHeader,
    ConsultationSidebar,
    ChatMessage
  },
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const consultationId = ref<string | null>(null);
    const messages = ref<ChatMessageType[]>([
      {
        id: 1,
        content: '您好，我是陈医生，很高兴为您提供健康咨询服务。请问您有什么需要咨询的问题？',
        timestamp: new Date().getTime() - 86400000 * 2, // 2天前
        sender: 'doctor',
        senderName: '陈医生'
      },
      {
        id: 2,
        content: '医生您好，我最近血压有点高，测量值大概在140/90mmHg左右，想咨询一下应该如何调整生活方式来控制血压？',
        timestamp: new Date().getTime() - 86400000 * 2 + 300000, // 5分钟后
        sender: 'patient',
        senderName: '病人'
      },
      {
        id: 3,
        content: '您好，血压140/90mmHg属于轻度高血压。建议您：1. 减少盐的摄入量；2. 坚持适量运动，每天30分钟中等强度运动；3. 保持良好的作息习惯；4. 减轻体重；5. 戒烟限酒。您目前是否有服用降压药物？',
        timestamp: new Date().getTime() - 86400000 * 2 + 600000, // 10分钟后
        sender: 'doctor',
        senderName: '陈医生'
      },
      {
        id: 4,
        content: '谢谢医生的建议，我会按照您说的去做。我现在还没有服用降压药物，应该需要开始服用吗？',
        timestamp: new Date().getTime() - 86400000 * 2 + 900000, // 15分钟后
        sender: 'patient',
        senderName: '病人'
      },
      {
        id: 5,
        content: '根据您的血压情况，如果通过生活方式调整3-6个月后血压仍控制不佳，才需要考虑药物治疗。请您先坚持生活方式调整，并且保持每日测量血压并记录，一个月后来院复查，如果血压持续超过140/90mmHg，我们再考虑是否需要药物治疗。',
        timestamp: new Date().getTime() - 86400000 * 2 + 1200000, // 20分钟后
        sender: 'doctor',
        senderName: '陈医生'
      },
      {
        id: 6,
        content: '好的，我明白了。如果我按时测量血压，应该是早晚各一次吗？有什么需要注意的地方吗？',
        timestamp: new Date().getTime() - 86400000 * 2 + 1500000, // 25分钟后
        sender: 'patient',
        senderName: '病人'
      },
      {
        id: 7,
        content: '是的，建议您早晚各测量一次血压。测量时注意：1. 测量前休息5-10分钟；2. 坐姿测量，手臂与心脏保持同一水平；3. 避免刚运动、进食或情绪波动后立即测量；4. 每次测量2-3次，间隔1-2分钟，取平均值。您可以使用记录本或手机APP记录血压值，以便我们下次复查时评估。',
        timestamp: new Date().getTime() - 86400000 * 2 + 1800000, // 30分钟后
        sender: 'doctor',
        senderName: '陈医生'
      }
    ]);

    // 过滤消息
    const filteredMessages = computed(() => {
      if (!searchQuery.value) return messages.value;
      
      const query = searchQuery.value.toLowerCase();
      return messages.value.filter(message => 
        message.content.toLowerCase().includes(query) || 
        message.senderName.toLowerCase().includes(query)
      );
    });

    // 返回上一页
    const goBack = () => {
      router.push('/consultation');
    };

    // 获取咨询记录
    const fetchConsultationRecord = async (id: string) => {
      try {
        // 在实际项目中，这里应该调用API获取指定ID的咨询记录
        // const response = await fetch(`/api/consultations/${id}`);
        // const data = await response.json();
        // messages.value = data.messages;
        
        // 这里使用的是模拟数据
        console.log(`Fetching consultation record for ID: ${id}`);
      } catch (error) {
        console.error('Error fetching consultation record:', error);
      }
    };

    onMounted(() => {
      // 从路由参数获取咨询ID
      const id = router.currentRoute.value.params.id as string;
      if (id) {
        consultationId.value = id;
        fetchConsultationRecord(id);
      }
    });

    return {
      searchQuery,
      filteredMessages,
      goBack
    };
  }
});
</script>

<style scoped>
.consultation-record {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-container {
  display: flex;
  padding-top: 73px; /* 顶部导航高度 */
}

.content-area {
  flex-grow: 1;
  margin-left: 230px; /* 侧边栏宽度 */
  display: flex;
  flex-direction: column;
  height: calc(100vh - 73px); /* 减去顶部导航高度 */
}

.record-header {
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.back-button:hover {
  text-decoration: underline;
}

.search-container {
  display: flex;
  max-width: 300px;
  width: 100%;
}

.search-input {
  flex-grow: 1;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-right: none;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-button {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
}

.chat-history {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.history-title {
  margin-bottom: 20px;
}

.history-title h2 {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.messages-container {
  flex-grow: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }

  .search-container {
    max-width: 200px;
  }
}
</style>