import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/home/HomeView.vue'
import bigdataRoutes from './bigdata'
import healthRoutes from './elderlyhealth'
import warningRoutes from './healthwarning'
import consultationRoutes from './healthconsultation'
import userRoutes from './user'
import authRoutes from './auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...bigdataRoutes,
  ...healthRoutes,
  ...warningRoutes,
  ...consultationRoutes,
  ...userRoutes,
  ...authRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '@/views/Home.vue'
// import bigdataRoutes from './bigdata'
// import healthRoutes from './elderlyhealth'
// import warningRoutes from './healthwarning'
// import consultationRoutes from './healthconsultation'
// import userRoutes from './user'
// import authRoutes from './auth'

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     meta: {
//       title: '首页'
//     }
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: () => import('@/views/NotFound.vue'),
//     meta: {
//       title: '页面不存在'
//     }
//   },
//   ...bigdataRoutes,
//   ...healthRoutes,
//   ...warningRoutes,
//   ...consultationRoutes,
//   ...userRoutes,
//   ...authRoutes
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// // 全局前置守卫 - 用于处理路由跳转前的权限验证
// router.beforeEach((to, from, next) => {
//   // 设置页面标题
//   document.title = `${to.meta.title} - 智慧医养系统` || '智慧医养医生服务智能管理系统'
  
//   // 检查该路由是否需要身份验证
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)
  
//   // 获取当前登录状态
//   const isAuthenticated = localStorage.getItem('user-token')
  
//   if (requiresAuth && !isAuthenticated) {
//     // 需要登录权限但未登录时，重定向到登录页面
//     next({ name: 'Login', query: { redirect: to.fullPath } })
//   } else {
//     // 其他情况正常进入
//     next()
//   }
// })

// export default router