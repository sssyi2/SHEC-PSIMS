<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\consultation\ChatWindow.vue -->
<template>
  <div class="chat-window">
    <div class="chat-messages" ref="messagesContainer">
      <MessageBubble 
        v-for="message in messages" 
        :key="message.id"
        :message="message"
      />
    </div>
    
    <div class="chat-input-area">
      <div class="status-message" v-if="consultationStatus === 'ended'">
        当前已结束咨询，将无法输入和发送文本
      </div>
      
      <div class="input-container">
        <textarea 
          v-model="messageInput" 
          class="message-input"
          placeholder="请输入消息..."
          @keydown.enter.prevent="handleSendMessage"
          :disabled="consultationStatus === 'ended'"
        ></textarea>
        
        <button 
          class="send-button" 
          @click="handleSendMessage"
          :disabled="consultationStatus === 'ended' || messageInput.trim() === ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div class="action-buttons">
        <button 
          class="action-button end-button" 
          @click="$emit('end-consultation')"
          :disabled="consultationStatus === 'ended'"
        >
          结束咨询
        </button>
        
        <button 
          class="action-button history-button" 
          @click="$emit('view-history')"
        >
          查看历史记录
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import type { PropType } from 'vue'
import MessageBubble from './MessageBubble.vue'
import type { ChatMessage, ConsultationStatus } from '@/types/consultation.ts'

export default defineComponent({
  name: 'ChatWindow',
  components: {
    MessageBubble
  },
  props: {
    messages: {
      type: Array as PropType<ChatMessage[]>,
      required: true
    },
    consultationStatus: {
      type: String as PropType<ConsultationStatus>,
      default: 'active'
    }
  },
  emits: ['send-message', 'end-consultation', 'view-history'],
  setup(props, { emit }) {
    const messagesContainer = ref<HTMLElement | null>(null);
    const messageInput = ref('');
    
    // 处理发送消息
    const handleSendMessage = () => {
      if (messageInput.value.trim() === '' || props.consultationStatus === 'ended') return;
      
      emit('send-message', messageInput.value);
      messageInput.value = '';
    };
    
    // 监听消息变化，自动滚动到底部
    watch(() => props.messages.length, async () => {
      await nextTick();
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });
    
    return {
      messagesContainer,
      messageInput,
      handleSendMessage
    };
  }
});
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-messages {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.chat-input-area {
  padding: 15px;
  border-top: 1px solid #eaeaea;
  background-color: #fff;
}

.status-message {
  padding: 8px 12px;
  margin-bottom: 10px;
  background-color: #FFF3CD;
  border-radius: 4px;
  color: #856404;
  font-size: 14px;
  text-align: center;
}

.input-container {
  display: flex;
  margin-bottom: 15px;
}

.message-input {
  flex-grow: 1;
  height: 60px;
  padding: 10px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
}

.message-input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.send-button {
  width: 48px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button:hover {
  background-color: #40a9ff;
}

.send-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.action-button {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.end-button {
  background-color: #f56c6c;
  color: #fff;
  border-color: #f56c6c;
}

.end-button:hover {
  background-color: #f78989;
}

.end-button:disabled {
  background-color: #fab6b6;
  border-color: #fab6b6;
  cursor: not-allowed;
}

.history-button {
  background-color: #f4f4f5;
  color: #606266;
}

.history-button:hover {
  background-color: #e9e9eb;
}
</style>