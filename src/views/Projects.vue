<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">Projects</p>
        <h1>Research prototypes for intelligent software, robotics, and grounded applications.</h1>
        <p>
          CSMA projects carry cognitive and collaborative intelligence into software engineering,
          robotics, and application-driven validation. Public links are shown only when they are
          confirmed in the paper materials or by the group.
        </p>
      </div>
    </section>

    <section class="section">
      <h2 class="sr-only">All projects and research directions</h2>
      <div class="project-list">
        <ProjectCard v-for="project in projects" :id="project.id" :key="project.id" :project="project" />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
</script>
