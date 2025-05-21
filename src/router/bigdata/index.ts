import type { RouteRecordRaw } from 'vue-router'

const bigdataRoutes: Array<RouteRecordRaw> = [
  {
    path: '/data-analysis',
    name: 'DataAnalysis',
    component: () => import('@/views/bigdata/DataAnalysis.vue'),
    meta: {
      title: '数据分析仪表盘'
    }
  },
  {
    path: '/data-trend',
    name: 'DataTrend',
    component: () => import('@/views/bigdata/DataTrend.vue'),
    meta: {
      title: '数据趋势预测'
    }
  },
  {
    path: '/resource-advice',
    name: 'ResourceAdvice',
    component: () => import('@/views/bigdata/ResourceAdvice.vue'),
    meta: {
      title: '医疗资源分配建议'
    }
  }
]

export default bigdataRoutes