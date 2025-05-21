import type { RouteRecordRaw } from 'vue-router'

const consultationRoutes: Array<RouteRecordRaw> = [
  {
    path: '/health-consultation',
    name: 'HealthConsultation',
    component: () => import('@/views/healthconsultation/HealthConsultation.vue'),
    meta: {
      title: '健康咨询'
    }
  },
  {
    path: '/consultation/record/:id',
    name: 'ConsultationRecord',
    component: () => import('@/views/healthconsultation/ConsultationRecord.vue'),
    meta: {
      title: '咨询记录',
      requiresAuth: true
    }
  }
]

export default consultationRoutes