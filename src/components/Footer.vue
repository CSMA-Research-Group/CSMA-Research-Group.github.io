<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <section class="footer-about-contact">
        <RouterLink class="footer-brand" to="/">
          <span class="brand-mark" aria-hidden="true">{{ t(siteInfo.shortName) }}</span>
          <span>{{ t(siteInfo.name) }}</span>
        </RouterLink>

        <div class="footer-about-block">
          <h2>{{ t("About") }}</h2>
          <p class="footer-about-text">{{ t(researchNarrative.description) }}</p>
        </div>

        <div class="footer-contact-block">
          <h2>{{ t("Contact") }}</h2>
          <div class="footer-contact-list">
            <ContactLink :href="`mailto:${siteInfo.contactEmail}`" :label="t('Email the Group')" />
            <ContactLink kind="weibo" href="https://weibo.com/jiangpinghuang" :label="t('Weibo (opens in a new tab)')" external />
            <ContactLink kind="x" href="https://x.com/jiangpinghuang" :label="t('X (opens in a new tab)')" external />
          </div>
        </div>

        <div class="footer-box-bottom">
          <RouterLink class="footer-home-top" to="/">
            <span class="footer-social-icon" aria-hidden="true">⌂</span>
            <span>{{ t("Home") }}</span>
          </RouterLink>
          <button class="footer-home-top" type="button" @click="scrollToTop">
            <span aria-hidden="true">↑</span>
            <span>{{ t("Back to top") }}</span>
          </button>
        </div>
      </section>

      <GlobalVisitorsGlobe />
    </div>

    <div class="footer-update-note">
      <p>{{ t(communityUpdates.websiteNote) }}</p>
      <RouterLink to="/news">{{ t('Latest updates') }} <span aria-hidden="true">→</span></RouterLink>
    </div>

    <div class="footer-bottom">
      <span>© {{ t(currentYear) }} {{ t(siteInfo.name) }}.</span>
      <span>{{ t("Cognitive and Collaborative Intelligence for Software, Robotics, and Real-World Systems.") }}</span>
    </div>
  </footer>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from './LocaleLink.vue'
import ContactLink from './ContactLink.vue'
import GlobalVisitorsGlobe from './GlobalVisitorsGlobe.vue'
import { researchNarrative } from '../data/researchPresentation'
import { siteInfo, communityUpdates } from '../data/site'

const currentYear = new Date().getFullYear()

const scrollToTop = () => {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
}
</script>

<style scoped>
.footer-update-note { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 6px 24px; margin-top: 20px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, .16); }
.footer-update-note p { flex: 1 1 440px; color: rgba(255, 255, 255, .8); font-size: 14px; line-height: 1.7; }
.footer-update-note a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: #9bdde7; font-size: 14px; font-weight: 600; }
.footer-bottom { margin-top: 8px; padding-top: 10px; border-top: 0; }
</style>
