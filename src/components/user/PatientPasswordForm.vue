<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientPasswordForm.vue -->
<template>
  <div class="password-form-container">
    <div class="form-header">
      <h2>修改密码</h2>
    </div>
    
    <form @submit.prevent="handleSubmit" class="password-form">
      <div class="form-group">
        <label for="currentPassword">当前密码：</label>
        <div class="password-input">
          <input 
            id="currentPassword" 
            v-model="form.currentPassword" 
            :type="showCurrentPassword ? 'text' : 'password'" 
            required
          />
          <button 
            type="button" 
            class="toggle-password-btn" 
            @click="showCurrentPassword = !showCurrentPassword"
          >
            <i class="icon" :class="showCurrentPassword ? 'icon-eye-off' : 'icon-eye'"></i>
          </button>
        </div>
      </div>
      
      <div class="form-group">
        <label for="newPassword">新密码：</label>
        <div class="password-input">
          <input 
            id="newPassword" 
            v-model="form.newPassword" 
            :type="showNewPassword ? 'text' : 'password'" 
            required
          />
          <button 
            type="button" 
            class="toggle-password-btn" 
            @click="showNewPassword = !showNewPassword"
          >
            <i class="icon" :class="showNewPassword ? 'icon-eye-off' : 'icon-eye'"></i>
          </button>
        </div>
        <div class="password-strength" v-if="form.newPassword">
          <div class="strength-meter">
            <div 
              class="strength-value" 
              :style="{ width: `${passwordStrength * 25}%` }"
              :class="strengthClass"
            ></div>
          </div>
          <span class="strength-text">{{ strengthText }}</span>
        </div>
        <div class="password-tips">
          <p>密码必须包含以下条件：</p>
          <ul>
            <li :class="{ valid: hasMinLength }">至少8个字符</li>
            <li :class="{ valid: hasLowerCase }">至少1个小写字母</li>
            <li :class="{ valid: hasUpperCase }">至少1个大写字母</li>
            <li :class="{ valid: hasNumber }">至少1个数字</li>
          </ul>
        </div>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">确认新密码：</label>
        <div class="password-input">
          <input 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            :type="showConfirmPassword ? 'text' : 'password'" 
            required
          />
          <button 
            type="button" 
            class="toggle-password-btn" 
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <i class="icon" :class="showConfirmPassword ? 'icon-eye-off' : 'icon-eye'"></i>
          </button>
        </div>
        <div v-if="passwordsDoNotMatch" class="error-message">
          两次输入的密码不一致
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="save-btn" :disabled="!isFormValid">保存</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import type { PasswordChangeRequest } from '@/types/user';

export default defineComponent({
  name: 'PatientPasswordForm',
  emits: ['save'],
  setup(props, { emit }) {
    // 表单数据
    const form = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // 密码显示状态
    const showCurrentPassword = ref(false);
    const showNewPassword = ref(false);
    const showConfirmPassword = ref(false);
    
    // 密码强度验证
    const hasMinLength = computed(() => form.newPassword.length >= 8);
    const hasLowerCase = computed(() => /[a-z]/.test(form.newPassword));
    const hasUpperCase = computed(() => /[A-Z]/.test(form.newPassword));
    const hasNumber = computed(() => /[0-9]/.test(form.newPassword));
    
    // 密码强度等级 (0-4)
    const passwordStrength = computed(() => {
      let strength = 0;
      if (hasMinLength.value) strength++;
      if (hasLowerCase.value) strength++;
      if (hasUpperCase.value) strength++;
      if (hasNumber.value) strength++;
      return strength;
    });
    
    // 密码强度文本
    const strengthText = computed(() => {
      switch (passwordStrength.value) {
        case 0: return '非常弱';
        case 1: return '弱';
        case 2: return '一般';
        case 3: return '强';
        case 4: return '非常强';
        default: return '';
      }
    });
    
    // 密码强度样式类
    const strengthClass = computed(() => {
      switch (passwordStrength.value) {
        case 0: return 'very-weak';
        case 1: return 'weak';
        case 2: return 'medium';
        case 3: return 'strong';
        case 4: return 'very-strong';
        default: return '';
      }
    });
    
    // 密码不匹配检查
    const passwordsDoNotMatch = computed(() => {
      return form.confirmPassword && form.newPassword !== form.confirmPassword;
    });
    
    // 表单是否有效
    const isFormValid = computed(() => {
      return (
        form.currentPassword && 
        form.newPassword && 
        form.confirmPassword && 
        form.newPassword === form.confirmPassword &&
        passwordStrength.value >= 3 // 至少是"强"密码
      );
    });
    
    // 提交表单
    const handleSubmit = () => {
      if (!isFormValid.value) {
        return;
      }
      
      const passwordData: PasswordChangeRequest = {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      };
      
      emit('save', passwordData);
    };
    
    return {
      form,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      hasMinLength,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      passwordStrength,
      strengthText,
      strengthClass,
      passwordsDoNotMatch,
      isFormValid,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.password-form-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.form-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.form-header h2 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.password-form {
  max-width: 500px;
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

.password-input {
  display: flex;
  align-items: center;
}

.password-input input {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px 0 0 4px;
  transition: all 0.3s;
}

.password-input input:focus {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: none;
}

.toggle-password-btn {
  height: 36px;
  width: 36px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-eye {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' fill='%23999'/%3E%3C/svg%3E");
}

.icon-eye-off {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z' fill='%23999'/%3E%3C/svg%3E");
}

.password-strength {
  margin-top: 12px;
}

.strength-meter {
  height: 5px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-value {
  height: 100%;
  transition: width 0.3s;
}

.strength-value.very-weak {
  background-color: #ff4d4f;
}

.strength-value.weak {
  background-color: #ffa940;
}

.strength-value.medium {
  background-color: #fadb14;
}

.strength-value.strong {
  background-color: #52c41a;
}

.strength-value.very-strong {
  background-color: #13c2c2;
}

.strength-text {
  font-size: 12px;
  color: #999;
}

.password-tips {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
}

.password-tips p {
  margin: 0 0 5px 0;
}

.password-tips ul {
  margin: 0;
  padding-left: 18px;
}

.password-tips li {
  margin-bottom: 2px;
}

.password-tips li.valid {
  color: #52c41a;
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.save-btn {
  padding: 8px 20px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn:hover:not(:disabled) {
  background-color: #40a9ff;
}

.save-btn:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
}
</style>