<template>
  <div class="research-body-page">
    <section class="page-hero research-page-hero">
      <div class="research-hero-copy">
        <p class="eyebrow">{{ t("Research") }}</p>
        <h1 class="research-page-title"> {{ t("Cognitive and collaborative intelligence for software, robotics, and practical applications.") }} </h1>
        <p class="research-hero-intro"> {{ t("We investigate how agents reason, plan, and collaborate, then evaluate these capabilities through software engineering tasks, robotic scenarios, and research prototypes.") }} </p>
      </div>
      <VisionDiagram :image-src="researchVisionImage" :animated="false" ambient-motion />
    </section>

    <section class="section muted" aria-labelledby="research-highlights-title">
      <div class="section-heading"><h2 id="research-highlights-title">{{ t("Research Highlights") }}</h2></div>
      <div class="highlight-grid">
        <article v-for="highlight in researchHighlights" :key="highlight.id" class="highlight-card">
          <figure>
            <img
              :src="highlight.figure.src"
              :alt="t(highlight.figure.alt)"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{{ t(highlight.figure.caption) }}</figcaption>
          </figure>
          <div>
            <h3>{{ t(highlight.title) }}</h3>
            <p>{{ t(highlight.summary) }}</p>
            <div class="tag-row">
              <span v-for="tag in highlight.tags" :key="tag">{{ t(tag) }}</span>
            </div>
            <div class="research-links">
              <RouterLink :to="`/projects#${highlight.projectId}`">{{ t("Project") }}</RouterLink>
              <RouterLink :to="`/publications/${highlight.publicationId}`">{{ t("Publication") }}</RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="research-directions-title">
      <div class="section-heading"><h2 id="research-directions-title">{{ t("Research Directions") }}</h2></div>
      <div class="research-grid">
        <ResearchAreaCard
          v-for="(area, index) in researchAreas"
          :id="area.id"
          :key="area.id"
          :area="area"
          :index-label="String(index + 1).padStart(2, '0')"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from '../components/LocaleLink.vue'
import ResearchAreaCard from '../components/ResearchAreaCard.vue'
import VisionDiagram from '../components/VisionDiagram.vue'
import researchVisionImage from '../assets/figures/csma-home-research-vision.png'
import { coreResearchAreas as researchAreas, researchHighlights } from '../data/researchAreas'
</script>
