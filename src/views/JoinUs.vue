<template>
  <div>
    <section class="page-hero narrow">
      <div>
        <p class="eyebrow">Join Us</p>
        <h1>Opportunities for students and collaborators interested in reflective AI and intelligent software systems.</h1>
        <p>
          We welcome undergraduate students, master students, visiting students, and research collaborators who are interested in AI, software engineering, multi-agent systems, cognitive intelligence, and embodied intelligence.
        </p>
      </div>
    </section>

    <section class="section join-layout">
      <article class="info-panel">
        <p class="eyebrow">Research Fit</p>
        <h2>Good candidates are curious about both models and systems.</h2>
        <p>
          CSMA projects often involve reading research papers, designing experiments, building reliable software prototypes, evaluating AI systems, and communicating findings clearly.
        </p>
      </article>

      <article class="info-panel">
        <p class="eyebrow">Application Materials</p>
        <h2>Suggested materials</h2>
        <ul class="check-list">
          <li>CV or resume</li>
          <li>Short research interest statement</li>
          <li>Transcript if applicable</li>
          <li>Selected projects, papers, repositories, or writing samples</li>
        </ul>
      </article>

      <article class="info-panel wide">
        <p class="eyebrow">Topics</p>
        <h2>Current interest areas</h2>
        <div class="tag-row large">
          <span>Metacognitive AI</span>
          <span>Multi-Agent Systems</span>
          <span>Intelligent Requirements Engineering</span>
          <span>Code Generation</span>
          <span>Automated Debugging</span>
          <span>Program Repair</span>
          <span>Knowledge-Guided Reasoning</span>
          <span>Embodied Intelligence</span>
        </div>
      </article>

      <article class="info-panel wide">
        <p class="eyebrow">Contact</p>
        <h2>How to reach the group</h2>
        <p>
          Send a concise email to <a :href="`mailto:${siteInfo.contactEmail}`">{{ siteInfo.contactEmail }}</a> with your background and interests. Please do not include sensitive personal information beyond what is needed for academic contact.
        </p>
      </article>
    </section>
  </div>
</template>

<script setup>
import { siteInfo } from '../data/site'
</script>
