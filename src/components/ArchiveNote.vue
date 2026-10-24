<template>
  <div class="archive-nav">
    <p>{{ t(description) }}</p>
    <RouterLink class="text-link" :to="to" :aria-label="t(linkLabel || label)">
      {{ t(label) }} <span aria-hidden="true">→</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from './LocaleLink.vue'
defineProps({
  description: { type: String, required: true },
  to: { type: String, required: true },
  label: { type: String, default: 'More' },
  linkLabel: { type: String, default: '' },
})
</script>
