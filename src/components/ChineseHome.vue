<template>
  <div class="academic-home">
    <section class="academic-hero academic-container" aria-labelledby="academic-home-title">
      <div class="academic-hero-copy">
        <h1 id="academic-home-title">CSMA 研究组</h1>
        <p class="academic-hero-statement">认知与协同智能<br />面向软件、机器人与实际应用</p>
        <p class="academic-hero-description">{{ t(researchNarrative.vision) }}</p>
        <div class="academic-hero-actions">
          <RouterLink class="button button-primary" to="/research">了解研究方向 <span aria-hidden="true">→</span></RouterLink>
          <RouterLink class="academic-text-link" to="/people">认识研究团队 <span aria-hidden="true">→</span></RouterLink>
        </div>
      </div>
      <ChineseResearchVision compact />
    </section>

    <nav class="academic-index academic-container" aria-label="首页内容导航">
      <span>探索 CSMA</span>
      <RouterLink v-for="section in homeSections" :key="section.id" :to="`/#${section.id}`">{{ section.title }}</RouterLink>
    </nav>

    <section id="home-news-title" class="academic-section academic-container" aria-labelledby="progress-title">
      <div class="academic-section-heading"><div><p class="academic-eyebrow">研究进展</p><h2 id="progress-title">代表性工作与最新动态</h2></div><RouterLink class="academic-text-link" to="/publications">全部论文 <span aria-hidden="true">→</span></RouterLink></div>
      <div class="academic-progress-grid">
        <ResearchSystemCard :system="featuredSystem" featured />
        <aside class="academic-news" aria-labelledby="latest-news-title">
          <div class="academic-column-heading"><h3 id="latest-news-title">最新动态</h3><RouterLink to="/news">全部动态 <span aria-hidden="true">→</span></RouterLink></div>
          <ol>
            <li v-for="item in newsItems.slice(0, 4)" :key="item.id">
              <div class="academic-news-meta"><time :datetime="item.date">{{ item.date }}</time><span>{{ t(item.venue || item.tag) }}</span></div>
              <h4><RouterLink v-if="item.publicationId" :to="`/publications/${item.publicationId}`">{{ publicationTitles[item.publicationId] || t(item.title) }}</RouterLink><template v-else>{{ t(item.title) }}</template></h4>
              <p>{{ t(item.summary || item.description) }}</p>
            </li>
          </ol>
          <RouterLink class="academic-archive-link" to="/news/archive">浏览历年动态 <span aria-hidden="true">→</span></RouterLink>
        </aside>
      </div>
    </section>

    <section id="home-research-title" class="academic-research-band" aria-labelledby="themes-title">
      <div class="academic-container academic-section">
        <div class="academic-section-heading"><div><p class="academic-eyebrow">研究方向</p><h2 id="themes-title">研究领域与关键问题</h2></div><RouterLink class="academic-text-link" to="/research">方向、问题与方法 <span aria-hidden="true">→</span></RouterLink></div>
        <p class="academic-section-intro">{{ t(researchNarrative.homepageVision) }}</p>
        <div class="academic-theme-grid">
          <article v-for="(area, index) in coreResearchAreas.slice(0, 3)" :key="area.id" class="academic-theme">
            <div class="academic-theme-top"><span>0{{ index + 1 }}</span><ResearchThemeMark :id="area.id" /></div>
            <h3><RouterLink :to="`/research#${area.id}`">{{ t(getResearchAreaDisplayTitle(area)) }}</RouterLink></h3>
            <p>{{ t(area.summary) }}</p>
            <ul><li v-for="topic in area.keyTopics.slice(0, 3)" :key="topic">{{ t(topic) }}</li></ul>
            <div class="academic-theme-question"><span>关注的问题</span><p>{{ t(area.keyQuestions[0]) }}</p></div>
            <RouterLink class="academic-text-link" :to="`/research#${area.id}`">了解这一方向 <span aria-hidden="true">→</span></RouterLink>
          </article>
        </div>
        <div class="academic-application-line"><div><h3>在应用场景中检验研究</h3><p>{{ t(coreResearchAreas[3].summary) }}</p></div><RouterLink class="academic-text-link" to="/research#application-scenarios">研究原型与应用 <span aria-hidden="true">→</span></RouterLink></div>
      </div>
    </section>

    <section id="home-selected-title" class="academic-section academic-container" aria-labelledby="systems-title">
      <div class="academic-section-heading"><div><p class="academic-eyebrow">论文与系统</p><h2 id="systems-title">论文成果与研究系统</h2></div><RouterLink class="academic-text-link" to="/resources">研究资源 <span aria-hidden="true">→</span></RouterLink></div>
      <div class="academic-system-grid"><ResearchSystemCard v-for="system in otherSystems" :key="system.id" :system="system" /></div>
      <div class="academic-projects" aria-labelledby="ongoing-projects-title">
        <div class="academic-projects-intro"><p class="academic-eyebrow">持续开展的研究</p><h3 id="ongoing-projects-title">在研课题</h3><RouterLink class="academic-text-link" to="/projects#research-projects">查看研究项目 <span aria-hidden="true">→</span></RouterLink></div>
        <div class="academic-project-rows"><article v-for="project in proposalProjects" :key="project.id"><span><span class="academic-project-period">{{ project.period }}</span> · {{ t(project.status) }}</span><h4><RouterLink :to="`/projects#${project.id}`">{{ t(project.displayTitle) }} <span aria-hidden="true">↗</span></RouterLink></h4><p>{{ t(project.homeSummary) }}</p></article></div>
      </div>
    </section>

    <section id="home-insights-title" class="academic-insight-band" aria-labelledby="perspectives-title">
      <div class="academic-container academic-section">
        <div class="academic-section-heading"><div><p class="academic-eyebrow">研究洞见</p><h2 id="perspectives-title">前沿研究与方法思考</h2></div><RouterLink class="academic-text-link" to="/resources#insights">全部洞见 <span aria-hidden="true">→</span></RouterLink></div>
        <div class="academic-insight-grid">
          <article v-for="article in researchInsights.items.slice(0, 2)" :key="article.id" class="academic-insight">
            <p class="academic-insight-meta">{{ t(article.category) }} <span>·</span> <time :datetime="article.date">{{ article.date }}</time></p>
            <h3><RouterLink :to="`/resources/insights/${article.id}`">{{ t(article.title) }} <span aria-hidden="true">↗</span></RouterLink></h3>
            <p>{{ t(article.description) }}</p>
            <div class="academic-insight-question"><span>我们关注</span><p>{{ t(article.insight) }}</p></div>
            <RouterLink class="academic-text-link" :to="`/resources/insights/${article.id}`">阅读全文与参考来源 <span aria-hidden="true">→</span></RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section id="home-people-title" class="academic-section academic-container" aria-labelledby="team-title">
      <div class="academic-section-heading"><div><p class="academic-eyebrow">研究团队</p><h2 id="team-title">成员与研究兴趣</h2></div><RouterLink class="academic-text-link" to="/people">浏览全部成员 <span aria-hidden="true">→</span></RouterLink></div>
      <ul class="academic-people-grid">
        <li v-for="person in peopleProfiles" :key="person.id"><RouterLink :to="person.profilePath"><img :src="person.portrait" :alt="person.name" width="76" height="88" loading="lazy" decoding="async" /><span><strong>{{ person.name }}</strong><span class="academic-person-area">{{ t(person.previewInterests[0]) }}</span><small>{{ t(person.interests.filter(interest => interest !== person.previewInterests[0]).slice(0, 2).join(' · ')) }}</small></span><span class="academic-person-arrow" aria-hidden="true">↗</span></RouterLink></li>
      </ul>
    </section>

    <section id="home-about-title" class="academic-contact academic-container" aria-labelledby="contact-title">
      <div><p class="academic-eyebrow">联系与交流</p><h2 id="contact-title">加入研究，交流想法</h2><p>{{ t(siteInfo.contactNote) }}</p><p>欢迎介绍您的研究兴趣、相关工作，以及希望共同探索的问题。</p></div>
      <div class="academic-contact-actions"><ContactLink class="button button-primary" :href="`mailto:${siteInfo.contactEmail}`" :label="t('Email the Group')">联系研究组</ContactLink><RouterLink class="academic-text-link" to="/about#contact">关于我们与加入方式 <span aria-hidden="true">→</span></RouterLink></div>
    </section>
  </div>
</template>

<script setup>
import RouterLink from './LocaleLink.vue'
import ContactLink from './ContactLink.vue'
import ChineseResearchVision from './ChineseResearchVision.vue'
import ResearchSystemCard from './ResearchSystemCard.vue'
import ResearchThemeMark from './ResearchThemeMark.vue'
import { t } from '../i18n'
import { siteInfo } from '../data/site'
import { researchNarrative, getResearchAreaDisplayTitle } from '../data/researchPresentation'
import { coreResearchAreas } from '../data/researchAreas'
import { newsItems } from '../data/news'
import { projectApplications } from '../data/systems'
import { featuredPublications } from '../data/publications'
import { publicationTitles } from '../i18n/zh/publications'
import { proposalProjects } from '../data/proposalProjects'
import { researchInsights } from '../data/researchInsights'
import { peopleProfiles } from '../data/peopleHierarchy'

const featuredSystem = projectApplications.find(system => system.id === featuredPublications[0]?.applicationId) || projectApplications[0]
const otherSystems = projectApplications.filter(system => system.id !== featuredSystem.id)
const homeSections = [
  { id: 'home-news-title', title: '研究进展' }, { id: 'home-research-title', title: '研究方向' },
  { id: 'home-selected-title', title: '论文与系统' }, { id: 'home-insights-title', title: '研究洞见' },
  { id: 'home-people-title', title: '研究团队' }, { id: 'home-about-title', title: '联系交流' },
]
</script>

<style scoped>
.academic-home { color: #243e53; }
.academic-container { width: min(1180px, calc(100% - 64px)); margin-inline: auto; }
.academic-hero { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.2fr); gap: 52px; align-items: center; padding-block: 56px 44px; }
.academic-eyebrow { margin: 0 0 12px; font-size: var(--zh-meta); line-height: 1.6; font-weight: 650; letter-spacing: .08em; color: #487782; }
.academic-hero h1 { margin: 0; color: #102a43; font-size: clamp(38px, 3.6vw, 50px); line-height: 1.25; }
.academic-hero-statement { margin: 24px 0 18px; font-size: 24px; line-height: 1.65; font-weight: 500; color: #315b73; }
.academic-hero-description { max-width: 30em; margin: 0; font-size: var(--zh-body); line-height: 1.85; color: var(--zh-body-ink); }
.academic-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 24px; margin-top: 28px; }
.academic-hero-actions .button { min-height: 44px; padding: 11px 17px; font-size: var(--zh-support); }
.academic-text-link { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; font-size: var(--zh-support); line-height: 1.6; font-weight: 650; color: #195f8f; text-decoration: none; }
.academic-text-link:hover { color: #0f766e; text-decoration: underline; text-underline-offset: 4px; }
.academic-index { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 30px; padding: 12px 0; border-block: 1px solid #d3e0e8; }
.academic-index > span { padding-right: 25px; border-right: 1px solid #cadbe5; font-size: var(--zh-meta); color: #597889; font-weight: 700; letter-spacing: .08em; }
.academic-index a { display: inline-flex; align-items: center; min-height: 44px; font-size: var(--zh-support); font-weight: 600; text-decoration: none; color: #355970; }
.academic-index a:hover { color: #0f766e; text-decoration: underline; text-underline-offset: 6px; }
.academic-section { padding-block: 64px; }
.academic-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 14px 30px; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #d3dfe7; }
.academic-section-heading > div { min-width: 0; }
.academic-section-heading > .academic-text-link { flex-shrink: 0; }
.academic-section-heading h2 { margin: 0; font-size: 32px; line-height: 1.45; color: #15384f; }
.academic-section-heading .academic-eyebrow { margin-bottom: 7px; }
.academic-section-intro { max-width: 46em; margin: -6px 0 32px; font-size: var(--zh-body); line-height: 1.85; color: var(--zh-body-ink); }
.academic-progress-grid { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr); gap: 44px; align-items: start; }
.academic-news { min-width: 0; }
.academic-column-heading { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #b8cdd9; padding: 0 0 14px; }
.academic-column-heading h3 { margin: 0; font-size: 24px; color: #15384f; }
.academic-column-heading a { display: inline-flex; min-height: 30px; align-items: center; font-size: var(--zh-meta); color: #416c83; text-decoration: none; }
.academic-news ol { list-style: none; margin: 0; padding: 0; }
.academic-news li { padding: 22px 0; border-bottom: 1px solid #dbe5ec; }
.academic-news-meta { display: flex; flex-wrap: wrap; gap: 6px 14px; color: #4f7187; font-size: var(--zh-meta); }
.academic-news time { font-variant-numeric: tabular-nums; font-weight: 700; }
.academic-news h4 { margin: 10px 0 12px; font-size: 21px; line-height: 1.6; }
.academic-news h4 a { display: block; text-decoration: none; }
.academic-news h4 a:hover { color: #195f8f; text-decoration: underline; text-underline-offset: 3px; }
.academic-news li > p { margin: 0; color: var(--zh-body-ink); font-size: var(--zh-body); line-height: 1.8; }
.academic-archive-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 8px; font-size: var(--zh-meta); color: #426d84; text-decoration: none; gap: 10px; }
.academic-research-band { border-block: 1px solid #dce6ec; background: #f0f5f8; }
.academic-theme-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); border: 1px solid #d7e2e9; border-radius: 7px; background: #fff; overflow: hidden; }
.academic-theme { display: flex; flex-direction: column; padding: 28px; min-width: 0; }
.academic-theme + .academic-theme { border-left: 1px solid #d7e2e9; }
.academic-theme-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.academic-theme-top > span { font-size: var(--zh-support); font-weight: 650; color: #6b889c; font-variant-numeric: tabular-nums; }
.academic-theme-top :deep(svg) { width: 46px; height: 42px; color: #537d95; }
.academic-theme:nth-child(2) .academic-theme-top :deep(svg) { color: #7e76a0; }
.academic-theme:nth-child(3) .academic-theme-top :deep(svg) { color: #57867f; }
.academic-theme h3 { font-size: 24px; font-weight: 600; line-height: 1.5; margin: 0 0 16px; }
.academic-theme h3 a { display: block; text-decoration: none; }
.academic-theme > p { margin: 0; font-size: var(--zh-body); line-height: 1.85; color: var(--zh-body-ink); }
.academic-theme ul { list-style: none; padding: 17px 0; margin: 0; }
.academic-theme li { display: flex; gap: 9px; font-size: var(--zh-support); line-height: 1.8; margin: 5px 0; color: #43697e; }
.academic-theme li::before { content: ''; flex-shrink: 0; width: 4px; height: 4px; margin-top: 9px; background: #7b9aa8; }
.academic-theme-question { padding-top: 14px; border-top: 1px solid #e0e8ed; }
.academic-theme-question > span { font-size: var(--zh-meta); font-weight: 650; color: #4d748a; }
.academic-theme-question p { margin: 7px 0 14px; font-size: var(--zh-support); color: var(--zh-body-ink); line-height: 1.85; }
.academic-theme > .academic-text-link { margin-top: auto; }
.academic-application-line { display: flex; justify-content: space-between; gap: 24px; align-items: center; padding: 26px 0 0; }
.academic-application-line h3 { margin: 0 0 10px; font-size: 22px; }
.academic-application-line p { margin: 0; max-width: 820px; font-size: var(--zh-body); color: var(--zh-body-ink); line-height: 1.85; }
.academic-application-line .academic-text-link { flex-shrink: 0; }
.academic-system-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px; }
.academic-projects { display: grid; grid-template-columns: 240px minmax(0,1fr); gap: 44px; margin-top: 40px; padding-top: 32px; border-top: 1px solid #cfdde6; }
.academic-projects-intro h3 { margin: 0 0 10px; font-size: 28px; }
.academic-project-rows { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 30px; }
.academic-project-rows article + article { border-left: 1px solid #dce5eb; padding-left: 30px; }
.academic-project-rows article > span { font-size: var(--zh-meta); color: #5f7b8f; }
.academic-project-rows h4 { margin: 12px 0 10px; font-size: 22px; line-height: 1.6; }
.academic-project-rows h4 a { display: flex; justify-content: space-between; gap: 12px; text-decoration: none; }
.academic-project-rows h4 span { font-weight: 400; color: #7e97a6; }
.academic-project-rows p { margin: 0; font-size: var(--zh-body); line-height: 1.9; color: var(--zh-body-ink); }
.academic-insight-band { background: #f4f5f8; border-block: 1px solid #e1e5ec; }
.academic-insight-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 46px; }
.academic-insight + .academic-insight { border-left: 1px solid #d4dce5; padding-left: 46px; }
.academic-insight-meta { margin: 0 0 12px; font-size: var(--zh-meta); color: #6b728c; }
.academic-insight-meta span { margin-inline: 10px; }
.academic-insight h3 { margin: 0 0 18px; font-size: 26px; line-height: 1.55; }
.academic-insight h3 a { display: block; text-decoration: none; }
.academic-insight h3 span { font-weight: 400; color: #8a96aa; }
.academic-insight > p:not(.academic-insight-meta) { margin: 0; font-size: var(--zh-body); line-height: 1.85; color: var(--zh-body-ink); }
.academic-insight-question { border-left: 2px solid #a2a4bc; padding-left: 17px; margin-block: 20px 12px; }
.academic-insight-question > span { font-size: var(--zh-meta); font-weight: 650; color: #6b6c87; }
.academic-insight-question p { margin: 8px 0 0; font-size: var(--zh-body); line-height: 1.9; color: #3a526b; }
.academic-people-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); list-style: none; margin: 0; padding: 0; gap: 0 40px; }
.academic-people-grid li { min-width: 0; border-top: 1px solid #d6e3eb; }
.academic-people-grid a { display: flex; align-items: start; gap: 14px; padding-block: 24px; text-decoration: none; }
.academic-people-grid img { width: 80px; height: 96px; object-fit: cover; object-position: center 26%; border-radius: 4px; flex-shrink: 0; background: #e9f0f4; }
.academic-people-grid strong { display: block; margin-bottom: 8px; font-size: 21px; line-height: 1.45; overflow-wrap: anywhere; color: #1c405a; }
.academic-person-area { display: block; font-size: var(--zh-support); line-height: 1.7; color: #3f7384; }
.academic-people-grid small { display: block; margin-top: 4px; font-size: var(--zh-support); line-height: 1.75; color: #526779; }
.academic-person-arrow { font-size: var(--zh-body); color: #6e8b9b; margin-left: auto; }
.academic-people-grid a:hover strong { color: #195f8f; text-decoration: underline; text-underline-offset: 4px; }
.academic-contact { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 60px; align-items: center; padding: 34px 38px; margin-bottom: 48px; border: 1px solid #cbdce5; border-left: 4px solid #527e90; border-radius: 6px; background: #edf4f8; }
.academic-contact h2 { margin: 0 0 14px; font-size: 28px; line-height: 1.5; }
.academic-contact p:not(.academic-eyebrow) { margin: 8px 0 0; font-size: var(--zh-body); color: var(--zh-body-ink); line-height: 1.9; }
.academic-contact-actions { display: flex; flex-direction: column; align-items: start; gap: 10px; }
.academic-contact-actions .button { min-height: 44px; font-size: var(--zh-support); }
@media (max-width: 1179px) {
  .academic-hero { gap: 30px; grid-template-columns: minmax(0,.9fr) minmax(0,1fr); }
  .academic-hero-statement { font-size: 24px; }
  .academic-people-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .academic-progress-grid { gap: 28px; }
}
@media (max-width: 900px) {
  .academic-hero { grid-template-columns: 1fr; gap: 28px; }
  .academic-hero-copy { max-width: 760px; }
  .academic-progress-grid { grid-template-columns: 1fr; gap: 32px; }
  .academic-theme-grid { grid-template-columns: 1fr; }
  .academic-theme + .academic-theme { border-left: 0; border-top: 1px solid #d7e2e9; }
  .academic-theme { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 0 28px; }
  .academic-theme-top { grid-column: 1 / -1; }
  .academic-theme > h3, .academic-theme > p { grid-column: 1; }
  .academic-theme > ul { grid-column: 2; grid-row: 2 / span 2; padding-top: 0; }
  .academic-theme-question { grid-column: 1 / -1; margin-top: 18px; }
  .academic-theme > .academic-text-link { grid-column: 1 / -1; }
  .academic-system-grid { grid-template-columns: 1fr; }
  .academic-projects { grid-template-columns: 1fr; gap: 20px; }
  .academic-contact { gap: 30px; }
}
@media (max-width: 600px) {
  .academic-container { width: calc(100% - 40px); }
  .academic-hero { padding-block: 36px 28px; }
  .academic-hero h1 { font-size: 38px; }
  .academic-hero-statement { font-size: 22px; margin-top: 20px; }
  .academic-hero-description { font-size: var(--zh-body); }
  .academic-hero-actions { gap: 8px 20px; }
  .academic-index { gap: 0 20px; padding-block: 8px; }
  .academic-index > span { width: 100%; border-right: 0; margin: 3px 0 4px; }
  .academic-index a { font-size: var(--zh-support); }
  .academic-section { padding-block: 44px; }
  .academic-section-heading { align-items: start; flex-direction: column; gap: 6px; margin-bottom: 24px; padding-bottom: 16px; }
  .academic-section-heading h2 { font-size: 28px; }
  .academic-section-heading > .academic-text-link { min-height: 38px; }
  .academic-theme { display: flex; padding: 22px; }
  .academic-theme h3 { font-size: 24px; }
  .academic-theme > ul { padding-block: 16px; }
  .academic-theme-question { margin-top: 0; }
  .academic-application-line { flex-direction: column; align-items: start; gap: 10px; }
  .academic-project-rows { grid-template-columns: 1fr; gap: 22px; }
  .academic-project-rows article + article { border-left: 0; border-top: 1px solid #dce5eb; padding: 22px 0 0; }
  .academic-insight-grid { grid-template-columns: 1fr; gap: 24px; }
  .academic-insight + .academic-insight { border-left: 0; border-top: 1px solid #d4dce5; padding: 24px 0 0; }
  .academic-insight h3 { font-size: 25px; }
  .academic-people-grid { grid-template-columns: 1fr; }
  .academic-people-grid a { align-items: center; padding-block: 18px; }
  .academic-people-grid strong { font-size: 20px; }
  .academic-people-grid img { width: 70px; height: 84px; }
  .academic-contact { grid-template-columns: 1fr; padding: 26px 22px; gap: 22px; margin-bottom: 34px; }
  .academic-contact h2 { font-size: 28px; }
}
</style>
