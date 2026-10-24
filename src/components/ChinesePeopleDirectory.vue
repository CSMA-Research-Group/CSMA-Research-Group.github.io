<template>
  <section id="members" class="member-directory" aria-labelledby="member-directory-heading">
    <div class="member-directory-header"><h2 id="member-directory-heading">研究团队</h2><p>按主要研究方向浏览成员，了解研究兴趣与工作。</p></div>
    <div class="member-filters" role="group" aria-label="按主要研究方向筛选成员"><button v-for="option in filters" :key="option.value" type="button" :aria-pressed="selected === option.value" @click="selected = option.value">{{ option.label }}<span>{{ option.count }}</span></button></div>
    <p class="member-result-count" role="status" aria-live="polite">当前展示 {{ visiblePeople.length }} 位成员</p>
    <div class="member-profile-grid">
      <article v-for="person in visiblePeople" :id="person.id" :key="person.id" class="member-profile" :data-member-id="person.id">
        <RouterLink class="member-photo-link" :to="person.profilePath" :aria-label="`查看 ${person.name} 的介绍`"><img :src="person.portrait" :alt="person.name" width="104" height="128" loading="lazy" decoding="async" /></RouterLink>
        <div class="member-profile-heading"><h3><RouterLink :to="person.profilePath">{{ person.name }}</RouterLink></h3><p>{{ t(person.previewInterests[0]) }}</p><div class="member-interest-list"><span v-for="interest in person.interests.filter(interest => interest !== person.previewInterests[0]).slice(0, 2)" :key="interest">{{ t(interest) }}</span></div></div>
        <p class="member-profile-summary">{{ introduction(person.summary) }}</p>
        <div class="member-profile-links"><RouterLink :to="person.profilePath">完整介绍 <span aria-hidden="true">→</span></RouterLink><ContactLink v-if="person.email" :href="`mailto:${person.email}`" :label="t('Email {name}', { name: person.name })" /></div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import RouterLink from './LocaleLink.vue'
import ContactLink from './ContactLink.vue'
import { t } from '../i18n'
import { peopleProfiles } from '../data/peopleHierarchy'
const selected = ref('all')
const filters = [
  { value: 'all', label: '全部成员', count: peopleProfiles.length },
  ...['Artificial Intelligence', 'Intelligent Software Engineering', 'Intelligent Robotics'].map(area => ({ value: area, label: t(area), count: peopleProfiles.filter(person => person.previewInterests[0] === area).length })),
]
const visiblePeople = computed(() => peopleProfiles.filter(person => selected.value === 'all' || person.previewInterests[0] === selected.value))
const introduction = summary => {
  if (!summary) return '研究简介待补充。'
  const sentences = t(summary).split('。').filter(Boolean)
  return sentences.slice(0, 2).join('。') + (sentences.length ? '。' : '')
}
</script>

<style scoped>
.member-directory-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 10px 24px; }
.member-directory-header h2 { margin: 0; font-size: 28px; color: #183b54; }
.member-directory-header p { margin: 0; font-size: var(--zh-body); color: #597283; }
.member-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.member-filters button { display: inline-flex; align-items: center; gap: 12px; min-height: 44px; padding: 8px 14px; font-size: var(--zh-support); color: #43677f; border: 1px solid #d4e0e8; border-radius: 5px; background: #f4f7fa; cursor: pointer; }
.member-filters button[aria-pressed="true"] { background: #203f57; color: #fff; border-color: #203f57; }
.member-filters button span { font-variant-numeric: tabular-nums; opacity: .8; font-size: var(--zh-meta); }
.member-result-count { margin: 18px 0; font-size: var(--zh-meta); color: #657f91; }
.member-profile-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 26px; }
.member-profile { display: grid; grid-template-columns: 104px minmax(0,1fr); gap: 16px 24px; align-content: start; padding: 26px; border: 1px solid #d7e3eb; border-radius: 6px; background: #fff; }
.member-photo-link { align-self: start; }
.member-photo-link img { display: block; width: 104px; height: 128px; object-fit: cover; object-position: center 26%; border-radius: 4px; background: #edf2f5; }
.member-profile h3 { margin: 4px 0 10px; font-size: 24px; line-height: 1.4; color: #183b54; }
.member-profile h3 a { display: block; text-decoration: none; }
.member-profile h3 a:hover { color: #195f8f; text-decoration: underline; text-underline-offset: 4px; }
.member-profile-heading > p { margin: 0 0 10px; font-size: var(--zh-support); color: #3b7081; }
.member-interest-list { display: flex; flex-wrap: wrap; gap: 6px 10px; color: #637c8d; font-size: var(--zh-meta); line-height: 1.7; }
.member-profile-summary { grid-column: 1 / -1; margin: 0; font-size: var(--zh-body); line-height: 1.85; color: var(--zh-body-ink); }
.member-profile-links { grid-column: 1 / -1; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 18px; padding-top: 10px; border-top: 1px solid #e1e9ef; }
.member-profile-links a { display: inline-flex; align-items: center; min-height: 44px; color: #2b698a; font-size: var(--zh-meta); text-decoration: none; }
.member-profile-links a:first-child { font-weight: 650; gap: 8px; }
@media (max-width: 900px) { .member-profile-grid { grid-template-columns: 1fr; } }
@media (max-width: 500px) { .member-profile { grid-template-columns: 80px minmax(0,1fr); padding: 20px; gap: 16px; } .member-photo-link img { width: 80px; height: 100px; } .member-profile h3 { font-size: 20px; } }
</style>
