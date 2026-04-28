<template>
  <div class="people-page">
    <!-- 顶部背景 + 标题 -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">团队成员</span>
          <span v-show="isEnglish">People</span>
        </h1>
      </div>
    </section>

    <div class="container">

      <!-- ===================== 首席研究员 | 1 个 / 行 ===================== -->
      <div class="section">
        <h2 class="section-title">
          <span v-show="!isEnglish">首席研究员</span>
          <span v-show="isEnglish">Principal Investigator</span>
        </h2>
        <div class="grid pi-grid">
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'Principal Investigator | Lecturer / Master Supervisor' : '首席研究员 | 讲师 / 硕士生导师'"
            :bio="isEnglish
              ? 'Dr. Jiangping Huang, Postdoc, Supervisor of Master Students. Ph.D. from Wuhan University, Postdoc at Nanyang Technological University, Singapore. Research interests: Artificial Intelligence, Intelligent Software Engineering, Intelligent Robotics. Hosted 7 provincial-level projects, published nearly 20 papers, authorized more than 10 patents, and won Chongqing Science and Technology Progress Award.'
              : '黄江平，博士/博士后，硕士生导师。博士毕业于武汉大学，新加坡南洋理工大学博士后。研究方向：人工智能、智能软件工程、智能机器人。主持省部级项目7项，发表学术论文近20篇，申请国家发明专利10余项，获重庆市科技进步奖1项。'"
            email="huangjp@cqupt.edu.cn"
          />
        </div>
      </div>

      <!-- ===================== 研究员 | 2 个 / 行 ===================== -->
      <div class="section">
        <h2 class="section-title">
          <span v-show="!isEnglish">研究员</span>
          <span v-show="isEnglish">Research Fellows</span>
        </h2>
        <div class="grid fellow-grid">
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'Research Fellow' : '研究员'"
            :bio="isEnglish
              ? 'Ph.D. Research interests: multi-agent cognition, reasoning and collaboration, intelligent software engineering, robot perception and planning in complex environments.'
              : '博士，研究方向为多智能体认知、推理与协同机制，软件工程全流程智能化方法，复杂环境下机器人感知决策与规划。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'Research Fellow' : '研究员'"
            :bio="isEnglish
              ? 'Ph.D. Research interests: multi-agent cognition, reasoning and collaboration, intelligent software engineering, robot perception and planning in complex environments.'
              : '博士，研究方向为多智能体认知、推理与协同机制，软件工程全流程智能化方法，复杂环境下机器人感知决策与规划。'"
            email="huangjp@cqupt.edu.cn"
          />
        </div>
      </div>

      <!-- ===================== 博士生 | 3 个 / 行 ===================== -->
      <div class="section">
        <h2 class="section-title">
          <span v-show="!isEnglish">博士研究生</span>
          <span v-show="isEnglish">PhD Students</span>
        </h2>
        <div class="grid phd-grid">
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'PhD Student' : '博士研究生'"
            :bio="isEnglish
              ? 'Focus on AI, multi-agent systems, intelligent software engineering, complex dynamic system modeling and prediction.'
              : '专注于人工智能与多智能体系统、软件工程智能化、复杂动态系统建模与预测。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'PhD Student' : '博士研究生'"
            :bio="isEnglish
              ? 'Focus on AI, multi-agent systems, intelligent software engineering, complex dynamic system modeling and prediction.'
              : '专注于人工智能与多智能体系统、软件工程智能化、复杂动态系统建模与预测。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'PhD Student' : '博士研究生'"
            :bio="isEnglish
              ? 'Focus on AI, multi-agent systems, intelligent software engineering, complex dynamic system modeling and prediction.'
              : '专注于人工智能与多智能体系统、软件工程智能化、复杂动态系统建模与预测。'"
            email="huangjp@cqupt.edu.cn"
          />
        </div>
        <div class="grid phd-grid">
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'PhD Student' : '博士研究生'"
            :bio="isEnglish
              ? 'Focus on AI, multi-agent systems, intelligent software engineering, complex dynamic system modeling and prediction.'
              : '专注于人工智能与多智能体系统、软件工程智能化、复杂动态系统建模与预测。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'PhD Student' : '博士研究生'"
            :bio="isEnglish
              ? 'Focus on AI, multi-agent systems, intelligent software engineering, complex dynamic system modeling and prediction.'
              : '专注于人工智能与多智能体系统、软件工程智能化、复杂动态系统建模与预测。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'PhD Student' : '博士研究生'"
            :bio="isEnglish
              ? 'Focus on AI, multi-agent systems, intelligent software engineering, complex dynamic system modeling and prediction.'
              : '专注于人工智能与多智能体系统、软件工程智能化、复杂动态系统建模与预测。'"
            email="huangjp@cqupt.edu.cn"
          />
        </div>
      </div>

      <!-- ===================== 研究生 | 3 个 / 行 ===================== -->
      <div class="section">
        <h2 class="section-title">
          <span v-show="!isEnglish">硕士研究生</span>
          <span v-show="isEnglish">Master Students</span>
        </h2>
        <div class="grid master-grid">
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'Master Student' : '硕士研究生'"
            :bio="isEnglish
              ? 'Research interests: Artificial Intelligence, Multi-agent Collaboration, Intelligent Software Engineering, Robot Perception and Decision Making.'
              : '研究方向：人工智能、多智能体协同、智能软件工程、智能机器人感知与决策。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'Master Student' : '硕士研究生'"
            :bio="isEnglish
              ? 'Research interests: Artificial Intelligence, Multi-agent Collaboration, Intelligent Software Engineering, Robot Perception and Decision Making.'
              : '研究方向：人工智能、多智能体协同、智能软件工程、智能机器人感知与决策。'"
            email="huangjp@cqupt.edu.cn"
          />
          <PersonCard
            avatar="/src/assets/avatar-huang.png"
            :name="isEnglish ? 'Jiangping Huang' : '黄江平'"
            :title="isEnglish ? 'Master Student' : '硕士研究生'"
            :bio="isEnglish
              ? 'Research interests: Artificial Intelligence, Multi-agent Collaboration, Intelligent Software Engineering, Robot Perception and Decision Making.'
              : '研究方向：人工智能、多智能体协同、智能软件工程、智能机器人感知与决策。'"
            email="huangjp@cqupt.edu.cn"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import PersonCard from '../components/PersonCard.vue'
import { ref, onMounted, watch } from 'vue'

// 语言同步
const isEnglish = ref(false)
onMounted(() => {
  isEnglish.value = localStorage.getItem('lang') === 'en'
})

// 监听语言切换
watch(
  () => localStorage.getItem('lang'),
  () => {
    isEnglish.value = localStorage.getItem('lang') === 'en'
  }
)
</script>

<style scoped>
/* 样式 100% 完全不变 */
.people-page {
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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

.container {
  width: 70%;
  margin: 0 auto;
  padding: 80px 0;
}

.section {
  margin-bottom: 100px;
}
.section-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #222;
  text-align: center;
}

.grid {
  width: 100%;
  gap: 40px;
}

.pi-grid {
  display: flex;
  justify-content: center;
}

.fellow-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.phd-grid,
.master-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>