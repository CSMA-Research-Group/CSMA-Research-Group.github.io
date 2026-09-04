<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">People</p>
        <h1>Group members, student researchers, collaborators, and alumni.</h1>
        <p>
          People records separate internal group members from collaborators. Affiliations and emails are taken from publication materials; homepage links are included only when a reliable matching source was verified.
        </p>
      </div>
    </section>

    <section class="section people-sections">
      <section v-for="section in peopleSections" :key="section.id" class="people-section">
        <div class="section-heading compact">
          <p class="eyebrow">{{ section.people.length }} Profile{{ section.people.length === 1 ? '' : 's' }}</p>
          <h2>{{ section.title }}</h2>
        </div>
        <div class="people-grid">
          <PeopleCard v-for="person in section.people" :key="person.id" :person="person" />
        </div>
      </section>
    </section>

    <section id="join-us" class="section people-join-section">
      <article class="join-card">
        <div>
          <p class="eyebrow">Join Us</p>
          <h2>Students and collaborators are welcome.</h2>
          <p>
            We welcome motivated students and collaborators interested in cognitive intelligence,
            multi-agent systems, intelligent software engineering, intelligent robotics, and
            real-world AI applications.
          </p>
        </div>
        <RouterLink class="button button-primary" to="/about#contact">Contact Us</RouterLink>
      </article>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import PeopleCard from '../components/PeopleCard.vue'
import { peopleSections } from '../data/people'
</script>
