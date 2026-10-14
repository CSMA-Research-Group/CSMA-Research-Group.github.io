<template>
  <div class="content-page projects-page">
    <header class="page-hero narrow">
      <h1>Projects</h1>
      <p>Research frameworks and prototypes connecting collaborative intelligence with software engineering, robotics, and real-world applications.</p>
      <nav class="section-index" aria-label="Project sections"><RouterLink to="/projects#research-projects">Research Projects</RouterLink><RouterLink to="/projects#research-systems">Research Systems</RouterLink><RouterLink to="/projects#ongoing-directions">Current Directions</RouterLink></nav>
    </header>
    <section class="section project-directory">
      <section id="research-projects" aria-labelledby="research-projects-title">
        <div class="directory-heading"><h2 id="research-projects-title">Research Projects</h2><p>Research questions and project periods.</p></div>
        <div class="project-list project-list--directions"><ProjectCard v-for="project in proposalProjects" :id="project.id" :key="project.id" :project="project" /></div>
      </section>
      <section id="research-systems" aria-labelledby="systems-title">
        <div class="directory-heading"><h2 id="systems-title">Research Systems</h2><p>Frameworks developed through our published work.</p></div>
        <div class="project-list"><ProjectCard v-for="project in systems" :id="project.id" :key="project.id" :project="project" /></div>
      </section>
      <section id="ongoing-directions" aria-labelledby="directions-title">
        <div class="directory-heading"><h2 id="directions-title">Current Directions</h2><p>Questions we are continuing to explore.</p></div>
        <div class="project-list project-list--directions"><ProjectCard v-for="project in directions" :id="project.id" :key="project.id" :project="project" /></div>
      </section>
    </section>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
import { researchSystems } from '../data/systems'
import { proposalProjects } from '../data/proposalProjects'
const systems = researchSystems
const directions = projects.filter((project) => project.status === 'Ongoing Direction')
</script>
