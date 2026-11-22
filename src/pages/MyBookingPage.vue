<template>
  <q-page padding>
    <div class="text-h5 text-weight-bold text-primary">My Booking</div>
    <div class="text-body2 text-grey-7 q-mb-md">รายการที่คุณจองไว้ทั้งหมด</div>

    <div v-if="sortedBookings.length === 0" class="text-center q-pa-xl text-grey-6">
      <q-icon name="event_busy" size="64px" />
      <div class="text-h6 q-mt-md">ยังไม่มีรายการจอง</div>
      <q-btn
        color="primary"
        unelevated
        class="q-mt-md"
        icon="event_seat"
        label="เลือกโต๊ะหรือห้อง"
        to="/spaces"
      />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div v-for="item in sortedBookings" :key="item.id" class="col-12 col-md-6">
        <q-card flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                color="blue-1"
                text-color="primary"
                :icon="item.spaceType === 'room' ? 'meeting_room' : 'event_seat'"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">{{ item.spaceName }}</q-item-label>
              <q-item-label caption>{{ item.location }}</q-item-label>
              <q-item-label caption class="text-primary q-mt-xs">
                <q-icon name="event" /> {{ formatDate(item.date) }} &nbsp;
                <q-icon name="schedule" /> {{ item.timeSlot }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                color="negative"
                icon="cancel"
                label="ยกเลิก"
                @click="askCancel(item)"
              />
            </q-item-section>
          </q-item>
          <q-card-section v-if="item.attendeeNames?.length" class="q-pt-none">
            <div class="text-caption text-grey-7 q-mb-xs">
              รายชื่อผู้ใช้ ({{ item.attendeeCount || item.attendeeNames.length }} คน)
            </div>
            <div v-for="(name, index) in item.attendeeNames" :key="index" class="text-body2">
              {{ index + 1 }}. {{ name }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="showConfirm" persistent>
      <q-card style="min-width: 320px">
        <q-card-section class="row items-center">
          <q-icon name="warning" color="orange" size="40px" class="q-mr-md" />
          <div>
            <div class="text-h6">ยกเลิกการจอง</div>
            <div class="text-body2">
              ต้องการยกเลิกการจอง {{ bookingToCancel?.spaceName }} ใช่หรือไม่
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="ไม่ยกเลิก" color="grey-7" v-close-popup />
          <q-btn unelevated label="ยกเลิกการจอง" color="negative" @click="confirmCancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useBookingStore } from 'src/stores/booking-store'

const $q = useQuasar()
const bookingStore = useBookingStore()

const sortedBookings = computed(() => {
  return [...bookingStore.bookings].sort((a, b) =>
    (a.date + a.timeSlot).localeCompare(b.date + b.timeSlot),
  )
})

const formatDate = (date) => date.split('-').reverse().join('/')

const showConfirm = ref(false)
const bookingToCancel = ref(null)

const askCancel = (item) => {
  bookingToCancel.value = item
  showConfirm.value = true
}

const confirmCancel = () => {
  bookingStore.cancelBooking(bookingToCancel.value.id)
  showConfirm.value = false
  $q.notify({
    type: 'warning',
    icon: 'delete',
    message: 'ยกเลิกการจองแล้ว',
  })
}
</script>