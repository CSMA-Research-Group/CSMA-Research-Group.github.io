<template>
  <section class="hero-section">
    <div class="hero-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="hero-lede">{{ subtitle }}</p>
      <div v-if="actions.length" class="hero-actions">
        <RouterLink
          v-for="action in actions"
          :key="action.label"
          class="button"
          :class="action.variant === 'secondary' ? 'button-secondary' : 'button-primary'"
          :to="action.to"
        >
          {{ action.label }}
        </RouterLink>
      </div>
    </div>

    <div class="hero-visual" aria-label="CSMA research vision diagram">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
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
