<template>
  <div class="content-page people-page">
    <header class="page-hero narrow">
      <h1>{{ t("People") }}</h1>
      <p>{{ t("Our members study artificial intelligence, intelligent software engineering, intelligent robotics, and their applications in real-world settings.") }}</p>
      <nav class="section-index" :aria-label="t('People sections')">
        <RouterLink v-for="level in peopleHierarchy" :key="level.id" :to="'/people#' + level.id">{{ t(level.title) }}</RouterLink>
        <RouterLink to="/people/alumni">{{ t("Alumni") }}</RouterLink>
        <RouterLink to="/people#join-us">{{ t("Join Us") }}</RouterLink>
      </nav>
    </header>
    <div class="section people-directory">
      <ChinesePeopleDirectory v-if="isChinese" />
      <PeoplePyramid v-else />
      <section id="join-us" class="people-invitation" aria-labelledby="people-join-heading">
        <div>
          <p class="eyebrow">{{ t("Join Us") }}</p><h2 id="people-join-heading">{{ t("Grow with the group.") }}</h2>
          <p>{{ t(siteInfo.contactNote) }}</p>
        </div>
        <RouterLink class="text-link" to="/about#contact">{{ t("Get in touch") }} <span aria-hidden="true">→</span></RouterLink>
      </section>
      <ArchiveNote description="Former members and their next steps are collected in the alumni archive."
        to="/people/alumni" label="Alumni" link-label="Browse the Alumni Archive" />
    </div>
  </div>
</template>

<script setup>
import { t, isChinese } from '../i18n'
import ChinesePeopleDirectory from '../components/ChinesePeopleDirectory.vue'
import RouterLink from '../components/LocaleLink.vue'
import PeoplePyramid from '../components/PeoplePyramid.vue'
import ArchiveNote from '../components/ArchiveNote.vue'
import { peopleHierarchy } from '../data/peopleHierarchy'
import { siteInfo } from '../data/site'
</script>
