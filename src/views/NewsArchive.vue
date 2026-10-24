<template>
  <div class="content-page news-archive-page">
    <header class="page-hero narrow">
      <h1>{{ t("News Archive") }}</h1>
      <p>{{ t("Publication news and research updates, organized by year.") }}</p>
      <nav class="section-index" :aria-label="t('News archive years')">
        <RouterLink v-for="year in years" :key="year" :to="`/news/archive#news-${year}`">{{ t(year) }}</RouterLink>
      </nav>
    </header>
    <section class="section news-archive">
      <section v-for="year in years" :id="`news-${year}`" :key="year" :aria-labelledby="`news-year-${year}`">
        <div class="directory-heading"><h2 :id="`news-year-${year}`">{{ t(year) }}</h2></div>
        <NewsList :items="newsItems.filter(item => item.date.startsWith(year))" />
      </section>
      <div class="archive-nav archive-nav--back"><RouterLink class="text-link" to="/news">{{ t("← Back to News") }}</RouterLink></div>
    </section>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from '../components/LocaleLink.vue'
import NewsList from '../components/NewsList.vue'
import { newsItems } from '../data/news'
const years = [...new Set(newsItems.map(item => item.date.slice(0, 4)))].sort().reverse()
</script>
