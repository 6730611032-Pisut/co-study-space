<template>
  <q-card flat bordered class="space-card full-height column">
    <q-card-section class="card-top row items-center">
      <q-avatar color="white" text-color="primary" :icon="space.icon" size="52px" />
      <div class="q-ml-md">
        <div class="text-subtitle1 text-weight-bold">{{ space.name }}</div>
        <div class="text-caption text-grey-8">{{ space.location }}</div>
      </div>
    </q-card-section>

    <q-card-section class="col">
      <q-badge
        :color="space.type === 'room' ? 'secondary' : 'primary'"
        :label="space.type === 'room' ? 'ห้องอ่านหนังสือ' : 'โต๊ะอ่านหนังสือ'"
      />
      <div class="q-mt-sm text-body2">
        <q-icon name="people" color="primary" /> รองรับ {{ space.capacity }} คน
      </div>
      <div class="q-mt-sm">
        <q-chip
          v-for="item in space.facilities"
          :key="item"
          dense
          color="blue-1"
          text-color="primary"
        >
          {{ item }}
        </q-chip>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn
        color="primary"
        unelevated
        class="full-width"
        icon="event_available"
        label="จอง"
        @click="emit('book', space)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  space: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['book'])
</script>

<style scoped>
.card-top {
  background: #eaf1f8;
}
.space-card {
  transition: box-shadow 0.2s;
}
.space-card:hover {
  box-shadow: 0 6px 14px rgba(21, 101, 192, 0.25) !important;
}
</style>