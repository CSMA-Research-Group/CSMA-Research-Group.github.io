<template>
  <article class="project-entry" :class="{ 'project-entry--system': project.figure }">
    <div class="project-overview">
      <p v-if="project.type" class="content-kicker">{{ project.type }}</p>
      <h3><RouterLink v-if="systemProfile" :to="`/projects/${project.id}`">{{ project.title }}</RouterLink><template v-else>{{ project.title }}</template></h3>
      <p class="project-deck">{{ project.subtitle }}</p>
      <p class="project-description">{{ project.description || project.summary }}</p>
      <div v-if="project.links?.length || systemProfile" class="content-links">
        <RouterLink v-if="systemProfile" :to="`/projects/${project.id}`" :aria-label="`More about ${project.title}`">More</RouterLink>
        <template v-else><a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer" :aria-label="`${link.label} for ${project.title}`">{{ link.label }}</a></template>
      </div>
      <details v-if="!systemProfile && (project.keyIdeas?.length || project.methods?.length || project.relatedPublicationIds?.length)" class="content-details project-details">
        <summary :aria-label="`More about ${project.title}`">More <span aria-hidden="true">+</span></summary>
        <div class="details-copy project-detail-columns">
          <div><h4>Key Ideas</h4><ul><li v-for="idea in project.keyIdeas || project.methods" :key="idea">{{ idea }}</li></ul></div>
          <div v-if="project.relatedPublicationIds?.length"><h4>Related Publications</h4><ul><li v-for="publicationId in project.relatedPublicationIds" :key="publicationId"><RouterLink :to="`/publications/${publicationId}`">{{ publicationTitleFor(publicationId) }}</RouterLink></li></ul></div>
        </div>
      </details>
    </div>
    <ProjectFigure v-if="project.figure" :figure="project.figure" />
  </article>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { researchSystems } from '../data/systems'
import { publications } from '../data/publications'
import ProjectFigure from './ProjectFigure.vue'
const props = defineProps({ project: { type: Object, required: true } })
const systemProfile = computed(() => researchSystems.find(system => system.id === props.project.id))
const publicationTitleFor = (id) => publications.find((paper) => paper.id === id)?.title || 'Publication'
</script>
