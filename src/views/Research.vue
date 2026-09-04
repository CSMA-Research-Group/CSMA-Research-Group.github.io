<template>
  <div>
    <section class="page-hero research-page-hero">
      <div>
        <p class="eyebrow">Research</p>
        <h1 class="research-page-title">
          Cognitive and collaborative intelligence for software, robotics, and grounded applications.
        </h1>
        <p>
          CSMA studies the cognitive, reasoning, planning, and collaborative foundations of multi-agent intelligence, then instantiates those ideas in software engineering, robotics, and application-driven research prototypes.
        </p>
      </div>
      <VisionDiagram />
    </section>

    <section class="section muted">
      <div class="section-heading">
        <p class="eyebrow">Research Highlights</p>
        <h2>Representative systems extracted from the latest paper materials.</h2>
      </div>
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
              <RouterLink :to="`/projects#${highlight.projectId}`">Project details</RouterLink>
              <RouterLink :to="`/publications#${highlight.publicationId}`">Publication record</RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
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
import { researchAreas, researchHighlights } from '../data/researchAreas'
</script>
