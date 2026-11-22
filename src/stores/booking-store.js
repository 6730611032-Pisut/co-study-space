import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore(
  'booking',
  () => {
    const bookings = ref([])
    const libraryRules = ref('')

    const isSlotTaken = (spaceId, date, timeSlot) => {
      return bookings.value.some(
        (b) => b.spaceId === spaceId && b.date === date && b.timeSlot === timeSlot,
      )
    }

    const addBooking = (space, date, timeSlot, attendeeNames) => {
      bookings.value.push({
        id: Date.now(),
        spaceId: space.id,
        spaceName: space.name,
        spaceType: space.type,
        location: space.location,
        date: date,
        timeSlot: timeSlot,
        attendeeCount: attendeeNames.length,
        attendeeNames,
      })
    }

    const updateLibraryRules = (rules) => {
      libraryRules.value = rules
    }

    const cancelBooking = (id) => {
      bookings.value = bookings.value.filter((b) => b.id !== id)
    }

    return { bookings, libraryRules, isSlotTaken, addBooking, updateLibraryRules, cancelBooking }
  },
  { persist: true },
)