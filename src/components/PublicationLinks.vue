<template>
  <div class="content-links publication-links">
    <a v-if="paper.doi" :href="`https://doi.org/${paper.doi}`" target="_blank" rel="noopener noreferrer"
      :aria-label="t('Paper: {title}', { title: paper.title })">{{ t("Paper") }}</a>
    <a v-else class="paper-link-pending" role="link" tabindex="0" aria-disabled="true"
      :aria-label="t('Paper: {title} — Coming soon', { title: paper.title })" :aria-describedby="`paper-coming-soon-${paper.id}`"
      @click.prevent="comingSoonVisible = true" @keydown.enter.prevent="comingSoonVisible = true" @blur="comingSoonVisible = false" @mouseleave="comingSoonVisible = false"> {{ t("Paper") }}<span :id="`paper-coming-soon-${paper.id}`" class="paper-coming-soon" :class="{ 'is-visible': comingSoonVisible }" role="tooltip">{{ t("Coming soon") }}</span>
    </a>
    <a v-if="paper.code" :href="paper.code" target="_blank" rel="noopener noreferrer"
      :aria-label="t('GitHub code for {title}', { title: paper.title })">{{ t("GitHub") }}</a>
    <RouterLink v-if="applicationId" :to="`/projects/${applicationId}`"
      :aria-label="t('Project application for {title}', { title: paper.title })">{{ t("Project") }}</RouterLink>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import { computed, ref } from 'vue'
import RouterLink from './LocaleLink.vue'

const props = defineProps({ paper: { type: Object, required: true } })
const comingSoonVisible = ref(false)
const applicationId = computed(() => props.paper.applicationId || props.paper.systemId)
</script>
