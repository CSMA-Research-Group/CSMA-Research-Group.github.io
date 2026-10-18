<template>
  <article class="research-overview">
    <p class="card-kicker">{{ indexLabel }} · {{ getResearchAreaRole(area.id) }}</p>
    <h2>{{ getResearchAreaDisplayTitle(area) }}</h2>
    <p>{{ area.summary }}</p>

    <p v-if="area.keyTopics?.length" class="content-keywords">{{ area.keyTopics.join(' · ') }}</p>

    <details class="content-details">
      <summary :aria-label="`More about ${getResearchAreaDisplayTitle(area)}`">More <span aria-hidden="true">+</span></summary>
      <div class="details-copy">
    <div class="card-section">
      <h3>Motivation</h3>
      <p>{{ area.motivation }}</p>
    </div>

    <div class="card-section">
      <h3>Key Questions</h3>
      <ul>
        <li v-for="question in area.keyQuestions || area.questions" :key="question">{{ question }}</li>
      </ul>
    </div>

    <div class="card-section">
      <h3>Methods</h3>
      <ul>
        <li v-for="method in area.methods" :key="method">{{ method }}</li>
      </ul>
    </div>

    <div class="card-section">
      <h3>Representative Systems and Publications</h3>
      <div class="tag-row">
        <span v-for="system in area.representativeSystems" :key="system">{{ system }}</span>
      </div>
      <div class="research-links">
        <RouterLink
          v-for="projectId in area.relatedProjectIds"
          :key="`project-${projectId}`"
          :to="`/projects#${projectId}`"
        >
          Project: {{ projectTitleFor(projectId) }}
        </RouterLink>
        <RouterLink
          v-for="publicationId in area.relatedPublicationIds"
          :key="`publication-${publicationId}`"
          :to="`/publications/${publicationId}`"
        >
          Publication: {{ publicationTitleFor(publicationId) }}
        </RouterLink>
      </div>
    </div>

    <div class="card-section">
      <h3>Expected Impact</h3>
      <p class="vision-note">{{ area.expectedImpact }}</p>
    </div>
      </div>
    </details>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
