<template>
  <div class="publications-page">
    <!-- 顶部全屏背景Banner -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">学术论文</span>
          <span v-show="isEnglish">Publications</span>
        </h1>
      </div>
    </section>

    <div class="container">
      <!-- 顶部标题区域 -->
      <div class="page-header">
        <h2>
          <span v-show="!isEnglish">所有出版物</span>
          <span v-show="isEnglish">All Publications</span>
        </h2>
        <p class="page-subtitle">CSMA Research Group</p>
      </div>

      <!-- 重点出版物 -->
      <div class="featured-section">
        <h2 class="section-title">
          <span v-show="!isEnglish">重点论文</span>
          <span v-show="isEnglish">Featured Publications</span>
        </h2>
        <div class="grid">
          <div class="card" @click="goTo('feature1')">
            <div class="card-img"></div>
            <h3>
              <span v-show="!isEnglish">气候智能预测中物理约束大模型的稳定性优化方法</span>
              <span v-show="isEnglish">Stability Optimization of Physics-Constrained LLMs for Climate Prediction</span>
            </h3>
            <p>Jiangping Huang, Jingyao Wu, Dai Wei • 2025</p>
          </div>
          <div class="card" @click="goTo('feature2')">
            <div class="card-img"></div>
            <h3>
              <span v-show="!isEnglish">面向复杂动态系统的机器学习物理混合建模方法研究</span>
              <span v-show="isEnglish">Physics-Machine Learning Hybrid Modeling for Complex Dynamical Systems</span>
            </h3>
            <p>Jiangping Huang, Xin Wang, Luwei Xiao • 2025</p>
          </div>
          <div class="card" @click="goTo('feature3')">
            <div class="card-img"></div>
            <h3>
              <span v-show="!isEnglish">仿生软体机器人环境自适应操控算法研究</span>
              <span v-show="isEnglish">Environment-Adaptive Control for Bio-Inspired Soft Robots</span>
            </h3>
            <p>Jiangping Huang, Rui Mao, Aishan Huoke • 2024</p>
          </div>
        </div>
      </div>

      <!-- 重点出版物详情 -->
      <div class="feature-details">
        <div id="feature1" class="detail-item">
          <h2>
            <a href="https://faculty.cqupt.edu.cn/hjp/zh_CN/index.htm" target="_blank">
              <span v-show="!isEnglish">气候智能预测中物理约束大模型的稳定性优化方法</span>
              <span v-show="isEnglish">Stability Optimization of Physics-Constrained LLMs for Climate Prediction</span>
            </a>
          </h2>
          <p>
            <span v-show="!isEnglish">针对气候预测场景，提出物理约束大模型训练与推理优化方案，显著提升极端天气预测稳定性与泛化能力。</span>
            <span v-show="isEnglish">We propose a physics-constrained LLM optimization method for climate prediction, significantly improving stability and generalization.</span>
          </p>
        </div>
        <div id="feature2" class="detail-item">
          <h2>
            <a href="https://faculty.cqupt.edu.cn/hjp/zh_CN/index.htm" target="_blank">
              <span v-show="!isEnglish">面向复杂动态系统的机器学习物理混合建模方法研究</span>
              <span v-show="isEnglish">Physics-Machine Learning Hybrid Modeling for Complex Dynamical Systems</span>
            </a>
          </h2>
          <p>
            <span v-show="!isEnglish">融合物理先验知识与深度学习，构建适用于动态系统的混合模型，提升模型可解释性与长期预测精度。</span>
            <span v-show="isEnglish">We integrate physical priors with deep learning to build hybrid models for dynamical systems, enhancing interpretability and long-term prediction.</span>
          </p>
        </div>
        <div id="feature3" class="detail-item">
          <h2>
            <a href="https://faculty.cqupt.edu.cn/hjp/zh_CN/index.htm" target="_blank">
              <span v-show="!isEnglish">仿生软体机器人环境自适应操控算法研究</span>
              <span v-show="isEnglish">Environment-Adaptive Control for Bio-Inspired Soft Robots</span>
            </a>
          </h2>
          <p>
            <span v-show="!isEnglish">基于章鱼仿生机制设计水下软体机器人自适应控制算法，实现复杂水下环境精准、稳定、柔性操控。</span>
            <span v-show="isEnglish">We design adaptive control for underwater soft robots based on octopus-inspired mechanisms, achieving precise and flexible manipulation.</span>
          </p>
        </div>
      </div>

      <!-- 排序 + 年份 + 搜索 -->
      <div class="filter-bar">
        <div class="filter-item">
          <label class="filter-label">
            <span v-show="!isEnglish">排序</span>
            <span v-show="isEnglish">Sort</span>
          </label>
          <el-select v-model="sortType" :placeholder="isEnglish ? 'Sort by' : '请选择排序方式'">
            <el-option :label="isEnglish ? 'Newest First' : '年份：最新先'" value="desc" />
            <el-option :label="isEnglish ? 'Oldest First' : '年份：最早先'" value="asc" />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">
            <span v-show="!isEnglish">年份</span>
            <span v-show="isEnglish">Year</span>
          </label>
          <el-select v-model="filterYear" :placeholder="isEnglish ? 'All Years' : '历年所有年份'">
            <el-option :label="isEnglish ? 'All Years' : '历年所有年份'" value="all" />
            <el-option v-for="y in yearList" :key="y" :label="y" :value="y" />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">
            <span v-show="!isEnglish">搜索</span>
            <span v-show="isEnglish">Search</span>
          </label>
          <el-input
            v-model="searchKey"
            :placeholder="isEnglish ? 'Search title, authors...' : '标题、作者、地点'"
            clearable
          />
        </div>
      </div>

      <!-- 总数 -->
      <div class="pub-count">
        <span v-show="!isEnglish">{{ filterPubList.length }} 篇出版物</span>
        <span v-show="isEnglish">{{ filterPubList.length }} Publications</span>
      </div>

      <!-- 论文列表 -->
      <div class="pub-list">
        <PublicationCard
          v-for="item in filterPubList"
          :key="item.id"
          :title="isEnglish ? item.titleEn : item.title"
          :url="pubBaseUrl"
          :authors="item.authors"
          :year="item.year"
          :cite="item.cite"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PublicationCard from '../components/PublicationCard.vue'

const pubBaseUrl = ref('https://faculty.cqupt.edu.cn/hjp/zh_CN/index.htm')

const goTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}

// 语言状态
const isEnglish = ref(false)
watch(
  () => localStorage.getItem('lang'),
  () => {
    isEnglish.value = localStorage.getItem('lang') === 'en'
  },
  { immediate: true }
)

// 筛选
const searchKey = ref('')
const sortType = ref('desc')
const filterYear = ref('all')

// 中英双语论文数据
const pubData = ref([
  { id: 1,
    title: 'OmniSapiens: 通过异质感知相对政策优化实现社会行为处理的基础模型',
    titleEn: 'OmniSapiens: A Foundation Model for Social Behavior via Heterogeneous Perception',
    authors: 'Jien Wang, Sabri Bugober, Luwei Xiao, et al.',
    year: '2026', cite: '2'
  },
  { id: 2,
    title: '时间滞后复发：一种基于数据的数据估算动力系统可预测性方法',
    titleEn: 'Time-Lag Recurrence: A Data-Driven Method for Predictability Estimation',
    authors: 'Chenyu Dong, Davide Faranda, Adriano Gualandi, Valerio Lucarini',
    year: '2025', cite: '1'
  },
  { id: 3,
    title: '面向复杂动态系统的机器学习物理混合建模方法研究',
    titleEn: 'Physics-Machine Learning Hybrid Modeling for Complex Dynamical Systems',
    authors: 'Jiangping Huang, Xin Wang, Luwei Xiao',
    year: '2025', cite: ''
  },
  { id: 4,
    title: '气候智能预测中物理约束大模型的稳定性优化方法',
    titleEn: 'Stability Optimization of Physics-Constrained LLMs for Climate Prediction',
    authors: 'Jiangping Huang, Jingyao Wu, Dai Wei',
    year: '2024', cite: '3'
  },
  { id: 5,
    title: '多智能体协同推理与软件工程全流程智能化方法',
    titleEn: 'Multi-Agent Collaborative Reasoning and Intelligent Software Engineering',
    authors: 'Jiangping Huang, Qu Ao, Luwei Xiao',
    year: '2024', cite: ''
  },
  { id: 6,
    title: '仿生软体机器人环境自适应操控算法研究',
    titleEn: 'Environment-Adaptive Control for Bio-Inspired Soft Robots',
    authors: 'Jiangping Huang, Rui Mao, Aishan Huoke',
    year: '2024', cite: '1'
  },
  { id: 7,
    title: '基于知识图谱的人工智能语义理解与认知决策模型',
    titleEn: 'Knowledge Graph-Based AI Semantic Understanding and Cognitive Decision',
    authors: 'Jiangping Huang, Sabri Bugober, Chanakiya Ekbot',
    year: '2023', cite: ''
  },
  { id: 8,
    title: '极端天气预测的混合机器学习气候模型构建与验证',
    titleEn: 'Hybrid ML Climate Models for Extreme Weather Prediction',
    authors: 'Jiangping Huang, Xin Wang, Gianmarco Mengal',
    year: '2023', cite: '2'
  },
  { id: 9,
    title: '智能软件工程中代码生成与缺陷检测一体化框架',
    titleEn: 'Unified Framework for Code Generation and Bug Detection in Intelligent SE',
    authors: 'Jiangping Huang, Paul Puliang, Qu Ao',
    year: '2023', cite: ''
  },
  { id: 10,
    title: '面向多模态数据融合的轻量化认知智能基础模型',
    titleEn: 'Lightweight Cognitive Foundation Models for Multimodal Fusion',
    authors: 'Jiangping Huang, Dai Wei, Luwei Xiao',
    year: '2022', cite: '1'
  },
])

const yearList = computed(() => {
  const years = [...new Set(pubData.value.map(item => item.year))]
  return years.sort((a, b) => b - a)
})

const filterPubList = computed(() => {
  let list = [...pubData.value]
  if (filterYear.value !== 'all') list = list.filter(item => item.year === filterYear.value)
  if (searchKey.value) {
    const key = searchKey.value.toLowerCase()
    list = list.filter(item =>
      item.title.toLowerCase().includes(key) ||
      item.titleEn?.toLowerCase().includes(key) ||
      item.authors.toLowerCase().includes(key)
    )
  }
  list.sort((a, b) => sortType.value === 'desc' ? b.year - a.year : a.year - b.year)
  return list
})
</script>

<style scoped>
/* 样式 100% 完全不变 */
.publications-page {
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
  width: 70%;
  margin: 0 auto;
  padding: 80px 0;
  background: #f8f9fa;
}

.page-header h2 {
  font-size: 42px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #111;
  text-align: center;
}
.page-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0 0 40px;
  text-align: center;
}

.featured-section {
  margin-bottom: 70px;
}
.section-title {
  font-size: 42px;
  text-align: center;
  margin-bottom: 40px;
  color: #222;
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
  font-size: 26px;
  margin: 24px 0 10px;
  color: #1a55c2;
  line-height: 1.4;
}
.card p {
  color: #666;
  padding-bottom: 24px;
  font-size: 22px;
}

.filter-bar {
  display: flex;
  align-items: flex-end;
  gap: 32px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.filter-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.filter-label {
  font-size: 30px;
  color: #222;
  font-weight: 500;
}
:deep(.el-select) { width: 400px; }
:deep(.el-input) { width: 850px; }
:deep(.el-select__wrapper), :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #d1d5db;
  height: 50px;
  font-size: 26px;
}

.pub-count {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
}

.pub-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 70px;
}

.feature-details {
  margin-top: 50px;
}
.detail-item {
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.detail-item h2 {
  font-size: 24px;
  margin: 0 0 16px;
  color: #1a55c2;
}
.detail-item a {
  color: #1a55c2;
  text-decoration: none;
}
.detail-item a:hover {
  text-decoration: underline;
}
.detail-item p {
  font-size: 17px;
  color: #444;
  line-height: 1.7;
  margin: 0;
}
</style>