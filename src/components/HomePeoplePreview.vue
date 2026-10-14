<template>
  <div class="home-people-preview">
    <div class="details-copy home-people-intro">
      <p>Our members work across artificial intelligence, intelligent software engineering, and intelligent robotics.
        Meet the people contributing to our research community.</p>
    </div>
    <div v-for="row in homePeopleRows" :key="row.id" class="home-people-row"
      :class="'home-people-row--' + row.id" role="list" :aria-label="row.title">
      <PersonPreviewCard v-for="person in row.people" :key="person.id" :person="person"
        role="listitem" />
    </div>
  </div>
</template>

<script setup>
import PersonPreviewCard from './PersonPreviewCard.vue'
import { homePeopleRows } from '../data/peopleHierarchy'
</script>
