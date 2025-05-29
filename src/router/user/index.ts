import type { RouteRecordRaw } from 'vue-router'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/doctor-personal-center',
    name: 'DoctorPersonalCenter',
    component: () => import('@/views/user/DoctorPersonalCenter.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true,
      requiresDoctor: true
    }
  },
  {
    path: '/patient-personal-center',
    name: 'PatientPersonalCenter',
    component: () => import('@/views/user/PatientPersonalCenterView.vue'),
    meta: {
      title: '患者个人中心',
      requiresAuth: true,
      requiresPatient: true
    },
    // 添加子路由，使得可以通过直接访问特定路径打开对应视图
    children: [
      {
        path: 'basic-info',
        name: 'PatientBasicInfo',
        component: () => import('@/views/user/PatientPersonalCenterView.vue'),
        props: { defaultView: 'basic-info' },
        meta: {
          title: '基本资料',
          requiresAuth: true,
          requiresPatient: true
        }
      },
      {
        path: 'change-password',
        name: 'PatientChangePassword',
        component: () => import('@/views/user/PatientPersonalCenterView.vue'),
        props: { defaultView: 'change-password' },
        meta: {
          title: '修改密码',
          requiresAuth: true,
          requiresPatient: true
        }
      },
      {
        path: 'points',
        name: 'PatientPoints',
        component: () => import('@/views/user/PatientPersonalCenterView.vue'),
        props: { defaultView: 'points' },
        meta: {
          title: '积分管理',
          requiresAuth: true,
          requiresPatient: true
        }
      },
      {
        path: 'contact-support',
        name: 'PatientContactSupport',
        component: () => import('@/views/user/PatientPersonalCenterView.vue'),
        props: { defaultView: 'contact-support' },
        meta: {
          title: '联系客服',
          requiresAuth: true,
          requiresPatient: true
        }
      },
      {
        path: 'delete-account',
        name: 'PatientDeleteAccount',
        component: () => import('@/views/user/PatientPersonalCenterView.vue'),
        props: { defaultView: 'delete-account' },
        meta: {
          title: '注销账户',
          requiresAuth: true,
          requiresPatient: true
        }
      }
    ]
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
  },

]

export default userRoutes