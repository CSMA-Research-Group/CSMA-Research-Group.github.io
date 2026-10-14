<template>
  <div class="home-selected-grid system-resources">
    <article v-for="system in projectApplications" :id="`resource-${system.id}`" :key="system.id" class="home-work-column">
      <div class="home-project-row">
        <div class="home-entry-heading"><h3><RouterLink :to="`/projects/${system.id}`">{{ system.title }}</RouterLink></h3><RouterLink class="text-link home-card-more" :to="`/projects/${system.id}`" :aria-label="`More about ${system.title}`">More</RouterLink></div>
        <p>{{ system.homeSummary || system.description }}</p>
        <p class="paper-status">{{ system.availability }}</p>
        <figure v-if="system.previewMedia?.src" class="system-preview-media">
          <img :src="system.previewMedia.src" :alt="system.previewMedia.alt"
            :width="system.previewMedia.width" :height="system.previewMedia.height" loading="lazy" decoding="async" />
        </figure>
      </div>
    </article>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { projectApplications } from '../data/systems'
</script>
