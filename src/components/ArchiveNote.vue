<template>
  <div class="archive-nav">
    <p>{{ description }}</p>
    <RouterLink class="text-link" :to="to" :aria-label="linkLabel || label">
      {{ label }} <span aria-hidden="true">→</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  description: { type: String, required: true },
  to: { type: String, required: true },
  label: { type: String, default: 'More' },
  linkLabel: { type: String, default: '' },
})
</script>
