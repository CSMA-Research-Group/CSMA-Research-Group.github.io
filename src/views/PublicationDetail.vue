<template>
  <div class="content-page publication-detail-page">
    <header class="page-hero narrow">
      <p class="eyebrow"><RouterLink to="/publications">Publications</RouterLink> · {{ paper.venue }} · {{ paper.year }}</p>
      <h1>{{ paper.title }}</h1>
      <p v-if="paper.authors?.length">{{ formatPublicationAuthors(paper.authors) }}</p>
      <p>{{ paper.venueFullName }}<template v-if="paper.status"> · {{ paper.status }}</template></p>
      <p v-if="paper.acceptedMonth || paper.publicationDate" class="paper-status">{{ paper.acceptedMonth ? 'Accepted' : 'Publication' }} · {{ formatMonth(paper.acceptedMonth || paper.publicationDate) }}</p>
      <nav class="section-index" aria-label="Paper sections">
        <RouterLink :to="`${paperPath}#overview`">Overview</RouterLink>
        <RouterLink v-if="paper.contributionHighlights?.length" :to="`${paperPath}#contributions`">Contributions</RouterLink>
        <RouterLink :to="`${paperPath}#supporting-system`">Project</RouterLink>
        <RouterLink :to="`${paperPath}#materials`">Research Materials</RouterLink>
      </nav>
    </header>
    <section id="overview" class="section">
      <div class="directory-heading"><h2>{{ paper.abstract ? 'Abstract' : 'Overview' }}</h2></div>
      <div class="details-copy">
        <p v-for="paragraph in (paper.abstract || paper.abstractSummary).split('\n\n')" :key="paragraph">{{ paragraph }}</p>
        <p v-if="paper.tags?.length" class="content-keywords">{{ paper.tags.join(' · ') }}</p>
      </div>
    </section>
    <section v-if="paper.contributionHighlights?.length" id="contributions" class="section">
      <div class="directory-heading"><h2>Contributions</h2></div>
      <div class="details-copy"><ul><li v-for="item in paper.contributionHighlights" :key="item">{{ item }}</li></ul></div>
    </section>
    <section id="supporting-system" class="section">
      <div class="directory-heading"><h2>Project Application</h2><p>From the research method to its application.</p></div>
      <article v-if="system" class="project-entry" :class="{ 'project-entry--system': system.figure }">
        <div class="project-overview">
          <p class="content-kicker">{{ system.type }}</p>
          <h3>{{ system.title }}</h3>
          <p class="project-deck">{{ system.subtitle }}</p>
          <p class="project-description">{{ system.description }}</p>
          <p class="paper-status">{{ system.availability }}</p>
          <div class="content-links"><RouterLink :to="`/projects/${system.id}`" :aria-label="`More about ${system.title}`">More</RouterLink></div>
        </div>
        <ProjectFigure v-if="system.figure" :figure="system.figure" />
      </article>
    </section>
    <section id="materials" class="section">
      <div class="directory-heading"><h2>Research Materials</h2></div>
      <PublicationLinks :paper="paper" />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PublicationLinks from '../components/PublicationLinks.vue'
import ProjectFigure from '../components/ProjectFigure.vue'
import { projectApplications } from '../data/systems'
import { formatPublicationAuthors } from '../utils/publicationDisplay'
const props = defineProps({ paper: { type: Object, required: true } })
const paperPath = computed(() => `/publications/${props.paper.id}`)
const system = computed(() => projectApplications.find(item => item.id === (props.paper.applicationId || props.paper.systemId)))
const formatMonth = date => new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date.length === 7 ? `${date}-01T00:00:00Z` : `${date}T00:00:00Z`))
</script>
