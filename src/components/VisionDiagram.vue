<template>
  <ChineseResearchVision v-if="isChinese" />
  <InteractiveResearchVision v-else :image-src="imageSrc" :show-mobile-links="showMobileLinks" :animated="animated" :ambient-motion="ambientMotion" />
</template>

<script setup>
import InteractiveResearchVision from './InteractiveResearchVision.vue'
import ChineseResearchVision from './ChineseResearchVision.vue'
import { isChinese } from '../i18n'

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
