<template>
  <article class="project-card">
    <div class="project-card-header">
      <div>
        <p class="card-kicker">{{ project.type || project.status }}</p>
        <h3>{{ project.title }}</h3>
      </div>
      <span class="status-pill">{{ project.status }}</span>
    </div>
    <p class="project-subtitle">{{ project.subtitle }}</p>
    <p>{{ project.description || project.summary }}</p>

    <figure v-if="project.figure" class="project-figure">
      <img
        :src="project.figure.src"
        :alt="project.figure.alt"
        loading="lazy"
        decoding="async"
      />
      <figcaption>{{ project.figure.caption }}</figcaption>
    </figure>

    <div class="method-grid">
      <div>
        <h4>Key Ideas</h4>
        <ul>
          <li v-for="idea in project.keyIdeas || project.methods" :key="idea">{{ idea }}</li>
        </ul>
      </div>
      <div>
        <h4>Related Publications</h4>
        <ul v-if="project.relatedPublications?.length">
          <li v-for="publication in project.relatedPublications" :key="publication">{{ publication }}</li>
        </ul>
        <p v-else class="placeholder-note">Representative publications are not yet confirmed.</p>
      </div>
    </div>

    <div v-if="project.links?.length || project.relatedPublicationIds?.length" class="project-link-row">
      <a
        v-for="link in project.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${link.label} for ${project.title}`"
      >
        {{ link.label }}
      </a>
      <RouterLink
        v-for="publicationId in project.relatedPublicationIds"
        :key="publicationId"
        :to="`/publications#${publicationId}`"
      >
        Publication
      </RouterLink>
    </div>

    <p v-for="placeholder in project.linkPlaceholders" :key="placeholder" class="placeholder-note">
      {{ placeholder }}
    </p>

    <div class="tag-row">
      <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>
