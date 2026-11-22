<template>
  <div class="login-bg flex flex-center q-pa-md">
    <q-card class="login-card q-pa-md">
      <q-card-section class="text-center">
        <q-avatar size="64px" color="primary" text-color="white" icon="menu_book" />
        <div class="text-h5 text-weight-bold text-primary q-mt-md">Co-Study Space</div>
        <div class="text-body2 text-grey-7">จองโต๊ะและห้องอ่านหนังสือในมหาวิทยาลัย</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onLogin">
          <q-input
            v-model="username"
            label="Username"
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'กรุณากรอก Username']"
          >
            <template v-slot:prepend><q-icon name="person" color="primary" /></template>
          </q-input>

          <q-input
            v-model="studentId"
            label="รหัสนักศึกษา 10 หลัก"
            type="text"
            inputmode="numeric"
            maxlength="10"
            outlined
            lazy-rules
            :rules="[
              (val) => !!val || 'กรุณากรอกรหัสนักศึกษา',
              (val) => /^\d{10}$/.test(val) || 'รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก',
            ]"
          >
            <template v-slot:prepend><q-icon name="badge" color="primary" /></template>
          </q-input>

          <q-input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'กรุณากรอก Password']"
          >
            <template v-slot:prepend><q-icon name="lock" color="primary" /></template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="demo-box q-pa-sm q-mb-md text-caption">
            <div>นักศึกษา: <b>student</b> / <b>123456</b></div>
            <div>ผู้ดูแล: <b>admin</b> / <b>admin123</b></div>
            <div class="q-mt-xs">กรอกรหัสนักศึกษา 10 หลักเพื่อบันทึกในโปรไฟล์</div>
          </div>

          <q-btn
            type="submit"
            color="primary"
            label="เข้าสู่ระบบ"
            icon="login"
            size="lg"
            unelevated
            class="full-width"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const studentId = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const onLogin = async () => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  const success = authStore.login(username.value, password.value, studentId.value)
  loading.value = false

  if (success) {
    $q.notify({
      type: 'positive',
      icon: 'check_circle',
      message: `ยินดีต้อนรับ ${authStore.user.name}`,
    })
    router.push({ name: authStore.user.role === 'admin' ? 'admin' : 'home' })
  } else {
    $q.notify({
      type: 'negative',
      icon: 'error',
      message: 'Username หรือ Password ไม่ถูกต้อง',
    })
  }
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(20, 35, 64, 0.62), rgba(39, 62, 106, 0.38)),
    url('/images/psu-phuket-campus.jpg') center / cover no-repeat;
}
.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(6px);
}
.demo-box {
  background: #e9f3f9;
  color: var(--q-primary);
  border-radius: 8px;
}
</style>
