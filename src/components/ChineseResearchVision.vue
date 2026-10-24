<template>
  <figure class="chinese-vision" aria-label="CSMA 中文研究愿景">
    <InteractiveResearchVision :image-src="visionImage" :animated="false" ambient-motion :show-mobile-links="false" />
    <figcaption class="chinese-vision-caption">
      <span>以知识与人类反馈连接认知、软件、机器人与实际应用。</span>
      <ImageViewer :src="visionImage" title="CSMA 研究愿景" alt="认知与协同智能：连接人工智能、智能软件工程、智能机器人与应用场景，以知识与人类反馈为支撑。" />
    </figcaption>
    <nav v-if="!compact" class="chinese-vision-topics" aria-label="探索图中的研究方向">
      <RouterLink v-for="(area, index) in areas" :key="area.id" :to="`/research#${area.id}`">
        <span class="vision-topic-index" aria-hidden="true">0{{ index + 1 }}</span>
        <span><strong>{{ t(getResearchAreaDisplayTitle(area)) }}</strong><small>{{ t(area.keyTopics.slice(0, 2).join(' · ')) }}</small></span>
        <span class="vision-topic-arrow" aria-hidden="true">↗</span>
      </RouterLink>
    </nav>
  </figure>
</template>

<script setup>
import InteractiveResearchVision from './InteractiveResearchVision.vue'
import ImageViewer from './ImageViewer.vue'
import RouterLink from './LocaleLink.vue'
import visionImage from '../assets/figures/csma-research-vision-zh-v2.png'
import { coreResearchAreas as areas } from '../data/researchAreas'
import { getResearchAreaDisplayTitle } from '../data/researchPresentation'
import { t } from '../i18n'
defineProps({ compact: Boolean })
</script>

<style scoped>
.chinese-vision { min-width: 0; width: 100%; margin: 0; }
.chinese-vision :deep(.vision-wrap) { border: 1px solid #d1e0ea; border-radius: 10px; overflow: hidden; background: #eff6fa; box-shadow: 0 16px 45px -32px #24547c70; }
.chinese-vision-caption { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px 2px 14px; color: var(--zh-body-ink); font-size: var(--zh-meta); line-height: 1.7; }
.chinese-vision-topics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 24px; }
.chinese-vision-topics > a { display: flex; align-items: start; gap: 10px; padding: 12px 0; border-top: 1px solid #d9e4ec; text-decoration: none; color: var(--color-navy); }
.vision-topic-index { color: #4a7288; font-size: var(--zh-meta); line-height: 1.9; font-variant-numeric: tabular-nums; }
.chinese-vision-topics strong { display: block; font-size: var(--zh-support); line-height: 1.6; }
.chinese-vision-topics small { display: block; margin-top: 4px; font-size: var(--zh-meta); line-height: 1.75; color: var(--zh-body-ink); }
.vision-topic-arrow { margin-left: auto; color: #7098ac; }
.chinese-vision-topics a:hover strong { color: var(--color-blue); }
@media (max-width: 560px) {
  .chinese-vision-caption { flex-wrap: wrap; gap: 5px 16px; }
  .chinese-vision-topics { gap: 0 14px; }
  .chinese-vision-topics > a { gap: 7px; }
  .chinese-vision-topics strong { font-size: var(--zh-support); }
  .chinese-vision-topics small { font-size: var(--zh-meta); }
}
</style>
