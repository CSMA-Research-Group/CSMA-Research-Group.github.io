<template>
  <div class="home-page">

    <!-- 1. 顶部英雄区 -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="CSMA Background" />
      </div>

      <!-- 动态提示 -->
      <div class="hero-notice">
        <span class="notice-dot"></span>
        <span v-show="!isEnglish">主页持续更新中，内容仅供参考</span>
        <span v-show="isEnglish">Homepage is under active update. Content for reference only.</span>
      </div>

      <div class="hero-content">
        <h1>CSMA Research Group</h1>
        <p class="lab-intro">
          <span v-show="!isEnglish">团队依托重庆邮电大学，并与新加坡南洋理工大学、北京大学、武汉大学、北京航空航天大学、西南大学等国内外高校与科研机构开展协同研究。围绕人工智能、智能软件工程与智能机器人三大方向，重点研究多智能体认知与协同机制、软件开发全流程的智能化方法，以及复杂环境下智能机器人的感知、决策与规划问题。</span>
          <span v-show="isEnglish">Based at Chongqing University of Posts and Telecommunications, we collaborate with Nanyang Technological University, Peking University, Wuhan University, Beihang University, Southwest University and other institutions. Our research focuses on AI, intelligent software engineering, and robotics, including multi-agent collaboration, automated software development, and robot perception & planning.</span>
        </p>
      </div>
    </section>

    <!-- 2. 关于我们 About Us -->
    <section class="about-section">
      <div class="container">
        <h1>
          <span v-show="!isEnglish">关于我们</span>
          <span v-show="isEnglish">About Us</span>
        </h1>
        <div class="about-content">
          <p>
            <span v-show="!isEnglish">CSMA Research Group 隶属于重庆邮电大学，致力于人工智能、智能软件工程与多智能体系统研究。团队长期与国内外顶尖高校保持深度科研合作，承担多项国家级与省部级科研项目，在人工智能顶会与核心期刊发表多篇高质量学术论文。</span>
            <span v-show="isEnglish">CSMA Research Group is affiliated with Chongqing University of Posts and Telecommunications. We specialize in artificial intelligence, intelligent software engineering, and multi-agent systems. We undertake multiple national and provincial research projects and publish in top-tier conferences and journals.</span>
          </p>
          <p>
            <span v-show="!isEnglish">实验室以“学术创新、产业落地、国际合作”为发展方向，培养具备前沿科研能力与工程实践能力的高素质人才，研究成果应用于智慧医疗、环境监测、智能机器人、软件工程自动化等多个重要领域。</span>
            <span v-show="isEnglish">We aim for academic innovation, industrial application, and global collaboration. We cultivate high-quality talents with cutting-edge research and engineering capabilities. Our research is applied in smart healthcare, environmental monitoring, intelligent robotics, and software engineering automation.</span>
          </p>
        </div>

        <div class="projects-row">
          <div class="project-item">
            <h3>
              <span v-show="!isEnglish">国家级重点研发项目</span>
              <span v-show="isEnglish">National Key R&D Program</span>
            </h3>
            <p>
              <span v-show="!isEnglish">多智能体协同决策系统研究</span>
              <span v-show="isEnglish">Multi-Agent Collaborative Decision-Making Systems</span>
            </p>
          </div>
          <div class="project-item">
            <h3>
              <span v-show="!isEnglish">省部级自然科学基金</span>
              <span v-show="isEnglish">Provincial Natural Science Foundation</span>
            </h3>
            <p>
              <span v-show="!isEnglish">智能软件工程自动化技术</span>
              <span v-show="isEnglish">Intelligent Software Engineering Automation</span>
            </p>
          </div>
          <div class="project-item">
            <h3>
              <span v-show="!isEnglish">企业横向合作项目</span>
              <span v-show="isEnglish">Enterprise Cooperation Project</span>
            </h3>
            <p>
              <span v-show="!isEnglish">复杂环境机器人感知与控制</span>
              <span v-show="isEnglish">Robot Perception & Control in Complex Environments</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 重点学术论文 -->
    <section class="publications-section">
      <div class="container">
        <h2>
          <span v-show="!isEnglish">重点学术论文</span>
          <span v-show="isEnglish">Featured Publications</span>
        </h2>
        <el-row :gutter="30" class="pub-row">
          <el-col :xs="24" :sm="12" :md="8">
            <el-card class="pub-card" shadow="hover">
              <template #header><span>Multi-Agent Collaborative Reinforcement Learning</span></template>
              <div class="pub-img"><img src="https://picsum.photos/seed/paper1/600/300" alt="paper"></div>
              <div class="pub-author">
                <span v-show="!isEnglish">AAAI 2024 | 人工智能顶会</span>
                <span v-show="isEnglish">AAAI 2024 | Top AI Conference</span>
              </div>
              <p class="pub-desc">
                <span v-show="!isEnglish">提出一种新型多智能体协同强化学习框架，实现复杂环境下的分布式决策优化。</span>
                <span v-show="isEnglish">A novel multi-agent collaborative reinforcement learning framework for distributed decision optimization in complex environments.</span>
              </p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-card class="pub-card" shadow="hover">
              <template #header><span>Deep Learning for Software Defect Detection</span></template>
              <div class="pub-img"><img src="https://picsum.photos/seed/paper2/600/300" alt="paper"></div>
              <div class="pub-author">
                <span v-show="!isEnglish">IEEE TSE 2023 | 软件工程顶刊</span>
                <span v-show="isEnglish">IEEE TSE 2023 | Top SE Journal</span>
              </div>
              <p class="pub-desc">
                <span v-show="!isEnglish">基于深度学习的软件缺陷检测方法，大幅提升代码缺陷识别准确率与效率。</span>
                <span v-show="isEnglish">Deep learning-based software defect detection method to improve accuracy and efficiency.</span>
              </p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-card class="pub-card" shadow="hover">
              <template #header><span>Visual Perception for Autonomous Robots</span></template>
              <div class="pub-img"><img src="https://picsum.photos/seed/paper3/600/300" alt="paper"></div>
              <div class="pub-author">
                <span v-show="!isEnglish">ICRA 2023 | 机器人顶会</span>
                <span v-show="isEnglish">ICRA 2023 | Top Robotics Conference</span>
              </div>
              <p class="pub-desc">
                <span v-show="!isEnglish">面向自主机器人的视觉感知算法，实现复杂场景下的精准目标检测与跟踪。</span>
                <span v-show="isEnglish">Visual perception for autonomous robots to achieve accurate detection and tracking.</span>
              </p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 4. 研究方向 -->
    <section class="research-directions">
      <div class="container">
        <h2>
          <span v-show="!isEnglish">研究方向</span>
          <span v-show="isEnglish">Research Directions</span>
        </h2>
        <div class="dir-grid">
          <div class="dir-card">
            <h3>
              <span v-show="!isEnglish">人工智能</span>
              <span v-show="isEnglish">Artificial Intelligence</span>
            </h3>
            <p>
              <span v-show="!isEnglish">多智能体认知、推理、协同与决策机制</span>
              <span v-show="isEnglish">Multi-agent cognition, reasoning, collaboration & decision-making</span>
            </p>
          </div>
          <div class="dir-card">
            <h3>
              <span v-show="!isEnglish">智能软件工程</span>
              <span v-show="isEnglish">Intelligent Software Engineering</span>
            </h3>
            <p>
              <span v-show="!isEnglish">代码生成、需求工程、软件智能分析</span>
              <span v-show="isEnglish">Code generation, requirements engineering, intelligent analysis</span>
            </p>
          </div>
          <div class="dir-card">
            <h3>
              <span v-show="!isEnglish">智能机器人</span>
              <span v-show="isEnglish">Intelligent Robotics</span>
            </h3>
            <p>
              <span v-show="!isEnglish">感知、规划、控制与复杂环境适应</span>
              <span v-show="isEnglish">Perception, planning, control & complex environment adaptation</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 加入我们 -->
    <section class="join-us-section">
      <div class="container">
        <h2>
          <span v-show="!isEnglish">加入我们</span>
          <span v-show="isEnglish">Join Us</span>
        </h2>
        <div class="join-grid">
          <div class="join-card" @click="goToPositions('id1')">
            <h3>
              <span v-show="!isEnglish">计算机科学与技术（学术型硕士）</span>
              <span v-show="isEnglish">Computer Science and Technology (Academic Master)</span>
            </h3>
            <p class="join-desc">
              <span v-show="!isEnglish">招收人工智能、智能软件工程、智能机器人方向硕士/博士研究生，欢迎优秀学子加入！</span>
              <span v-show="isEnglish">We recruit master/Ph.D. students in AI, intelligent software engineering, and robotics. Welcome outstanding students!</span>
            </p>
          </div>
          <div class="join-card" @click="goToPositions('id2')">
            <h3>
              <span v-show="!isEnglish">软件工程（学术型硕士）</span>
              <span v-show="isEnglish">Software Engineering (Academic Master)</span>
            </h3>
            <p class="join-desc">
              <span v-show="!isEnglish">诚聘人工智能、软件工程领域博士后/科研助理，提供优厚待遇与国际化科研平台。</span>
              <span v-show="isEnglish">We invite applications for postdocs and research assistants in AI and software engineering.</span>
            </p>
          </div>
          <div class="join-card" @click="goToPositions('id3')">
            <h3>
              <span v-show="!isEnglish">软件工程（专业型硕士）</span>
              <span v-show="isEnglish">Software Engineering (Professional Master)</span>
            </h3>
            <p class="join-desc">
              <span v-show="!isEnglish">诚聘人工智能、软件工程领域博士后/科研助理，提供优厚待遇与国际化科研平台。</span>
              <span v-show="isEnglish">We offer opportunities for engineering-focused students and researchers in AI and software development.</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. 合作机构 -->
    <section class="collaborators-section">
      <div class="container">
        <h2>
          <span v-show="!isEnglish">合作机构</span>
          <span v-show="isEnglish">Collaborators</span>
        </h2>
        <div class="logo-grid">
          <div class="logo-item"><span>Chongqing University of Posts and Telecommunications</span></div>
          <div class="logo-item"><span>Nanyang Technological University</span></div>
          <div class="logo-item"><span>Peking University</span></div>
          <div class="logo-item"><span>Wuhan University</span></div>
          <div class="logo-item"><span>Beihang University</span></div>
          <div class="logo-item"><span>Southwest University</span></div>
        </div>
      </div>
    </section>

    <!-- 7. 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>CSMA Research Group @ Chongqing University of Posts and Telecommunications</p>
        <p>Contact: xxx@cqupt.edu.cn</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const router = useRouter()

// 👇 关键：读取本地语言状态，和导航栏同步
const isEnglish = ref(false)

onMounted(() => {
  isEnglish.value = localStorage.getItem('lang') === 'en'
})

const goToPositions = (anchor) => {
  router.push(`/positions#${anchor}`)
}
</script>

<style scoped>
/* 你的样式 100% 不变 */
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
.hero-notice {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(255,255,255,0.14);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.notice-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.8); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
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
  font-size: 52px;
  margin-bottom: 24px;
}
.lab-intro {
  font-size: 20px;
  line-height: 1.8;
}
.container {
  width: 70%;
  margin: 0 auto;
  padding: 0 20px;
}
.about-section {
  padding: 100px 0;
  background: #f9f9f9;
  text-align: center;
}
.about-section h1 {
  font-size: 44px;
  margin-bottom: 40px;
}
.about-content {
  max-width: 1200px;
  margin: 0 auto 60px;
  font-size: 30px;
  line-height: 1.8;
  color: #333;
  text-align: left;
}
.projects-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;
}
.project-item {
  background: white;
  padding: 40px 50px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-width: 280px;
}
.project-item h3 {
  font-size: 32px;
  color: #1a55c2;
  margin-bottom: 10px;
}
.project-item p {
  color: #555;
  font-size: 28px;
}
.publications-section {
  padding: 100px 0;
  background: #fff;
  font-size: 22px;
}
.publications-section h2 {
  font-size: 42px;
  text-align: center;
  margin-bottom: 50px;
}
.pub-row {
  max-width: 100%;
  margin: 0 auto;
}
.pub-card {
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}
.pub-card:hover {
  transform: translateY(-5px);
}
.pub-img {
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
}
.pub-img img {
  width: 100%; height: 100%; object-fit: cover;
}
.pub-author {
  font-size: 26px;
  color: #1a55c2;
  font-weight: 500;
  margin-bottom: 12px;
}
.pub-desc {
  font-size: 27px;
  line-height: 1.7;
  color: #555;
  margin: 0;
}
.research-directions {
  padding: 100px 0;
  background: #f9f9f9;
  text-align: center;
}
.research-directions h2 {
  font-size: 42px;
  margin-bottom: 50px;
}
.dir-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}
.dir-card {
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.dir-card h3 {
  font-size: 34px;
  margin-bottom: 15px;
  color: #1a55c2;
}
.dir-card p {
  font-size: 28px;
}
.join-us-section {
  padding: 100px 0;
  background: #fff;
  text-align: center;
}
.join-us-section h2 {
  font-size: 42px;
  margin-bottom: 50px;
}
.join-card {
  flex: 1;
  min-width: 280px;
  background: #f5f7fa;
  padding: 45px 40px;
  border-radius: 16px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}
.join-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
.join-card h3 {
  font-size: 32px;
  color: #1a1a1a;
  margin-bottom: 12px;
}
.join-desc {
  font-size: 27px;
  line-height: 1.6;
  color: #555;
  margin: 0;
}
.collaborators-section {
  padding: 100px 0;
  background: #f9f9f9;
  text-align: center;
}
.collaborators-section h2 {
  font-size: 42px;
  margin-bottom: 50px;
}
.logo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  align-items: center;
}
.logo-item {
  background: white;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
.footer {
  background: #1a1a1a;
  color: white;
  padding: 60px 0;
  text-align: center;
}
</style>