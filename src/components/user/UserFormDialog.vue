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
              v-model="formData.UserName" 
              type="text" 
              required 
              :disabled="isEdit"
            />
            <div v-if="errors.UserName" class="error-text">{{ errors.UserName }}</div>
          </div>
          
          <div class="form-group">
            <label for="password">密码：</label>
            <div class="password-field">
              <input 
                id="password" 
                v-model="formData.passwordHash" 
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
            <div v-if="errors.passwordHash" class="error-text">{{ errors.passwordHash }}</div>
          </div>
          
          <div class="form-group">
            <label for="name">姓名：</label>
            <input 
              id="name" 
              v-model="formData.real_name" 
              type="text" 
              required
            />
            <div v-if="errors.real_name" class="error-text">{{ errors.real_name }}</div>
          </div>
          
          <div class="form-group">
            <label for="role">角色：</label>
            <select id="role" v-model="formData.role" required>
              <option value="admin">系统管理员</option>
              <option value="doctor">医生</option>
              <option value="patient">病人</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="email">邮箱：</label>
            <input 
              id="email" 
              v-model="formData.email" 
              type="email"
            />
            <div v-if="errors.email" class="error-text">{{ errors.email }}</div>
          </div>
          
          <div class="form-group">
            <label for="phoneNumber">手机号码：</label>
            <input 
              id="phoneNumber" 
              v-model="formData.phoneNumber" 
              type="tel"
            />
            <div v-if="errors.phoneNumber" class="error-text">{{ errors.phoneNumber }}</div>
          </div>
          
          <div class="form-group">
            <label for="gender">性别：</label>
            <select id="gender" v-model="formData.gender">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="age">年龄：</label>
            <input 
              id="age" 
              v-model.number="formData.age" 
              type="number" 
              min="0"
            />
          </div>
          
          <div class="form-group">
            <label for="department">部门：</label>
            <input 
              id="department" 
              v-model="formData.department" 
              type="text"
            />
          </div>
          
          <div class="form-group">
            <label for="address">地址：</label>
            <input 
              id="address" 
              v-model="formData.address" 
              type="text"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="country">国家：</label>
              <input 
                id="country" 
                v-model="formData.country" 
                type="text"
              />
            </div>
            
            <div class="form-group">
              <label for="city">城市：</label>
              <input 
                id="city" 
                v-model="formData.city" 
                type="text"
              />
            </div>
            
            <div class="form-group">
              <label for="area">地区：</label>
              <input 
                id="area" 
                v-model="formData.area" 
                type="text"
              />
            </div>
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
import type { userInfo } from '@/types/user';

export default defineComponent({
  name: 'UserFormDialog',
  props: {
    user: {
      type: Object as PropType<userInfo | null>,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const formData = reactive<userInfo>({
      id: 0,
      UserName: '',
      passwordHash: '',
      real_name: '',
      role: 'patient',
      age: 0,
      email: '',
      phoneNumber: '',
      address: '',
      gender: '男',
      country: '中国',
      city: '',
      area: '',
      department: ''
    });
    
    const showPassword = ref(false);
    
    const errors = reactive({
      UserName: '',
      passwordHash: '',
      real_name: '',
      email: '',
      phoneNumber: ''
    });
    
    // 监听用户数据变化
    watch(() => props.user, (newVal) => {
      if (newVal) {
        // 使用对象解构来复制所有属性
        Object.assign(formData, newVal);
        
        // 如果是编辑模式，清空密码字段（不显示原始密码）
        if (props.isEdit) {
          formData.passwordHash = '';
        }
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
      errors.UserName = '';
      errors.passwordHash = '';
      errors.real_name = '';
      errors.email = '';
      errors.phoneNumber = '';
      
      // 验证用户名
      if (!formData.UserName.trim()) {
        errors.UserName = '用户名不能为空';
        isValid = false;
      } else if (formData.UserName.length < 3) {
        errors.UserName = '用户名长度不能少于3个字符';
        isValid = false;
      }
      
      // 验证密码（仅在添加模式或编辑模式下填写密码时验证）
      if (!props.isEdit || formData.passwordHash) {
        if (!formData.passwordHash) {
          errors.passwordHash = '密码不能为空';
          isValid = false;
        } else if (formData.passwordHash.length < 6) {
          errors.passwordHash = '密码长度不能少于6个字符';
          isValid = false;
        }
      }
      
      // 验证姓名
      if (!formData.real_name.trim()) {
        errors.real_name = '姓名不能为空';
        isValid = false;
      }
      
      // 验证邮箱格式（如果提供了邮箱）
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = '请输入有效的邮箱地址';
        isValid = false;
      }
      
      // 验证手机号码格式（如果提供了手机号码）
      if (formData.phoneNumber && !/^1[3-9]\d{9}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = '请输入有效的手机号码';
        isValid = false;
      }
      
      return isValid;
    };
    
    // 提交表单
    const handleSubmit = () => {
      if (validateForm()) {
        // 创建一个新的用户对象，避免修改原始数据
        const userToSave: userInfo = { ...formData };
        
        // 如果是编辑模式且未修改密码，则不发送密码字段
        if (props.isEdit && !formData.passwordHash) {
          userToSave.passwordHash = props.user?.passwordHash || '';
        }
        
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
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-row .form-group {
  flex: 1;
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