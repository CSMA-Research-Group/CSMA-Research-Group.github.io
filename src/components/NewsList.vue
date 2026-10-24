<template>
  <div class="news-directory">
    <article v-for="item in items" :id="item.id" :key="item.id" class="news-entry">
      <div class="news-dateline"><time :datetime="item.date">{{ t(item.date) }}</time><span>{{ t(item.tag) }}</span></div>
      <div class="news-copy">
        <p v-if="item.venue" class="content-kicker">{{ t(item.venue) }}</p>
        <PublicationTitle :title="item.title" :paper-id="item.publicationId" :to="item.publicationId ? `/publications/${item.publicationId}` : ''" level="h2" />
        <p>{{ t(item.summary || item.description) }}</p>
      </div>
    </article>
  </div>
</template>
<script setup>
import { t } from '../i18n'
import PublicationTitle from './PublicationTitle.vue'
defineProps({ items: { type: Array, required: true } })
</script>
