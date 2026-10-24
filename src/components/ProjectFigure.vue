<template>
  <figure class="project-diagram">
    <a v-if="figure.pdf" :href="figure.pdf" target="_blank" rel="noopener noreferrer"
      :aria-label="t('Open {title} as a PDF', { title: t(figure.alt) })">
      <img :src="figure.src" :alt="t(figure.alt)" :width="figure.width" :height="figure.height"
        loading="lazy" decoding="async" />
    </a>
    <img v-else :src="figure.src" :alt="t(figure.alt)" :width="figure.width" :height="figure.height"
      loading="lazy" decoding="async" />
    <figcaption v-if="figure.caption">{{ t(figure.caption) }}</figcaption>
  </figure>
</template>

<script setup>
import { t } from '../i18n'
defineProps({ figure: { type: Object, required: true } })
</script>
