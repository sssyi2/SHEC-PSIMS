<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FollowupRecordForm.vue -->
<template>
  <div class="followup-record-form">
    <!-- 患者编号输入 -->
    <div class="form-group">
      <label class="form-label">患者编号</label>
      <div class="input-with-button">
        <input 
          type="text" 
          v-model="formData.patientId" 
          class="form-input"
          placeholder="请输入患者编号"
          @change="handlePatientIdChange"
        />
        <button class="search-button" @click="handlePatientIdChange">
          <i class="search-icon">🔍</i>
        </button>
      </div>
    </div>
    
    <!-- 疾病分类 -->
    <div class="form-group">
      <label class="form-label">疾病分类</label>
      <select v-model="formData.diseaseType" class="form-input">
        <option value="">-- 请选择 --</option>
        <option v-for="type in diseaseTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
    
    <!-- 疾病名称 -->
    <div class="form-group">
      <label class="form-label">疾病名称</label>
      <input 
        type="text" 
        v-model="formData.diseaseName" 
        class="form-input"
        placeholder="请输入疾病名称"
      />
    </div>
    
    <!-- 随访日期 -->
    <div class="form-group">
      <label class="form-label">随访日期</label>
      <input 
        type="date" 
        v-model="formData.followupDate" 
        class="form-input"
      />
    </div>
    
    <!-- 随访时间 -->
    <div class="form-group">
      <label class="form-label">随访时间</label>
      <input 
        type="time" 
        v-model="formData.followupTime" 
        class="form-input"
      />
    </div>
    
    <!-- 随访医生 -->
    <div class="form-group">
      <label class="form-label">随访医生</label>
      <input 
        type="text" 
        v-model="formData.followupStaff" 
        class="form-input"
        placeholder="请输入随访医生"
      />
    </div>
    
    <!-- 随访方式 -->
    <div class="form-group">
      <label class="form-label">随访方式</label>
      <select v-model="formData.followupMethod" class="form-input">
        <option value="">-- 请选择 --</option>
        <option value="电话随访">电话随访</option>
        <option value="门诊随访">门诊随访</option>
        <option value="家庭访视">家庭访视</option>
        <option value="视频随访">视频随访</option>
      </select>
    </div>
    
    <!-- 随访干预记录 -->
    <div class="form-group full-width">
      <label class="form-label">随访干预记录</label>
      <textarea 
        v-model="formData.content" 
        class="form-textarea"
        placeholder="请输入随访干预记录内容"
        rows="8"
      ></textarea>
    </div>
    
    <!-- 干预措施 -->
    <div class="form-group full-width">
      <label class="form-label">干预措施</label>
      <textarea 
        v-model="formData.interventionMeasures" 
        class="form-textarea"
        placeholder="请输入干预措施"
        rows="5"
      ></textarea>
    </div>
    
    <!-- 随访结果 -->
    <div class="form-group">
      <label class="form-label">随访结果</label>
      <select v-model="formData.result" class="form-input">
        <option value="">-- 请选择 --</option>
        <option value="良好">良好</option>
        <option value="一般">一般</option>
        <option value="较差">较差</option>
        <option value="需进一步随访">需进一步随访</option>
        <option value="需住院治疗">需住院治疗</option>
      </select>
    </div>
    
    <!-- 上传体检资料 -->
    <div class="form-group">
      <label class="form-label">上传体检资料</label>
      <div class="file-upload-container">
        <input 
          type="file" 
          id="file-upload" 
          class="file-input" 
          @change="handleFileUpload"
          multiple
        />
        <label for="file-upload" class="file-upload-button">
          选择文件
        </label>
        <span class="file-name">{{ uploadFileName }}</span>
      </div>
    </div>
    
    <!-- 备注 -->
    <div class="form-group full-width">
      <label class="form-label">备注</label>
      <textarea 
        v-model="formData.remarks" 
        class="form-textarea"
        placeholder="请输入备注信息"
        rows="3"
      ></textarea>
    </div>
    
    <!-- 保存按钮 -->
    <div class="form-actions">
      <button 
        class="save-button"
        @click="handleSubmit"
        :disabled="loading"
      >
        <span v-if="loading">保存中...</span>
        <span v-else>保存</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { FollowupRecord } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'FollowupRecordForm',
  props: {
    patientId: {
      type: String,
      default: ''
    },
    diseaseTypes: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['patient-change', 'save-record'],
  setup(props, { emit }) {
    // 表单数据
    const formData = reactive<FollowupRecord>({
      id: '',
      planId: '',
      patientId: props.patientId,
      patientName: '',
      diseaseType: '',
      diseaseName: '',
      followupDate: new Date().toISOString().split('T')[0],
      followupTime: new Date().toTimeString().slice(0, 5),
      followupMethod: '',
      content: '',
      interventionMeasures: '',
      result: '',
      followupStaff: '',
      remarks: '',
      attachments: []
    });
    
    // 文件上传相关
    const uploadedFiles = ref<File[]>([]);
    const uploadFileName = ref('未选择文件');
    
    // 监听患者ID变化
    watch(() => props.patientId, (newId) => {
      formData.patientId = newId;
    });
    
    // 处理患者ID变更
    const handlePatientIdChange = () => {
      emit('patient-change', formData.patientId);
    };
    
    // 处理文件上传
    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        uploadedFiles.value = Array.from(input.files);
        
        if (uploadedFiles.value.length === 1) {
          uploadFileName.value = uploadedFiles.value[0].name;
        } else {
          uploadFileName.value = `已选择 ${uploadedFiles.value.length} 个文件`;
        }
      } else {
        uploadedFiles.value = [];
        uploadFileName.value = '未选择文件';
      }
    };
    
    // 提交表单
    const handleSubmit = () => {
      // 表单验证
      if (!formData.patientId) {
        alert('请输入患者编号');
        return;
      }
      
      if (!formData.diseaseType) {
        alert('请选择疾病分类');
        return;
      }
      
      if (!formData.diseaseName) {
        alert('请输入疾病名称');
        return;
      }
      
      if (!formData.followupDate) {
        alert('请选择随访日期');
        return;
      }
      
      if (!formData.followupStaff) {
        alert('请输入随访医生');
        return;
      }
      
      if (!formData.followupMethod) {
        alert('请选择随访方式');
        return;
      }
      
      if (!formData.content) {
        alert('请输入随访干预记录');
        return;
      }
      
      if (!formData.result) {
        alert('请选择随访结果');
        return;
      }
      
      // 处理文件上传
      // 实际开发中，这里需要先上传文件到服务器，获取文件URL
      const filePromises = uploadedFiles.value.map(file => {
        // 模拟文件上传过程
        return new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(`https://example.com/uploads/${file.name}`);
          }, 500);
        });
      });
      
      if (filePromises.length > 0) {
        Promise.all(filePromises).then((fileUrls) => {
          formData.attachments = fileUrls;
          emit('save-record', { ...formData });
        });
      } else {
        emit('save-record', { ...formData });
      }
    };
    
    return {
      formData,
      uploadedFiles,
      uploadFileName,
      handlePatientIdChange,
      handleFileUpload,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.followup-record-form {
  padding: 10px;
}

.form-group {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.form-label {
  width: 120px;
  text-align: right;
  padding-right: 15px;
  line-height: 36px;
  color: #333;
  font-weight: 500;
}

.form-input {
  flex: 1;
  max-width: 400px;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
}

.form-textarea {
  flex: 1;
  max-width: 600px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
}

.input-with-button {
  display: flex;
  flex: 1;
  max-width: 400px;
}

.search-button {
  width: 40px;
  height: 36px;
  background-color: #1890ff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.search-button:hover {
  background-color: #40a9ff;
}

.search-icon {
  font-style: normal;
}

.input-with-button .form-input {
  border-right: none;
  border-radius: 4px 0 0 4px;
  flex: 1;
}

.file-upload-container {
  display: flex;
  align-items: center;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-upload-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.file-upload-button:hover {
  background-color: #e6e6e6;
}

.file-name {
  margin-left: 10px;
  color: #666;
}

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.save-button {
  padding: 8px 24px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.save-button:hover {
  background-color: #40a9ff;
}

.save-button:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.full-width {
  display: flex;
}

@media (max-width: 768px) {
  .form-group {
    flex-direction: column;
  }
  
  .form-label {
    width: 100%;
    text-align: left;
    margin-bottom: 5px;
    line-height: normal;
  }
  
  .form-input,
  .form-textarea,
  .input-with-button {
    max-width: 100%;
  }
}
</style>