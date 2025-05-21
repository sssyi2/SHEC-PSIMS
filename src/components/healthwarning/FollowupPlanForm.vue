<!-- filepath: e:\vuework\SHEC-PSIMS\SHEC-PSIMS\src\components\healthwarning\FollowupPlanForm.vue -->
<template>
  <div class="modal-overlay" @click="$emit('cancel')">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">{{ isEditMode ? '修改随访计划' : '新增随访计划' }}</h2>
        <button class="close-button" @click="$emit('cancel')">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-section">
          <h3 class="section-title">患者信息</h3>
          
          <div v-if="isEditMode" class="info-grid">
            <div class="info-item">
              <span class="label">患者编号：</span>
              <span class="value">{{ formData.patientId }}</span>
            </div>
            <div class="info-item">
              <span class="label">姓名：</span>
              <span class="value">{{ formData.patientName }}</span>
            </div>
            <div class="info-item">
              <span class="label">年龄：</span>
              <span class="value">{{ formData.patient?.age }}</span>
            </div>
            <div class="info-item">
              <span class="label">性别：</span>
              <span class="value">{{ formData.patient?.gender }}</span>
            </div>
          </div>
          
          <div v-else class="form-grid">
            <div class="form-group">
              <label class="form-label">患者编号：</label>
              <input 
                type="text" 
                v-model="formData.patientId" 
                class="form-input"
                placeholder="请输入患者编号"
              />
            </div>
            <div class="form-group">
              <label class="form-label">姓名：</label>
              <input 
                type="text" 
                v-model="formData.patientName" 
                class="form-input"
                placeholder="请输入患者姓名"
              />
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3 class="section-title">随访信息</h3>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">随访日期：</label>
              <input 
                type="date" 
                v-model="formData.nextFollowupDate" 
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">随访时间：</label>
              <input 
                type="time" 
                v-model="formData.followupTime" 
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">随访医生：</label>
              <input 
                type="text" 
                v-model="formData.responsiblePerson" 
                class="form-input"
                placeholder="请输入随访医生"
              />
            </div>
            <div class="form-group">
              <label class="form-label">随访类型：</label>
              <input 
                type="text" 
                v-model="formData.followupType" 
                class="form-input"
                placeholder="请输入随访类型"
              />
            </div>
            <div class="form-group">
              <label class="form-label">随访周期：</label>
              <select v-model="formData.followupCycle" class="form-input">
                <option value="每日">每日</option>
                <option value="每周">每周</option>
                <option value="两周">两周</option>
                <option value="每月">每月</option>
                <option value="每季度">每季度</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">状态：</label>
              <select v-model="formData.status" class="form-input">
                <option value="pending">待随访</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
              </select>
            </div>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label">随访内容：</label>
            <textarea 
              v-model="formData.content" 
              class="form-textarea"
              placeholder="请输入随访内容"
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label">备注：</label>
            <textarea 
              v-model="formData.remarks" 
              class="form-textarea"
              placeholder="请输入备注信息（选填）"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="submit-button" @click="handleSubmit">提交</button>
        <button class="cancel-button" @click="$emit('cancel')">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import type { PropType } from 'vue'
import type { FollowupPlan } from '@/types/health-warning.ts'

export default defineComponent({
  name: 'FollowupPlanForm',
  props: {
    plan: {
      type: Object as PropType<FollowupPlan | null>,
      default: null
    },
    mode: {
      type: String as PropType<'add' | 'edit'>,
      default: 'add'
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const isEditMode = computed(() => props.mode === 'edit');
    
    // 表单数据
    const formData = reactive<FollowupPlan>({
      id: props.plan?.id || 0,
      patientId: props.plan?.patientId || '',
      patientName: props.plan?.patientName || '',
      patient: props.plan?.patient || undefined,
      followupType: props.plan?.followupType || '',
      followupCycle: props.plan?.followupCycle || '每月',
      nextFollowupDate: props.plan?.nextFollowupDate || new Date().toISOString().split('T')[0],
      followupTime: props.plan?.followupTime || '09:00',
      content: props.plan?.content || '',
      responsiblePerson: props.plan?.responsiblePerson || '',
      createdAt: props.plan?.createdAt || '',
      status: props.plan?.status || 'pending',
      remarks: props.plan?.remarks || ''
    });
    
    // 提交表单
    const handleSubmit = () => {
      // 表单验证
      if (!formData.patientId) {
        alert('请输入患者编号');
        return;
      }
      
      if (!formData.patientName) {
        alert('请输入患者姓名');
        return;
      }
      
      if (!formData.nextFollowupDate) {
        alert('请选择随访日期');
        return;
      }
      
      if (!formData.followupTime) {
        alert('请选择随访时间');
        return;
      }
      
      if (!formData.responsiblePerson) {
        alert('请输入随访医生');
        return;
      }
      
      if (!formData.followupType) {
        alert('请输入随访类型');
        return;
      }
      
      if (!formData.content) {
        alert('请输入随访内容');
        return;
      }
      
      emit('save', { ...formData });
    };
    
    return {
      isEditMode,
      formData,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  width: 700px;
  max-width: 90%;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.form-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  border-left: 4px solid #1890ff;
  padding-left: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
}

.info-item .label {
  width: 100px;
  color: #666;
}

.info-item .value {
  flex-grow: 1;
  color: #333;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  margin-bottom: 5px;
  color: #333;
}

.form-input {
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
}

.form-textarea {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  resize: vertical;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.submit-button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #40a9ff;
}

.cancel-button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}
</style>