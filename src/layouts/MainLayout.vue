<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="drawerOpen = !drawerOpen" />
        <q-toolbar-title class="text-weight-bold">Co-Study Space</q-toolbar-title>

        <q-chip dense color="white" text-color="primary" icon="person" class="gt-xs">
          {{ authStore.user?.name }}
        </q-chip>
        <q-btn flat dense icon="logout" label="ออกจากระบบ" class="q-ml-sm" @click="onLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" show-if-above bordered :width="250">
      <div class="brand text-white q-pa-md">
        <q-icon name="menu_book" size="32px" />
        <div class="text-subtitle1 text-weight-bold q-mt-sm">Co-Study Space</div>
        <div class="text-caption">จองโต๊ะและห้องอ่านหนังสือ</div>
      </div>

      <q-list padding>
        <q-item
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          clickable
          v-ripple
          active-class="text-primary bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="page-bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const drawerOpen = ref(false)

const menuItems = computed(() => {
  const items = [
    { label: 'Home', icon: 'home', to: '/home' },
    { label: 'Study Space', icon: 'event_seat', to: '/spaces' },
    { label: 'My Booking', icon: 'event_available', to: '/bookings' },
  ]

  if (authStore.user?.role === 'admin') {
    items.push({ label: 'Admin', icon: 'admin_panel_settings', to: '/admin' })
  }

  return items
})

const onLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
  $q.notify({ type: 'info', message: 'ออกจากระบบแล้ว' })
}
</script>

<style scoped>
.page-bg {
  background: #f3f6fa;
}
.brand {
  background: var(--q-primary);
}
</style>
