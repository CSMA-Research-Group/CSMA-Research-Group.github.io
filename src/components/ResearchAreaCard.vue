<template>
  <article class="research-overview">
    <ResearchThemeMark v-if="isChinese" :id="area.id" />
    <p class="card-kicker">{{ t(indexLabel) }} · {{ t(getResearchAreaRole(area.id)) }}</p>
    <h2>{{ t(getResearchAreaDisplayTitle(area)) }}</h2>
    <p>{{ t(area.summary) }}</p>

    <p v-if="area.keyTopics?.length" class="content-keywords">{{ t(area.keyTopics.join(' · ')) }}</p>

    <details class="content-details">
      <summary :aria-label="t('More about {title}', { title: t(getResearchAreaDisplayTitle(area)) })">{{ t("More") }} <span aria-hidden="true">+</span></summary>
      <div class="details-copy">
    <div class="card-section">
      <h3>{{ t("Motivation") }}</h3>
      <p>{{ t(area.motivation) }}</p>
    </div>

    <div class="card-section">
      <h3>{{ t("Key Questions") }}</h3>
      <ul>
        <li v-for="question in area.keyQuestions || area.questions" :key="question">{{ t(question) }}</li>
      </ul>
    </div>

    <div class="card-section">
      <h3>{{ t("Methods") }}</h3>
      <ul>
        <li v-for="method in area.methods" :key="method">{{ t(method) }}</li>
      </ul>
    </div>

    <div class="card-section">
      <h3>{{ t("Representative Systems and Publications") }}</h3>
      <div class="tag-row">
        <span v-for="system in area.representativeSystems" :key="system">{{ t(system) }}</span>
      </div>
      <div class="research-links">
        <RouterLink
          v-for="projectId in area.relatedProjectIds"
          :key="`project-${projectId}`"
          :to="`/projects#${projectId}`"
        > {{ t("Project:") }} {{ t(projectTitleFor(projectId)) }}
        </RouterLink>
        <RouterLink
          v-for="publicationId in area.relatedPublicationIds"
          :key="`publication-${publicationId}`"
          :to="`/publications/${publicationId}`"
        > {{ t("Publication:") }} {{ t(publicationTitleFor(publicationId)) }}
        </RouterLink>
      </div>
    </div>

    <div class="card-section">
      <h3>{{ t("Expected Impact") }}</h3>
      <p class="vision-note">{{ t(area.expectedImpact) }}</p>
    </div>
      </div>
    </details>
  </article>
</template>

<script setup>
import { t, isChinese } from '../i18n'
import ResearchThemeMark from './ResearchThemeMark.vue'
import RouterLink from './LocaleLink.vue'
import { projects } from '../data/projects'
import { researchSystems } from '../data/systems'
import { publications } from '../data/publications'
import { getResearchAreaDisplayTitle, getResearchAreaRole } from '../data/researchPresentation'

const projectTitleFor = (projectId) => (
  researchSystems.find((system) => system.id === projectId)?.title ||
  projects.find((project) => project.id === projectId)?.title || projectId
)

const publicationTitleFor = (publicationId) => (
  publications.find((publication) => publication.id === publicationId)?.title || publicationId
)

defineProps({
  area: {
    type: Object,
    required: true,
  },
  indexLabel: {
    type: String,
    default: '',
  },
})
</script>
