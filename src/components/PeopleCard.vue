<template>
  <article class="person-entry" :class="{ 'person-entry--lead': person.portrait }">
    <img v-if="person.portrait" class="person-portrait" :src="person.portrait"
      :alt="person.defaultPortrait ? 'Default avatar for ' + person.name : person.name"
      :width="person.portraitWidth || 1214" :height="person.portraitHeight || 1295" decoding="async" />
    <div class="person-copy">
      <p v-if="person.credentials" class="person-role">{{ person.credentials }}</p>
      <h3>{{ person.name }}</h3>
      <p v-if="person.affiliation" class="person-affiliation">{{ person.affiliation }}</p>
      <p v-if="person.summary || person.interests?.length" class="person-focus">
        {{ person.summary || person.interests.join(' · ') }}
      </p>
      <div v-if="person.email || person.homepage" class="person-links">
        <a v-if="person.homepage" :href="person.homepage" target="_blank" rel="noopener noreferrer"
          :aria-label="`${person.name} homepage`">Homepage <span aria-hidden="true">↗</span></a>
        <a v-if="person.email" :href="`mailto:${person.email}`" :aria-label="`Email ${person.name}`">Email</a>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({ person: { type: Object, required: true } })
</script>
