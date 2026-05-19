<template>
  <div class="publication-list">
    <section v-if="featuredEntries.length" class="publication-section">
      <div class="section-heading compact">
        <p class="eyebrow">Featured Publications</p>
        <h2>{{ featuredEntries.length }} Selected Paper{{ featuredEntries.length === 1 ? '' : 's' }}</h2>
      </div>
      <article v-for="paper in featuredEntries" :key="`featured-${paper.id}`" class="publication-item featured">
        <div class="publication-year">
          <strong>{{ paper.year }}</strong>
          <span>{{ paper.venue }}</span>
        </div>
        <div class="publication-content">
          <div class="publication-topline">
            <span>{{ paper.type }}</span>
            <span>{{ formatDateRange(paper.conferenceDate) }}</span>
            <span>{{ paper.location }}</span>
          </div>
          <h3>{{ paper.title }}</h3>
          <p class="authors">{{ formatAuthors(paper.authors) }}</p>
          <p class="venue">{{ paper.venueFullName }}</p>
          <p class="abstract-summary">{{ paper.abstractSummary }}</p>

          <div v-if="paper.contributionHighlights?.length" class="card-section compact-list">
            <h4>Contribution Highlights</h4>
            <ul>
              <li v-for="highlight in paper.contributionHighlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>

          <div class="tag-row">
            <span v-for="tag in paper.tags" :key="tag">{{ tag }}</span>
          </div>

          <div class="paper-links">
            <a v-if="paper.doi" :href="`https://doi.org/${paper.doi}`" target="_blank" rel="noreferrer">DOI</a>
            <a v-if="paper.pdf" :href="paper.pdf" target="_blank" rel="noreferrer">PDF</a>
            <a v-if="paper.code" :href="paper.code" target="_blank" rel="noreferrer">Code</a>
            <RouterLink v-if="paper.relatedProjectId" :to="`/projects#${paper.relatedProjectId}`">
              Related Project
            </RouterLink>
          </div>
        </div>
      </article>
    </section>

    <section v-for="category in categories" :key="category" class="publication-section">
      <div class="section-heading compact">
        <p class="eyebrow">{{ category }}</p>
        <h2>{{ categoryEntries(category).length }} Entries</h2>
      </div>

      <article v-for="paper in categoryEntries(category)" :id="paper.id" :key="paper.id" class="publication-item">
        <div class="publication-year">
          <strong>{{ paper.year }}</strong>
          <span>{{ paper.venue }}</span>
        </div>
        <div class="publication-content">
          <h3>{{ paper.title }}</h3>
          <p class="authors">{{ formatAuthors(paper.authors) }}</p>
          <p class="venue">{{ paper.venueFullName }}</p>
          <p class="abstract-summary">{{ paper.abstractSummary }}</p>
          <div class="tag-row">
            <span v-for="tag in paper.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="paper-links">
            <a v-if="paper.doi" :href="`https://doi.org/${paper.doi}`" target="_blank" rel="noreferrer">DOI</a>
            <a v-if="paper.pdf" :href="paper.pdf" target="_blank" rel="noreferrer">PDF</a>
            <a v-if="paper.code" :href="paper.code" target="_blank" rel="noreferrer">Code</a>
            <RouterLink v-if="paper.relatedProjectId" :to="`/projects#${paper.relatedProjectId}`">
              {{ paper.relatedProjectTitle || 'Related Project' }}
            </RouterLink>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  publications: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

const getSortDate = (paper) => paper.publicationDate || paper.conferenceDate?.start || `${paper.year}-01-01`

const sortedEntries = computed(() =>
  [...props.publications].sort((a, b) => new Date(getSortDate(b)) - new Date(getSortDate(a)))
)

const featuredEntries = computed(() => sortedEntries.value.filter((paper) => paper.featured))

const categoryEntries = (category) => sortedEntries.value.filter((paper) => paper.category === category)

const formatAuthors = (authors) => (Array.isArray(authors) ? authors.join(', ') : authors)

const formatDateRange = (conferenceDate) => {
  if (!conferenceDate?.start) return ''
  if (!conferenceDate.end || conferenceDate.end === conferenceDate.start) return conferenceDate.start
  return `${conferenceDate.start} to ${conferenceDate.end}`
}
</script>
