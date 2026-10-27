<template>
  <ChineseHome v-if="isChinese" />
  <div v-else class="home-page">
    <HeroSection eyebrow="" :title="t('CSMA Research Group')"
      :subtitle="heroIntroduction" :actions="heroActions">
      <VisionDiagram :image-src="homeVisionImage" :show-mobile-links="false" :animated="false" ambient-motion />
    </HeroSection>

    <section class="section home-community" aria-labelledby="home-news-title">
      <div class="section-heading split compact"><h2 id="home-news-title">{{ t("News") }}</h2><RouterLink class="text-link" to="/news">{{ t("All news") }}</RouterLink></div>
      <div class="home-news-list">
        <article v-for="item in newsItems.slice(0, 3)" :key="item.id" class="home-news-row">
          <time :datetime="item.date">{{ t(item.date) }}</time>
          <div>
            <p class="home-news-meta">{{ t(item.venue) }}</p>
            <PublicationTitle :title="item.title" :paper-id="item.publicationId" :to="'/publications/' + item.publicationId" />
            <p>{{ t(item.summary || item.description) }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section muted home-selected" aria-labelledby="home-selected-title">
      <div class="section-heading compact"><h2 id="home-selected-title">{{ t("Publications and Projects") }}</h2></div>
      <div class="home-selected-grid">
        <div class="home-work-column">
          <div class="home-column-heading"><p class="home-column-label">{{ t("Selected Publications") }}</p><RouterLink class="text-link" to="/publications">{{ t("All publications") }}</RouterLink></div>
          <article v-for="paper in featuredPublications" :key="paper.id" class="home-paper-row">
            <div class="home-work-meta home-work-meta--linked"><span>{{ t(publicationVenueLabel(paper)) }}</span><RouterLink class="text-link home-card-more" :to="'/publications/' + paper.id" :aria-label="t('More about {title}', { title: paper.title })">{{ t("More") }}</RouterLink></div>
            <PublicationTitle :title="paper.title" :paper-id="paper.id" :to="'/publications/' + paper.id" />
            <p class="authors">{{ t(formatPublicationAuthors(paper.authors)) }}</p>
          </article>
        </div>
        <div class="home-work-column">
          <div class="home-column-heading"><p class="home-column-label">{{ t("Research Projects") }}</p><RouterLink class="text-link" to="/projects#research-projects">{{ t("All projects") }}</RouterLink></div>
          <article v-for="project in proposalProjects" :key="project.id" class="home-project-row">
            <div class="home-work-meta home-work-meta--linked"><span>{{ t(project.period) }} {{ t("· Ongoing") }}</span><RouterLink class="text-link home-card-more" :to="'/projects#' + project.id" :aria-label="t('More about {title}', { title: t(project.displayTitle) })">{{ t("More") }}</RouterLink></div>
            <h3><RouterLink :to="'/projects#' + project.id">{{ t(project.displayTitle) }}</RouterLink></h3>
            <p>{{ t(project.homeSummary) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section home-research" aria-labelledby="home-research-title">
      <div class="section-heading split compact">
        <h2 id="home-research-title">{{ t("Research") }}</h2>
        <RouterLink class="text-link" to="/research">{{ t("Explore our research") }}</RouterLink>
      </div>
      <div class="home-research-intro"><p>{{ t(researchNarrative.homepageVision) }}</p></div>
      <nav class="home-area-grid" :aria-label="t('Research directions')">
        <RouterLink v-for="area in coreResearchAreas" :key="area.id" class="home-area-item" :to="'/research#' + area.id">
          <div class="home-area-heading"><span class="home-column-label">{{ t(getResearchAreaRole(area.id)) }}</span><span class="home-card-more">{{ t("More") }}</span></div>
          <h3>{{ t(getResearchAreaDisplayTitle(area)) }}</h3>
          <p>{{ t(area.summary) }}</p>
        </RouterLink>
      </nav>
    </section>

    <section class="section home-community" aria-labelledby="home-people-title">
      <div class="section-heading split compact"><h2 id="home-people-title">{{ t("People") }}</h2><RouterLink class="text-link" to="/people">{{ t("All members →") }}</RouterLink></div>
      <HomePeoplePreview />
    </section>

    <section class="section home-resources" aria-labelledby="home-resources-title">
      <div class="section-heading split compact"><h2 id="home-resources-title">{{ t("Resources") }}</h2><RouterLink class="text-link" to="/resources">{{ t("All resources") }}</RouterLink></div>
      <div class="home-resource-group" aria-labelledby="home-applications-title">
        <div class="home-resource-heading"><h3 id="home-applications-title">{{ t("Research Applications") }}</h3></div>
        <SystemResources />
      </div>
      <div class="home-resource-group" aria-labelledby="home-insights-title">
        <div class="home-resource-heading"><h3 id="home-insights-title">{{ t(researchInsights.title) }}</h3></div>
        <ResearchInsights :items="researchInsights.items.slice(0, 2)" />
      </div>
    </section>

    <section class="section home-about" aria-labelledby="home-about-title">
      <div class="section-heading compact"><h2 id="home-about-title">{{ t("About") }}</h2></div>
      <div class="home-selected-grid home-about-grid">
        <div class="home-work-column"><div class="home-column-heading"><p class="home-column-label">{{ t("CSMA Research Group") }}</p><RouterLink class="text-link" to="/">{{ t("Home") }}</RouterLink></div><article class="home-project-row">
          <p>{{ t("We connect research questions with working prototypes, reusable artifacts, and evidence that others can examine.") }}</p>
          <p>{{ t("Current work spans requirements engineering, code generation and repair, semantic faithfulness, and embodied task planning.") }}</p>
        </article></div>
        <div class="home-work-column"><div class="home-column-heading"><p class="home-column-label">{{ t("Join Us") }}</p><RouterLink class="text-link" to="/about#contact">{{ t("How to join") }}</RouterLink></div><article class="home-project-row">
          <p>{{ t(siteInfo.contactNote) }}</p>
          <p>{{ t("Please email a brief introduction, your research interests, and relevant work.") }}</p>
        </article></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ChineseHome from '../components/ChineseHome.vue'
import PublicationTitle from '../components/PublicationTitle.vue'
import { t, isChinese } from '../i18n'
import { computed } from 'vue'
import RouterLink from '../components/LocaleLink.vue'
import HeroSection from '../components/HeroSection.vue'
import VisionDiagram from '../components/VisionDiagram.vue'
import homeVisionImage from '../assets/figures/csma-home-research-vision.png'
import HomePeoplePreview from '../components/HomePeoplePreview.vue'
import SystemResources from '../components/SystemResources.vue'
import ResearchInsights from '../components/ResearchInsights.vue'
import { newsItems } from '../data/news'
import { researchInsights } from '../data/resources'
import { proposalProjects } from '../data/proposalProjects'
import { featuredPublications } from '../data/publications'
import { formatPublicationAuthors } from '../utils/publicationDisplay'
import { coreResearchAreas } from '../data/researchAreas'
import { siteInfo } from '../data/site'
import { getResearchAreaDisplayTitle, getResearchAreaRole, researchNarrative } from '../data/researchPresentation'
const publicationVenueLabel = paper => paper.venue.includes(String(paper.year)) ? paper.venue : `${paper.venue} ${paper.year}`
const heroIntroduction = computed(() => t('Welcome to the CSMA Research Group.') + ' ' + t(researchNarrative.description))
const heroActions = [
  { label: 'Explore Research', to: '/research' },
  { label: 'View Publications', to: '/publications', variant: 'secondary' },
  { label: 'Explore Collaboration', to: '/about#contact', variant: 'secondary' },
]
</script>
