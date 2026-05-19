<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">About</p>
        <h1>About CSMA Research Group</h1>
        <p>
          CSMA Research Group studies cognitive and collaborative intelligence for software, robots,
          and real-world AI systems. We focus on artificial intelligence, intelligent software
          engineering, intelligent robotics, and application-driven research prototypes.
        </p>
      </div>
    </section>

    <section class="section about-layout" aria-labelledby="about-vision-title">
      <article class="about-card">
        <p class="eyebrow">Research Vision</p>
        <h2 id="about-vision-title">Cognitive and collaborative intelligence across models, software, and embodied systems.</h2>
        <p>
          {{ siteInfo.vision }}
        </p>
        <p>
          The group connects multi-agent cognition, knowledge-guided reasoning, human-AI collaboration,
          and trace-driven system feedback to build reliable intelligent systems in technical and
          real-world settings.
        </p>
      </article>

      <aside id="contact" class="about-card about-contact">
        <p class="eyebrow">Contact + Join Us</p>
        <h2>Work with CSMA</h2>
        <dl class="contact-list">
          <div>
            <dt>Email</dt>
            <dd><a :href="`mailto:${siteInfo.contactEmail}`">{{ siteInfo.contactEmail }}</a></dd>
          </div>
          <div>
            <dt>Research interests</dt>
            <dd>
              cognitive intelligence, multi-agent systems, intelligent software engineering,
              embodied AI, and real-world AI systems.
            </dd>
          </div>
        </dl>
        <div class="about-actions">
          <RouterLink class="button button-primary" to="/people#join-us">Join Us / Open Positions</RouterLink>
          <a class="button button-secondary" :href="`mailto:${siteInfo.contactEmail}`">Contact Us</a>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { siteInfo } from '../data/site'
</script>
