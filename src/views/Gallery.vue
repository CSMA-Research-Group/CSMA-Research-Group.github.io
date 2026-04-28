<template>
  <div class="gallery-page">
    <!-- 全站统一Hero英雄区 -->
    <section class="hero">
      <div class="hero-bg">
        <img src="../assets/img_2.png" alt="Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">影像画廊</span>
          <span v-show="isEnglish">Gallery</span>
        </h1>
        <p class="lab-intro">
          <span v-show="!isEnglish">CSMA 科研团队 · 实验室活动影像、科研现场、学术交流图集</span>
          <span v-show="isEnglish">CSMA Research Group · Laboratory Activities, Research Scenes & Academic Exchange Gallery</span>
        </p>
      </div>
    </section>

    <div class="container">
      <div class="page-header">
        <h2>
          <span v-show="!isEnglish">影像画廊</span>
          <span v-show="isEnglish">Gallery</span>
        </h2>
        <p class="page-subtitle">
          <span v-show="!isEnglish">实验室活动与科研影像集</span>
          <span v-show="isEnglish">Laboratory Gallery & Activity Collection</span>
        </p>
      </div>

      <div class="gallery-grid">
        <div class="gallery-item" v-for="item in galleryData" :key="item.id">
          <img :src="item.imgSrc" :alt="isEnglish ? item.descEn : item.desc" class="gallery-img" loading="lazy" />
          <div class="gallery-caption">
            {{ isEnglish ? item.descEn : item.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const img1 = new URL('../assets/风景图/1.jpg', import.meta.url).href
const img2 = new URL('../assets/风景图/2.jpg', import.meta.url).href
const img3 = new URL('../assets/风景图/3.jpg', import.meta.url).href
const img4 = new URL('../assets/风景图/4.jpg', import.meta.url).href
const img5 = new URL('../assets/风景图/5.jpg', import.meta.url).href
const img6 = new URL('../assets/风景图/6.jpg', import.meta.url).href
const img7 = new URL('../assets/风景图/7.jpg', import.meta.url).href
const img8 = new URL('../assets/风景图/8.jpg', import.meta.url).href

// 语言同步
const isEnglish = ref(false)
onMounted(() => {
  isEnglish.value = localStorage.getItem('lang') === 'en'
})

const galleryData = [
  {
    id: 1,
    imgSrc: img1,
    desc: '实验室学术研讨会现场交流',
    descEn: 'Academic Seminar & Discussion in the Lab'
  },
  {
    id: 2,
    imgSrc: img2,
    desc: '国际科研合作线上会议',
    descEn: 'Online Meeting for International Research Collaboration'
  },
  {
    id: 3,
    imgSrc: img3,
    desc: '仿生机器人实验测试现场',
    descEn: 'Bio-inspired Robot Experiment & Testing'
  },
  {
    id: 4,
    imgSrc: img4,
    desc: '气候智能建模科研工作汇报',
    descEn: 'Research Presentation on Climate Intelligent Modeling'
  },
  {
    id: 5,
    imgSrc: img5,
    desc: '多智能体系统课题研讨',
    descEn: 'Multi-Agent System Research Discussion'
  },
  {
    id: 6,
    imgSrc: img6,
    desc: '实验室团队日常科研交流',
    descEn: 'Daily Research Communication of Lab Team'
  },
  {
    id: 7,
    imgSrc: img7,
    desc: '软件工程前沿技术分享会',
    descEn: 'Cutting-edge Technology Sharing in Software Engineering'
  },
  {
    id: 8,
    imgSrc: img8,
    desc: '水下软体机器人实验记录',
    descEn: 'Underwater Soft Robot Experiment Recording'
  }
]
</script>

<style scoped>
/* 样式 100% 完全不变 */
.gallery-page {
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
.lab-intro {
  font-size: 18px;
  line-height: 1.8;
}

.container {
  width: 70%;
  margin: 0 auto;
  padding: 80px 0;
  background: #f8f9fa;
}

.page-header {
  text-align: center;
  margin-bottom: 70px;
}
.page-header h2 {
  font-size: 42px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #111;
}
.page-subtitle {
  font-size: 18px;
  color: #666;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 40px;
}

.gallery-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}
.gallery-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.gallery-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.gallery-caption {
  padding: 22px;
  font-size: 28px;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin: 0;
}
</style>