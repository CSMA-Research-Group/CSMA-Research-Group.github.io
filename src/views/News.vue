<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">News</p>
        <h1>Conference updates, releases, seminars, and publication news.</h1>
        <p>
          News entries are structured by date, venue, location, and related paper so the homepage can show the latest verified updates while the full archive remains maintainable.
        </p>
      </div>
    </section>

    <section class="section">
      <NewsList :items="newsItems" />
    </section>
  </div>
</template>

<script setup>
import NewsList from '../components/NewsList.vue'
import { newsItems } from '../data/news'
</script>
