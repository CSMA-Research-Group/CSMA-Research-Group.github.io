<template>
  <div class="publication-directory">
    <section v-for="category in visibleCategories" :key="category" class="publication-category">
      <div class="directory-heading"><h2>{{ t(category) }}</h2></div>
      <article v-for="paper in categoryEntries(category)" :id="paper.id" :key="paper.id" class="paper-entry">
        <div class="paper-dateline"><strong>{{ t(paper.year) }}</strong><span>{{ t(paper.venue) }}</span><span v-if="paper.rating">{{ t(paper.rating) }}</span></div>
        <div class="paper-copy">
          <PublicationTitle :title="paper.title" :paper-id="paper.id" :to="`/publications/${paper.id}`" />
          <p v-if="paper.authors?.length" class="paper-authors">{{ t(formatPublicationAuthors(paper.authors)) }}</p>
          <p class="paper-venue">{{ t(paper.venueFullName) }}</p>
          <p v-if="paper.status" class="paper-status">{{ t(paper.status) }}<template v-if="paper.acceptedMonth || paper.publicationDate"> · {{ t(formatMonth(paper.acceptedMonth || paper.publicationDate)) }}</template></p>
          <PublicationLinks :paper="paper" />
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import PublicationTitle from './PublicationTitle.vue'
import { t, formatMonth } from '../i18n'
import { computed } from 'vue'
import PublicationLinks from './PublicationLinks.vue'
import { formatPublicationAuthors } from '../utils/publicationDisplay'
const props = defineProps({ publications: { type: Array, required: true }, categories: { type: Array, required: true } })
const sortDate = (paper) => paper.acceptedMonth || paper.publicationDate || paper.conferenceDate?.start || String(paper.year)
const sortedEntries = computed(() => [...props.publications].sort((a, b) => sortDate(b).localeCompare(sortDate(a))))
const categoryEntries = (category) => sortedEntries.value.filter((paper) => paper.category === category)
const visibleCategories = computed(() => props.categories.filter((category) => categoryEntries(category).length))
</script>
