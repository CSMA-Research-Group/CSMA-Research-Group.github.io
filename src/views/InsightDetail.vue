<template>
  <article class="content-page insight-detail-page">
    <header class="page-hero narrow">
      <p class="eyebrow"><RouterLink to="/resources#insights">{{ t("Research Insights") }}</RouterLink> · {{ t(article.category) }} · {{ t(article.date) }}</p>
      <h1>{{ t(article.title) }}</h1>
      <p>{{ t(article.description) }}</p>
      <nav class="section-index" :aria-label="t('Article sections')">
        <RouterLink :to="`${articlePath}#insight-overview-title`">{{ t('Overview') }}</RouterLink>
        <RouterLink :to="`${articlePath}#insight-perspective-title`">{{ t('Perspective') }}</RouterLink>
        <RouterLink :to="`${articlePath}#insight-sources-title`">{{ t('Sources') }}</RouterLink>
      </nav>
    </header>
    <section class="section" aria-labelledby="insight-overview-title">
      <div class="directory-heading"><h2 id="insight-overview-title">{{ t("Overview") }}</h2></div>
      <div class="details-copy">
        <p v-for="paragraph in article.overview" :key="paragraph.text">{{ t(paragraph.text) }} <a v-for="number in paragraph.sources" :key="number" :href="article.sources[number - 1].url" target="_blank" rel="noopener noreferrer" :aria-label="t('Source {number}: {title}', { number, title: t(article.sources[number - 1].title) })">[{{ t(number) }}]</a></p>
      </div>
    </section>
    <section class="section" aria-labelledby="insight-perspective-title">
      <div class="directory-heading"><h2 id="insight-perspective-title">{{ t("Perspective") }}</h2></div>
      <div class="details-copy">
        <p><strong>{{ t(article.insight) }}</strong></p>
        <p v-for="paragraph in article.perspective" :key="paragraph">{{ t(paragraph) }}</p>
      </div>
    </section>
    <section class="section" aria-labelledby="insight-sources-title">
      <div class="directory-heading"><h2 id="insight-sources-title">{{ t("Sources") }}</h2></div>
      <div class="details-copy">
        <ol><li v-for="source in article.sources" :key="source.url"><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ t(source.title) }}</a></li></ol>
        <p>{{ t(article.evidenceNote) }}</p>
      </div>
      <RouterLink class="text-link" to="/resources#insights">{{ t("Back to Research Insights") }}</RouterLink>
    </section>
  </article>
</template>

<script setup>
import { t } from '../i18n'
import { computed } from 'vue'
import RouterLink from '../components/LocaleLink.vue'
const props = defineProps({ article: { type: Object, required: true } })
const articlePath = computed(() => `/resources/insights/${props.article.id}`)
</script>
