<template>
  <div class="contact-page">
    <!-- 全站统一 Hero 区域 -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">联系我们</span>
          <span v-show="isEnglish">Contact Us</span>
        </h1>
      </div>
    </section>

    <div class="container">
      <!-- 标题 -->
      <div class="page-header">
        <h2>
          <span v-show="!isEnglish">联系我们</span>
          <span v-show="isEnglish">Contact Us</span>
        </h2>
        <p class="page-subtitle">
          <span v-show="!isEnglish">联系方式</span>
          <span v-show="isEnglish">Contact Information</span>
        </p>
      </div>

      <!-- 联系方式卡片区域 -->
      <div class="contact-wrap">
        <div class="contact-item">
          <h3>
            <span v-show="!isEnglish">邮箱地址</span>
            <span v-show="isEnglish">Email</span>
          </h3>
          <p>huangjp@cqupt.edu.cn</p>
        </div>

        <div class="contact-item">
          <h3>
            <span v-show="!isEnglish">实验室地址</span>
            <span v-show="isEnglish">Lab Address</span>
          </h3>
          <p>
            <span v-show="!isEnglish">重庆市南岸区重庆邮电大学 计算机学院 / 人工智能学院</span>
            <span v-show="isEnglish">College of Computer Science / College of Artificial Intelligence, Chongqing University of Posts and Telecommunications, Nan'an District, Chongqing</span>
          </p>
        </div>

        <div class="contact-item">
          <h3>
            <span v-show="!isEnglish">所属单位</span>
            <span v-show="isEnglish">Affiliation</span>
          </h3>
          <p>
            <span v-show="!isEnglish">重庆邮电大学 CSMA 科研团队</span>
            <span v-show="isEnglish">CSMA Research Group, Chongqing University of Posts and Telecommunications</span>
          </p>
        </div>

        <div class="contact-item">
          <h3>
            <span v-show="!isEnglish">研究方向</span>
            <span v-show="isEnglish">Research Interests</span>
          </h3>
          <p>
            <span v-show="!isEnglish">人工智能 / 智能软件工程 / 多智能体系统 / 智能机器人</span>
            <span v-show="isEnglish">Artificial Intelligence / Intelligent Software Engineering / Multi-Agent Systems / Intelligent Robotics</span>
          </p>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="contact-footer">
        <p>
          <span v-show="!isEnglish">欢迎对实验室研究方向感兴趣的同学、学者与我们联系交流！</span>
          <span v-show="isEnglish">We welcome students and scholars interested in our research to contact us!</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 语言同步
const isEnglish = ref(false)
onMounted(() => {
  isEnglish.value = localStorage.getItem('lang') === 'en'
})
</script>

<style scoped>
/* 样式 100% 完全不变 */
.contact-page {
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

.page-header {
  text-align: center;
  margin-bottom: 50px;
}
.page-header h2 {
  font-size: 42px;
  font-weight: 600;
  color: #111;
  margin: 0 0 10px;
}
.page-subtitle {
  font-size: 18px;
  color: #666;
}

.contact-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.contact-item {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.contact-item h3 {
  font-size: 34px;
  color: #1a55c2;
  margin-bottom: 16px;
}
.contact-item p {
  font-size: 28px;
  color: #333;
  line-height: 1.7;
}

.contact-footer {
  text-align: center;
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  padding-top: 20px;
}
</style>