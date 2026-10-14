<template>
  <article class="content-page insight-detail-page">
    <header class="page-hero narrow">
      <p class="eyebrow"><RouterLink to="/resources#insights">Research Insights</RouterLink> · {{ article.category }} · {{ article.date }}</p>
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
    </header>
    <section class="section" aria-labelledby="insight-overview-title">
      <div class="directory-heading"><h2 id="insight-overview-title">Overview</h2></div>
      <div class="details-copy">
        <p v-for="paragraph in article.overview" :key="paragraph.text">{{ paragraph.text }} <a v-for="number in paragraph.sources" :key="number" :href="article.sources[number - 1].url" target="_blank" rel="noopener noreferrer" :aria-label="`Source ${number}: ${article.sources[number - 1].title}`">[{{ number }}]</a></p>
      </div>
    </section>
    <section class="section" aria-labelledby="insight-perspective-title">
      <div class="directory-heading"><h2 id="insight-perspective-title">Perspective</h2></div>
      <div class="details-copy">
        <p><strong>{{ article.insight }}</strong></p>
        <p v-for="paragraph in article.perspective" :key="paragraph">{{ paragraph }}</p>
      </div>
    </section>
    <section class="section" aria-labelledby="insight-sources-title">
      <div class="directory-heading"><h2 id="insight-sources-title">Sources</h2></div>
      <div class="details-copy">
        <ol><li v-for="source in article.sources" :key="source.url"><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a></li></ol>
        <p>{{ article.evidenceNote }}</p>
      </div>
      <RouterLink class="text-link" to="/resources#insights">Back to Research Insights</RouterLink>
    </section>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({ article: { type: Object, required: true } })
</script>
