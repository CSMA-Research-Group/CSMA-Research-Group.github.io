<template>
  <div class="content-page publications-page">
    <header class="page-hero narrow">
      <h1>Publications</h1>
      <p>Recent journal and conference papers on collaborative intelligence, intelligent software engineering, and the evaluation of AI systems.</p>
      <nav class="section-index" aria-label="Publication sections"><RouterLink to="/publications#selected-publications">Selected Publications</RouterLink><RouterLink to="/publications#more-publications">More Publications</RouterLink></nav>
    </header>
    <section id="selected-publications" class="section"><PublicationList :publications="selected" :categories="['Selected Publications']" /></section>
    <section id="more-publications" class="section"><PublicationList :publications="other" :categories="['More Publications']" /></section>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import PublicationList from '../components/PublicationList.vue'
import { publications } from '../data/publications'
const selected = publications.filter(p => p.featured).map(p => ({...p, category: 'Selected Publications'}))
const other = publications.filter(p => !p.featured).map(p => ({...p, category: 'More Publications'}))
</script>
