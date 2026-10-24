<template>
  <section class="hero-section" :class="{ 'hero-section-copy-only': !$slots.default }">
    <div v-if="wideTitle" class="hero-copy hero-title-row"><h1>{{ t(title) }}</h1></div>
    <div class="hero-copy">
      <p v-if="eyebrow" class="eyebrow">{{ t(eyebrow) }}</p>
      <h1 v-if="!wideTitle">{{ t(title) }}</h1>
      <p class="hero-lede">{{ t(subtitle) }}</p>
      <slot name="copy" />
      <div v-if="actions.length" class="hero-actions">
        <RouterLink
          v-for="action in actions"
          :key="action.label"
          class="button"
          :class="action.variant === 'secondary' ? 'button-secondary' : 'button-primary'"
          :to="action.to"
        >
          {{ t(action.label) }}
        </RouterLink>
      </div>
    </div>

    <div v-if="$slots.default" class="hero-visual" :aria-label="t('CSMA research vision diagram')">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from './LocaleLink.vue'

defineProps({
  wideTitle: { type: Boolean, default: false },
  eyebrow: {
    type: String,
    default: 'CSMA Research Group',
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  },
})
</script>
