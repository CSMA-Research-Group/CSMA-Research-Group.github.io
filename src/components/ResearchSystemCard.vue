<template>
  <article class="research-system-card" :class="{ 'research-system-card--featured': featured }">
    <div class="system-card-meta"><span>{{ venueLabel }}</span><span v-if="paper?.status">{{ t(paper.status) }}</span></div>
    <RouterLink v-if="system.figure" class="system-card-image" :to="`/projects/${system.id}`" :aria-label="`了解 ${system.title} 的研究方法`">
      <img :src="system.figure.src" :alt="t(system.figure.alt)" loading="lazy" decoding="async" />
    </RouterLink>
    <p v-if="system.figure" class="system-card-caption">{{ t(system.figure.caption) }}</p>
    <div class="system-card-body">
      <h3><RouterLink :to="`/projects/${system.id}`">{{ system.title }}<span aria-hidden="true">↗</span></RouterLink></h3>
      <p class="system-card-subtitle">{{ t(system.subtitle) }}</p>
      <p class="system-card-description">{{ t(system.homeSummary || system.description) }}</p>
      <dl v-if="detailed" class="system-card-io">
        <div><dt>输入</dt><dd>{{ t(system.inputs) }}</dd></div>
        <div><dt>输出</dt><dd>{{ t(system.outputs) }}</dd></div>
      </dl>
      <p v-if="system.limitation" class="system-card-note">{{ t(system.limitation) }}</p>
      <div class="system-card-links">
        <RouterLink :to="`/projects/${system.id}`">方法与实现 <span aria-hidden="true">→</span></RouterLink>
        <RouterLink v-if="paper" :to="`/publications/${paper.id}`">关联论文 <span aria-hidden="true">→</span></RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { t } from '../i18n'
import { publications } from '../data/publications'
import RouterLink from './LocaleLink.vue'

const props = defineProps({ system: { type: Object, required: true }, featured: Boolean, detailed: Boolean })
const paper = computed(() => publications.find(item => props.system.relatedPublicationIds?.includes(item.id)))
const venueLabel = computed(() => paper.value ? (paper.value.venue.includes(String(paper.value.year)) ? paper.value.venue : `${paper.value.venue} ${paper.value.year}`) : t(props.system.type))
</script>

<style scoped>
.research-system-card { display: flex; flex-direction: column; min-width: 0; border: 1px solid #d9e3e9; border-radius: 7px; background: #fff; overflow: hidden; }
.system-card-meta { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px 12px; min-height: 44px; padding: 12px 20px; font-size: var(--zh-meta); line-height: 1.7; font-weight: 650; color: #42677c; border-bottom: 1px solid #e1e8ed; background: #f4f7f9; }
.system-card-image { display: block; height: 210px; padding: 18px; border-bottom: 1px solid #e1e8ed; background: #fff; }
.system-card-image img { display: block; width: 100%; height: 100%; object-fit: contain; transition: transform .2s ease; }
.system-card-image:hover img { transform: scale(1.025); }
.system-card-caption { min-height: 62px; margin: 0; padding: 14px 24px 0; font-size: var(--zh-meta); line-height: 1.75; color: #526779; }
.system-card-body { display: flex; flex: 1; flex-direction: column; padding: 26px 24px; }
.system-card-body h3 { margin: 0; font-size: 28px; line-height: 1.3; color: var(--color-navy); }
.system-card-body h3 a { display: flex; justify-content: space-between; gap: 12px; align-items: center; text-decoration: none; }
.system-card-body h3 span { font-size: 22px; color: #6c899b; font-weight: 400; }
.system-card-subtitle { margin: 10px 0 12px; font-size: var(--zh-body); font-weight: 600; color: #35576d; line-height: 1.65; }
.system-card-description { margin: 0; font-size: var(--zh-body); color: var(--zh-body-ink); line-height: 1.9; text-align: left; }
.system-card-note { margin: 16px 0 0; padding-left: 10px; border-left: 2px solid #b6c8d4; font-size: var(--zh-meta); color: #596d7c; line-height: 1.8; }
.system-card-links { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: auto; padding-top: 18px; }
.system-card-links a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: #195f8f; font-size: var(--zh-support); font-weight: 650; text-decoration: none; }
.system-card-links a:hover, .system-card-body h3 a:hover { color: #0f766e; text-decoration: underline; text-underline-offset: 4px; }
.system-card-io { margin: 18px 0 0; padding-top: 14px; border-top: 1px solid #e2e9ee; }
.system-card-io > div { display: grid; grid-template-columns: 40px minmax(0,1fr); gap: 12px; margin-bottom: 10px; }
.system-card-io dt { font-size: var(--zh-meta); font-weight: 700; color: #42677c; line-height: 1.8; }
.system-card-io dd { margin: 0; font-size: var(--zh-support); color: var(--zh-body-ink); line-height: 1.8; }
.research-system-card--featured .system-card-image { height: 280px; padding: 24px; }
.research-system-card--featured .system-card-body { padding: 24px; }
@media (max-width: 600px) {
  .system-card-image, .research-system-card--featured .system-card-image { height: 180px; padding: 14px; }
  .system-card-body, .research-system-card--featured .system-card-body { padding: 20px; }
}
@media (prefers-reduced-motion: reduce) { .system-card-image img { transition: none; } }
</style>
