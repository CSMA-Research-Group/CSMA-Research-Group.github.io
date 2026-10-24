<template>
  <div class="content-page about-page">
    <header class="page-hero narrow">
      <h1>{{ t("About") }}</h1>
      <p>{{ t('CSMA Research Group focuses on cognitive and collaborative intelligence, intelligent software engineering, and intelligent robotics, exploring how agents reason, collaborate, and carry out tasks reliably. Our vision is to build trustworthy intelligent systems that adapt to complex environments. Our mission is to connect fundamental research with practical applications and help people solve complex problems with AI.') }}</p>
    </header>

    <section class="section about-layout" aria-labelledby="about-vision-title">
      <article class="about-card">
        <p class="eyebrow">{{ t("Research Vision") }}</p>
        <h2 id="about-vision-title">{{ t(researchNarrative.visionTitle) }}</h2>
        <p>
          {{ t(researchNarrative.vision) }}
        </p>
        <p>{{ t(researchNarrative.visionApplications) }}</p>
        <div class="card-section about-research-areas">
          <h3>{{ t("Research Areas") }}</h3>
          <div class="tag-row about-area-grid">
            <span v-for="area in researchAreas" :key="area.id">
              {{ t(getResearchAreaDisplayTitle(area)) }}
            </span>
          </div>
        </div>
        <dl class="contact-list about-facts">
          <div>
            <dt>{{ t("Established") }}</dt>
            <dd>{{ t(visitorGlobeInfo.foundedAt) }}</dd>
          </div>
          <div>
            <dt>{{ t("Address") }}</dt>
            <dd>{{ t(siteInfo.address) }}</dd>
          </div>
        </dl>
      </article>

      <aside id="contact" class="about-card about-contact">
        <p class="eyebrow">{{ t("Contact + Join Us") }}</p>
        <h2>{{ t("Work with CSMA") }}</h2>
        <dl class="contact-list">
          <div>
            <dt>{{ t("Email") }}</dt>
            <dd><ContactLink :href="`mailto:${siteInfo.contactEmail}`" :label="t('Email the Group')" /></dd>
          </div>
          <div>
            <dt>{{ t("Research Interests") }}</dt>
            <dd> {{ t("Cognitive Intelligence, Multi-Agent Systems, Intelligent Software Engineering, Embodied AI, and Real-World AI Systems.") }} </dd>
          </div>
          <div>
            <dt>{{ t("GitHub") }}</dt>
            <dd>
              <ContactLink kind="github" :href="siteInfo.githubOrg" :label="t('GitHub (opens in a new tab)')" external />
            </dd>
          </div>
        </dl>
        <p>{{ t(siteInfo.contactNote) }}</p>
        <p>{{ t("Please email a brief introduction, the research questions or application scenarios you would like to explore, and relevant work or collaboration ideas. Students should also include their current degree stage.") }}</p>
        <div class="about-actions">
          <ContactLink class="button button-primary" :href="`mailto:${siteInfo.contactEmail}`" :label="t('Email the Group')">{{ t("Email the Group") }}</ContactLink>
          <RouterLink class="button button-secondary" to="/people">{{ t("Meet Our Members") }}</RouterLink>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from '../components/LocaleLink.vue'
import ContactLink from '../components/ContactLink.vue'
import { coreResearchAreas as researchAreas } from '../data/researchAreas'
import { getResearchAreaDisplayTitle, researchNarrative } from '../data/researchPresentation'
import { siteInfo } from '../data/site'
import { visitorGlobeInfo } from '../data/visitorStats'
</script>
