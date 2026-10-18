<template>
  <div class="content-page about-page">
    <header class="page-hero narrow">
      <h1>About</h1>
      <p>CSMA Research Group is based at {{ siteInfo.affiliation }}. We study how intelligent agents can reason, collaborate, and act reliably in software and robotic systems.</p>
    </header>

    <section class="section about-layout" aria-labelledby="about-vision-title">
      <article class="about-card">
        <p class="eyebrow">Research Vision</p>
        <h2 id="about-vision-title">From reasoning and collaboration to reliable intelligent systems.</h2>
        <p>
          {{ researchNarrative.vision }}
        </p>
        <p>
          Our projects connect requirements, code, runtime evidence, and robotic task execution.
          Knowledge and human feedback help guide these systems and assess whether their behavior
          meets the intended goals.
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
        <p>Please email a brief introduction, the research topics you would like to explore, and examples of relevant work. Students should also include their current degree stage.</p>
        <div class="about-actions">
          <a class="button button-primary" :href="`mailto:${siteInfo.contactEmail}`">Email the Group</a>
          <RouterLink class="button button-secondary" to="/people">Meet Our Members</RouterLink>
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
