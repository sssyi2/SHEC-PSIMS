<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\CustomerService.vue -->
<template>
  <div class="customer-service">
    <div class="service-header">
      <div class="title">联系客服</div>
    </div>
    
    <div class="service-content">
      <div class="contact-methods">
        <div class="contact-method">
          <div class="method-icon phone-icon">
            <i class="icon"></i>
          </div>
          <div class="method-details">
            <div class="method-title">客服电话</div>
            <div class="method-value">400-123-4567</div>
            <div class="method-desc">工作时间：周一至周五 9:00-18:00</div>
          </div>
        </div>
        
        <div class="contact-method">
          <div class="method-icon email-icon">
            <i class="icon"></i>
          </div>
          <div class="method-details">
            <div class="method-title">客服邮箱</div>
            <div class="method-value">support@shec-psims.com</div>
            <div class="method-desc">通常在24小时内回复</div>
          </div>
        </div>
        
        <div class="contact-method">
          <div class="method-icon chat-icon">
            <i class="icon"></i>
          </div>
          <div class="method-details">
            <div class="method-title">在线客服</div>
            <button class="chat-button" @click="startChat">开始对话</button>
            <div class="method-desc">在线解答，实时响应</div>
          </div>
        </div>
      </div>
      
      <div class="feedback-form">
        <div class="section-title">问题反馈</div>
        
        <div class="form-group">
          <label class="form-label">问题类型</label>
          <select v-model="feedback.type" class="form-select">
            <option value="">请选择问题类型</option>
            <option value="account">账号问题</option>
            <option value="system">系统使用问题</option>
            <option value="data">数据错误</option>
            <option value="suggestion">功能建议</option>
            <option value="other">其他问题</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">问题描述</label>
          <textarea 
            v-model="feedback.content" 
            class="form-textarea"
            placeholder="请详细描述您的问题或建议"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">联系方式</label>
          <input 
            v-model="feedback.contact" 
            type="text" 
            class="form-input"
            placeholder="请留下您的联系方式，方便我们回复您"
          />
        </div>
        
        <div class="form-actions">
          <button class="btn btn-primary" @click="submitFeedback">
            提交反馈
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'CustomerService',
  setup() {
    // 反馈信息
    const feedback = reactive({
      type: '',
      content: '',
      contact: ''
    })
    
    // 开始在线对话
    const startChat = () => {
      // 在实际应用中，这里应该打开在线客服对话窗口
      alert('正在连接在线客服...')
    }
    
    // 提交反馈
    const submitFeedback = () => {
      // 简单验证
      if (!feedback.type) {
        alert('请选择问题类型')
        return
      }
      
      if (!feedback.content) {
        alert('请填写问题描述')
        return
      }
      
      // 在实际应用中，这里应该发送请求到后端
      console.log('提交反馈:', feedback)
      
      alert('感谢您的反馈，我们会尽快处理！')
      
      // 清空表单
      feedback.type = ''
      feedback.content = ''
      feedback.contact = ''
    }
    
    return {
      feedback,
      startChat,
      submitFeedback
    }
  }
})
</script>

<style scoped>
.customer-service {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.service-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.title, .section-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.section-title {
  margin: 30px 0 20px;
}

.contact-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.contact-method {
  display: flex;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  width: calc(33.33% - 14px);
  min-width: 250px;
}

.method-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.phone-icon {
  background-color: #e6f7ff;
  color: #1890ff;
}

.email-icon {
  background-color: #f6ffed;
  color: #52c41a;
}

.chat-icon {
  background-color: #fff2e8;
  color: #fa8c16;
}

.icon {
  font-size: 24px;
}

.method-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.method-value {
  color: #333;
  margin-bottom: 5px;
  font-size: 16px;
}

.method-desc {
  color: #999;
  font-size: 12px;
}

.chat-button {
  background-color: #fa8c16;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;
}

.chat-button:hover {
  background-color: #ffa940;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.form-select, .form-input, .form-textarea {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 12px;
}

.form-select {
  height: 36px;
}

.form-textarea {
  height: 120px;
  resize: vertical;
}

.form-actions {
  margin-top: 30px;
}

.btn {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  font-size: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

@media (max-width: 992px) {
  .contact-method {
    width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .contact-method {
    width: 100%;
  }
}
</style>