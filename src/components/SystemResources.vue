<template>
  <div v-if="isChinese" class="chinese-system-directory"><ResearchSystemCard v-for="system in projectApplications" :key="system.id" :system="system" detailed /></div>
  <div v-else class="home-selected-grid system-resources">
    <article v-for="system in projectApplications" :id="`resource-${system.id}`" :key="system.id" class="home-work-column">
      <div class="home-project-row">
        <div class="home-entry-heading"><h3><RouterLink :to="`/projects/${system.id}`">{{ t(system.title) }}</RouterLink></h3><RouterLink class="text-link home-card-more" :to="`/projects/${system.id}`" :aria-label="t('More about {title}', { title: t(system.title) })">{{ t("More") }}</RouterLink></div>
        <p>{{ t(system.homeSummary || system.description) }}</p>
        <p class="paper-status">{{ t(system.availability) }}</p>
        <figure v-if="system.previewMedia?.src" class="system-preview-media">
          <img :src="system.previewMedia.src" :alt="t(system.previewMedia.alt)"
            :width="system.previewMedia.width" :height="system.previewMedia.height" loading="lazy" decoding="async" />
        </figure>
      </div>
    </article>
  </div>
</template>
<script setup>
import { t, isChinese } from '../i18n'
import ResearchSystemCard from './ResearchSystemCard.vue'
import RouterLink from './LocaleLink.vue'
import { projectApplications } from '../data/systems'
</script>
<style scoped>
.chinese-system-directory { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 28px; }
@media (max-width: 700px) { .chinese-system-directory { grid-template-columns: 1fr; gap: 24px; } }
</style>
