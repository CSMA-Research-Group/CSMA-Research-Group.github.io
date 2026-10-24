<template>
  <div class="content-page alumni-page">
    <header class="page-hero narrow">
      <h1>{{ t("Alumni") }}</h1>
      <p>{{ t("Former members of the research group and their next steps.") }}</p>
    </header>
    <section class="section">
      <article v-for="person in alumniProfiles" :id="person.id" :key="person.id" class="alumni-entry">
        <div><h2>{{ t(person.name) }}</h2><p v-if="person.degree">{{ t(person.degree) }}</p></div>
        <dl><div><dt>{{ t("Years with the Group") }}</dt><dd>{{ t(person.enrollmentYear) }}–{{ t(person.graduationYear) }}</dd></div></dl>
        <div v-if="person.destination" class="alumni-destination"><span>{{ t("Next Step") }}</span><p>{{ t(person.destination) }}</p></div>
      </article>
      <p v-if="!alumniProfiles.length" class="paper-status">{{ t("Alumni profiles will be added here.") }}</p>
      <div class="archive-nav archive-nav--back"><RouterLink class="text-link" to="/people">{{ t("← Back to People") }}</RouterLink></div>
    </section>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import RouterLink from '../components/LocaleLink.vue'
import { alumniProfiles } from '../data/peopleHierarchy'
</script>
