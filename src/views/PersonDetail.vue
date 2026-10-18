<template>
  <div class="content-page person-detail-page">
    <header class="page-hero narrow">
      <p class="eyebrow">{{ person.displayRole }}</p>
      <h1>{{ person.name }}</h1>
      <p v-if="person.fictional">Fictional profile for layout preview. The name, generated portrait, and research interests will be replaced with confirmed information.</p>
      <p v-else-if="person.placeholder">Profile details will be added once the information is provided.</p>
      <nav class="section-index" aria-label="Profile navigation"><RouterLink to="/people">All members</RouterLink></nav>
    </header>
    <section class="section person-profile-content">
      <PeopleCard v-if="!person.placeholder || person.fictional" :person="person" />
      <div v-else class="details-copy"><p>Biography, research interests, and a personal homepage are awaiting confirmation.</p></div>
      <div v-if="person.interests?.length" class="person-profile-section">
        <div class="directory-heading"><h2>Research Interests</h2></div>
        <div class="tag-row"><span v-for="interest in person.interests" :key="interest">{{ interest }}</span></div>
      </div>
      <div v-if="relatedPapers.length" class="person-profile-section">
        <div class="directory-heading"><h2>Publications</h2></div>
        <div class="details-copy">
          <ul>
            <li v-for="paper in relatedPapers" :key="paper.id">
              <RouterLink :to="'/publications/' + paper.id">{{ paper.title }}</RouterLink>
              <span v-if="paper.status" class="paper-status"> · {{ paper.status }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PeopleCard from '../components/PeopleCard.vue'
import { publications } from '../data/publications'
const props = defineProps({ person: { type: Object, required: true } })
const relatedPapers = computed(() => publications.filter(paper => props.person.relatedPublicationIds?.includes(paper.id)))
</script>
