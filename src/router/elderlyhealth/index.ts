import type { RouteRecordRaw } from 'vue-router'

const healthRoutes: Array<RouteRecordRaw> = [
  {
    path: '/health-records',
    name: 'HealthRecords',
    component: () => import('@/views/elderlyhealth/HealthRecords.vue'),
    meta: {
      title: '健康档案管理',
      requiresAuth: true
    }
  },
  {
    path: '/electronic-medical-records',
    name: 'ElectronicMedicalRecords',
    component: () => import('@/views/elderlyhealth/ElectronicMedicalRecords.vue'),
    meta: {
      title: '电子病历',
      requiresAuth: true
    }
  },
  {
    path: '/medical-advice',
    name: 'MedicalAdvice',
    component: () => import('@/views/elderlyhealth/MedicalAdvice.vue'),
    meta: {
      title: '医嘱信息',
      requiresAuth: true
    }
  },
  {
    path: '/emergency-contacts',
    name: 'EmergencyContacts',
    component: () => import('@/views/elderlyhealth/EmergencyContacts.vue'),
    meta: {
      title: '紧急联系人',
      requiresAuth: true
    }
  }

]

export default healthRoutes