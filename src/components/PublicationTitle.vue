<template>
  <component :is="level" class="publication-heading" :lang="readingTitle ? 'zh-CN' : undefined">
    <RouterLink v-if="to" :to="to">{{ readingTitle || t(title) }}</RouterLink>
    <template v-else>{{ readingTitle || t(title) }}</template>
  </component>
  <p v-if="readingTitle" class="original-publication-title" lang="en">{{ title }}</p>
</template>

<script setup>
import { computed } from 'vue'
import RouterLink from './LocaleLink.vue'
import { t, isChinese } from '../i18n'
import { publicationTitles } from '../i18n/zh/publications'

const props = defineProps({
  title: { type: String, required: true },
  paperId: { type: String, default: '' },
  to: { type: String, default: '' },
  level: { type: String, default: 'h3', validator: value => ['h2', 'h3'].includes(value) },
})
const readingTitle = computed(() => isChinese.value ? publicationTitles[props.paperId] : '')
</script>

<style scoped>
.publication-heading > a { display: block; }
</style>
