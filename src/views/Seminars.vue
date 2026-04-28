<template>
  <div class="seminars-page">
    <!-- 顶部Banner -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">学术研讨会</span>
          <span v-show="isEnglish">Seminars</span>
        </h1>
      </div>
    </section>

    <div class="container">
      <div class="page-header">
        <h2>
          <span v-show="!isEnglish">学术研讨会</span>
          <span v-show="isEnglish">Academic Seminars</span>
        </h2>
        <p class="page-subtitle">
          <span v-show="!isEnglish">CSMA 科研团队 · 学术讲座与研讨会</span>
          <span v-show="isEnglish">CSMA Research Group · Academic Lectures & Seminars</span>
        </p>
      </div>

      <!-- 卡片列表 -->
      <div class="seminar-list">
        <SeminarCard
          v-for="item in seminarData"
          :key="item.id"
          :title="isEnglish ? item.titleEn : item.title"
          :speaker="item.speaker"
          :position="isEnglish ? item.positionEn : item.position"
          :date="item.date"
          :time="item.time"
          :brief="isEnglish ? item.briefEn : item.brief"
          :abstract="isEnglish ? item.abstractEn : item.abstract"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SeminarCard from '../components/SeminarCard.vue'

// 语言同步（和全站统一）
const isEnglish = ref(false)
watch(
  () => localStorage.getItem('lang'),
  () => {
    isEnglish.value = localStorage.getItem('lang') === 'en'
  },
  { immediate: true }
)

// 双语数据（只在这里维护）
const seminarData = ref([
  {
    id: 1,
    title: '多智能体协同认知与动态系统建模学术研讨会',
    titleEn: 'Academic Seminar on Multi-Agent Collaboration & Dynamical System Modeling',
    speaker: 'Jiangping Huang',
    position: '首席研究员、硕士生导师',
    positionEn: 'Principal Investigator | Master Supervisor',
    date: 'May 15, 2026',
    time: '14:00 - 16:00',
    brief: '本次研讨会围绕多智能体协同推理、复杂动态系统物理建模、人工智能认知决策前沿方向展开交流，探讨实验室最新研究进展与未来合作方向。',
    briefEn: 'This seminar focuses on multi-agent reasoning, physical modeling of complex systems, and AI cognitive decision-making, sharing latest lab progress.',
    abstract: '本次报告将重点讲解异质智能体协同机制、物理约束深度学习建模方法，以及在气候预测、仿生机器人环境感知场景下的落地应用。内容涵盖认知智能基础理论、软件工程框架搭建、机器人操控算法优化，以及多领域场景化应用落地的全链路研究体系，同时开放师生交流与学术问答环节。',
    abstractEn: 'This talk introduces heterogeneous agent collaboration, physics-constrained deep learning, and applications in climate prediction & bio-inspired robots. It covers cognitive intelligence, software engineering frameworks, robot control algorithms, and opens Q&A for academic discussions.'
  },
  {
    id: 2,
    title: '气候智能预测与极端天气建模前沿研讨会',
    titleEn: 'Frontier Seminar on Climate Prediction & Extreme Weather Modeling',
    speaker: 'Jingyao Wu',
    position: '实验室研究员',
    positionEn: 'Research Fellow',
    date: 'Apr 22, 2026',
    time: '10:00 - 12:00',
    brief: '聚焦气候大模型、极端天气预测、环境智能分析相关前沿技术，分享物理约束AI模型在气象预测领域的研究成果。',
    briefEn: 'Focusing on climate large models, extreme weather prediction, and environmental intelligence, sharing physics-constrained AI research results.',
    abstract: '本次研讨会针对全球气候变化背景下的极端事件预测难题，讲解数据驱动模型与物理动力系统融合建模方案，对比不同轻量化大模型在气象时序预测中的性能差异，介绍气候数字孪生、风险预警与灾害缓解相关研究进展，探讨后续科研拓展方向。',
    abstractEn: 'This seminar addresses extreme event prediction under climate change, introducing hybrid modeling of data-driven and physical systems. It compares lightweight LLMs for weather prediction, presents climate digital twin & risk early warning research, and discusses future directions.'
  }
])
</script>

<style scoped>
.seminars-page {
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 100px;
  z-index: 1;
}
.hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
}
.hero-bg img {
  width: 100%; height: 100%; object-fit: cover;
}
.hero-content {
  max-width: 1000px;
  text-align: center;
  color: white;
  text-shadow: 0 0 4px rgba(0,0,0,0.3);
}
.hero-content h1 {
  font-size: 48px;
  margin-bottom: 24px;
}
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 60px 20px;
  background: #f8f9fa;
}
.page-header {
  text-align: center;
  margin-bottom: 50px;
}
.page-header h2 {
  font-size: 36px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #111;
}
.page-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.seminar-list {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>