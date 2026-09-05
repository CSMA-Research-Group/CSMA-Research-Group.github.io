<template>
  <InteractiveResearchVision :show-mobile-links="showMobileLinks" />
</template>

<script setup>
import InteractiveResearchVision from './InteractiveResearchVision.vue'

defineProps({
  showMobileLinks: {
    type: Boolean,
    default: true,
  },
})
</script>
