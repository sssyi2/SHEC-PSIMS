<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientBasicInfoForm.vue -->
<template>
  <div class="basic-info-form">
    <div class="form-header">
      <h2>基本信息</h2>
      <button v-if="!isEditing" class="edit-btn" @click="$emit('edit')">修改信息</button>
    </div>
    
    <form @submit.prevent="handleSubmit" class="info-form">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input 
          id="username" 
          v-model="form.UserName" 
          type="text" 
          :disabled="true" 
          class="disabled"
        />
      </div>
      
      <div class="form-group">
        <label for="real_name">姓名：</label>
        <input 
          id="real_name" 
          v-model="form.real_name" 
          type="text" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        />
      </div>
      
      <div class="form-group">
        <label for="age">年龄：</label>
        <div class="input-with-suffix">
          <input 
            id="age" 
            v-model.number="form.age" 
            type="number" 
            :disabled="!isEditing"
            :class="{ 'editing': isEditing }"
          />
          <span class="input-suffix">岁</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="gender">性别：</label>
        <select 
          id="gender" 
          v-model="form.gender" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        >
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="phoneNumber">手机号：</label>
        <input 
          id="phoneNumber" 
          v-model="form.phoneNumber" 
          type="tel" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        />
      </div>
      
      <div class="form-group">
        <label for="email">邮箱：</label>
        <input 
          id="email" 
          v-model="form.email" 
          type="email" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        />
      </div>
      
      <div class="form-group">
        <label>国家/地区：</label>
        <input 
          v-model="form.country" 
          type="text" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        />
      </div>
      
      <div class="form-group location-group">
        <label>所在地区：</label>
        <div class="location-inputs">
          <input 
            v-model="form.city" 
            type="text" 
            placeholder="城市" 
            :disabled="!isEditing"
            :class="{ 'editing': isEditing }"
          />
          
          <input 
            v-model="form.area" 
            type="text" 
            placeholder="区/县" 
            :disabled="!isEditing"
            :class="{ 'editing': isEditing }"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="department">部门/科室：</label>
        <input 
          id="department" 
          v-model="form.department" 
          type="text" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        />
      </div>
      
      <div class="form-group">
        <label for="address">详细地址：</label>
        <input 
          id="address" 
          v-model="form.address" 
          type="text" 
          :disabled="!isEditing"
          :class="{ 'editing': isEditing }"
        />
      </div>
      
      <div v-if="isEditing" class="form-actions">
        <button type="button" class="cancel-btn" @click="$emit('cancel')">取消</button>
        <button type="submit" class="save-btn">保存</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import type { PropType } from 'vue';
import type { userInfo } from '@/types/user';

export default defineComponent({
  name: 'PatientBasicInfoForm',
  props: {
    userInfo: {
      type: Object as PropType<userInfo>,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['edit', 'save', 'cancel'],
  setup(props, { emit }) {
    // 表单数据 - 根据user.ts接口调整字段
    const form = reactive({
      id: 0,
      UserName: '',
      real_name: '',
      age: 0,
      gender: '男',
      phoneNumber: '',
      email: '',
      country: '中国',
      city: '',
      area: '',
      address: '',
      passwordHash: '',
      role: '',
      department: ''
    });
    
    // 监听 userInfo 变化，更新表单数据
    watch(() => props.userInfo, (newValue) => {
      if (newValue) {
        // 使用解构赋值并映射数据到表单
        Object.assign(form, newValue);
      }
    }, { immediate: true });
    
    // 提交表单
    const handleSubmit = () => {
      // 简单的表单验证
      if (!form.real_name.trim()) {
        alert('请输入姓名');
        return;
      }
      
      if (!form.phoneNumber.trim()) {
        alert('请输入手机号');
        return;
      }
      
      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(form.phoneNumber)) {
        alert('请输入正确的手机号码格式');
        return;
      }
      
      // 验证邮箱格式（如果有填写）
      if (form.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
          alert('请输入正确的邮箱格式');
          return;
        }
      }
      
      // 提交表单数据 - 保持用户ID、用户名和密码不变
      emit('save', {
        ...form,
        id: props.userInfo.id,
        UserName: props.userInfo.UserName,
        passwordHash: props.userInfo.passwordHash,
        role: props.userInfo.role
      });
    };
    
    return {
      form,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.basic-info-form {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.edit-btn {
  padding: 6px 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #40a9ff;
}

.info-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.form-group input,
.form-group select {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

.form-group input:disabled,
.form-group select:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.form-group input.disabled {
  background-color: #f0f0f0;
}

.form-group input.editing,
.form-group select.editing {
  background-color: #fff;
  border-color: #d9d9d9;
}

.form-group input.editing:focus,
.form-group select.editing:focus {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: none;
}

.input-with-suffix {
  display: flex;
  align-items: center;
}

.input-with-suffix input {
  flex: 1;
  border-radius: 4px 0 0 4px;
}

.input-suffix {
  height: 36px;
  padding: 0 12px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  color: #666;
}

.location-group {
  grid-column: span 2;
}

.location-inputs {
  display: flex;
  gap: 10px;
}

.location-inputs input {
  flex: 1;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 8px 20px;
  background-color: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  color: #40a9ff;
  border-color: #40a9ff;
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

.save-btn:hover {
  background-color: #40a9ff;
}

@media (max-width: 768px) {
  .info-form {
    grid-template-columns: 1fr;
  }
  
  .location-group {
    grid-column: span 1;
  }
  
  .form-actions {
    grid-column: span 1;
  }
}
</style>