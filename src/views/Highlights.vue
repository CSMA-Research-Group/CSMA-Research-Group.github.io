<template>
  <div class="home-page">
    <!-- 顶部背景 + 简介 -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="CSMA Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">研究亮点</span>
          <span v-show="isEnglish">Research Highlights</span>
        </h1>
      </div>
    </section>

    <!-- 研究成果卡片 -->
    <section class="research-highlights">
      <div class="container">
        <h2>
          <span v-show="!isEnglish">研究亮点</span>
          <span v-show="isEnglish">Research Highlights</span>
        </h2>
        <div class="grid">
          <!-- 卡片1 -->
          <div class="card" @click="goTo('project1')">
            <div class="card-img"></div>
            <h3>
              <span v-show="!isEnglish">基于地球气象数字孪生的预测与减灾研究</span>
              <span v-show="isEnglish">Prediction-to-Mitigation with Digital Twins of the Earth’s Weather</span>
            </h3>
            <p>
              <span v-show="!isEnglish">在气候变化背景下分析与预测极端天气事件。</span>
              <span v-show="isEnglish">Analysing and forecasting extreme weather events under climate change.</span>
            </p>
          </div>

          <!-- 卡片2 -->
          <div class="card" @click="goTo('project2')">
            <div class="card-img"></div>
            <h3>
              <span v-show="!isEnglish">面向可解释时序挖掘的领域知识驱动神经网络</span>
              <span v-show="isEnglish">Discipline-Informed Neural Networks for Interpretable Time-Series Discovery</span>
            </h3>
            <p>
              <span v-show="!isEnglish">为时序数据开发事后可解释性分析工具。</span>
              <span v-show="isEnglish">Developing post-hoc interpretability tools for sequential data.</span>
            </p>
          </div>

          <!-- 卡片3 -->
          <div class="card" @click="goTo('project3')">
            <div class="card-img"></div>
            <h3>
              <span v-show="!isEnglish">REBOT——水下机器人操控技术革新研究</span>
              <span v-show="isEnglish">REBOT – Rethinking Underwater Robot Manipulation</span>
            </h3>
            <p>
              <span v-show="!isEnglish">基于章鱼仿生的水下软体机器人操控策略。</span>
              <span v-show="isEnglish">Octopus-inspired underwater soft robot manipulation strategies.</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目1详情 -->
    <div id="project1" class="project-section">
      <div class="container">
        <div class="project-card">
          <div class="project-image">
            <div class="img-placeholder"></div>
          </div>
          <div class="project-header">
            <h1>
              <span v-show="!isEnglish">基于地球气象数字孪生的预测与减灾研究</span>
              <span v-show="isEnglish">Prediction-to-Mitigation with Digital Twins of the Earth’s Weather</span>
            </h1>
            <span class="badge">
              <span v-show="!isEnglish">进行中</span>
              <span v-show="isEnglish">Ongoing</span>
            </span>
          </div>
          <p class="desc">
            <span v-show="!isEnglish">
              本项目结合动力系统理论与深度学习技术，聚焦气候变化下极端天气事件的分析与预测，同时开展灾害风险评估，为防灾减灾策略制定提供科学支撑。
            </span>
            <span v-show="isEnglish">
              The project focuses on analysing and forecasting extreme weather events under climate change by blending dynamical system theory and deep learning technologies.
              It also aims to assess damages and inform mitigation strategies.
            </span>
          </p>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">相关论文</span>
              <span v-show="isEnglish">Publications</span>
            </h3>
            <p>A. Gualandi, D. Faranda, C. Marone, M. Cocco, G. Mengaldo, Deterministic and stochastic chaos characterize laboratory earthquakes, Earth and Planetary Science Letters (2023).</p>
            <p>C. Duong, V. C. Raghuram, A. Lee, R. Mao, G. Mengaldo, E. Cambria, Neurosymbolic AI for mining public opinions about wildfires, Cognitive Computation (2023).</p>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">资助单位</span>
              <span v-show="isEnglish">Sponsors</span>
            </h3>
            <div class="logo-row">
              <div>MOE Singapore</div>
            </div>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">合作单位</span>
              <span v-show="isEnglish">Collaborators</span>
            </h3>
            <div class="logo-row">
              <div>NUS</div>
              <div>ECMWF</div>
              <div>Argonne National Lab</div>
              <div>CNRS</div>
              <div>ENS</div>
              <div>Cambridge</div>
            </div>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">团队成员</span>
              <span v-show="isEnglish">People</span>
            </h3>
            <div class="people">
              <div>
                <h4>
                  <span v-show="!isEnglish">负责人</span>
                  <span v-show="isEnglish">PI</span>
                </h4>
                <p>Zhou Chenyu</p>
              </div>
              <div>
                <h4>
                  <span v-show="!isEnglish">研究员</span>
                  <span v-show="isEnglish">Researcher</span>
                </h4>
                <p>Xin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目2详情 -->
    <div id="project2" class="project-section">
      <div class="container">
        <div class="project-card">
          <div class="project-image">
            <div class="img-placeholder"></div>
          </div>
          <div class="project-header">
            <h1>
              <span v-show="!isEnglish">面向可解释时序挖掘的领域知识驱动神经网络</span>
              <span v-show="isEnglish">Discipline-Informed Neural Networks for Interpretable Time-Series Discovery</span>
            </h1>
            <span class="badge">
              <span v-show="!isEnglish">进行中</span>
              <span v-show="isEnglish">Ongoing</span>
            </span>
          </div>
          <p class="desc">
            <span v-show="!isEnglish">本项目针对时序与序列数据，构建神经网络事后可解释性分析方法与工具，提升模型透明性与可信度。</span>
            <span v-show="isEnglish">This project develops post-hoc interpretability tools for neural networks applied to time series and sequential data.</span>
          </p>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">相关论文</span>
              <span v-show="isEnglish">Publications</span>
            </h3>
            <p>H. Turbé, M. Bjelogrlic, C. Lovis, G. Mengaldo, Evaluation of post-hoc interpretability methods in time-series classification, Nature Machine Intelligence (2023).</p>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">资助单位</span>
              <span v-show="isEnglish">Sponsors</span>
            </h3>
            <div class="logo-row">
              <div>A*STAR</div>
              <div>MAECI</div>
            </div>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">合作单位</span>
              <span v-show="isEnglish">Collaborators</span>
            </h3>
            <div class="logo-row">
              <div>University of Geneva</div>
              <div>Sant'Anna</div>
              <div>Cambridge</div>
            </div>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">团队成员</span>
              <span v-show="isEnglish">People</span>
            </h3>
            <div class="people">
              <div>
                <h4>
                  <span v-show="!isEnglish">负责人</span>
                  <span v-show="isEnglish">PI</span>
                </h4>
                <p>Jiawen</p>
              </div>
              <div>
                <h4>
                  <span v-show="!isEnglish">成员</span>
                  <span v-show="isEnglish">Member</span>
                </h4>
                <p>Bayan</p>
                <p>Keane</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目3详情 -->
    <div id="project3" class="project-section">
      <div class="container">
        <div class="project-card">
          <div class="project-image">
            <div class="img-placeholder"></div>
          </div>
          <div class="project-header">
            <h1>
              <span v-show="!isEnglish">REBOT——水下机器人操控技术革新研究</span>
              <span v-show="isEnglish">REBOT – Rethinking Underwater Robot Manipulation</span>
            </h1>
            <span class="badge">
              <span v-show="!isEnglish">进行中</span>
              <span v-show="isEnglish">Ongoing</span>
            </span>
          </div>
          <p class="desc">
            <span v-show="!isEnglish">本项目结合建模、仿真与实验验证，探索基于章鱼仿生的水下软体机器人智能操控方法与环境适应策略。</span>
            <span v-show="isEnglish">REBOT explores octopus-inspired manipulation strategies in aquatic environments through modeling, simulation, and experimental validation.</span>
          </p>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">相关论文</span>
              <span v-show="isEnglish">Publications</span>
            </h3>
            <p>G. Mengaldo, F. Renda, S. Brunton, et al., A concise guide to modelling the physics of embodied intelligence in soft robotics, Nature Reviews Physics (2022).</p>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">资助单位</span>
              <span v-show="isEnglish">Sponsors</span>
            </h3>
            <div class="logo-row">
              <div>MOE Singapore</div>
            </div>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">合作单位</span>
              <span v-show="isEnglish">Collaborators</span>
            </h3>
            <div class="logo-row">
              <div>NUS</div>
            </div>
          </div>
          <div class="section-block">
            <h3>
              <span v-show="!isEnglish">团队成员</span>
              <span v-show="isEnglish">People</span>
            </h3>
            <div class="people">
              <div>
                <h4>
                  <span v-show="!isEnglish">联合负责人</span>
                  <span v-show="isEnglish">Co-PI</span>
                </h4>
                <p>Adamya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// 全局语言状态
const isEnglish = ref(false)

// 页面加载时读取语言
onMounted(() => {
  isEnglish.value = localStorage.getItem('lang') === 'en'
})

// 监听语言变化（关键！让切换后页面自动更新）
watch(
  () => localStorage.getItem('lang'),
  () => {
    isEnglish.value = localStorage.getItem('lang') === 'en'
  }
)

// 滚动跳转
const goTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* 样式 100% 完全不变 */
.home-page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100%;
  overflow-x: hidden;
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
  max-width: 1200px;
  text-align: center;
  color: white;
  text-shadow: 0 0 4px rgba(0,0,0,0.3);
}
.hero-content h1 {
  font-size: 64px;
  margin-bottom: 24px;
}
.lab-intro {
  font-size: 18px;
  line-height: 1.8;
}

.research-highlights {
  padding: 100px 20px;
  background: #f7f7f7;
}
.container {
  width: 70%;
  margin: 0 auto;
}
.research-highlights h2 {
  font-size: 42px;
  text-align: center;
  margin-bottom: 50px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.card-img {
  width: 100%;
  height: 180px;
  background-color: #d3e5ff;
}

.card h3,
.card p {
  padding: 0 28px;
}
.card h3 {
  font-size: 32px;
  margin: 24px 0 12px;
  color: #1a55c2;
}
.card p {
  color: #444;
  line-height: 1.6;
  padding-bottom: 28px;
  font-size: 28px;
}

.project-section {
  padding: 100px 20px;
  background: white;
  border-bottom: 1px solid #eee;
}
.project-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 0 0 30px;
  overflow: hidden;
}
.project-image {
  width: 100%;
  height: 380px;
  overflow: hidden;
}
.img-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  background-size: cover;
  background-position: center;
}
.project-header {
  padding: 40px 40px 0;
}
.project-header h1 {
  font-size: 52px;
  color: #111;
  margin-bottom: 16px;
}
.badge {
  display: inline-block;
  background: #eef5ff;
  color: #1a55c2;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 37px;
}
.desc {
  font-size: 30px;
  line-height: 1.8;
  color: #333;
  margin: 24px 40px 50px;
}
.section-block {
  margin: 0 30px 50px;
}
.section-block h3 {
  font-size: 44px;
  margin-bottom: 16px;
  color: #111;
}
.section-block p {
  font-size: 28px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 10px;
}
.logo-row {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.logo-row div {
  background: #f5f5f5;
  padding: 14px 20px;
  border-radius: 8px;
  font-weight: 500;
  color: #333;
  font-size: 24px;
}
.people {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}
.people h4 {
  font-size: 28px;
  color: #666;
  margin-bottom: 6px;
}
.people p {
  font-size: 29px;
  font-weight: 500;
  color: #111;
}
</style>