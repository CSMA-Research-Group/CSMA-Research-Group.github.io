<template>
  <div class="home-page">
    <HeroSection
      :eyebrow="siteInfo.affiliation"
      title="CSMA Research Group"
      :subtitle="researchNarrative.description"
      :actions="heroActions"
    >
      <VisionDiagram :show-mobile-links="false" />
    </HeroSection>

    <section class="section home-research" aria-labelledby="home-research-title">
      <div class="home-research-intro">
        <p class="eyebrow">Research</p>
        <h2 id="home-research-title">Cognitive intelligence, grounded in software and embodied systems.</h2>
        <p>{{ researchNarrative.homepageVision }}</p>
        <RouterLink class="text-link" to="/research">Explore our research framework</RouterLink>
      </div>

      <nav class="home-area-grid" aria-label="Research directions">
        <RouterLink
          v-for="area in researchAreas"
          :key="area.id"
          class="home-area-item"
          :to="`/research#${area.id}`"
        >
          <span>{{ getResearchAreaRole(area.id) }}</span>
          <h3>{{ getResearchAreaDisplayTitle(area) }}</h3>
          <p>{{ area.summary }}</p>
          <b aria-hidden="true">↗</b>
        </RouterLink>
      </nav>
    </section>

    <section class="section muted home-selected" aria-labelledby="home-selected-title">
      <div class="section-heading split compact">
        <div>
          <p class="eyebrow">Selected Work</p>
          <h2 id="home-selected-title">Systems and publications</h2>
        </div>
        <RouterLink class="text-link" to="/projects">View all projects</RouterLink>
      </div>

      <div class="home-selected-grid">
        <div class="home-work-column">
          <p class="home-column-label">Research systems</p>
          <article v-for="project in featuredProjects" :key="project.id" class="home-project-row">
            <div class="home-work-meta">
              <span>{{ project.type }}</span>
              <span>{{ project.status }}</span>
            </div>
            <h3>
              <RouterLink :to="`/projects#${project.id}`">{{ project.title }}</RouterLink>
            </h3>
            <p class="home-work-subtitle">{{ project.subtitle }}</p>
            <p>{{ project.homeSummary || project.description }}</p>
            <div class="home-inline-links">
              <a
                v-for="link in project.links"
                :key="link.url"
                :href="link.url"
                :aria-label="`${link.label} for ${project.title}`"
                target="_blank"
                rel="noopener noreferrer"
              >{{ link.label }}</a>
              <RouterLink
                :to="`/projects#${project.id}`"
                :aria-label="`Project details for ${project.title}`"
              >Project details</RouterLink>
            </div>
          </article>
        </div>

        <div class="home-work-column">
          <div class="home-column-heading">
            <p class="home-column-label">Selected publications</p>
            <RouterLink class="text-link" to="/publications">All publications</RouterLink>
          </div>
          <article v-for="paper in featuredPublications" :key="paper.id" class="home-paper-row">
            <div class="home-work-meta">
              <span>{{ paper.venue }}</span>
              <span>{{ paper.year }}</span>
            </div>
            <h3>
              <RouterLink :to="`/publications#${paper.id}`">{{ paper.title }}</RouterLink>
            </h3>
            <p class="authors">{{ formatAuthors(paper.authors) }}</p>
            <div class="home-inline-links">
              <a
                v-if="paper.doi"
                :href="`https://doi.org/${paper.doi}`"
                :aria-label="`DOI for ${paper.title}`"
                target="_blank"
                rel="noopener noreferrer"
              >DOI</a>
              <a
                v-if="paper.code"
                :href="paper.code"
                :aria-label="`Code for ${paper.title}`"
                target="_blank"
                rel="noopener noreferrer"
              >Code</a>
              <RouterLink
                v-if="paper.relatedProjectId"
                :to="`/projects#${paper.relatedProjectId}`"
                :aria-label="`Related project for ${paper.title}`"
              >
                Related project
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section home-community" aria-labelledby="home-community-title">
      <div class="section-heading split compact">
        <div>
          <p class="eyebrow">Group</p>
          <h2 id="home-community-title">People and recent activity</h2>
        </div>
        <RouterLink class="text-link" to="/people">Meet the group</RouterLink>
      </div>

      <div class="home-community-grid">
        <div class="home-people-list">
          <article v-for="person in previewPeople" :key="person.id" class="home-person-row">
            <div class="home-person-initials" aria-hidden="true">{{ initialsFor(person.name) }}</div>
            <div>
              <p class="card-kicker">{{ person.role }}</p>
              <h3>{{ person.name }}</h3>
              <p>{{ person.affiliation }}</p>
              <div class="home-inline-links">
                <a
                  v-if="person.email"
                  :href="`mailto:${person.email}`"
                  :aria-label="`Email ${person.name}`"
                >Email</a>
                <a
                  v-if="person.homepage"
                  :href="person.homepage"
                  :aria-label="`${person.name} homepage`"
                  target="_blank"
                  rel="noopener noreferrer"
                >Homepage</a>
              </div>
            </div>
          </article>
        </div>

        <div class="home-news-list">
          <article v-for="item in newsItems.slice(0, 2)" :key="item.id" class="home-news-row">
            <time :datetime="item.date">{{ item.date }}</time>
            <div>
              <p class="home-news-meta">{{ item.venue }} · {{ item.location }}</p>
              <h3>{{ item.title }}</h3>
              <p>{{ conciseNews(item) }}</p>
            </div>
          </article>
          <RouterLink class="text-link home-news-link" to="/news">View all news</RouterLink>
        </div>
      </div>
    </section>

    <section class="section home-collaborate" aria-labelledby="home-collaborate-title">
      <div>
        <p class="eyebrow">Collaborate</p>
        <h2 id="home-collaborate-title">Work with CSMA</h2>
        <p>{{ siteInfo.contactNote }}</p>
      </div>
      <nav class="home-action-links" aria-label="Group links">
        <RouterLink to="/join-us">Join the group</RouterLink>
        <RouterLink to="/resources">Research resources</RouterLink>
        <RouterLink to="/about">About &amp; contact</RouterLink>
        <a :href="siteInfo.githubOrg" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </nav>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import VisionDiagram from '../components/VisionDiagram.vue'
import { newsItems } from '../data/news'
import { peopleSections } from '../data/people'
import { featuredProjects } from '../data/projects'
import { featuredPublications } from '../data/publications'
import { researchAreas } from '../data/researchAreas'
import {
  getResearchAreaDisplayTitle,
  getResearchAreaRole,
  researchNarrative,
} from '../data/researchPresentation'
import { siteInfo } from '../data/site'

const heroActions = [
  { label: 'Explore Research', to: '/research' },
  { label: 'View Publications', to: '/publications', variant: 'secondary' },
]

const previewPeople = peopleSections
  .filter((section) => ['group-members', 'student-researchers'].includes(section.id))
  .flatMap((section) => section.people)

const formatAuthors = (authors) => (Array.isArray(authors) ? authors.join(', ') : authors)

const initialsFor = (name) => name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 3)
  .toUpperCase()

const conciseNews = (item) => (
  item.paperTitle ? `Presented: ${item.paperTitle}` : item.description
)
</script>
