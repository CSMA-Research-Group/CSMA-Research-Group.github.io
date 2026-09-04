<template>
  <article class="people-card" :class="{ placeholder: person.placeholder }">
    <div class="avatar" aria-hidden="true">{{ initials }}</div>
    <div>
      <p class="card-kicker">{{ person.role }}</p>
      <h3>{{ person.name }}</h3>
      <p v-if="person.affiliation" class="affiliation">{{ person.affiliation }}</p>

      <div class="tag-row">
        <span v-for="interest in person.interests" :key="interest">{{ interest }}</span>
      </div>

      <div v-if="person.relatedPublications?.length" class="related-pubs">
        <h4>Related Publications</h4>
        <span v-for="publication in person.relatedPublications" :key="publication">{{ publication }}</span>
      </div>

      <div class="profile-links">
        <a v-if="person.email" :href="`mailto:${person.email}`">Email</a>
        <a
          v-if="person.homepage"
          :href="person.homepage"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${person.name} homepage`"
        >Homepage</a>
      </div>

      <p v-if="person.source && !person.placeholder" class="source-note">{{ person.source }}</p>
      <p v-if="person.note" class="placeholder-note">{{ person.note }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})

const initials = computed(() => {
  if (props.person.placeholder) return 'TBU'
  return props.person.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
})
</script>
