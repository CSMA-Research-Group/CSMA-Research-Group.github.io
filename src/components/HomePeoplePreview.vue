<template>
  <div class="home-people-preview">
    <div class="details-copy home-people-intro">
      <p>{{ t("Our members study artificial intelligence, intelligent software engineering, intelligent robotics, and their applications in real-world settings. Meet the people contributing to our research community.") }}</p>
    </div>
    <div v-for="row in homePeopleRows" :key="row.id" class="home-people-row"
      :class="'home-people-row--' + row.id" role="list" :aria-label="t(row.title)">
      <PersonPreviewCard v-for="person in row.people" :key="person.id" :person="person"
        role="listitem" />
      <MemberTeaser v-if="row.id === 'member'" role="listitem" />
    </div>
  </div>
</template>

<script setup>
import { t } from '../i18n'
import PersonPreviewCard from './PersonPreviewCard.vue'
import MemberTeaser from './MemberTeaser.vue'
import { homePeopleRows } from '../data/peopleHierarchy'
</script>
