<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">Resources</p>
        <h1>Software, datasets, teaching materials, and open-source repositories.</h1>
        <p>
          Links are listed only when a resource is public or verified. Draft systems and datasets are clearly marked as coming soon.
        </p>
      </div>
    </section>

    <section class="section resource-sections">
      <article v-for="group in resourceGroups" :key="group.id" class="resource-group">
        <div class="section-heading compact">
          <p class="eyebrow">{{ group.title }}</p>
          <h2>{{ group.description }}</h2>
        </div>
        <div class="resource-list">
          <div v-for="item in group.items" :key="item.name" class="resource-item">
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <a v-if="item.link" :href="item.link" target="_blank" rel="noreferrer">{{ item.status }}</a>
            <span v-else>{{ item.status }}</span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { resourceGroups } from '../data/resources'
</script>
