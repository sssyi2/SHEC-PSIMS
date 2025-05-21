import type { RouteRecordRaw } from 'vue-router'

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      title: '忘记密码',
      requiresAuth: false
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      title: '重置密码',
      requiresAuth: false
    }
  },
  {
    path: '/locked',
    name: 'Locked',
    component: () => import('@/views/auth/Locked.vue'),
    meta: {
      title: '账户锁定',
      requiresAuth: false
    }
  }
]

export default authRoutes