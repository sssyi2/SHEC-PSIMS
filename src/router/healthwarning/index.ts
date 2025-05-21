import type { RouteRecordRaw } from 'vue-router'

const healthWarningRoutes: Array<RouteRecordRaw> = [
  {
    path: '/warning-settings',
    name: 'WarningSettings',
    component: () => import('@/views/healthwarning/WarningSettings.vue'),
    meta: {
      title: '预警提醒设置',
      requiresAuth: true
    }
  },
  {
    path: '/warning-information',
    name: 'WarningInformation',
    component: () => import('@/views/healthwarning/WarningInformation.vue'),
    meta: {
      title: '预警信息',
      requiresAuth: true
    }
  },
  {
    path: '/followup-plan',
    name: 'FollowupPlan',
    component: () => import('@/views/healthwarning/FollowupPlan.vue'),
    meta: {
      title: '随访计划',
      requiresAuth: true
    }
  },
  {
    path: '/followup-record',
    name: 'FollowupRecord',
    component: () => import('@/views/healthwarning/FollowupRecord.vue'),
    meta: {
      title: '随访干预记录',
      requiresAuth: true
    }
  },
  {
    path: '/followup-report',
    name: 'FollowupReport',
    component: () => import('@/views/healthwarning/FollowupReport.vue'),
    meta: {
      title: '随访工作报告',
      requiresAuth: true
    }
  }
]

export default healthWarningRoutes