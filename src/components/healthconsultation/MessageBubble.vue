<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\consultation\MessageBubble.vue -->
<template>
  <div class="message-container" :class="messageContainerClass">
    <div class="avatar" v-if="message.sender === 'patient'">
      <div class="avatar-icon patient-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"/>
        </svg>
      </div>
    </div>
    
    <div class="message-content">
      <div class="message-bubble" :class="messageBubbleClass">
        {{ message.content }}
      </div>
      <div class="message-info">
        <span class="sender-name">{{ message.sender === 'system' ? '' : message.senderName }}</span>
        <span class="message-time">{{ formattedTime }}</span>
      </div>
    </div>
    
    <div class="avatar" v-if="message.sender === 'doctor'">
      <div class="avatar-icon doctor-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { ChatMessage } from '@/types/consultation.ts'

export default defineComponent({
  name: 'MessageBubble',
  props: {
    message: {
      type: Object as PropType<ChatMessage>,
      required: true
    }
  },
  setup(props) {
    // 根据发送者设置类名
    const messageContainerClass = computed(() => {
      if (props.message.sender === 'patient') {
        return 'patient-message';
      } else if (props.message.sender === 'doctor') {
        return 'doctor-message';
      } else {
        return 'system-message';
      }
    });
    
    // 根据发送者设置气泡类名
    const messageBubbleClass = computed(() => {
      if (props.message.sender === 'patient') {
        return 'patient-bubble';
      } else if (props.message.sender === 'doctor') {
        return 'doctor-bubble';
      } else {
        return 'system-bubble';
      }
    });
    
    // 格式化时间
    const formattedTime = computed(() => {
      const date = new Date(props.message.timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });
    
    return {
      messageContainerClass,
      messageBubbleClass,
      formattedTime
    };
  }
});
</script>

<style scoped>
.message-container {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.patient-message {
  flex-direction: row;
}

.doctor-message {
  flex-direction: row-reverse;
}

.system-message {
  justify-content: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 24px;
  height: 24px;
  color: #555;
}

.patient-icon {
  color: #1890ff;
}

.doctor-icon {
  color: #52c41a;
}

.message-content {
  max-width: 70%;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  margin-bottom: 4px;
}

.patient-bubble {
  background-color: #e8f4ff;
  border-top-left-radius: 2px;
  color: #333;
  text-align: left;
}

.doctor-bubble {
  background-color: #f0f9eb;
  border-top-right-radius: 2px;
  color: #333;
  text-align: left;
}

.system-bubble {
  background-color: #f4f4f5;
  color: #909399;
  border-radius: 16px;
  max-width: 80%;
  text-align: center;
  margin: 0 auto;
}

.message-info {
  display: flex;
  font-size: 12px;
  color: #909399;
}

.doctor-message .message-info {
  justify-content: flex-end;
}

.sender-name {
  margin-right: 8px;
}

.message-time {
  color: #c0c4cc;
}

.system-message .message-content {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>