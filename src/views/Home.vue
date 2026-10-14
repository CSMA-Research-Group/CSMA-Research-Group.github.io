<template>
  <div class="home-page">
    <HeroSection eyebrow="" title="CSMA Research Group"
      :subtitle="heroIntroduction" :actions="heroActions">
      <VisionDiagram :image-src="homeVisionImage" :show-mobile-links="false" :animated="false" ambient-motion />
    </HeroSection>

    <section class="section home-community" aria-labelledby="home-news-title">
      <div class="section-heading split compact"><h2 id="home-news-title">News</h2><RouterLink class="text-link" to="/news">All news</RouterLink></div>
      <div class="home-news-list">
        <article v-for="item in newsItems.slice(0, 3)" :key="item.id" class="home-news-row">
          <time :datetime="item.date">{{ item.date }}</time>
          <div>
            <p class="home-news-meta">{{ item.venue }}</p>
            <h3><RouterLink :to="'/publications/' + item.publicationId">{{ item.title }}</RouterLink></h3>
            <p>{{ item.summary || item.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section muted home-selected" aria-labelledby="home-selected-title">
      <div class="section-heading compact"><h2 id="home-selected-title">Publications and Projects</h2></div>
      <div class="home-selected-grid">
        <div class="home-work-column">
          <div class="home-column-heading"><p class="home-column-label">Selected Publications</p><RouterLink class="text-link" to="/publications">All publications</RouterLink></div>
          <article v-for="paper in featuredPublications" :key="paper.id" class="home-paper-row">
            <div class="home-work-meta home-work-meta--linked"><span>{{ publicationVenueLabel(paper) }}</span><RouterLink class="text-link home-card-more" :to="'/publications/' + paper.id" :aria-label="'More about ' + paper.title">More</RouterLink></div>
            <h3><RouterLink :to="'/publications/' + paper.id">{{ paper.title }}</RouterLink></h3>
            <p class="authors">{{ formatPublicationAuthors(paper.authors) }}</p>
          </article>
        </div>
        <div class="home-work-column">
          <div class="home-column-heading"><p class="home-column-label">Research Projects</p><RouterLink class="text-link" to="/projects#research-projects">All projects</RouterLink></div>
          <article v-for="project in proposalProjects" :key="project.id" class="home-project-row">
            <div class="home-work-meta home-work-meta--linked"><span>{{ project.period }} · Ongoing</span><RouterLink class="text-link home-card-more" :to="'/projects#' + project.id" :aria-label="'More about ' + project.displayTitle">More</RouterLink></div>
            <h3><RouterLink :to="'/projects#' + project.id">{{ project.displayTitle }}</RouterLink></h3>
            <p>{{ project.homeSummary }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section home-research" aria-labelledby="home-research-title">
      <div class="section-heading split compact">
        <h2 id="home-research-title">Research</h2>
        <RouterLink class="text-link" to="/research">Explore our research</RouterLink>
      </div>
      <div class="home-research-intro"><p>{{ researchNarrative.homepageVision }}</p></div>
      <nav class="home-area-grid" aria-label="Research directions">
        <RouterLink v-for="area in coreResearchAreas" :key="area.id" class="home-area-item" :to="'/research#' + area.id">
          <div class="home-area-heading"><span class="home-column-label">{{ getResearchAreaRole(area.id) }}</span><span class="home-card-more">More</span></div>
          <h3>{{ getResearchAreaDisplayTitle(area) }}</h3>
          <p>{{ area.summary }}</p>
        </RouterLink>
      </nav>
    </section>

    <section class="section home-community" aria-labelledby="home-people-title">
      <div class="section-heading split compact"><h2 id="home-people-title">People</h2><RouterLink class="text-link" to="/people">All members →</RouterLink></div>
      <HomePeoplePreview />
    </section>

    <section class="section home-resources" aria-labelledby="home-resources-title">
      <div class="section-heading split compact"><h2 id="home-resources-title">Resources</h2><RouterLink class="text-link" to="/resources">All resources</RouterLink></div>
      <div class="home-resource-group" aria-labelledby="home-applications-title">
        <div class="home-resource-heading"><h3 id="home-applications-title">Research Applications</h3></div>
        <SystemResources />
      </div>
      <div class="home-resource-group" aria-labelledby="home-insights-title">
        <div class="home-resource-heading"><h3 id="home-insights-title">{{ researchInsights.title }}</h3></div>
        <ResearchInsights :items="researchInsights.items.slice(0, 2)" />
      </div>
    </section>

    <section class="section home-about" aria-labelledby="home-about-title">
      <div class="section-heading compact"><h2 id="home-about-title">About</h2></div>
      <div class="home-selected-grid home-about-grid">
        <div class="home-work-column"><div class="home-column-heading"><p class="home-column-label">CSMA Research Group</p><RouterLink class="text-link" to="/">Home</RouterLink></div><article class="home-project-row">
          <p>We study cognitive and collaborative intelligence, intelligent software engineering, intelligent robotics, and application scenarios.</p>
          <p>Our work connects research methods with inspectable systems and reusable artifacts.</p>
        </article></div>
        <div class="home-work-column"><div class="home-column-heading"><p class="home-column-label">Join Us</p><RouterLink class="text-link" to="/about#contact">How to join</RouterLink></div><article class="home-project-row">
          <p>We welcome undergraduate and graduate students interested in sustained research, and collaborators working across our research areas.</p>
          <p>Please email a brief introduction, your research interests, and relevant work.</p>
        </article></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
import { getResearchAreaDisplayTitle, getResearchAreaRole, researchNarrative } from '../data/researchPresentation'
const publicationVenueLabel = paper => paper.venue.includes(String(paper.year)) ? paper.venue : `${paper.venue} ${paper.year}`
const heroIntroduction = 'Welcome to the CSMA Research Group. ' + researchNarrative.description
const heroActions = [
  { label: 'Explore Research', to: '/research' },
  { label: 'View Publications', to: '/publications', variant: 'secondary' },
]
</script>
