<template>
  <div class="content-links publication-links">
    <a v-if="paper.doi" :href="`https://doi.org/${paper.doi}`" target="_blank" rel="noopener noreferrer"
      :aria-label="`Paper: ${paper.title}`">Paper</a>
    <a v-else class="paper-link-pending" role="link" tabindex="0" aria-disabled="true"
      :aria-label="`Paper: ${paper.title} — Coming soon`" :aria-describedby="`paper-coming-soon-${paper.id}`"
      @click.prevent="comingSoonVisible = true" @keydown.enter.prevent="comingSoonVisible = true" @blur="comingSoonVisible = false" @mouseleave="comingSoonVisible = false">
      Paper<span :id="`paper-coming-soon-${paper.id}`" class="paper-coming-soon" :class="{ 'is-visible': comingSoonVisible }" role="tooltip">Coming soon</span>
    </a>
    <a v-if="paper.code" :href="paper.code" target="_blank" rel="noopener noreferrer"
      :aria-label="`GitHub code for ${paper.title}`">GitHub</a>
    <RouterLink v-if="applicationId" :to="`/projects/${applicationId}`"
      :aria-label="`Project application for ${paper.title}`">Project</RouterLink>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({ paper: { type: Object, required: true } })
const comingSoonVisible = ref(false)
const applicationId = computed(() => props.paper.applicationId || props.paper.systemId)
</script>
