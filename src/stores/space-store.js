import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpaceStore = defineStore(
  'space',
  () => {
    const spaces = ref([
      {
        id: 1,
        name: 'โต๊ะอ่านหนังสือ A1',
        type: 'table',
        floor: 1,
        location: 'ชั้น 1 โซนเงียบ',
        capacity: 4,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 2,
        name: 'โต๊ะอ่านหนังสือ A2',
        type: 'table',
        floor: 1,
        location: 'ชั้น 1 โซนเงียบ',
        capacity: 4,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 3,
        name: 'โต๊ะกลุ่ม B1',
        type: 'table',
        floor: 2,
        location: 'ชั้น 2 โซนพูดคุยได้',
        capacity: 6,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ', 'ไวท์บอร์ด'],
      },
      {
        id: 4,
        name: 'โต๊ะกลุ่ม B2',
        type: 'table',
        floor: 2,
        location: 'ชั้น 2 โซนพูดคุยได้',
        capacity: 6,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ', 'ไวท์บอร์ด'],
      },
      {
        id: 5,
        name: 'ห้องติว R101',
        type: 'room',
        floor: 2,
        location: 'ชั้น 2 ห้องกระจก',
        capacity: 6,
        icon: 'meeting_room',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ', 'ไวท์บอร์ด', 'แอร์'],
      },
      {
        id: 6,
        name: 'ห้องติว R102',
        type: 'room',
        floor: 2,
        location: 'ชั้น 2 ห้องกระจก',
        capacity: 6,
        icon: 'meeting_room',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ', 'ไวท์บอร์ด', 'แอร์'],
      },
      {
        id: 7,
        name: 'ห้องประชุมกลุ่ม R201',
        type: 'room',
        floor: 3,
        location: 'ชั้น 3',
        capacity: 10,
        icon: 'groups',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ', 'จอ TV', 'แอร์'],
      },
      {
        id: 8,
        name: 'ห้องประชุมกลุ่ม R202',
        type: 'room',
        floor: 3,
        location: 'ชั้น 3',
        capacity: 10,
        icon: 'groups',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ', 'จอ TV', 'แอร์'],
      },
      {
        id: 9,
        name: 'โต๊ะอ่านหนังสือ B3',
        type: 'table',
        floor: 2,
        location: 'ชั้น 2 โซนอ่านหนังสือ',
        capacity: 4,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 10,
        name: 'โต๊ะอ่านหนังสือ C1',
        type: 'table',
        floor: 3,
        location: 'ชั้น 3 โซนอ่านหนังสือ',
        capacity: 4,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 12,
        name: 'โต๊ะเดี่ยว A3',
        type: 'table',
        floor: 1,
        location: 'ชั้น 1 โซนเงียบ',
        capacity: 1,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 13,
        name: 'โต๊ะคู่ A4',
        type: 'table',
        floor: 1,
        location: 'ชั้น 1 โซนเงียบ',
        capacity: 2,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 14,
        name: 'โต๊ะคู่ A5',
        type: 'table',
        floor: 1,
        location: 'ชั้น 1 โซนเงียบ',
        capacity: 2,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 15,
        name: 'โต๊ะเดี่ยว B4',
        type: 'table',
        floor: 2,
        location: 'ชั้น 2 โซนอ่านหนังสือ',
        capacity: 1,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 16,
        name: 'โต๊ะคู่ B5',
        type: 'table',
        floor: 2,
        location: 'ชั้น 2 โซนอ่านหนังสือ',
        capacity: 2,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 17,
        name: 'โต๊ะคู่ B6',
        type: 'table',
        floor: 2,
        location: 'ชั้น 2 โซนอ่านหนังสือ',
        capacity: 2,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 18,
        name: 'โต๊ะเดี่ยว C3',
        type: 'table',
        floor: 3,
        location: 'ชั้น 3 โซนอ่านหนังสือ',
        capacity: 1,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 19,
        name: 'โต๊ะคู่ C4',
        type: 'table',
        floor: 3,
        location: 'ชั้น 3 โซนอ่านหนังสือ',
        capacity: 2,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 20,
        name: 'โต๊ะคู่ C5',
        type: 'table',
        floor: 3,
        location: 'ชั้น 3 โซนอ่านหนังสือ',
        capacity: 2,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
      {
        id: 11,
        name: 'โต๊ะอ่านหนังสือ C2',
        type: 'table',
        floor: 3,
        location: 'ชั้น 3 โซนอ่านหนังสือ',
        capacity: 4,
        icon: 'event_seat',
        facilities: ['Wi-Fi', 'ปลั๊กไฟ'],
      },
    ])

    const timeSlots = [
      '08:00 - 10:00',
      '10:00 - 12:00',
      '13:00 - 15:00',
      '15:00 - 17:00',
      '17:00 - 19:00',
    ]

    const addSpace = (space) => {
      const id = Math.max(0, ...spaces.value.map((item) => item.id)) + 1
      spaces.value.push({ ...space, id })
    }

    const updateSpace = (space) => {
      const index = spaces.value.findIndex((item) => item.id === space.id)
      if (index === -1) return false

      spaces.value[index] = { ...spaces.value[index], ...space }
      return true
    }

    const removeSpace = (id) => {
      if (!spaces.value.some((space) => space.id === id)) return false

      spaces.value = spaces.value.filter((space) => space.id !== id)
      return true
    }

    return { spaces, timeSlots, addSpace, updateSpace, removeSpace }
  },
  { persist: true },
)
