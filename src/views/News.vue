<template>
  <div class="content-page news-page">
    <header class="page-hero narrow"><h1>{{ t("News") }}</h1><p>{{ t("Publication updates, conference activities, and progress from our research.") }}</p></header>
    <section class="section">
      <NewsList :items="newsItems" />
      <ArchiveNote description="For a chronological view of our research activities, browse the news archive by year."
        to="/news/archive" link-label="Browse the News Archive" />
    </section>
  </div>
</template>
<script setup>
import { t } from '../i18n'
import NewsList from '../components/NewsList.vue'
import ArchiveNote from '../components/ArchiveNote.vue'
import { newsItems } from '../data/news'
</script>
