<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\UserProfileForm.vue -->
<template>
  <div class="user-profile-form">
    <div class="form-header">
      <div class="title">基本资料</div>
      <div class="subtitle">{{ isEditing ? "正在修改信息..." : "基本信息" }}</div>
    </div>
    
    <div class="form-content">
      <div class="form-group">
        <label class="form-label">姓名：</label>
        <input 
          v-if="isEditing" 
          v-model="formData.real_name" 
          type="text" 
          class="form-input" 
        />
        <div v-else class="form-value">{{ formData.real_name }}</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">性别：</label>
        <select 
          v-if="isEditing" 
          v-model="formData.gender" 
          class="form-select"
        >
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <div v-else class="form-value">{{ formData.gender }}</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">年龄：</label>
        <div class="form-input-group" v-if="isEditing">
          <input 
            v-model="formData.age" 
            type="text" 
            class="form-input" 
          />
          <span class="form-suffix">岁</span>
        </div>
        <div v-else class="form-value">{{ formData.age }} 岁</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">手机号：</label>
        <input 
          v-if="isEditing" 
          v-model="formData.phoneNumber" 
          type="text" 
          class="form-input" 
        />
        <div v-else class="form-value">{{ formData.phoneNumber }}</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">邮箱：</label>
        <input 
          v-if="isEditing" 
          v-model="formData.email" 
          type="email" 
          class="form-input" 
        />
        <div v-else class="form-value">{{ formData.email || '未设置' }}</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">国家/地区：</label>
        <select 
          v-if="isEditing" 
          v-model="formData.country" 
          class="form-select"
        >
          <option value="中国">中国</option>
          <option value="美国">美国</option>
          <option value="英国">英国</option>
        </select>
        <div v-else class="form-value">{{ formData.country }}</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">所在地区：</label>
        <div v-if="isEditing" class="region-selects">
          <select v-model="formData.area" class="form-select region-select">
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="广东">广东</option>
          </select>
          <select v-model="formData.city" class="form-select region-select">
            <option value="北京市">北京市</option>
            <option value="上海市">上海市</option>
            <option value="广州市">广州市</option>
          </select>
        </div>
        <div v-else class="form-value">{{ formData.area }} {{ formData.city }}</div>
      </div>
      
 <div class="form-group">
        <label class="form-label">所属部门：</label>
        <input 
          v-if="isEditing" 
          v-model="formData.department" 
          type="text" 
          class="form-input" 
        />
        <div v-else class="form-value">{{ formData.department || '未设置' }}</div>
      </div>

      <div class="form-group">
        <label class="form-label">联系地址：</label>
        <input 
          v-if="isEditing" 
          v-model="formData.address" 
          type="text" 
          class="form-input" 
        />
        <div v-else class="form-value">{{ formData.address || '未设置' }}</div>
      </div>
      
      <div class="form-actions">
        <button 
          v-if="isEditing" 
          class="btn btn-primary" 
          @click="saveProfile"
        >
          保存
        </button>
        <button 
          v-else 
          class="btn btn-edit" 
          @click="startEdit"
        >
          修改信息
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import axios from 'axios';
import type { PropType } from 'vue'
import type { userInfo } from '@/types/user.ts';

// interface userInfo  {
 
//   // id: number;
//   UserName: string;
//   age: number;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   gender: string;
//   country: string;
//   city: string;
//   area: string;
//   PasswordHash: string;
//   real_name: string;
//   role: string;
//   department: string;
// }
interface AResponse<T>  {
  message: string;
  code: number;
  data: userInfo;
}
export default defineComponent({
  name: 'UserProfileForm',
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
  emits: ['save', 'edit'],
  setup(props, { emit }) {
     // 表单数据
    const formData = reactive({ ...props.userInfo })
   
    //  //获取用户信息
      const fetchUserInfo = async () => {
       try {
         const response = await axios.get<AResponse<userInfo>>('http://localhost:8080/user/modify/list/19');
          if(response.data.code===200){
            // alert('成功获取用户信息')
            Object.assign(formData, response.data.data);
            
          }else if(response.data.code===507)
          {
            alert('用户不存在');
            console.log('用户不存在');
          }
    
      } catch (error) {
        console.error('获取用户信息失败:', error);
        alert('获取用户信息失败，请稍后再试。');
      }
    };
  onMounted(fetchUserInfo);
       const jsonString=JSON.stringify(formData);
    // 当 userInfo 变化时更新表单数据
    watch(() => props.userInfo, (newValue) => {
      Object.assign(formData, newValue)
    })
    //  const jsonString=JSON.stringify(formData);
    // 开始编辑
    const startEdit = () => {
      emit('edit')
    }
    
    // 保存个人资料
    const saveProfile = async() => {
       try {
        // 这里可以添加表单验证逻辑
        const response = await axios.post<AResponse<userInfo>>('http://localhost:8080/user/modify/doctor/19', formData,{ 
    headers: {
        'Content-Type': 'application/json'
    }
  });
        if (response.data.code === 200) {
          alert('保存成功！');
          emit('save', { ...formData });
        } else {
          alert('保存失败，请稍后再试。');
        }
      } catch (error) {
        console.error('保存失败:', error);
        alert('保存失败，请稍后再试。');
      }
     
    }
  
    return {
      formData,
      startEdit,
      saveProfile
    }
  }
});
</script>

<style scoped>
.user-profile-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}

.form-content {
  padding: 10px 0;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.form-label {
  width: 100px;
  text-align: right;
  padding-right: 15px;
  color: #333;
}

.form-input, .form-select {
  flex: 1;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  max-width: 300px;
}

.form-select {
  background-color: #fff;
}

.form-input-group {
  display: flex;
  align-items: center;
}

.form-suffix {
  margin-left: 10px;
}

.form-value {
  color: #333;
}

.region-selects {
  display: flex;
  gap: 10px;
}

.region-select {
  width: 150px;
}

.form-actions {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
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

.btn-edit {
  background-color: #f0f0f0;
  color: #333;
}

.btn-edit:hover {
  background-color: #e0e0e0;
}
</style>