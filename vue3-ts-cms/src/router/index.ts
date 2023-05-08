import { LOGIN_TOKEN } from '@/globle/constant'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/mapMenu'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/notFound/notFound.vue')
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
  // 如果去的是main，就跳转到第一次菜单的url
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
