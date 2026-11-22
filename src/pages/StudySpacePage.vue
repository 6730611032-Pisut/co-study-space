<template>
  <q-page padding>
    <div class="text-h5 text-weight-bold text-primary">Study Space</div>
    <div class="text-body2 text-grey-7 q-mb-md">เลือกโต๊ะหรือห้องที่ต้องการ แล้วกดจอง</div>

    <div class="row q-col-gutter-md q-mb-md items-center">
      <div class="col-12 col-md-4">
        <q-input
          v-model="searchText"
          outlined
          dense
          bg-color="white"
          placeholder="ค้นหาชื่อโต๊ะหรือห้อง"
        >
          <template v-slot:prepend><q-icon name="search" /></template>
        </q-input>
      </div>
      <div class="col-12 col-md-4">
        <q-btn-group unelevated>
          <q-btn
            v-for="f in filters"
            :key="f.value"
            :label="f.label"
            :color="typeFilter === f.value ? 'primary' : 'white'"
            :text-color="typeFilter === f.value ? 'white' : 'primary'"
            @click="typeFilter = f.value"
          />
        </q-btn-group>
      </div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="floorFilter"
          :options="floorOptions"
          outlined
          dense
          emit-value
          map-options
          label="เลือกชั้น"
        />
      </div>
    </div>

    <div v-if="filteredSpaces.length === 0" class="text-center q-pa-xl text-grey-6">
      <q-icon name="search_off" size="64px" />
      <div class="text-h6 q-mt-md">ไม่พบโต๊ะหรือห้องที่ค้นหา</div>
      <div class="text-body2">ลองเปลี่ยนคำค้นหา ประเภท หรือชั้น</div>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="space in filteredSpaces"
        :key="space.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <SpaceCard :space="space" @book="openBooking" />
      </div>
    </div>

    <q-dialog v-model="showDialog">
      <q-card v-if="selectedSpace" style="width: 420px; max-width: 90vw">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">จอง {{ selectedSpace.name }}</div>
          <div class="text-caption">
            {{ selectedSpace.location }} | รองรับ {{ selectedSpace.capacity }} คน
          </div>
        </q-card-section>

        <q-card-section>
          <q-form ref="bookingForm">
            <q-input
              v-model="selectedDate"
              type="date"
              label="วันที่"
              outlined
              stack-label
              lazy-rules
              :min="today"
              :rules="[
                (val) => !!val || 'กรุณาเลือกวันที่',
                (val) => val >= today || 'ไม่สามารถเลือกวันที่ผ่านมาแล้ว',
              ]"
            />

            <q-select
              v-model="selectedTime"
              :options="timeOptions"
              label="ช่วงเวลา"
              outlined
              emit-value
              map-options
              lazy-rules
              :rules="[(val) => !!val || 'กรุณาเลือกช่วงเวลา']"
            />

            <q-select
              v-model="attendeeCount"
              :options="attendeeCountOptions"
              label="จำนวนผู้ใช้"
              outlined
              emit-value
              map-options
              class="q-mt-md"
            />

            <div class="q-mt-md">
              <div class="text-subtitle2 q-mb-sm">รายชื่อผู้เข้าใช้งาน</div>
              <q-input
                v-for="(_, index) in attendeeNames"
                :key="index"
                v-model="attendeeNames[index]"
                :label="`ชื่อผู้ใช้คนที่ ${index + 1}`"
                outlined
                dense
                class="q-mb-sm"
              />
              <div class="text-caption text-grey-7">
                หากไม่กรอกชื่อ ระบบจะบันทึกเป็น -
              </div>
            </div>

            <q-banner
              v-if="bookingStore.libraryRules.trim()"
              rounded
              class="bg-blue-1 text-primary q-mt-md"
            >
              <template v-slot:avatar><q-icon name="info" /></template>
              <div class="text-weight-bold">กฎการเข้าใช้งานห้องสมุด</div>
              <div class="rules-text">{{ bookingStore.libraryRules }}</div>
            </q-banner>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="ยกเลิก" color="grey-7" v-close-popup />
          <q-btn unelevated label="ยืนยันการจอง" color="primary" @click="confirmBooking" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import SpaceCard from 'src/components/SpaceCard.vue'
import { useSpaceStore } from 'src/stores/space-store'
import { useBookingStore } from 'src/stores/booking-store'

const $q = useQuasar()
const spaceStore = useSpaceStore()
const bookingStore = useBookingStore()

const searchText = ref('')
const typeFilter = ref('all')
const floorFilter = ref('all')
const filters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'โต๊ะ', value: 'table' },
  { label: 'ห้อง', value: 'room' },
]
const floorOptions = [
  { label: 'ทุกชั้น', value: 'all' },
  { label: 'ชั้น 1', value: 1 },
  { label: 'ชั้น 2', value: 2 },
  { label: 'ชั้น 3', value: 3 },
]

const filteredSpaces = computed(() => {
  return spaceStore.spaces.filter((space) => {
    const matchType = typeFilter.value === 'all' || space.type === typeFilter.value
    const matchFloor = floorFilter.value === 'all' || space.floor === floorFilter.value
    const matchName = space.name.toLowerCase().includes(searchText.value.toLowerCase())
    return matchType && matchFloor && matchName
  })
})

const showDialog = ref(false)
const bookingForm = ref(null)
const selectedSpace = ref(null)
const selectedDate = ref('')
const selectedTime = ref(null)
const attendeeCount = ref(1)
const attendeeNames = ref([''])

const getToday = () => {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}
const today = getToday()

const attendeeCountOptions = computed(() =>
  Array.from({ length: Number(selectedSpace.value?.capacity || 0) }, (_, index) => ({
    label: `${index + 1} คน`,
    value: index + 1,
  })),
)

const timeOptions = computed(() => {
  return spaceStore.timeSlots.map((slot) => {
    const taken = bookingStore.isSlotTaken(selectedSpace.value?.id, selectedDate.value, slot)
    return {
      label: taken ? `${slot} (เต็ม)` : slot,
      value: slot,
      disable: taken,
    }
  })
})

watch(selectedDate, () => {
  selectedTime.value = null
})

watch(attendeeCount, (count) => {
  attendeeNames.value = Array.from(
    { length: count },
    (_, index) => attendeeNames.value[index] || '',
  )
})

const openBooking = (space) => {
  selectedSpace.value = space
  selectedDate.value = ''
  selectedTime.value = null
  attendeeCount.value = 1
  attendeeNames.value = ['']
  showDialog.value = true
}

const confirmBooking = async () => {
  const valid = await bookingForm.value.validate()
  if (!valid) return

  const names = attendeeNames.value.map((name) => name.trim() || '-')
  bookingStore.addBooking(selectedSpace.value, selectedDate.value, selectedTime.value, names)
  showDialog.value = false

  $q.notify({
    type: 'positive',
    icon: 'check_circle',
    message: 'จองสำเร็จ',
    caption: `${selectedSpace.value.name} เวลา ${selectedTime.value}`,
    position: 'top-right',
  })
}
</script>

<style scoped>
.rules-text {
  white-space: pre-line;
}
</style>