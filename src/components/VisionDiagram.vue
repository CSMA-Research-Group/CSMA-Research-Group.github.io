<template>
  <InteractiveResearchVision :image-src="imageSrc" :show-mobile-links="showMobileLinks" :animated="animated" :ambient-motion="ambientMotion" />
</template>

<script setup>
import InteractiveResearchVision from './InteractiveResearchVision.vue'

defineProps({
  ambientMotion: {
    type: Boolean,
    default: false,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  animated: {
    type: Boolean,
    default: true,
  },
  showMobileLinks: {
    type: Boolean,
    default: true,
  },
})
</script>
