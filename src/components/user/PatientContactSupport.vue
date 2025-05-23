<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientContactSupport.vue -->
<template>
  <div class="contact-support">
    <div class="support-card">
      <div class="support-header">
        <h2>联系客服</h2>
      </div>
      
      <div class="support-content">
        <div class="support-channels">
          <div class="channel-item">
            <div class="channel-icon">
              <i class="icon-phone"></i>
            </div>
            <div class="channel-info">
              <h3>电话咨询</h3>
              <p>服务时间: 周一至周日 8:00-22:00</p>
              <div class="channel-contact">400-123-4567</div>
            </div>
          </div>
          
          <div class="channel-item">
            <div class="channel-icon">
              <i class="icon-email"></i>
            </div>
            <div class="channel-info">
              <h3>邮件支持</h3>
              <p>24小时内回复</p>
              <div class="channel-contact">support@shec-psims.com</div>
            </div>
          </div>
          
          <div class="channel-item">
            <div class="channel-icon">
              <i class="icon-chat"></i>
            </div>
            <div class="channel-info">
              <h3>在线客服</h3>
              <p>服务时间: 周一至周日 8:00-22:00</p>
              <button class="online-chat-btn" @click="startOnlineChat">
                开始在线咨询
              </button>
            </div>
          </div>
        </div>
        
        <div class="support-divider">
          <span>或者</span>
        </div>
        
        <div class="feedback-form">
          <h3>留言反馈</h3>
          <div class="form-group">
            <label for="subject">问题类型</label>
            <select id="subject" v-model="feedback.subject">
              <option value="">请选择问题类型</option>
              <option value="account">账号问题</option>
              <option value="service">服务问题</option>
              <option value="suggestion">功能建议</option>
              <option value="other">其他问题</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">问题描述</label>
            <textarea 
              id="message" 
              v-model="feedback.message" 
              rows="5" 
              placeholder="请详细描述您遇到的问题或建议..."
            ></textarea>
            <div class="char-count">{{ feedback.message.length }}/500</div>
          </div>
          
          <div class="form-group">
            <label for="contact">联系方式</label>
            <input 
              id="contact" 
              v-model="feedback.contact" 
              type="text" 
              placeholder="请留下您的电话或邮箱，方便我们联系您"
            />
          </div>
          
          <div class="form-group upload-group">
            <label>上传图片 (可选)</label>
            <div class="upload-container">
              <div 
                v-for="(img, index) in preview" 
                :key="index" 
                class="upload-preview"
              >
                <img :src="img" alt="预览图" />
                <button class="remove-btn" @click="removeImage(index)">×</button>
              </div>
              
              <div class="upload-btn-wrapper" v-if="preview.length < 3">
                <button class="upload-btn">
                  <i class="icon-upload"></i>
                  <span>添加图片</span>
                </button>
                <input type="file" accept="image/*" @change="handleFileChange" />
              </div>
            </div>
            <div class="upload-tip">最多上传3张图片，每张不超过5MB</div>
          </div>
          
          <div class="form-actions">
            <button class="submit-btn" @click="submitFeedback" :disabled="!isFormValid">
              提交反馈
            </button>
          </div>
        </div>
      </div>
      
      <div class="faq-section">
        <h3>常见问题</h3>
        <div class="faq-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="faq-item"
            :class="{ 'expanded': expandedFaq === index }"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <span>{{ faq.question }}</span>
              <i class="icon-arrow"></i>
            </div>
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';

export default defineComponent({
  name: 'PatientContactSupport',
  setup() {
    // 反馈表单数据
    const feedback = reactive({
      subject: '',
      message: '',
      contact: ''
    });
    
    // 图片预览
    const preview = ref<string[]>([]);
    
    // 常见问题
    const faqs = [
      {
        question: '如何修改个人信息？',
        answer: '您可以在"个人中心-账号基础信息"页面中点击"修改信息"按钮进行修改，完成后点击"保存"即可。'
      },
      {
        question: '忘记密码怎么办？',
        answer: '您可以在登录页面点击"忘记密码"，通过绑定的手机号或邮箱进行身份验证后重置密码。'
      },
      {
        question: '如何查看我的健康档案？',
        answer: '您可以在系统首页点击"健康档案管理"，进入后可以查看和管理您的全部健康档案信息。'
      },
      {
        question: '积分如何使用？',
        answer: '您可以在"个人中心-积分管理"页面查看积分明细，并通过"兑换积分"按钮将积分兑换为各种健康服务或优惠券。'
      },
      {
        question: '如何取消预约？',
        answer: '您可以在"健康咨询-我的预约"中找到需要取消的预约，点击"取消预约"按钮即可。请注意，预约开始前24小时内取消可能会产生违约记录。'
      }
    ];
    
    // 展开的FAQ索引
    const expandedFaq = ref<number | null>(null);
    
    // 表单是否有效
    const isFormValid = computed(() => {
      return feedback.subject && feedback.message.length > 10 && feedback.contact;
    });
    
    // 切换FAQ展开状态
    const toggleFaq = (index: number) => {
      expandedFaq.value = expandedFaq.value === index ? null : index;
    };
    
    // 处理文件上传
    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        
        // 检查文件大小
        if (file.size > 5 * 1024 * 1024) {
          alert('文件大小不能超过5MB');
          return;
        }
        
        // 创建预览
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            preview.value.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
        
        // 重置input，允许再次选择同一文件
        input.value = '';
      }
    };
    
    // 移除图片
    const removeImage = (index: number) => {
      preview.value.splice(index, 1);
    };
    
    // 开始在线聊天
    const startOnlineChat = () => {
      // 实际实现中可能会打开聊天窗口或跳转到聊天页面
      alert('在线客服功能即将上线，敬请期待！');
    };
    
    // 提交反馈
    const submitFeedback = async () => {
      if (!isFormValid.value) {
        return;
      }
      
      try {
        // 这里应该调用API提交反馈
        // await api.post('/feedback', {
        //   subject: feedback.subject,
        //   message: feedback.message,
        //   contact: feedback.contact,
        //   images: preview.value
        // });
        
        // 模拟成功提交
        alert('您的反馈已成功提交，我们会尽快处理并与您联系！');
        
        // 重置表单
        feedback.subject = '';
        feedback.message = '';
        feedback.contact = '';
        preview.value = [];
      } catch (error) {
        alert('提交失败，请稍后再试');
      }
    };
    
    return {
      feedback,
      preview,
      faqs,
      expandedFaq,
      isFormValid,
      toggleFaq,
      handleFileChange,
      removeImage,
      startOnlineChat,
      submitFeedback
    };
  }
});
</script>

<style scoped>
.contact-support {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.support-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.support-header h2 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.support-content {
  margin-bottom: 30px;
}

.support-channels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.channel-item {
  display: flex;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.channel-icon {
  width: 50px;
  height: 50px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.icon-phone,
.icon-email,
.icon-chat {
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-phone {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M21 16.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.901 13.901 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.901 13.901 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498z' fill='%231890ff'/%3E%3C/svg%3E");
}

.icon-email {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z' fill='%231890ff'/%3E%3C/svg%3E");
}

.icon-chat {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z' fill='%231890ff'/%3E%3C/svg%3E");
}

.channel-info h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 5px 0;
}

.channel-info p {
  font-size: 12px;
  color: #999;
  margin: 0 0 10px 0;
}

.channel-contact {
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
}

.online-chat-btn {
  padding: 6px 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.online-chat-btn:hover {
  background-color: #40a9ff;
}

.support-divider {
  position: relative;
  text-align: center;
  margin: 30px 0;
}

.support-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
}

.support-divider span {
  position: relative;
  padding: 0 20px;
  background-color: #fff;
  color: #999;
  font-size: 14px;
}

.feedback-form h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 14px;
}

.form-group select {
  height: 36px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: none;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.upload-group {
  margin-bottom: 30px;
}

.upload-container {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.upload-preview {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  border: 1px solid #f0f0f0;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.upload-btn-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.upload-btn {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.icon-upload {
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 12.586l4.242-4.242 1.415 1.414L12 15.415l-5.657-5.657 1.415-1.414L12 12.586zM12 15a1 1 0 0 1 1 1v3h-2v-3a1 1 0 0 1 1-1z' fill='%23999'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.upload-btn span {
  font-size: 12px;
  color: #999;
}

.upload-btn-wrapper input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-tip {
  font-size: 12px;
  color: #999;
}

.form-actions {
  display: flex;
  justify-content: center;
}

.submit-btn {
  padding: 8px 20px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  min-width: 120px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #40a9ff;
}

.submit-btn:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
}

.faq-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #f0f0f0;
}

.faq-section h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.faq-item:hover {
  border-color: #e6f7ff;
  background-color: #f9f9f9;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-weight: 500;
}

.icon-arrow {
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z' fill='%23999'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 0.3s;
}

.faq-item.expanded .icon-arrow {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 15px;
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
}

.faq-item.expanded .faq-answer {
  height: auto;
  padding: 0 15px 15px;
}

.faq-answer p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .support-channels {
    grid-template-columns: 1fr;
  }
  
  .channel-item {
    padding: 15px;
  }
}
</style>