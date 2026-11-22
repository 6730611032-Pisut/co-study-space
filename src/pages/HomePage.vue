<template>
  <q-page padding>
    <q-card flat class="hero text-white q-mb-md">
      <q-card-section class="q-pa-lg">
        <div class="text-h5 text-weight-bold">สวัสดี {{ authStore.user?.name }}</div>
        <div class="text-body1 q-mt-sm">
          จองโต๊ะหรือห้องอ่านหนังสือล่วงหน้าได้ทุกวัน เวลา 08:00 - 19:00 น.
        </div>
        <q-btn
          color="white"
          text-color="primary"
          unelevated
          class="q-mt-md"
          icon="event_seat"
          label="เลือกโต๊ะหรือห้อง"
          to="/spaces"
        />
      </q-card-section>
    </q-card>

    <q-card v-if="bookingStore.libraryRules.trim()" flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold text-primary">
          <q-icon name="rule" class="q-mr-sm" />
          กฎการเข้าใช้งานห้องสมุด
        </div>
        <div class="rules-text q-mt-sm">{{ bookingStore.libraryRules }}</div>
        <div class="text-caption text-grey-7 q-mt-sm">*อัปเดตล่าสุด: {{ bookingStore.libraryRulesUpdatedAt }}</div>
      </q-card-section>
    </q-card>

    <div class="text-h6 text-weight-bold text-primary q-mb-sm">ภาพรวม</div>
    <div class="row q-col-gutter-md q-mb-lg">
      <div v-for="item in stats" :key="item.label" class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section class="row items-center">
            <q-avatar color="blue-1" text-color="primary" :icon="item.icon" size="52px" />
            <div class="q-ml-md">
              <div class="text-h5 text-weight-bold">{{ item.value }}</div>
              <div class="text-body2 text-grey-7">{{ item.label }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-h6 text-weight-bold text-primary q-mb-sm">วิธีจอง</div>
    <div class="row q-col-gutter-md">
      <div v-for="(step, index) in steps" :key="step.title" class="col-12 col-md-4">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <q-icon :name="step.icon" color="secondary" size="32px" />
            <div class="text-subtitle1 text-weight-bold q-mt-sm">
              {{ index + 1 }}. {{ step.title }}
            </div>
            <div class="text-body2 text-grey-7">{{ step.text }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useSpaceStore } from 'src/stores/space-store'
import { useBookingStore } from 'src/stores/booking-store'

const authStore = useAuthStore()
const spaceStore = useSpaceStore()
const bookingStore = useBookingStore()

const tableCount = computed(() => spaceStore.spaces.filter((s) => s.type === 'table').length)
const roomCount = computed(() => spaceStore.spaces.filter((s) => s.type === 'room').length)

const stats = computed(() => [
  { label: 'โต๊ะอ่านหนังสือ', value: tableCount.value, icon: 'event_seat' },
  { label: 'ห้องอ่านหนังสือ', value: roomCount.value, icon: 'meeting_room' },
  { label: 'การจองของฉัน', value: bookingStore.bookings.length, icon: 'event_available' },
])

const steps = [
  { icon: 'search', title: 'เลือกโต๊ะหรือห้อง', text: 'ดูรายการทั้งหมดได้ที่หน้า Study Space' },
  { icon: 'event', title: 'เลือกวันและเวลา', text: 'ช่วงเวลาที่ถูกจองไปแล้วจะเลือกไม่ได้' },
  { icon: 'check_circle', title: 'ยืนยันการจอง', text: 'ดูหรือยกเลิกการจองได้ที่หน้า My Booking' },
]
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--q-primary), var(--q-secondary));
}
.rules-text {
  white-space: pre-line;
}
</style>