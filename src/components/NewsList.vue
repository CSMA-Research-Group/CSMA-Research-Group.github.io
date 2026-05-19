<template>
  <div class="news-list">
    <article v-for="item in items" :key="item.id" class="news-item">
      <div>
        <time>{{ item.date }}</time>
        <span>{{ item.tag }}</span>
        <p v-if="item.type" class="news-type">{{ item.type }}</p>
      </div>
      <section>
        <div class="news-meta">
          <span v-if="item.venue">{{ item.venue }}</span>
          <span v-if="item.location">{{ item.location }}</span>
        </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <p v-if="item.paperTitle" class="paper-title">Paper: {{ item.paperTitle }}</p>
      </section>
    </article>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
