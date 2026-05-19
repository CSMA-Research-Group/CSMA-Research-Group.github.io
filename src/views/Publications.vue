<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">Publications</p>
        <h1>Selected publications in intelligent software engineering and multi-agent intelligence.</h1>
        <p>
          Publication records are maintained in structured data and are ordered by verified publication or conference dates. DOI and code links are shown when confirmed; local PDF release remains blank until publication rights are verified.
        </p>
      </div>
    </section>

    <section class="section">
      <PublicationList :publications="publications" :categories="publicationCategories" />
    </section>
  </div>
</template>

<script setup>
import PublicationList from '../components/PublicationList.vue'
import { publicationCategories, publications } from '../data/publications'
</script>
