<template>
  <q-page padding>
    <div class="row items-center justify-between q-gutter-md q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">จัดการระบบ</div>
        <div class="text-body2 text-grey-7">จัดการพื้นที่และรายการจอง</div>
      </div>
      <q-btn color="primary" icon="add" label="เพิ่มพื้นที่" unelevated @click="openAddSpace" />
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-6 col-lg-3">
        <q-card flat bordered>
          <q-card-section class="row items-center">
            <q-avatar color="blue-1" text-color="primary" :icon="stat.icon" size="48px" />
            <div class="q-ml-md">
              <div class="text-h5 text-weight-bold">{{ stat.value }}</div>
              <div class="text-body2 text-grey-7">{{ stat.label }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered>
      <q-tabs
        v-model="activeTab"
        align="left"
        active-color="primary"
        indicator-color="primary"
        class="text-grey-7"
      >
        <q-tab name="spaces" icon="event_seat" label="พื้นที่" />
        <q-tab name="bookings" icon="event_available" label="การจอง" />
        <q-tab name="rules" icon="rule" label="กฎการใช้งาน" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="spaces" class="q-pa-md">
          <q-table
            :rows="spaceStore.spaces"
            :columns="spaceColumns"
            :filter="spaceSearch"
            row-key="id"
            flat
            :rows-per-page-options="[10, 20, 0]"
            no-data-label="ยังไม่มีพื้นที่"
          >
            <template v-slot:top>
              <q-input
                v-model="spaceSearch"
                dense
                outlined
                debounce="200"
                placeholder="ค้นหาพื้นที่"
                class="col"
              >
                <template v-slot:prepend><q-icon name="search" /></template>
              </q-input>
              <q-btn
                color="primary"
                icon="add"
                label="เพิ่มพื้นที่"
                unelevated
                class="q-ml-md"
                @click="openAddSpace"
              />
            </template>

            <template v-slot:body-cell-type="props">
              <q-td :props="props">
                {{ props.value === 'room' ? 'ห้อง' : 'โต๊ะ' }}
              </q-td>
            </template>

            <template v-slot:body-cell-floor="props">
              <q-td :props="props">ชั้น {{ props.value }}</q-td>
            </template>

            <template v-slot:body-cell-capacity="props">
              <q-td :props="props">{{ props.value }} คน</q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="text-right">
                <q-btn
                  flat
                  round
                  dense
                  color="primary"
                  icon="edit"
                  aria-label="แก้ไขพื้นที่"
                  @click="openEditSpace(props.row)"
                />
                <q-btn
                  flat
                  round
                  dense
                  color="negative"
                  icon="delete"
                  aria-label="ลบพื้นที่"
                  @click="requestDeleteSpace(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="bookings" class="q-pa-md">
          <q-table
            :rows="bookingStore.bookings"
            :columns="bookingColumns"
            :filter="bookingSearch"
            row-key="id"
            flat
            :rows-per-page-options="[10, 20, 0]"
            no-data-label="ยังไม่มีรายการจอง"
          >
            <template v-slot:top>
              <q-input
                v-model="bookingSearch"
                dense
                outlined
                debounce="200"
                placeholder="ค้นหารายการจอง"
                class="col"
              >
                <template v-slot:prepend><q-icon name="search" /></template>
              </q-input>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="text-right">
                <q-btn
                  flat
                  dense
                  color="negative"
                  icon="cancel"
                  label="ยกเลิก"
                  @click="requestCancelBooking(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="rules" class="q-pa-md">
          <div class="text-subtitle1 text-weight-bold q-mb-sm">
            กฎการเข้าใช้งานห้องสมุด
          </div>
          <div class="text-body2 text-grey-7 q-mb-md">
            กรอกหรือแก้ไขกฎได้ที่นี่ ผู้ใช้จะเห็นกฎบนหน้าหลักและก่อนยืนยันการจอง
          </div>
          <q-input
            v-model="rulesDraft"
            type="textarea"
            outlined
            autogrow
            label="กฎการเข้าใช้งาน"
            placeholder="พิมพ์กฎการเข้าใช้งานห้องสมุดที่นี่"
            class="q-mb-md"
          />
          <q-btn
            color="primary"
            unelevated
            icon="save"
            label="บันทึกกฎ"
            @click="saveLibraryRules"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-dialog v-model="showSpaceDialog" persistent>
      <q-card class="space-dialog">
        <q-form @submit="saveSpace">
          <q-card-section>
            <div class="text-h6">{{ editingSpaceId === null ? 'เพิ่มพื้นที่' : 'แก้ไขพื้นที่' }}</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              v-model="spaceDraft.name"
              label="ชื่อพื้นที่"
              outlined
              :rules="[(value) => !!value.trim() || 'กรุณากรอกชื่อพื้นที่']"
            />

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="spaceDraft.type"
                  :options="typeOptions"
                  label="ประเภท"
                  outlined
                  emit-value
                  map-options
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="spaceDraft.floor"
                  :options="floorOptions"
                  label="ชั้น"
                  outlined
                  emit-value
                  map-options
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="spaceDraft.capacity"
                  label="จำนวนที่รองรับ"
                  type="number"
                  min="1"
                  outlined
                  :rules="[(value) => Number(value) >= 1 || 'ต้องรองรับอย่างน้อย 1 คน']"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="spaceDraft.location"
                  label="ตำแหน่ง/โซน"
                  outlined
                  :rules="[(value) => !!value.trim() || 'กรุณากรอกตำแหน่ง']"
                />
              </div>
            </div>

            <q-input
              v-model="facilitiesText"
              label="สิ่งอำนวยความสะดวก"
              hint="คั่นแต่ละรายการด้วยเครื่องหมายจุลภาค เช่น Wi-Fi, ปลั๊กไฟ"
              outlined
            />
          </q-card-section>

          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="ยกเลิก" color="grey-7" v-close-popup />
            <q-btn type="submit" unelevated color="primary" label="บันทึก" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">ยืนยันการลบพื้นที่</q-card-section>
        <q-card-section> ต้องการลบ {{ spaceToDelete?.name }} ใช่หรือไม่ </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ไม่ลบ" color="grey-7" v-close-popup />
          <q-btn unelevated label="ลบพื้นที่" color="negative" @click="confirmDeleteSpace" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCancelDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">ยืนยันการยกเลิกการจอง</q-card-section>
        <q-card-section>
          ต้องการยกเลิก {{ bookingToCancel?.spaceName }} วันที่ {{ bookingToCancel?.date }} ใช่หรือไม่
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="กลับ" color="grey-7" v-close-popup />
          <q-btn unelevated label="ยกเลิกการจอง" color="negative" @click="confirmCancelBooking" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useSpaceStore } from 'src/stores/space-store'
import { useBookingStore } from 'src/stores/booking-store'

const $q = useQuasar()
const spaceStore = useSpaceStore()
const bookingStore = useBookingStore()

const activeTab = ref('spaces')
const spaceSearch = ref('')
const bookingSearch = ref('')
const showSpaceDialog = ref(false)
const showDeleteDialog = ref(false)
const showCancelDialog = ref(false)
const editingSpaceId = ref(null)
const spaceToDelete = ref(null)
const bookingToCancel = ref(null)
const facilitiesText = ref('')
const spaceDraft = ref({})

const typeOptions = [
  { label: 'โต๊ะ', value: 'table' },
  { label: 'ห้อง', value: 'room' },
]
const floorOptions = [1, 2, 3].map((floor) => ({ label: `ชั้น ${floor}`, value: floor }))

const spaceColumns = [
  { name: 'name', label: 'ชื่อพื้นที่', field: 'name', align: 'left', sortable: true },
  { name: 'type', label: 'ประเภท', field: 'type', align: 'left', sortable: true },
  { name: 'floor', label: 'ชั้น', field: 'floor', align: 'left', sortable: true },
  { name: 'capacity', label: 'รองรับ', field: 'capacity', align: 'left', sortable: true },
  { name: 'location', label: 'ตำแหน่ง', field: 'location', align: 'left' },
  { name: 'actions', label: 'จัดการ', field: 'id', align: 'right' },
]
const bookingColumns = [
  { name: 'spaceName', label: 'พื้นที่', field: 'spaceName', align: 'left', sortable: true },
  { name: 'location', label: 'ตำแหน่ง', field: 'location', align: 'left' },
  { name: 'date', label: 'วันที่', field: 'date', align: 'left', sortable: true },
  { name: 'timeSlot', label: 'เวลา', field: 'timeSlot', align: 'left' },
  {
    name: 'attendees',
    label: 'รายชื่อผู้ใช้',
    field: (row) => row.attendeeNames?.join(', ') || '-',
    align: 'left',
  },
  { name: 'actions', label: 'จัดการ', field: 'id', align: 'right' },
]
const rulesDraft = ref(bookingStore.libraryRules)

const stats = computed(() => [
  { label: 'พื้นที่ทั้งหมด', value: spaceStore.spaces.length, icon: 'domain' },
  {
    label: 'โต๊ะ',
    value: spaceStore.spaces.filter((space) => space.type === 'table').length,
    icon: 'event_seat',
  },
  {
    label: 'ห้อง',
    value: spaceStore.spaces.filter((space) => space.type === 'room').length,
    icon: 'meeting_room',
  },
  { label: 'รายการจอง', value: bookingStore.bookings.length, icon: 'event_available' },
])

const openAddSpace = () => {
  editingSpaceId.value = null
  spaceDraft.value = { name: '', type: 'table', floor: 1, capacity: 1, location: '' }
  facilitiesText.value = ''
  showSpaceDialog.value = true
}

const openEditSpace = (space) => {
  editingSpaceId.value = space.id
  spaceDraft.value = { ...space }
  facilitiesText.value = space.facilities.join(', ')
  showSpaceDialog.value = true
}

const saveSpace = () => {
  const space = {
    ...spaceDraft.value,
    capacity: Number(spaceDraft.value.capacity),
    icon: spaceDraft.value.type === 'room' ? 'meeting_room' : 'event_seat',
    facilities: facilitiesText.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  }

  if (editingSpaceId.value === null) {
    spaceStore.addSpace(space)
  } else {
    const updated = spaceStore.updateSpace({ ...space, id: editingSpaceId.value })
    if (!updated) {
      $q.notify({ type: 'negative', message: 'ไม่พบพื้นที่ที่ต้องการแก้ไข' })
      return
    }
  }

  showSpaceDialog.value = false
  $q.notify({ type: 'positive', message: 'บันทึกข้อมูลพื้นที่แล้ว' })
}

const requestDeleteSpace = (space) => {
  const hasBookings = bookingStore.bookings.some((booking) => booking.spaceId === space.id)
  if (hasBookings) {
    $q.notify({
      type: 'negative',
      message: 'พื้นที่นี้มีรายการจองอยู่ กรุณายกเลิกการจองก่อนลบ',
    })
    return
  }

  spaceToDelete.value = space
  showDeleteDialog.value = true
}

const confirmDeleteSpace = () => {
  if (!spaceToDelete.value) {
    $q.notify({ type: 'negative', message: 'ไม่พบพื้นที่ที่ต้องการลบ' })
    return
  }

  if (!spaceStore.removeSpace(spaceToDelete.value.id)) {
    $q.notify({ type: 'negative', message: 'ไม่พบพื้นที่ที่ต้องการลบ' })
    return
  }

  showDeleteDialog.value = false
  spaceToDelete.value = null
  $q.notify({ type: 'positive', message: 'ลบพื้นที่แล้ว' })
}

const requestCancelBooking = (booking) => {
  bookingToCancel.value = booking
  showCancelDialog.value = true
}

const confirmCancelBooking = () => {
  if (!bookingToCancel.value) {
    $q.notify({ type: 'negative', message: 'ไม่พบรายการจองที่ต้องการยกเลิก' })
    return
  }

  bookingStore.cancelBooking(bookingToCancel.value.id)
  showCancelDialog.value = false
  bookingToCancel.value = null
  $q.notify({ type: 'positive', message: 'ยกเลิกรายการจองแล้ว' })
}

const saveLibraryRules = () => {
  bookingStore.updateLibraryRules(rulesDraft.value)
  $q.notify({ type: 'positive', message: 'บันทึกกฎการใช้งานแล้ว' })
}
</script>

<style scoped>
.space-dialog {
  width: 560px;
  max-width: 92vw;
}
</style>
