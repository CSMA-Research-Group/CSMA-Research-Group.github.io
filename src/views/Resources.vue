<template>
  <div class="content-page resources-page">
    <header class="page-hero narrow"><h1>Resources</h1><p>Research applications, technical articles, and perspectives from our work.</p></header>
    <section id="applications" class="section" aria-labelledby="applications-title">
      <div class="directory-heading"><h2 id="applications-title">Research Applications</h2><p>From methods to usable tools.</p></div>
      <SystemResources />
    </section>
    <section id="insights" class="section" aria-labelledby="insights-title">
      <div class="directory-heading"><h2 id="insights-title">{{ researchInsights.title }}</h2><p>{{ researchInsights.description }}</p></div>
      <ResearchInsights />
    </section>
    <section class="section resource-directory">
      <section v-for="group in availableResourceGroups" :id="group.id" :key="group.id" class="resource-repositories" :aria-labelledby="`${group.id}-title`">
        <div class="directory-heading"><h2 :id="`${group.id}-title`">{{ group.title }}</h2></div>
        <div v-if="group.items.length" class="resource-rows">
          <article v-for="item in group.items" :key="item.id || item.name" class="resource-entry">
            <div>
              <p v-if="item.category || item.date || item.author" class="content-kicker">{{ [item.category, item.date, item.author].filter(Boolean).join(' · ') }}</p>
              <h3><a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a><template v-else>{{ item.name }}</template></h3>
              <p>{{ item.description }}</p>
            </div>
            <a v-if="item.link" class="text-link" :href="item.link" target="_blank" rel="noopener noreferrer" :aria-label="`More about ${item.name}`">More</a>
            <span v-else class="resource-status">{{ item.status }}</span>
          </article>
        </div>
        <p v-else class="resource-status">{{ group.emptyMessage }}</p>
      </section>
    </section>
  </div>
</template>
<script setup>
import { researchInsights, resourceGroups } from '../data/resources'
import SystemResources from '../components/SystemResources.vue'
import ResearchInsights from '../components/ResearchInsights.vue'
const availableResourceGroups = resourceGroups.filter(group => group.id === 'repositories')
</script>
