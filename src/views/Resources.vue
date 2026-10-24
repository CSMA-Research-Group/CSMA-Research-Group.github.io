<template>
  <div class="content-page resources-page">
    <header class="page-hero narrow"><h1>{{ t("Resources") }}</h1><p>{{ t("Research applications, technical articles, and perspectives from our work.") }}</p><nav v-if="isChinese" class="section-index" aria-label="资源栏目导航"><RouterLink to="/resources#applications">研究应用</RouterLink><RouterLink to="/resources#insights">研究洞见</RouterLink><RouterLink to="/resources#repositories">代码仓库</RouterLink></nav></header>
    <section id="applications" class="section" aria-labelledby="applications-title">
      <div class="directory-heading"><h2 id="applications-title">{{ t("Research Applications") }}</h2><p>{{ t("From methods to usable tools.") }}</p></div>
      <SystemResources />
    </section>
    <section id="insights" class="section" aria-labelledby="insights-title">
      <div class="directory-heading"><h2 id="insights-title">{{ t(researchInsights.title) }}</h2><p>{{ t(researchInsights.description) }}</p></div>
      <ResearchInsights />
    </section>
    <section class="section resource-directory">
      <section v-for="group in availableResourceGroups" :id="group.id" :key="group.id" class="resource-repositories" :aria-labelledby="`${group.id}-title`">
        <div class="directory-heading"><h2 :id="`${group.id}-title`">{{ t(group.title) }}</h2></div>
        <div v-if="group.items.length" class="resource-rows">
          <article v-for="item in group.items" :key="item.id || item.name" class="resource-entry">
            <div>
              <p v-if="item.category || item.date || item.author" class="content-kicker">{{ t([item.category, item.date, item.author].filter(Boolean).join(' · ')) }}</p>
              <h3><a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer">{{ t(item.name) }}</a><template v-else>{{ t(item.name) }}</template></h3>
              <p>{{ t(item.description) }}</p>
            </div>
            <a v-if="item.link" class="text-link" :href="item.link" target="_blank" rel="noopener noreferrer" :aria-label="t('More about {title}', { title: t(item.name) })">{{ t("More") }}</a>
            <span v-else class="resource-status">{{ t(item.status) }}</span>
          </article>
        </div>
        <p v-else class="resource-status">{{ t(group.emptyMessage) }}</p>
      </section>
    </section>
  </div>
</template>
<script setup>
import { t, isChinese } from '../i18n'
import RouterLink from '../components/LocaleLink.vue'
import { researchInsights, resourceGroups } from '../data/resources'
import SystemResources from '../components/SystemResources.vue'
import ResearchInsights from '../components/ResearchInsights.vue'
const availableResourceGroups = resourceGroups.filter(group => group.id === 'repositories')
</script>
