<template>
  <div class="content-page publication-detail-page">
    <header class="page-hero narrow">
      <p class="eyebrow"><RouterLink to="/publications">{{ t("Publications") }}</RouterLink> · {{ t(paper.venue) }}<template v-if="!paper.venue.includes(String(paper.year))"> · {{ t(paper.year) }}</template></p>
      <h1 lang="en">{{ paper.title }}</h1>
      <p v-if="isChinese && publicationTitles[paper.id]" class="translated-paper-title">{{ publicationTitles[paper.id] }}</p>
      <p v-if="paper.authors?.length">{{ t(formatPublicationAuthors(paper.authors)) }}</p>
      <p>{{ t(paper.venueFullName) }}</p>
      <p v-if="paper.status || paper.acceptedMonth || paper.publicationDate" class="paper-status">{{ t(paper.status || (paper.acceptedMonth ? 'Accepted' : 'Published')) }}<template v-if="paper.acceptedMonth || paper.publicationDate"> · {{ t(formatMonth(paper.acceptedMonth || paper.publicationDate)) }}</template></p>
      <nav class="section-index" :aria-label="t('Paper sections')">
        <RouterLink :to="`${paperPath}#overview`">{{ t("Overview") }}</RouterLink>
        <RouterLink v-if="paper.contributionHighlights?.length" :to="`${paperPath}#contributions`">{{ t("Contributions") }}</RouterLink>
        <RouterLink :to="`${paperPath}#supporting-system`">{{ t("Project") }}</RouterLink>
        <RouterLink :to="`${paperPath}#materials`">{{ t("Research Materials") }}</RouterLink>
      </nav>
    </header>
    <section id="overview" class="section">
      <div class="directory-heading"><h2>{{ t(paper.abstract ? 'Abstract' : 'Overview') }}</h2></div>
      <div class="details-copy">
        <p v-for="paragraph in (paper.abstract || paper.abstractSummary).split('\n\n')" :key="paragraph">{{ t(paragraph) }}</p>
        <p v-if="paper.tags?.length" class="content-keywords">{{ t(paper.tags.join(' · ')) }}</p>
      </div>
    </section>
    <section v-if="paper.contributionHighlights?.length" id="contributions" class="section">
      <div class="directory-heading"><h2>{{ t("Contributions") }}</h2></div>
      <div class="details-copy"><ul><li v-for="item in paper.contributionHighlights" :key="item">{{ t(item) }}</li></ul></div>
    </section>
    <section id="supporting-system" class="section">
      <div class="directory-heading"><h2>{{ t("Project Application") }}</h2><p>{{ t("From the research method to its application.") }}</p></div>
      <article v-if="system" class="project-entry" :class="{ 'project-entry--system': system.figure }">
        <div class="project-overview">
          <p class="content-kicker">{{ t(system.type) }}</p>
          <h3>{{ t(system.title) }}</h3>
          <p class="project-deck">{{ t(system.subtitle) }}</p>
          <p class="project-description">{{ t(system.description) }}</p>
          <p class="paper-status">{{ t(system.availability) }}</p>
          <div class="content-links"><RouterLink :to="`/projects/${system.id}`" :aria-label="t('More about {title}', { title: t(system.title) })">{{ t("More") }}</RouterLink></div>
        </div>
        <ProjectFigure v-if="system.figure" :figure="system.figure" />
      </article>
    </section>
    <section id="materials" class="section">
      <div class="directory-heading"><h2>{{ t("Research Materials") }}</h2></div>
      <PublicationLinks :paper="paper" />
    </section>
  </div>
</template>

<script setup>
import { publicationTitles } from '../i18n/zh/publications'
import { t, formatMonth, isChinese } from '../i18n'
import { computed } from 'vue'
import RouterLink from '../components/LocaleLink.vue'
import PublicationLinks from '../components/PublicationLinks.vue'
import ProjectFigure from '../components/ProjectFigure.vue'
import { projectApplications } from '../data/systems'
import { formatPublicationAuthors } from '../utils/publicationDisplay'
const props = defineProps({ paper: { type: Object, required: true } })
const paperPath = computed(() => `/publications/${props.paper.id}`)
const system = computed(() => projectApplications.find(item => item.id === (props.paper.applicationId || props.paper.systemId)))
</script>
