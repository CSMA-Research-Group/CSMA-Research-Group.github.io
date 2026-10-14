<template>
  <div class="research-body-page">
    <section class="page-hero research-page-hero">
      <div class="research-hero-copy">
        <p class="eyebrow">Research</p>
        <h1 class="research-page-title">
          Cognitive and collaborative intelligence for software, robotics, and grounded applications.
        </h1>
        <p class="research-hero-intro">
          CSMA studies the cognitive, reasoning, planning, and collaborative foundations of multi-agent intelligence, then instantiates those ideas in software engineering, robotics, and application-driven research prototypes.
        </p>
      </div>
      <VisionDiagram :image-src="researchVisionImage" :animated="false" ambient-motion />
    </section>

    <section class="section muted" aria-labelledby="research-highlights-title">
      <div class="section-heading"><h2 id="research-highlights-title">Research Highlights</h2></div>
      <div class="highlight-grid">
        <article v-for="highlight in researchHighlights" :key="highlight.id" class="highlight-card">
          <figure>
            <img
              :src="highlight.figure.src"
              :alt="highlight.figure.alt"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{{ highlight.figure.caption }}</figcaption>
          </figure>
          <div>
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.summary }}</p>
            <div class="tag-row">
              <span v-for="tag in highlight.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="research-links">
              <RouterLink :to="`/projects#${highlight.projectId}`">Project</RouterLink>
              <RouterLink :to="`/publications/${highlight.publicationId}`">Publication</RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="research-directions-title">
      <div class="section-heading"><h2 id="research-directions-title">Research Directions</h2></div>
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
import { RouterLink } from 'vue-router'
import ResearchAreaCard from '../components/ResearchAreaCard.vue'
import VisionDiagram from '../components/VisionDiagram.vue'
import researchVisionImage from '../assets/figures/csma-home-research-vision.png'
import { coreResearchAreas as researchAreas, researchHighlights } from '../data/researchAreas'
</script>
