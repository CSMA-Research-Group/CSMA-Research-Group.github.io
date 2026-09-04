<template>
  <div>
    <HeroSection
      eyebrow="Cognitive and Collaborative Intelligence"
      title="CSMA Research Group"
      :subtitle="siteInfo.slogan"
      :actions="heroActions"
    />

    <section class="section vision-section" aria-labelledby="home-vision-title">
      <div class="section-grid">
        <div>
          <p class="eyebrow">Research Vision</p>
          <h2 id="home-vision-title">Intelligence that reasons, collaborates, and improves through evidence.</h2>
        </div>
        <div class="prose">
          <p>{{ researchNarrative.vision }}</p>
          <p>
            CSMA studies systems that reason over goals, artifacts, traces, memory, and constraints.
            We connect cognitive foundations with collaborative agents, intelligent software, and
            embodied systems, grounded by practical workflows and human review.
          </p>
        </div>
      </div>

      <div class="research-framework-summary" role="list" aria-label="CSMA research framework">
        <div role="listitem">
          <span>Core</span>
          <strong>Cognitive Intelligence</strong>
          <p>Reasoning, planning, memory, reflection, metacognition, and adaptation.</p>
        </div>
        <div role="listitem">
          <span>Primary carriers</span>
          <strong>Intelligent Software + Robotics</strong>
          <p>Software-engineering workflows and embodied robotic systems.</p>
        </div>
        <div role="listitem">
          <span>Grounding</span>
          <strong>Application Scenarios</strong>
          <p>Research prototypes, experimental validation, deployment, and reproducibility.</p>
        </div>
        <div role="listitem">
          <span>Cross-cutting support</span>
          <strong>Knowledge + Human Feedback</strong>
          <p>Domain knowledge, shared evidence, quality checks, review, and accountability.</p>
        </div>
      </div>

      <div class="vision-showcase">
        <VisionDiagram />
        <p class="vision-guidance">
          Explore the four interactive modules to open their corresponding research directions.
        </p>
      </div>
    </section>

    <section class="section muted research-ecosystem-section" aria-labelledby="home-areas-title">
      <div class="section-heading ecosystem-heading">
        <p class="eyebrow">Research Areas</p>
        <h2 id="home-areas-title">A research system organized from cognition to grounded practice.</h2>
        <p class="section-description">
          Cognitive intelligence forms the core; intelligent software and robotics provide the main
          carriers; application scenarios ground and validate the work.
        </p>
      </div>

      <div ref="ecosystemRef" class="research-ecosystem">
        <svg
          v-if="connectorState.paths.length"
          class="area-connector-svg"
          :viewBox="`0 0 ${connectorState.width} ${connectorState.height}`"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            v-for="connector in connectorState.paths"
            :key="connector.id"
            class="area-connector-path"
            :d="connector.d"
          />
        </svg>

        <RouterLink
          v-for="area in featuredAreas"
          :key="area.id"
          class="feature-card ecosystem-card area-card"
          :class="[`ecosystem-card-${areaClass(area.id)}`]"
          :to="`/research#${area.id}`"
          :aria-label="`Explore ${getResearchAreaDisplayTitle(area)}`"
        >
          <p class="card-kicker">{{ getResearchAreaRole(area.id) }}</p>
          <h3>{{ getResearchAreaDisplayTitle(area) }}</h3>
          <p>{{ area.summary }}</p>
        </RouterLink>
      </div>

      <aside class="research-support-band" aria-labelledby="support-layer-title">
        <div>
          <p class="eyebrow">Connecting Layer</p>
          <h3 id="support-layer-title">Collaboration, knowledge, and human feedback span every area.</h3>
        </div>
        <div class="support-links">
          <RouterLink
            v-for="area in supportingAreas"
            :key="area.id"
            :to="`/research#${area.id}`"
          >
            <strong>{{ getResearchAreaDisplayTitle(area) }}</strong>
            <span>{{ area.summary }}</span>
          </RouterLink>
        </div>
      </aside>
    </section>

    <section class="section" aria-labelledby="home-projects-title">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Featured Projects</p>
          <h2 id="home-projects-title">Research prototypes and system themes.</h2>
        </div>
        <RouterLink class="text-link" to="/projects">View all projects</RouterLink>
      </div>
      <div class="project-preview-grid">
        <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
      </div>
    </section>

    <section class="section muted" aria-labelledby="home-publications-title">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Selected Publications</p>
          <h2 id="home-publications-title">Verified papers connected to the group’s systems.</h2>
        </div>
        <RouterLink class="text-link" to="/publications">View all publications</RouterLink>
      </div>
      <div class="publication-preview-grid">
        <article v-for="paper in featuredPublications" :key="paper.id" class="publication-preview-card">
          <p class="card-kicker">{{ paper.venue }} · {{ paper.year }}</p>
          <h3>{{ paper.title }}</h3>
          <p class="authors">{{ formatAuthors(paper.authors) }}</p>
          <p>{{ paper.abstractSummary }}</p>
          <div class="paper-links">
            <a
              v-if="paper.doi"
              :href="`https://doi.org/${paper.doi}`"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open DOI for ${paper.title}`"
            >DOI</a>
            <a
              v-if="paper.code"
              :href="paper.code"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open code for ${paper.title}`"
            >Code</a>
            <RouterLink v-if="paper.relatedProjectId" :to="`/projects#${paper.relatedProjectId}`">
              Related Project
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="home-people-title">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">People</p>
          <h2 id="home-people-title">Group members and student researchers.</h2>
        </div>
        <RouterLink class="text-link" to="/people">Meet the full research network</RouterLink>
      </div>
      <div class="people-grid">
        <PeopleCard v-for="person in previewPeople" :key="person.id" :person="person" />
      </div>
    </section>

    <section class="section muted" aria-labelledby="home-news-title">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Latest News</p>
          <h2 id="home-news-title">Publication and conference updates.</h2>
        </div>
        <RouterLink class="text-link" to="/news">View news</RouterLink>
      </div>
      <NewsList :items="newsItems.slice(0, 2)" />
    </section>

    <section class="section" aria-labelledby="home-resources-title">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Resources</p>
          <h2 id="home-resources-title">Public code and verified group repositories.</h2>
        </div>
        <RouterLink class="text-link" to="/resources">Browse all resources</RouterLink>
      </div>
      <div class="resource-preview-grid">
        <article v-for="item in availableResources" :key="`${item.groupId}-${item.name}`" class="resource-preview-card">
          <p class="card-kicker">{{ item.groupTitle }}</p>
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <a :href="item.link" target="_blank" rel="noopener noreferrer">
            Open resource
          </a>
        </article>
      </div>
    </section>

    <section class="section cta-section" aria-labelledby="home-about-title">
      <div>
        <p class="eyebrow">About + Contact</p>
        <h2 id="home-about-title">Learn about CSMA, contact the group, or explore opportunities to join.</h2>
      </div>
      <RouterLink class="button button-primary" to="/about">About CSMA</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import NewsList from '../components/NewsList.vue'
import PeopleCard from '../components/PeopleCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import VisionDiagram from '../components/VisionDiagram.vue'
import { newsItems } from '../data/news'
import { peopleSections } from '../data/people'
import { featuredProjects } from '../data/projects'
import { featuredPublications } from '../data/publications'
import { researchAreas } from '../data/researchAreas'
import {
  getResearchAreaDisplayTitle,
  getResearchAreaRole,
  homepageResearchAreaIds,
  researchNarrative,
  supportingResearchAreaIds,
} from '../data/researchPresentation'
import { resourceGroups } from '../data/resources'
import { siteInfo } from '../data/site'

const heroActions = [
  { label: 'Explore Research', to: '/research' },
  { label: 'View Publications', to: '/publications', variant: 'secondary' },
]

const featuredAreas = homepageResearchAreaIds
  .map((areaId) => researchAreas.find((area) => area.id === areaId))
  .filter(Boolean)

const supportingAreas = supportingResearchAreaIds
  .map((areaId) => researchAreas.find((area) => area.id === areaId))
  .filter(Boolean)

const previewPeople = peopleSections
  .filter((section) => ['group-members', 'student-researchers'].includes(section.id))
  .flatMap((section) => section.people)

const availableResources = resourceGroups.flatMap((group) => (
  group.items
    .filter((item) => item.link)
    .map((item) => ({ ...item, groupId: group.id, groupTitle: group.title }))
))

const formatAuthors = (authors) => (Array.isArray(authors) ? authors.join(', ') : authors)

const ecosystemRef = ref(null)
const connectorState = reactive({
  width: 0,
  height: 0,
  paths: [],
})

let ecosystemResizeObserver
let connectorFrame = 0

const areaClass = (id) => ({
  'artificial-intelligence': 'core',
  'intelligent-software-engineering': 'software',
  'intelligent-robotics': 'robotics',
  'application-scenarios': 'applications',
}[id] || '')

const relativeRect = (rect, containerRect) => ({
  top: rect.top - containerRect.top,
  bottom: rect.bottom - containerRect.top,
  cx: rect.left - containerRect.left + rect.width / 2,
})

const curvedPath = (x1, y1, x2, y2) => {
  const middleY = (y1 + y2) / 2
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${x1.toFixed(1)} ${middleY.toFixed(1)}, ${x2.toFixed(1)} ${middleY.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

const updateConnectorPaths = () => {
  const container = ecosystemRef.value

  if (!container || window.matchMedia('(max-width: 820px)').matches) {
    connectorState.paths = []
    return
  }

  const coreCard = container.querySelector('.area-card.ecosystem-card-core')
  const softwareCard = container.querySelector('.area-card.ecosystem-card-software')
  const roboticsCard = container.querySelector('.area-card.ecosystem-card-robotics')
  const applicationsCard = container.querySelector('.area-card.ecosystem-card-applications')

  if (!coreCard || !softwareCard || !roboticsCard || !applicationsCard) {
    connectorState.paths = []
    return
  }

  const containerRect = container.getBoundingClientRect()
  const core = relativeRect(coreCard.getBoundingClientRect(), containerRect)
  const software = relativeRect(softwareCard.getBoundingClientRect(), containerRect)
  const robotics = relativeRect(roboticsCard.getBoundingClientRect(), containerRect)
  const applications = relativeRect(applicationsCard.getBoundingClientRect(), containerRect)

  connectorState.width = containerRect.width
  connectorState.height = containerRect.height
  connectorState.paths = [
    {
      id: 'core-software',
      d: curvedPath(core.cx, core.bottom, software.cx, software.top),
    },
    {
      id: 'core-robotics',
      d: curvedPath(core.cx, core.bottom, robotics.cx, robotics.top),
    },
    {
      id: 'software-applications',
      d: curvedPath(software.cx, software.bottom, applications.cx, applications.top),
    },
    {
      id: 'robotics-applications',
      d: curvedPath(robotics.cx, robotics.bottom, applications.cx, applications.top),
    },
  ]
}

const scheduleConnectorUpdate = () => {
  if (connectorFrame) cancelAnimationFrame(connectorFrame)

  connectorFrame = requestAnimationFrame(() => {
    connectorFrame = 0
    updateConnectorPaths()
  })
}

onMounted(async () => {
  await nextTick()
  scheduleConnectorUpdate()

  ecosystemResizeObserver = new ResizeObserver(scheduleConnectorUpdate)
  if (ecosystemRef.value) {
    ecosystemResizeObserver.observe(ecosystemRef.value)
    ecosystemRef.value.querySelectorAll('.area-card').forEach((card) => {
      ecosystemResizeObserver.observe(card)
    })
  }

  window.addEventListener('resize', scheduleConnectorUpdate)
})

onUnmounted(() => {
  if (connectorFrame) cancelAnimationFrame(connectorFrame)
  ecosystemResizeObserver?.disconnect()
  window.removeEventListener('resize', scheduleConnectorUpdate)
})
</script>
