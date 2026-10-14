<template>
  <div class="content-page chinese-notice-page" lang="zh-CN">
    <header class="page-hero narrow">
      <p class="eyebrow" lang="en">Chinese edition</p>
      <h1>中文版</h1>
      <p>正在建设中，敬请期待。</p>
    </header>
    <section class="section language-notice" aria-label="返回英文版">
      <p>目前可访问完整的英文网站，了解研究组的最新动态、研究工作与团队信息。</p>
      <RouterLink class="text-link" :to="returnTarget">返回英文版 <span lang="en">EN</span> →</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { englishReturnTarget } from '../data/language'
const route = useRoute()
const returnTarget = computed(() => englishReturnTarget(route.query.from))
</script>
