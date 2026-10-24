<template>
  <div class="home-selected-grid research-insights">
    <article v-for="article in items" :id="`insight-${article.id}`" :key="article.id" class="home-work-column">
      <div class="home-project-row">
        <div class="home-entry-heading">
          <h3><RouterLink :to="`/resources/insights/${article.id}`">{{ t(article.title) }}</RouterLink></h3>
          <RouterLink class="text-link home-card-more" :to="`/resources/insights/${article.id}`" :aria-label="t('More about {title}', { title: t(article.title) })">{{ t("More") }}</RouterLink>
        </div>
        <p>{{ t(article.description) }}</p>
        <p><strong>{{ t("Insight.") }}</strong> {{ t(article.insight) }}</p>
        <p class="paper-status">{{ t(article.category) }} · {{ t(article.date) }}</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from './LocaleLink.vue'
import { researchInsights } from '../data/researchInsights'

defineProps({ items: { type: Array, default: () => researchInsights.items } })
</script>
