<template>
  <div>
    <HeroSection
      title="CSMA Research Group"
      :subtitle="siteInfo.description"
      :actions="heroActions"
    >
      <VisionDiagram />
    </HeroSection>

    <section class="section">
      <div class="section-grid">
        <div>
          <p class="eyebrow">Research Vision</p>
          <h2>Integrated AI research for software, robots, and complex real-world systems.</h2>
        </div>
        <div class="prose">
          <p>{{ siteInfo.vision }}</p>
          <p>
            CSMA focuses on agentic systems that can reason over goals, artifacts, traces, memory, and constraints. The group is especially interested in systems that explain their behavior, identify uncertainty, collaborate with humans, and improve through feedback in high-value technical workflows.
          </p>
        </div>
      </div>
    </section>

    <section class="section muted research-ecosystem-section">
      <div class="section-heading ecosystem-heading">
        <p class="eyebrow">Featured Research Areas</p>
        <h2>Research directions spanning AI foundations, software intelligence, robotics, and applications.</h2>
      </div>
      <div ref="ecosystemRef" class="research-ecosystem">
        <svg
          v-if="connectorState.paths.length"
          class="area-connector-svg"
          :viewBox="`0 0 ${connectorState.width} ${connectorState.height}`"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <template v-for="connector in connectorState.paths" :key="connector.id">
            <line
              v-if="connector.kind === 'line'"
              class="area-connector-line"
              :class="{
                'sync-line': connector.type === 'sync',
              }"
              :x1="connector.x1"
              :y1="connector.y1"
              :x2="connector.x2"
              :y2="connector.y2"
            />
            <path
              v-else
              class="area-connector-path"
              :class="{
                'is-auxiliary': connector.type === 'auxiliary',
              }"
              :d="connector.d"
            />
          </template>
        </svg>
        <RouterLink
          v-for="area in featuredAreas"
          :key="area.id"
          class="feature-card ecosystem-card area-card"
          :class="[
            areaClass(area.id),
            {
              'ecosystem-card-application': area.id === 'application-scenarios',
              'ecosystem-card-ai': area.id === 'artificial-intelligence',
            },
          ]"
          :to="`/research#${area.id}`"
        >
          <h3>{{ area.title }}</h3>
          <p>{{ area.summary }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="section">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Research Highlights</p>
          <h2>Representative paper-driven systems.</h2>
        </div>
        <RouterLink class="text-link" to="/research">View research</RouterLink>
      </div>
      <div class="highlight-grid">
        <article v-for="highlight in researchHighlights" :key="highlight.id" class="highlight-card">
          <figure>
            <img :src="highlight.figure.src" :alt="highlight.figure.alt" />
            <figcaption>{{ highlight.figure.caption }}</figcaption>
          </figure>
          <div>
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.summary }}</p>
            <div class="tag-row">
              <span v-for="tag in highlight.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Featured Projects</p>
          <h2>Research prototypes and system themes.</h2>
        </div>
        <RouterLink class="text-link" to="/projects">View all projects</RouterLink>
      </div>
      <div class="project-preview-grid">
        <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
      </div>
    </section>

    <section class="section muted">
      <div class="section-heading split">
        <div>
          <p class="eyebrow">Latest News</p>
          <h2>Recent international conference activity.</h2>
        </div>
        <RouterLink class="text-link" to="/news">View news</RouterLink>
      </div>
      <NewsList :items="newsItems.slice(0, 2)" />
    </section>

    <section class="section cta-section">
      <div>
        <p class="eyebrow">About CSMA</p>
        <h2>Learn how to contact the group, explore collaboration interests, and find student or collaborator opportunities.</h2>
      </div>
      <RouterLink class="button button-primary" to="/about">Contact + Join Us</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import NewsList from '../components/NewsList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import VisionDiagram from '../components/VisionDiagram.vue'
import { newsItems } from '../data/news'
import { featuredProjects } from '../data/projects'
import { researchAreas, researchHighlights } from '../data/researchAreas'
import { siteInfo } from '../data/site'

const heroActions = [
  { label: 'Explore Research', to: '/research' },
  { label: 'View Publications', to: '/publications', variant: 'secondary' },
  { label: 'About CSMA', to: '/about', variant: 'secondary' },
]

const featuredAreas = [
  researchAreas.find((area) => area.id === 'application-scenarios'),
  researchAreas.find((area) => area.id === 'intelligent-software-engineering'),
  researchAreas.find((area) => area.id === 'artificial-intelligence'),
  researchAreas.find((area) => area.id === 'intelligent-robotics'),
].filter(Boolean)

const ecosystemRef = ref(null)
const connectorState = reactive({
  width: 0,
  height: 0,
  paths: [],
})

let ecosystemResizeObserver
let connectorFrame = 0

const areaClass = (id) => ({
  'application-scenarios': 'applications',
  'artificial-intelligence': 'ai',
  'intelligent-software-engineering': 'software',
  'intelligent-robotics': 'robotics',
}[id] || '')

const relativeRect = (rect, containerRect) => ({
  left: rect.left - containerRect.left,
  top: rect.top - containerRect.top,
  right: rect.right - containerRect.left,
  bottom: rect.bottom - containerRect.top,
  width: rect.width,
  height: rect.height,
  cx: rect.left - containerRect.left + rect.width / 2,
  cy: rect.top - containerRect.top + rect.height / 2,
})

const linePath = (x1, y1, x2, y2) => (
  `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`
)

const updateConnectorPaths = () => {
  const container = ecosystemRef.value

  if (!container || window.matchMedia('(max-width: 560px)').matches) {
    connectorState.paths = []
    return
  }

  const applicationsCard = container.querySelector('.area-card.applications')
  const softwareCard = container.querySelector('.area-card.software')
  const aiCard = container.querySelector('.area-card.ai')
  const roboticsCard = container.querySelector('.area-card.robotics')

  if (!applicationsCard || !softwareCard || !aiCard || !roboticsCard) {
    connectorState.paths = []
    return
  }

  const containerRect = container.getBoundingClientRect()
  const applications = relativeRect(applicationsCard.getBoundingClientRect(), containerRect)
  const software = relativeRect(softwareCard.getBoundingClientRect(), containerRect)
  const ai = relativeRect(aiCard.getBoundingClientRect(), containerRect)
  const robotics = relativeRect(roboticsCard.getBoundingClientRect(), containerRect)
  const lowerCardsBottom = Math.max(software.bottom, robotics.bottom)
  const preferredSyncY = lowerCardsBottom - 28
  const minimumSyncY = ai.bottom + 24
  const syncLineDownshift = 8
  const syncY = Math.max(preferredSyncY, minimumSyncY) + syncLineDownshift

  connectorState.width = containerRect.width
  connectorState.height = containerRect.height
  connectorState.paths = [
    {
      id: 'applications-software',
      type: 'primary',
      d: linePath(
        software.cx,
        applications.bottom,
        software.cx,
        software.top,
      ),
    },
    {
      id: 'applications-ai',
      type: 'primary',
      d: linePath(
        ai.cx,
        applications.bottom,
        ai.cx,
        ai.top,
      ),
    },
    {
      id: 'applications-robotics',
      type: 'primary',
      d: linePath(
        robotics.cx,
        applications.bottom,
        robotics.cx,
        robotics.top,
      ),
    },
    {
      id: 'software-ai',
      type: 'primary',
      d: linePath(software.right, ai.cy, ai.left, ai.cy),
    },
    {
      id: 'ai-robotics',
      type: 'primary',
      d: linePath(ai.right, ai.cy, robotics.left, ai.cy),
    },
    {
      id: 'software-robotics-sync',
      type: 'sync',
      kind: 'line',
      x1: Number(software.right.toFixed(1)),
      y1: Number(syncY.toFixed(1)),
      x2: Number(robotics.left.toFixed(1)),
      y2: Number(syncY.toFixed(1)),
    },
  ]
}

const scheduleConnectorUpdate = () => {
  if (connectorFrame) {
    cancelAnimationFrame(connectorFrame)
  }

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
  if (connectorFrame) {
    cancelAnimationFrame(connectorFrame)
  }

  ecosystemResizeObserver?.disconnect()
  window.removeEventListener('resize', scheduleConnectorUpdate)
})
</script>
