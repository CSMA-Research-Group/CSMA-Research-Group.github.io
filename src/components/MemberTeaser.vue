<template>
  <article class="member-teaser" :class="`member-teaser--${variant}`">
    <svg class="member-teaser-mark" viewBox="0 0 56 48" fill="none" aria-hidden="true" focusable="false">
      <path d="M14 27 28 13l14 14M14 27h28" stroke="currentColor" stroke-width="1.3" opacity=".45" />
      <circle cx="28" cy="13" r="5" fill="currentColor" opacity=".85" />
      <circle cx="14" cy="27" r="5" fill="currentColor" opacity=".55" />
      <circle cx="42" cy="27" r="5" fill="currentColor" opacity=".35" />
    </svg>
    <div class="member-teaser-copy">
      <h3>{{ t(communityUpdates.memberTitle) }}</h3>
      <p>{{ t(communityUpdates.memberDescription) }}</p>
      <RouterLink class="member-teaser-link" to="/about#contact">{{ t('Connect with us') }} <span aria-hidden="true">→</span></RouterLink>
    </div>
  </article>
</template>

<script setup>
import { t } from '../i18n'
import { communityUpdates } from '../data/site'
import RouterLink from './LocaleLink.vue'

defineProps({ variant: { type: String, default: 'compact' } })
</script>

<style scoped>
.member-teaser { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 12px; min-width: 0; padding: 24px 16px; border: 1px dashed #b9cdd8; border-radius: 6px; background: #f4f8fa; text-align: center; }
.member-teaser-mark { width: 56px; height: 48px; flex-shrink: 0; color: #3d7182; }
.member-teaser h3 { margin: 0; color: #244b64; font-size: 18px; font-weight: 600; line-height: 1.5; text-wrap: balance; }
.member-teaser p { margin: 10px 0 4px; color: #536d7d; font-size: 14px; line-height: 1.75; text-align: center; text-align-last: center; }
.member-teaser .member-teaser-link { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 4px 0; color: #195f8f; font-size: 14px; font-weight: 600; text-decoration: none; }
.member-teaser-link:hover { text-decoration: underline; text-underline-offset: 4px; }
.member-teaser--directory { padding: 28px; }
.member-teaser--directory h3 { font-size: 22px; }
.member-teaser--inline { height: 100%; padding: 22px 18px; border: 0; border-radius: 0; background: transparent; align-items: flex-start; text-align: left; gap: 8px; }
.member-teaser--inline .member-teaser-mark { width: 44px; height: 38px; }
.member-teaser--inline p { text-align: left; text-align-last: left; }
.member-teaser:lang(zh-CN) h3 { font-size: 21px; letter-spacing: 0; }
.member-teaser:lang(zh-CN) :is(p, .member-teaser-link) { font-size: var(--zh-support); }
@media (max-width: 600px) { .member-teaser--inline { padding: 20px 0; } }
</style>
