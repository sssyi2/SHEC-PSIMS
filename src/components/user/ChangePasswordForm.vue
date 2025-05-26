<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\user\ChangePasswordForm.vue -->
<template>
  <div class="change-password-form">
    <div class="form-header">
      <div class="title">修改密码</div>
    </div>
    
    <div class="form-content">
      <div class="form-group">
        <label class="form-label">旧密码：</label>
        <input 
          v-model="formData.oldPassword" 
          type="password" 
          class="form-input" 
          placeholder="请输入当前密码"
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">新密码：</label>
        <input 
          v-model="formData.newPassword" 
          type="password" 
          class="form-input" 
          placeholder="请输入新密码"
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">确认密码：</label>
        <input 
          v-model="formData.confirmPassword" 
          type="password" 
          class="form-input" 
          placeholder="请再次输入新密码"
        />
      </div>
      
      <div v-if="errors.length" class="form-errors">
        <div class="error-message" v-for="(error, index) in errors" :key="index">
          {{ error }}
        </div>
      </div>
      
      <div class="form-actions">
        <button class="btn btn-primary" @click="changePassword">
          确认修改
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import axios from 'axios';
import {ElMessage}  from 'element-plus';
interface UserInfo  {
 
  // id: number;
  UserName: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  country: string;
  city: string;
  area: string;
  PasswordHash: string;
  real_name: string;
  role: string;
  department: string;
}
interface AResponse<T>  {
  message: string;
  code: number;
  data: UserInfo;
}
export default defineComponent({
  name: 'ChangePasswordForm',
  setup() {
    // 表单数据
    const formData = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    
    // 错误信息
    const errors = ref<string[]>([])
    
    // 验证表单
    const validateForm = (): boolean => {
      errors.value = []
      
      if (!formData.oldPassword) {
        errors.value.push('请输入旧密码')
      }
      
      if (!formData.newPassword) {
        errors.value.push('请输入新密码')
      } else if (formData.newPassword.length < 6) {
        errors.value.push('新密码长度不能小于6位')
      }
      
      if (!formData.confirmPassword) {
        errors.value.push('请确认新密码')
      } else if (formData.confirmPassword !== formData.newPassword) {
        errors.value.push('两次输入的密码不一致')
      }
      
      return errors.value.length === 0
    }
    
  //   // 修改密码
  //   const changePassword = () => {
  //     console.log('修改密码');
  //       if (!validateForm()) {
  //   console.error("表单验证失败");
  //   ElMessage.warning("请正确填写所有字段");
  //   return;
  // }
  //     if (validateForm()) {
  //       axios.post('http://localhost:8080/user/modify/19',{
  //        oldPassword: formData.oldPassword,
  //        newPassword: formData.newPassword,
  //    confirmPassword: formData.confirmPassword
  //     },{
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }) .then(response => {
  //       console.log('密码修改成功');
  //         //  ElMessage.success('密码修改成功');
  //          console.log(response.data);
  //          // 清空表单
  //          formData.oldPassword = '';
  //          formData.newPassword = '';
  //          formData.confirmPassword = '';
  //        })
  //       .catch(error => {
  //          ElMessage.error('密码修改失败: ' + error.message);
  //        });
  //     }
      
  //   };
    
  const changePassword = async () => {
   
  console.log('开始修改密码流程...');
  try {
    const params = new URLSearchParams();
    params.append('oldPassword', formData.oldPassword);
    params.append('newPassword', formData.newPassword);
    params.append('confirmPassword', formData.confirmPassword);


    const response = await axios.post<AResponse<UserInfo>>(`http://localhost:8080/user/modify/19?${params.toString()}`, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
       
      }
    });
if (validateForm()) {
    console.log('完整响应:', response.data);
    
    if (response.data.code === 200) {
      alert('密码修改成功');
      formData.oldPassword = '';
      formData.newPassword = '';
      formData.confirmPassword = '';
    } else if(response.data.code===535){
      alert('新密码不能为空');
     
    }else if(response.data.code==536){
      alert('旧密码不能为空');
    }else if(response.data.code===540){
      alert('密码错误');
    }else if(response.data.code===537){
      alert('新密码不能与旧密码相同');
    }else if(response.data.code===538){
      alert('新密码与确认密码不相同');
    }else if(response.data.code===539){
      alert('修改密码失败');
    }
  }
  } catch (error: any) {
    console.error('完整错误:', error);
    if (error.response) {
      
      console.error('错误响应数据:', error.response.data);
      const serverMessage = error.response.data.message || 
                          error.response.data.error ||
                          JSON.stringify(error.response.data);
      ElMessage.error(`服务器返回错误: ${serverMessage}`);
    } else {
      ElMessage.error('请求失败: ' + error.message);
    }
  }
  
};
    return {
      formData,
      errors,
      changePassword
    }
  }
});
</script>

<style scoped>
.change-password-form {
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

.form-input {
  flex: 1;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  max-width: 300px;
}

.form-errors {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
}

.error-message {
  color: #ff4d4f;
  line-height: 1.5;
  margin-bottom: 5px;
}

.error-message:last-child {
  margin-bottom: 0;
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
</style>