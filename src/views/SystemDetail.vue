<template>
  <div class="content-page system-detail-page">
    <header class="page-hero narrow">
      <p class="eyebrow"><RouterLink :to="directoryPath">{{ t(directoryLabel) }}</RouterLink> · {{ t(system.type) }}</p>
      <h1>{{ t(system.title) }}</h1>
      <p>{{ t(system.subtitle) }}</p>
      <nav class="section-index" :aria-label="t('System sections')">
        <RouterLink :to="`${systemPath}#overview`">{{ t("Overview") }}</RouterLink>
        <RouterLink :to="`${systemPath}#workflow`">{{ t("Workflow") }}</RouterLink>
        <RouterLink :to="`${systemPath}#publication`">{{ t("Supporting Paper") }}</RouterLink>
        <RouterLink :to="`${systemPath}#resources`">{{ t("Code and Resources") }}</RouterLink>
      </nav>
    </header>
    <section id="overview" class="section">
      <div class="directory-heading"><h2>{{ t(system.applicationOnly ? 'Application Overview' : 'System Overview') }}</h2><p>{{ t(system.status) }}</p></div>
      <div class="details-copy">
        <p>{{ t(system.description) }}</p>
        <div class="project-detail-columns">
          <div><h3>{{ t("Input") }}</h3><p>{{ t(system.inputs) }}</p></div>
          <div><h3>{{ t("Output") }}</h3><p>{{ t(system.outputs) }}</p></div>
        </div>
      </div>
    </section>
    <section id="workflow" class="section">
      <div class="directory-heading"><h2>{{ t("Workflow") }}</h2></div>
      <ProjectFigure v-if="system.figure" :figure="system.figure" />
      <div class="details-copy"><ol><li v-for="step in system.workflow" :key="step">{{ t(step) }}</li></ol></div>
    </section>
    <section id="publication" class="section">
      <div class="directory-heading"><h2>{{ t("Supporting Paper") }}</h2></div>
      <article v-for="paper in relatedPapers" :key="paper.id" class="paper-entry">
        <div class="paper-dateline"><strong>{{ t(paper.year) }}</strong><span>{{ t(paper.venue) }}</span></div>
        <div class="paper-copy">
          <h3><RouterLink :to="`/publications/${paper.id}`">{{ t(paper.title) }}</RouterLink></h3>
          <p v-if="paper.authors?.length" class="paper-authors">{{ t(paper.authors.join(', ')) }}</p>
          <PublicationLinks :paper="paper" />
        </div>
      </article>
      <p v-if="system.limitation" class="paper-status">{{ t(system.limitation) }}</p>
    </section>
    <section id="resources" class="section">
      <div class="directory-heading"><h2>{{ t("Code and Resources") }}</h2></div>
      <div class="details-copy"><p>{{ t(system.availability) }}</p></div>
      <div class="content-links">
        <a v-for="link in system.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ t(link.label) }}</a>
        <RouterLink :to="system.applicationOnly ? '/resources#applications' : `/projects#${system.id}`">{{ t("Back to") }} {{ t(directoryLabel) }}</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import { computed } from 'vue'
import RouterLink from '../components/LocaleLink.vue'
import PublicationLinks from '../components/PublicationLinks.vue'
import ProjectFigure from '../components/ProjectFigure.vue'
import { publications } from '../data/publications'
const props = defineProps({ system: { type: Object, required: true } })
const systemPath = computed(() => `/projects/${props.system.id}`)
const directoryPath = computed(() => props.system.applicationOnly ? '/resources#applications' : '/projects#research-systems')
const directoryLabel = computed(() => props.system.applicationOnly ? 'Resources' : 'Research Systems')
const relatedPapers = computed(() => publications.filter(paper => props.system.relatedPublicationIds.includes(paper.id)))
</script>
