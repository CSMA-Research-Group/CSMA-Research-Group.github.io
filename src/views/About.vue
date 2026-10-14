<template>
  <div class="content-page about-page">
    <header class="page-hero narrow">
      <h1>About</h1>
      <p>CSMA Research Group studies cognitive and collaborative intelligence for software, robots, and grounded intelligent systems. Cognitive intelligence is the core; intelligent software and robotics are its primary carriers; application scenarios provide practical validation.</p>
    </header>

    <section class="section about-layout" aria-labelledby="about-vision-title">
      <article class="about-card">
        <p class="eyebrow">Research Vision</p>
        <h2 id="about-vision-title">Cognitive and collaborative intelligence across models, software, and embodied systems.</h2>
        <p>
          {{ researchNarrative.vision }}
        </p>
        <p>
          The group connects multi-agent cognition, knowledge-guided reasoning, human-AI collaboration,
          and trace-driven system feedback to build reliable intelligent systems in technical and
          real-world settings.
        </p>
        <div class="card-section about-research-areas">
          <h3>Research Areas</h3>
          <div class="tag-row about-area-grid">
            <span v-for="area in researchAreas" :key="area.id">
              {{ getResearchAreaDisplayTitle(area) }}
            </span>
          </div>
        </div>
        <dl class="contact-list about-facts">
          <div>
            <dt>Established</dt>
            <dd>{{ visitorGlobeInfo.foundedAt }}</dd>
          </div>
          <div>
            <dt>Affiliation</dt>
            <dd>{{ siteInfo.affiliation }}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{{ siteInfo.address }}</dd>
          </div>
        </dl>
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
            <dt>Research Interests</dt>
            <dd>
              Cognitive Intelligence, Multi-Agent Systems, Intelligent Software Engineering,
              Embodied AI, and Real-World AI Systems.
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a :href="siteInfo.githubOrg" target="_blank" rel="noopener noreferrer">
                CSMA Research Group
              </a>
            </dd>
          </div>
        </dl>
        <p>{{ siteInfo.contactNote }}</p>
        <p>Please email a brief introduction, your research interests, and relevant work. Include your current degree stage and the topics you would like to explore.</p>
        <div class="about-actions">
          <RouterLink class="button button-primary" to="/people#join-us">Join Us</RouterLink>
          <a class="button button-secondary" :href="`mailto:${siteInfo.contactEmail}`">Contact Us</a>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { coreResearchAreas as researchAreas } from '../data/researchAreas'
import { getResearchAreaDisplayTitle, researchNarrative } from '../data/researchPresentation'
import { siteInfo } from '../data/site'
import { visitorGlobeInfo } from '../data/visitorStats'
</script>
