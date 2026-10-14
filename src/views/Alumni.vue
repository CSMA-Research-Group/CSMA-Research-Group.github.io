<template>
  <div class="content-page alumni-page">
    <header class="page-hero narrow">
      <h1>Alumni</h1>
      <p>Former members of the research group and their next steps.</p>
    </header>
    <section class="section">
      <article v-for="person in alumniProfiles" :id="person.id" :key="person.id" class="alumni-entry">
        <div><h2>{{ person.name }}</h2><p v-if="person.degree">{{ person.degree }}</p></div>
        <dl><div><dt>Years with the Group</dt><dd>{{ person.enrollmentYear }}–{{ person.graduationYear }}</dd></div></dl>
        <div v-if="person.destination" class="alumni-destination"><span>Next Step</span><p>{{ person.destination }}</p></div>
      </article>
      <p v-if="!alumniProfiles.length" class="paper-status">Alumni profiles will be added here.</p>
      <div class="archive-nav archive-nav--back"><RouterLink class="text-link" to="/people">← Back to People</RouterLink></div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { alumniProfiles } from '../data/peopleHierarchy'
</script>
