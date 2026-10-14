<template>
  <figure class="project-diagram">
    <a v-if="figure.pdf" :href="figure.pdf" target="_blank" rel="noopener noreferrer"
      :aria-label="`Open ${figure.alt} as a PDF`">
      <img :src="figure.src" :alt="figure.alt" :width="figure.width" :height="figure.height"
        loading="lazy" decoding="async" />
    </a>
    <img v-else :src="figure.src" :alt="figure.alt" :width="figure.width" :height="figure.height"
      loading="lazy" decoding="async" />
    <figcaption v-if="figure.caption">{{ figure.caption }}</figcaption>
  </figure>
</template>

<script setup>
defineProps({ figure: { type: Object, required: true } })
</script>
