<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\PatientBasicInfoForm.vue -->
<template>
  <div class="basic-info-form">
    <div class="form-header">
      <h2>基本信息</h2>
      <button v-if="!isEditing" class="edit-btn" @click="$emit('edit')">修改信息</button>
    </div>
    
    <form @submit.prevent="handleSubmit" class="info-form">
      <div class="form-group">
        <label for="name">姓名：</label>
        <input 
          id="name" 
          v-model="form.name" 
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
            v-model="form.age" 
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
        <label for="phone">手机号：</label>
        <input 
          id="phone" 
          v-model="form.phone" 
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
          <select 
            v-model="form.province" 
            :disabled="!isEditing"
            :class="{ 'editing': isEditing }"
          >
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="广东">广东</option>
            <!-- 其他省份选项 -->
          </select>
          
          <select 
            v-model="form.city" 
            :disabled="!isEditing"
            :class="{ 'editing': isEditing }"
          >
            <option value="北京市">北京市</option>
            <option value="上海市">上海市</option>
            <option value="广州市">广州市</option>
            <!-- 其他城市选项 -->
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="address">联系地址：</label>
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
import { defineComponent, PropType, reactive, watch } from 'vue';
import type { UserInfo } from '@/types/user';

export default defineComponent({
  name: 'PatientBasicInfoForm',
  props: {
    userInfo: {
      type: Object as PropType<UserInfo>,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['edit', 'save', 'cancel'],
  setup(props, { emit }) {
    // 表单数据
    const form = reactive({
      name: '',
      age: '',
      gender: '男',
      phone: '',
      email: '',
      country: '中国',
      province: '北京',
      city: '北京市',
      address: ''
    });
    
    // 监听 userInfo 变化，更新表单数据
    watch(() => props.userInfo, (newValue) => {
      if (newValue) {
        form.name = newValue.name || '';
        form.age = newValue.age || '';
        form.gender = newValue.gender || '男';
        form.phone = newValue.phone || '';
        form.email = newValue.email || '';
        form.country = newValue.country || '中国';
        form.province = newValue.province || '北京';
        form.city = newValue.city || '北京市';
        form.address = newValue.address || '';
      }
    }, { immediate: true });
    
    // 提交表单
    const handleSubmit = () => {
      // 简单的表单验证
      if (!form.name.trim()) {
        alert('请输入姓名');
        return;
      }
      
      if (!form.phone.trim()) {
        alert('请输入手机号');
        return;
      }
      
      // 提交表单数据
      emit('save', {
        ...props.userInfo,
        name: form.name,
        age: form.age,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
        country: form.country,
        province: form.province,
        city: form.city,
        address: form.address
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

.location-inputs select {
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