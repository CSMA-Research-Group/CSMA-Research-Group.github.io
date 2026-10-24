<template>
  <nav v-if="entries.length" class="chinese-breadcrumbs" aria-label="当前位置">
    <ol><li><RouterLink to="/">首页</RouterLink></li><li v-for="(entry, index) in entries" :key="entry.label"><span class="breadcrumb-separator" aria-hidden="true">/</span><RouterLink v-if="entry.to" :to="entry.to">{{ entry.label }}</RouterLink><span v-else :aria-current="index === entries.length - 1 ? 'page' : undefined" :title="entry.label">{{ entry.label }}</span></li></ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RouterLink from './LocaleLink.vue'
import { t, isChinese, unlocalizedPath } from '../i18n'
import { navigationItems } from '../data/site'
const route = useRoute()
const entries = computed(() => {
  const path = unlocalizedPath(route.path)
  if (!isChinese.value || path === '/') return []
  const section = navigationItems.find(item => item.path !== '/' && (path === item.path || path.startsWith(item.path + '/')))
  const title = t(String(route.meta.title || '').split(' | ')[0])
  if (!section || path === section.path) return [{ label: title }]
  const result = [{ label: t(section.label), to: section.path }]
  if (path.startsWith('/resources/insights/')) result.push({ label: '研究洞见', to: '/resources#insights' })
  result.push({ label: title })
  return result
})
</script>

<style scoped>
.chinese-breadcrumbs { width: min(1180px,calc(100% - 64px)); margin-inline: auto; padding: 16px 0 12px; color: #637c8d; font-size: var(--zh-meta); }
.chinese-breadcrumbs ol { display: flex; list-style: none; gap: 10px; padding: 0; margin: 0; min-width: 0; }
.chinese-breadcrumbs li { display: flex; align-items: center; gap: 10px; min-width: 0; }
.chinese-breadcrumbs li:not(:last-child) { flex-shrink: 0; }
.chinese-breadcrumbs a { display: inline-flex; align-items: center; min-height: 32px; color: #476d84; text-decoration: none; }
.chinese-breadcrumbs a:hover { text-decoration: underline; text-underline-offset: 4px; }
.breadcrumb-separator { color: #9bafbc; }
.chinese-breadcrumbs [aria-current] { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@media (max-width: 820px) { .chinese-breadcrumbs { width: calc(100% - 40px); } }
</style>
