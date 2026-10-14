<template>
  <div class="publication-directory">
    <section v-for="category in visibleCategories" :key="category" class="publication-category">
      <div class="directory-heading"><h2>{{ category }}</h2></div>
      <article v-for="paper in categoryEntries(category)" :id="paper.id" :key="paper.id" class="paper-entry">
        <div class="paper-dateline"><strong>{{ paper.year }}</strong><span>{{ paper.venue }}</span><span v-if="paper.rating">{{ paper.rating }}</span></div>
        <div class="paper-copy">
          <h3><RouterLink :to="`/publications/${paper.id}`">{{ paper.title }}</RouterLink></h3>
          <p v-if="paper.authors?.length" class="paper-authors">{{ formatPublicationAuthors(paper.authors) }}</p>
          <p class="paper-venue">{{ paper.venueFullName }}</p>
          <p v-if="paper.status" class="paper-status">{{ paper.status }}<template v-if="paper.acceptedMonth || paper.publicationDate"> · {{ formatMonth(paper.acceptedMonth || paper.publicationDate) }}</template></p>
          <PublicationLinks :paper="paper" />
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PublicationLinks from './PublicationLinks.vue'
import { formatPublicationAuthors } from '../utils/publicationDisplay'
const props = defineProps({ publications: { type: Array, required: true }, categories: { type: Array, required: true } })
const sortDate = (paper) => paper.acceptedMonth || paper.publicationDate || paper.conferenceDate?.start || String(paper.year)
const sortedEntries = computed(() => [...props.publications].sort((a, b) => sortDate(b).localeCompare(sortDate(a))))
const categoryEntries = (category) => sortedEntries.value.filter((paper) => paper.category === category)
const visibleCategories = computed(() => props.categories.filter((category) => categoryEntries(category).length))
const formatMonth = (date) => new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date.length === 7 ? `${date}-01T00:00:00Z` : `${date}T00:00:00Z`))
</script>
