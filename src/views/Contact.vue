<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">Contact</p>
        <h1>Contact CSMA Research Group.</h1>
        <p>{{ siteInfo.contactNote }}</p>
      </div>
    </section>

    <section class="section contact-grid">
      <article class="contact-card">
        <p class="eyebrow">Email</p>
        <h2><a :href="`mailto:${siteInfo.contactEmail}`">{{ siteInfo.contactEmail }}</a></h2>
        <p>For student inquiries, include your CV, research interests, and relevant project or paper experience.</p>
      </article>

      <article class="contact-card">
        <p class="eyebrow">Affiliation</p>
        <h2>{{ siteInfo.affiliation }}</h2>
        <p>{{ siteInfo.address }}</p>
      </article>

      <article class="contact-card">
        <p class="eyebrow">GitHub</p>
        <h2><a :href="siteInfo.githubOrg" target="_blank" rel="noreferrer">CSMA-Research-Group</a></h2>
        <p>Public repositories and website source code are maintained through the group GitHub organization.</p>
      </article>

      <article class="contact-card">
        <p class="eyebrow">Collaboration</p>
        <h2>Research collaboration</h2>
        <p>
          Collaboration inquiries are welcome in topics related to agentic software engineering, requirements intelligence, multi-agent systems, trustworthy AI, and embodied intelligence.
        </p>
      </article>
    </section>
  </div>
</template>

<script setup>
import { siteInfo } from '../data/site'
</script>
