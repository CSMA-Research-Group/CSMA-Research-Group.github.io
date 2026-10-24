<template>
  <article class="person-entry" :class="{ 'person-entry--lead': person.portrait }">
    <img v-if="person.portrait" class="person-portrait" :src="person.portrait"
      :alt="person.defaultPortrait ? t('Default avatar for {name}', { name: person.name }) : person.name"
      :width="person.portraitWidth || 1214" :height="person.portraitHeight || 1295" decoding="async" />
    <div class="person-copy">
      <p v-if="person.credentials" class="person-role">{{ t(person.credentials) }}</p>
      <h3>{{ t(person.name) }}</h3>
      <p v-if="person.affiliation" class="person-affiliation">{{ t(person.affiliation) }}</p>
      <p v-if="person.summary || person.interests?.length" class="person-focus">
        {{ t(person.summary || person.interests.join(' · ')) }}
      </p>
      <div v-if="person.email || person.homepage" class="person-links">
        <a v-if="person.homepage" :href="person.homepage" target="_blank" rel="noopener noreferrer"
          :aria-label="t('{name} homepage', { name: person.name })">{{ t("Homepage") }} <span aria-hidden="true">↗</span></a>
        <ContactLink v-if="person.email" :href="`mailto:${person.email}`" :label="t('Email {name}', { name: person.name })" />
      </div>
    </div>
  </article>
</template>

<script setup>
import { t } from '../i18n'
import ContactLink from './ContactLink.vue'
defineProps({ person: { type: Object, required: true } })
</script>
