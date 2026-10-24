<template>
  <article class="project-entry" :class="{ 'project-entry--system': project.figure }">
    <div class="project-overview">
      <p v-if="project.type" class="content-kicker">{{ t(project.type) }}</p>
      <h3><RouterLink v-if="systemProfile" :to="`/projects/${project.id}`">{{ t(project.title) }}</RouterLink><template v-else>{{ t(project.title) }}</template></h3>
      <p class="project-deck">{{ t(project.subtitle) }}</p>
      <p class="project-description">{{ t(project.description || project.summary) }}</p>
      <div v-if="project.links?.length || systemProfile" class="content-links">
        <RouterLink v-if="systemProfile" :to="`/projects/${project.id}`" :aria-label="t('More about {title}', { title: t(project.title) })">{{ t("More") }}</RouterLink>
        <template v-else><a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer" :aria-label="t('{label} for {title}', { label: t(link.label), title: t(project.title) })">{{ t(link.label) }}</a></template>
      </div>
      <details v-if="!systemProfile && (project.keyIdeas?.length || project.methods?.length || project.relatedPublicationIds?.length)" class="content-details project-details">
        <summary :aria-label="t('More about {title}', { title: t(project.title) })">{{ t("More") }} <span aria-hidden="true">+</span></summary>
        <div class="details-copy project-detail-columns">
          <div><h4>{{ t("Key Ideas") }}</h4><ul><li v-for="idea in project.keyIdeas || project.methods" :key="idea">{{ t(idea) }}</li></ul></div>
          <div v-if="project.relatedPublicationIds?.length"><h4>{{ t("Related Publications") }}</h4><ul><li v-for="publicationId in project.relatedPublicationIds" :key="publicationId"><RouterLink :to="`/publications/${publicationId}`">{{ t(publicationTitleFor(publicationId)) }}</RouterLink></li></ul></div>
        </div>
      </details>
    </div>
    <ProjectFigure v-if="project.figure" :figure="project.figure" />
  </article>
</template>
<script setup>
import { t } from '../i18n'
import RouterLink from './LocaleLink.vue'
import { computed } from 'vue'
import { researchSystems } from '../data/systems'
import { publications } from '../data/publications'
import ProjectFigure from './ProjectFigure.vue'
const props = defineProps({ project: { type: Object, required: true } })
const systemProfile = computed(() => researchSystems.find(system => system.id === props.project.id))
const publicationTitleFor = (id) => publications.find((paper) => paper.id === id)?.title || 'Publication'
</script>
