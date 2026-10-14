<template>
  <div class="people-pyramid" aria-label="Members">
    <section v-for="level in peopleHierarchy" :id="level.id" :key="level.id"
      class="home-work-column people-tier" :class="'people-tier--' + level.id" :aria-labelledby="level.id + '-heading'">
      <div class="home-column-heading">
        <p :id="level.id + '-heading'" class="home-column-label">{{ level.title }}</p>
      </div>
      <div class="people-tier-members">
        <PersonPreviewCard v-for="person in level.people" :id="person.id" :key="person.id"
          class="people-slot" :person="person" />
      </div>
    </section>
  </div>
</template>
<script setup>
import { peopleHierarchy } from '../data/peopleHierarchy'
import PersonPreviewCard from './PersonPreviewCard.vue'
</script>
