<template>
  <div class="content-page people-page">
    <header class="page-hero narrow">
      <h1>People</h1>
      <p>Our members work across artificial intelligence, intelligent software engineering, and intelligent robotics.</p>
      <nav class="section-index" aria-label="People sections">
        <RouterLink v-for="level in peopleHierarchy" :key="level.id" :to="'/people#' + level.id">{{ level.title }}</RouterLink>
        <RouterLink to="/people/alumni">Alumni</RouterLink>
        <RouterLink to="/people#join-us">Join Us</RouterLink>
      </nav>
    </header>
    <div class="section people-directory">
      <PeoplePyramid />
      <section id="join-us" class="people-invitation" aria-labelledby="people-join-heading">
        <div>
          <p class="eyebrow">Join Us</p><h2 id="people-join-heading">Grow with the group.</h2>
          <p>We welcome motivated undergraduate and graduate students interested in sustained research,
            and collaborators working on cognitive intelligence, multi-agent systems, intelligent software, and robotics.</p>
        </div>
        <RouterLink class="text-link" to="/about#contact">Get in touch <span aria-hidden="true">→</span></RouterLink>
      </section>
      <ArchiveNote description="Former members and their next steps are collected in the alumni archive."
        to="/people/alumni" label="Alumni" link-label="Browse the Alumni Archive" />
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import PeoplePyramid from '../components/PeoplePyramid.vue'
import ArchiveNote from '../components/ArchiveNote.vue'
import { peopleHierarchy } from '../data/peopleHierarchy'
</script>
