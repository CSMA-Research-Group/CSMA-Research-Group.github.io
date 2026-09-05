<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <section class="footer-about-contact">
        <RouterLink class="footer-brand" to="/">
          <span class="brand-mark" aria-hidden="true">{{ siteInfo.shortName }}</span>
          <span>{{ siteInfo.name }}</span>
        </RouterLink>

        <div class="footer-about-block">
          <h2>About</h2>
          <p class="footer-about-text">{{ researchNarrative.description }}</p>
        </div>

        <div class="footer-contact-block">
          <h2>Contact</h2>
          <div class="footer-contact-list">
            <p class="footer-contact-row">
              <span class="footer-social-icon" aria-hidden="true">@</span>
              <span>
                <strong>Email:</strong>{{ ' ' }}<a :href="`mailto:${siteInfo.contactEmail}`">{{ siteInfo.contactEmail }}</a>
              </span>
            </p>
            <a
              class="footer-contact-row"
              href="https://weibo.com/jiangpinghuang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="footer-social-icon" aria-hidden="true">W</span>
              <span><strong>Weibo:</strong>{{ ' ' }}@jiangpinghuang</span>
            </a>
            <a
              class="footer-contact-row"
              href="https://x.com/jiangpinghuang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="footer-social-icon" aria-hidden="true">X</span>
              <span><strong>X:</strong>{{ ' ' }}@jiangpinghuang</span>
            </a>
          </div>
        </div>

        <div class="footer-box-bottom">
          <RouterLink class="footer-home-top" to="/">
            <span class="footer-social-icon" aria-hidden="true">⌂</span>
            <span>Home</span>
          </RouterLink>
          <button class="footer-home-top" type="button" @click="scrollToTop">
            <span aria-hidden="true">↑</span>
            <span>Back to top</span>
          </button>
        </div>
      </section>

      <GlobalVisitorsGlobe />
    </div>

    <div class="footer-bottom">
      <span>© {{ currentYear }} {{ siteInfo.name }}.</span>
      <span>Cognitive and Collaborative Intelligence for Software, Robotics, and Real-World Systems.</span>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import GlobalVisitorsGlobe from './GlobalVisitorsGlobe.vue'
import { researchNarrative } from '../data/researchPresentation'
import { siteInfo } from '../data/site'

const currentYear = new Date().getFullYear()

const scrollToTop = () => {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
}
</script>
