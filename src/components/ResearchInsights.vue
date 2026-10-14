<template>
  <div class="home-selected-grid research-insights">
    <article v-for="article in items" :id="`insight-${article.id}`" :key="article.id" class="home-work-column">
      <div class="home-project-row">
        <div class="home-entry-heading">
          <h3><RouterLink :to="`/resources/insights/${article.id}`">{{ article.title }}</RouterLink></h3>
          <RouterLink class="text-link home-card-more" :to="`/resources/insights/${article.id}`" :aria-label="`More about ${article.title}`">More</RouterLink>
        </div>
        <p>{{ article.description }}</p>
        <p><strong>Insight.</strong> {{ article.insight }}</p>
        <p class="paper-status">{{ article.category }} · {{ article.date }}</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { researchInsights } from '../data/researchInsights'

defineProps({ items: { type: Array, default: () => researchInsights.items } })
</script>
