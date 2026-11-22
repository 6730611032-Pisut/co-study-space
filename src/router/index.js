import { defineRouter } from '#q-app'
import { createRouter, createMemoryHistory, createWebHashHistory } from 'vue-router'
import { Notify } from 'quasar'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth-store'

export default defineRouter(function () {
  const createHistory = import.meta.env.SSR ? createMemoryHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.BASE_URL),
  })

  Router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      Notify.create({ type: 'warning', message: 'กรุณาเข้าสู่ระบบก่อน' })
      return { name: 'login' }
    }

    if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
      Notify.create({ type: 'negative', message: 'หน้านี้สำหรับผู้ดูแลระบบเท่านั้น' })
      return { name: 'home' }
    } else if (to.name === 'login' && authStore.isAuthenticated) {
      return { name: authStore.user.role === 'admin' ? 'admin' : 'home' }
    }

    return true
  })

  return Router
})
