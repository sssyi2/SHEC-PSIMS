<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\UserFormDialog.vue -->
<template>
  <div class="dialog-overlay">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>{{ isEdit ? '编辑用户' : '添加用户' }}</h2>
        <button class="close-btn" @click="$emit('cancel')">×</button>
      </div>
      
      <div class="dialog-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">用户名：</label>
            <input 
              id="username" 
              v-model="formData.username" 
              type="text" 
              required 
              :disabled="isEdit"
            />
            <div v-if="errors.username" class="error-text">{{ errors.username }}</div>
          </div>
          
          <div class="form-group">
            <label for="password">密码：</label>
            <div class="password-field">
              <input 
                id="password" 
                v-model="formData.password" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                placeholder="请输入密码"
              />
              <button 
                type="button" 
                class="toggle-password-btn" 
                @click="togglePasswordVisibility"
              >
                <span v-if="showPassword">隐藏</span>
                <span v-else>显示</span>
              </button>
            </div>
            <div v-if="errors.password" class="error-text">{{ errors.password }}</div>
          </div>
          
          <div class="form-group">
            <label for="name">姓名：</label>
            <input 
              id="name" 
              v-model="formData.name" 
              type="text" 
              required
            />
            <div v-if="errors.name" class="error-text">{{ errors.name }}</div>
          </div>
          
          <div class="form-group">
            <label for="role">角色：</label>
            <select id="role" v-model="formData.role" required>
              <option value="admin">系统管理员</option>
              <option value="doctor">医生</option>
              <option value="patient">病人</option>
            </select>
          </div>
        </form>
      </div>
      
      <div class="dialog-footer">
        <button class="cancel-btn" @click="$emit('cancel')">取消</button>
        <button class="save-btn" @click="handleSubmit">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { User } from '@/types/user.ts';

export default defineComponent({
  name: 'UserFormDialog',
  props: {
    user: {
      type: Object as PropType<User | null>,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const formData = reactive({
      id: 0,
      username: '',
      password: '',
      name: '',
      role: 'patient'
    });
    
    const showPassword = ref(false);
    
    const errors = reactive({
      username: '',
      password: '',
      name: ''
    });
    
    // 监听用户数据变化
    watch(() => props.user, (newVal) => {
      if (newVal) {
        formData.id = newVal.id;
        formData.username = newVal.username;
        formData.password = props.isEdit ? '' : newVal.password;
        formData.name = newVal.name;
        formData.role = newVal.role;
      }
    }, { immediate: true });
    
    // 切换密码显示状态
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    
    // 验证表单
    const validateForm = () => {
      let isValid = true;
      
      // 重置错误信息
      errors.username = '';
      errors.password = '';
      errors.name = '';
      
      // 验证用户名
      if (!formData.username.trim()) {
        errors.username = '用户名不能为空';
        isValid = false;
      } else if (formData.username.length < 3) {
        errors.username = '用户名长度不能少于3个字符';
        isValid = false;
      }
      
      // 验证密码（仅在添加模式或编辑模式下填写密码时验证）
      if (!props.isEdit || formData.password) {
        if (!formData.password) {
          errors.password = '密码不能为空';
          isValid = false;
        } else if (formData.password.length < 6) {
          errors.password = '密码长度不能少于6个字符';
          isValid = false;
        }
      }
      
      // 验证姓名
      if (!formData.name.trim()) {
        errors.name = '姓名不能为空';
        isValid = false;
      }
      
      return isValid;
    };
    
    // 提交表单
    const handleSubmit = () => {
      if (validateForm()) {
        // 创建用户对象
        const userToSave: User = {
          id: formData.id,
          username: formData.username,
          password: formData.password || (props.user?.password || ''),  // 如果编辑模式未修改密码，则保留原密码
          name: formData.name,
          role: formData.role
        };
        
        emit('save', userToSave);
      }
    };
    
    return {
      formData,
      showPassword,
      errors,
      togglePasswordVisibility,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  width: 500px;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.dialog-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.dialog-body {
  padding: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: none;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.password-field {
  display: flex;
}

.password-field input {
  flex-grow: 1;
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.toggle-password-btn {
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 0 12px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 12px;
  color: #666;
}

.error-text {
  color: #f5222d;
  font-size: 12px;
  margin-top: 4px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.cancel-btn,
.save-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #d9d9d9;
  margin-right: 8px;
}

.save-btn {
  background-color: #1890ff;
  color: white;
  border: none;
}

.save-btn:hover {
  background-color: #40a9ff;
}

.cancel-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}
</style>