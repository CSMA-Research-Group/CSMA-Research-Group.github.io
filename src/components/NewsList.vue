<template>
  <div class="news-directory">
    <article v-for="item in items" :id="item.id" :key="item.id" class="news-entry">
      <div class="news-dateline"><time :datetime="item.date">{{ item.date }}</time><span>{{ item.tag }}</span></div>
      <div class="news-copy">
        <p v-if="item.venue" class="content-kicker">{{ item.venue }}</p>
        <h2><RouterLink v-if="item.publicationId" :to="`/publications/${item.publicationId}`">{{ item.title }}</RouterLink><template v-else>{{ item.title }}</template></h2>
        <p>{{ item.summary || item.description }}</p>
      </div>
    </article>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
defineProps({ items: { type: Array, required: true } })
</script>
