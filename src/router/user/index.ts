import type { RouteRecordRaw } from 'vue-router'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: () => import('@/views/user/PersonalCenter.vue'),
    meta: {
      title: '个人中心'
    }
  },
   {
    path: '/user/permissions',
    name: 'UserPermissions',
    component: () => import('@/views/user/PermissionsManageView.vue'),
    meta: {
      title: '用户权限管理',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  
  {
    path: '/user/logs',
    name: 'UserLogs',
    component: () => import('@/views/user/LogsView.vue'),
    meta: {
      title: '日志查看',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  
  {
    path: '/user/feedback',
    name: 'UserFeedback',
    component: () => import('@/views/user/FeedbackView.vue'),
    meta: {
      title: '查看反馈',
      requiresAuth: true,
      requiresAdmin: true
    }
  }
//   {
//     path: '/profile',
//     name: 'UserProfile',
//     component: () => import('@/views/user/UserProfile.vue'),
//     meta: {
//       title: '个人资料'
//     }
//   },
//   {
//     path: '/settings',
//     name: 'UserSettings',
//     component: () => import('@/views/user/UserSettings.vue'),
//     meta: {
//       title: '账号设置'
//     }
//   },
//   {
//     path: '/work-schedule',
//     name: 'WorkSchedule',
//     component: () => import('@/views/user/WorkSchedule.vue'),
//     meta: {
//       title: '工作日程'
//     }
//   },
//   {
//     path: '/notifications',
//     name: 'Notifications',
//     component: () => import('@/views/user/Notifications.vue'),
//     meta: {
//       title: '消息通知'
//     }
//   },
//   {
//     path: '/performance',
//     name: 'Performance',
//     component: () => import('@/views/user/Performance.vue'),
//     meta: {
//       title: '工作绩效'
//     }
//   }
]

export default userRoutes