<template>
  <div class="content-page projects-page">
    <header class="page-hero narrow">
      <h1>{{ t("Projects") }}</h1>
      <p>{{ t("Research frameworks and prototypes connecting collaborative intelligence with software engineering, robotics, and real-world applications.") }}</p>
      <nav class="section-index" :aria-label="t('Project sections')"><RouterLink to="/projects#research-projects">{{ t("Research Projects") }}</RouterLink><RouterLink to="/projects#research-systems">{{ t("Research Systems") }}</RouterLink><RouterLink to="/projects#ongoing-directions">{{ t("Current Directions") }}</RouterLink></nav>
    </header>
    <section class="section project-directory">
      <section id="research-projects" aria-labelledby="research-projects-title">
        <div class="directory-heading"><h2 id="research-projects-title">{{ t("Research Projects") }}</h2><p>{{ t("Research questions and project periods.") }}</p></div>
        <div class="project-list project-list--directions"><ProjectCard v-for="project in proposalProjects" :id="project.id" :key="project.id" :project="project" /></div>
      </section>
      <section id="research-systems" aria-labelledby="systems-title">
        <div class="directory-heading"><h2 id="systems-title">{{ t("Research Systems") }}</h2><p>{{ t("Frameworks presented in our research papers.") }}</p></div>
        <div class="project-list"><ProjectCard v-for="project in systems" :id="project.id" :key="project.id" :project="project" /></div>
      </section>
      <section id="ongoing-directions" aria-labelledby="directions-title">
        <div class="directory-heading"><h2 id="directions-title">{{ t("Current Directions") }}</h2><p>{{ t("Questions we are continuing to explore.") }}</p></div>
        <div class="project-list project-list--directions"><ProjectCard v-for="project in directions" :id="project.id" :key="project.id" :project="project" /></div>
      </section>
    </section>
  </div>
</template>
<script setup>
import { t } from '../i18n'
import RouterLink from '../components/LocaleLink.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
import { researchSystems } from '../data/systems'
import { proposalProjects } from '../data/proposalProjects'
const systems = researchSystems
const directions = projects.filter((project) => project.status === 'Ongoing Direction')
</script>
