<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\views\consultation\HealthConsultation.vue -->
<template>
  <div class="health-consultation">
    <TheHeader active-menu="consultation" />
    
    <div class="main-container">
      <ConsultationSidebar active-menu="consultation-service" />
      
      <div class="content-area">
        <div class="consultation-header">
          <h2 class="header-title">在线健康咨询服务</h2>
        </div>
        
        <div class="chat-container">
          <ChatWindow 
            :messages="messages" 
            :consultation-status="consultationStatus"
            @send-message="sendMessage"
            @end-consultation="endConsultation"
            @view-history="viewHistory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import ConsultationSidebar from '@/components/healthconsultation/ConsultationSidebar.vue'
import ChatWindow from '@/components/healthconsultation/ChatWindow.vue'
import type { ChatMessage, ConsultationStatus } from '@/types/consultation.ts'

export default defineComponent({
  name: 'HealthConsultation',
  components: {
    TheHeader,
    ConsultationSidebar,
    ChatWindow
  },
  setup() {
    // 聊天消息历史
    const messages = ref<ChatMessage[]>([
      {
        id: 1,
        content: '您好，我是陈医生，很高兴为您提供健康咨询服务。请问您有什么需要咨询的问题？',
        timestamp: new Date().getTime() - 3600000, // 1小时前
        sender: 'doctor',
        senderName: '陈医生'
      },
      {
        id: 2,
        content: '医生您好，我最近血压有点高，测量值大概在140/90mmHg左右，想咨询一下应该如何调整生活方式来控制血压？',
        timestamp: new Date().getTime() - 3300000, // 55分钟前
        sender: 'patient',
        senderName: '病人'
      },
      {
        id: 3,
        content: '您好，血压140/90mmHg属于轻度高血压。建议您：1. 减少盐的摄入量；2. 坚持适量运动，每天30分钟中等强度运动；3. 保持良好的作息习惯；4. 减轻体重；5. 戒烟限酒。您目前是否有服用降压药物？',
        timestamp: new Date().getTime() - 3000000, // 50分钟前
        sender: 'doctor',
        senderName: '陈医生'
      }
    ]);
    
    // 咨询状态
    const consultationStatus = ref<ConsultationStatus>('active');
    
    // 发送消息
    const sendMessage = (content: string) => {
      if (content.trim() === '') return;
      
      const newMessage: ChatMessage = {
        id: messages.value.length + 1,
        content,
        timestamp: new Date().getTime(),
        sender: 'doctor',
        senderName: '陈医生'
      };
      
      messages.value.push(newMessage);
      
      // 模拟患者回复
      setTimeout(() => {
        const patientReply: ChatMessage = {
          id: messages.value.length + 1,
          content: '谢谢医生的建议，我会按照您说的去做。我现在还没有服用降压药物，应该需要开始服用吗？',
          timestamp: new Date().getTime(),
          sender: 'patient',
          senderName: '病人'
        };
        messages.value.push(patientReply);
      }, 3000);
    };
    
    // 结束咨询
    const endConsultation = () => {
      consultationStatus.value = 'ended';
      
      // 发送系统消息通知咨询已结束
      const systemMessage: ChatMessage = {
        id: messages.value.length + 1,
        content: '本次咨询已结束，感谢您的参与。',
        timestamp: new Date().getTime(),
        sender: 'system',
        senderName: '系统'
      };
      
      messages.value.push(systemMessage);
    };
    
    // 查看历史记录
    const viewHistory = () => {
      // 在实际项目中，这里可以导航到历史记录页面或打开历史记录模态框
      console.log('查看历史记录');
    };
    
    onMounted(() => {
      // 加载初始数据或执行其他初始化操作
    });
    
    return {
      messages,
      consultationStatus,
      sendMessage,
      endConsultation,
      viewHistory
    };
  }
});
</script>

<style scoped>
.health-consultation {
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

.consultation-header {
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.header-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.chat-container {
  flex-grow: 1;
  padding: 20px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
  }
}
</style>