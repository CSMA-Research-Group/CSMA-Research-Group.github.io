<template>
  <article class="home-people-list home-member-card" :class="{ 'home-advisor-card': advisor }"
    :data-member-id="person.id">
    <div class="home-project-row">
      <RouterLink class="home-portrait-link" :to="person.profilePath" :aria-label="t('View {name} profile', { name: person.name })">
        <img v-if="person.portrait" class="person-portrait home-member-portrait"
          :src="person.portrait" :alt="person.defaultPortrait ? t('Default avatar for {name}', { name: person.name }) : person.name"
          width="80" height="80" loading="lazy" decoding="async" />
        <div v-else class="person-portrait home-member-portrait home-member-placeholder content-keywords"
          role="img" :aria-label="t('Portrait pending for {name}', { name: person.name })">
          <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="32" cy="23" r="9" />
            <path d="M14 54v-5a18 18 0 0 1 36 0v5" />
          </svg>
        </div>
      </RouterLink>
      <div class="home-member-copy">
        <h3><RouterLink :to="person.profilePath">{{ t(person.name) }}</RouterLink></h3>
        <p class="paper-status">{{ t(person.displayRole) }}</p>
        <p v-if="advisor" class="content-keywords home-advisor-focus">
          {{ t(person.previewInterests?.length ? person.previewInterests.join(' · ') : 'Research interests to be provided.') }}
        </p>
        <p v-else-if="person.previewInterests?.length" class="content-keywords home-member-focus">
          {{ t(person.previewInterests[0]) }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from './LocaleLink.vue'
defineProps({ person: { type: Object, required: true }, advisor: { type: Boolean, default: false } })
</script>
