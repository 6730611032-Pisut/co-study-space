import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null)

    const isAuthenticated = computed(() => user.value !== null)

    const login = (username, password, studentId) => {
      const demoAccounts = {
        student: { password: '123456', name: 'Student', role: 'student' },
        admin: { password: 'admin123', name: 'Admin', role: 'admin' },
      }
      const account = demoAccounts[username]
      const validStudentId = /^\d{10}$/.test(studentId)

      if (!account || account.password !== password || !validStudentId) {
        return false
      }

      user.value = {
        username,
        name: account.name,
        role: account.role,
        studentId,
      }
      return true
    }

    const logout = () => {
      user.value = null
    }

    return { user, isAuthenticated, login, logout }
  },
  { persist: true },
)
