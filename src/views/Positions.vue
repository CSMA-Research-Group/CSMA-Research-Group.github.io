<template>
  <div class="positions-page">
    <!-- 全站统一Hero英雄区 -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/src/assets/img_2.png" alt="Background" />
      </div>
      <div class="hero-content">
        <h1>
          <span v-show="!isEnglish">加入我们</span>
          <span v-show="isEnglish">Join Us</span>
        </h1>
        <p class="lab-intro">
          <span v-show="!isEnglish">CSMA 科研团队 · 诚邀优秀科研学子加入我们的研究团队</span>
          <span v-show="isEnglish">CSMA Research Group · We are looking for outstanding students to join our research team</span>
        </p>
      </div>
    </section>

    <div class="container">
      <!-- 页面正文标题 -->
      <div class="page-header">
        <h2>
          <span v-show="!isEnglish">招生招聘信息</span>
          <span v-show="isEnglish">Admissions & Open Positions</span>
        </h2>
        <p class="page-subtitle">
          <span v-show="!isEnglish">招生与招聘详情</span>
          <span v-show="isEnglish">Admissions & Open Positions</span>
        </p>
      </div>

      <!-- 职位卡片列表 -->
      <div class="position-list">
        <!-- 职位1：计算机科学与技术 学硕 -->
        <div id="id1" class="position-card">
          <h3>
            <span v-show="!isEnglish">计算机科学与技术（学术型硕士）</span>
            <span v-show="isEnglish">Computer Science and Technology (Academic Master)</span>
          </h3>
          <div class="position-desc">
            <p>
              <span v-show="!isEnglish">招收人工智能、智能软件工程、智能机器人方向硕士/博士研究生，欢迎优秀学子加入！</span>
              <span v-show="isEnglish">We recruit master/Ph.D. students in AI, intelligent software engineering, and robotics. Welcome to join us!</span>
            </p>
            <div class="detail-content">
              <h4>
                <span v-show="!isEnglish">研究方向</span>
                <span v-show="isEnglish">Research Interests</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">认知智能与大模型语义理解、知识图谱推理</li>
                <li v-show="isEnglish">Cognitive Intelligence, LLM Semantic Understanding, Knowledge Graph Reasoning</li>
                <li v-show="!isEnglish">复杂动态系统、气候智能预测与环境建模</li>
                <li v-show="isEnglish">Complex Dynamic Systems, Climate Prediction & Environmental Modeling</li>
                <li v-show="!isEnglish">仿生软体机器人、水下机器人操控与智能感知</li>
                <li v-show="isEnglish">Bio-inspired Soft Robots, Underwater Robot Manipulation & Perception</li>
              </ul>

              <h4>
                <span v-show="!isEnglish">申请要求</span>
                <span v-show="isEnglish">Requirements</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">计算机、自动化、软件工程、人工智能等相关专业背景</li>
                <li v-show="isEnglish">Background in CS, Automation, Software Engineering, AI, etc.</li>
                <li v-show="!isEnglish">具备良好数理基础、编程能力与科研探索热情</li>
                <li v-show="isEnglish">Good math, programming skills, and research enthusiasm</li>
                <li v-show="!isEnglish">对AI、机器人、系统建模方向有明确科研兴趣优先</li>
                <li v-show="isEnglish">Strong interests in AI, robotics, or system modeling are preferred</li>
              </ul>

              <h4>
                <span v-show="!isEnglish">联系方式</span>
                <span v-show="isEnglish">Contact</span>
              </h4>
              <p>
                <span v-show="!isEnglish">请发送个人简历、本科成绩单、科研简介至导师邮箱，后续安排沟通面试</span>
                <span v-show="isEnglish">Please send your CV, transcript, and research statement to the supervisor’s email. Interviews will be arranged later.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- 职位2：软件工程 学硕 -->
        <div id="id2" class="position-card">
          <h3>
            <span v-show="!isEnglish">软件工程（学术型硕士）</span>
            <span v-show="isEnglish">Software Engineering (Academic Master)</span>
          </h3>
          <div class="position-desc">
            <p>
              <span v-show="!isEnglish">诚聘人工智能、软件工程领域博士后/科研助理，提供优厚待遇与国际化科研平台。</span>
              <span v-show="isEnglish">We invite applications for Postdoc/Research Assistant positions in AI and Software Engineering with competitive salaries.</span>
            </p>
            <div class="detail-content">
              <h4>
                <span v-show="!isEnglish">研究方向</span>
                <span v-show="isEnglish">Research Interests</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">智能软件工程、代码生成与缺陷检测系统</li>
                <li v-show="isEnglish">Intelligent Software Engineering, Code Generation, Bug Detection</li>
                <li v-show="!isEnglish">云端微服务架构、底层系统框架开发</li>
                <li v-show="isEnglish">Cloud Microservices, Infrastructure Framework Development</li>
                <li v-show="!isEnglish">面向科研场景的AI工具链与平台化开发</li>
                <li v-show="isEnglish">AI Toolchain & Platform Development for Research</li>
              </ul>

              <h4>
                <span v-show="!isEnglish">申请要求</span>
                <span v-show="isEnglish">Requirements</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">具备软件工程、计算机系统相关博士学历/科研经历</li>
                <li v-show="isEnglish">Ph.D. or research experience in SE or Computer Systems</li>
                <li v-show="!isEnglish">熟悉系统架构开发、后端工程化开发优先</li>
                <li v-show="isEnglish">Familiar with system architecture or backend development is preferred</li>
                <li v-show="!isEnglish">具备独立科研能力、论文写作与项目统筹能力</li>
                <li v-show="isEnglish">Independent research, paper writing, and project management skills</li>
              </ul>

              <h4>
                <span v-show="!isEnglish">岗位福利</span>
                <span v-show="isEnglish">Benefits</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">完善的薪酬体系、五险一金、高校科研福利</li>
                <li v-show="isEnglish">Competitive salary, social insurance, university benefits</li>
                <li v-show="!isEnglish">国际学术交流、论文发表、课题项目支持</li>
                <li v-show="isEnglish">Support for academic exchange, publication, and projects</li>
                <li v-show="!isEnglish">实验室国际化合作平台，丰富的交流资源</li>
                <li v-show="isEnglish">International collaboration platform and resources</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 职位3：软件工程 专硕 -->
        <div id="id3" class="position-card">
          <h3>
            <span v-show="!isEnglish">软件工程（专业型硕士）</span>
            <span v-show="isEnglish">Software Engineering (Professional Master)</span>
          </h3>
          <div class="position-desc">
            <p>
              <span v-show="!isEnglish">诚聘人工智能、软件工程领域博士后/科研助理，提供优厚待遇与国际化科研平台。</span>
              <span v-show="isEnglish">We invite applications for Postdoc/Research Assistant positions in AI and Software Engineering with competitive salaries.</span>
            </p>
            <div class="detail-content">
              <h4>
                <span v-show="!isEnglish">研究方向</span>
                <span v-show="isEnglish">Research Interests</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">AI应用落地、行业数字化场景开发</li>
                <li v-show="isEnglish">AI Application, Industry Digitalization</li>
                <li v-show="!isEnglish">前端工程化、科研官网与交互系统开发</li>
                <li v-show="isEnglish">Frontend Engineering, Research Website & Interactive Systems</li>
                <li v-show="!isEnglish">智能算法应用、嵌入式与工程化落地开发</li>
                <li v-show="isEnglish">Intelligent Algorithm, Embedded & Engineering Development</li>
              </ul>

              <h4>
                <span v-show="!isEnglish">申请要求</span>
                <span v-show="isEnglish">Requirements</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">计算机、软件工程、电子信息等相关专业背景</li>
                <li v-show="isEnglish">Background in CS, SE, Electronic Information, etc.</li>
                <li v-show="!isEnglish">具备项目开发能力，熟悉前端/后端开发优先</li>
                <li v-show="isEnglish">Project development experience; frontend/backend skills preferred</li>
                <li v-show="!isEnglish">注重工程实践能力，具备良好的学习与执行力</li>
                <li v-show="isEnglish">Strong engineering practice, learning and execution abilities</li>
              </ul>

              <h4>
                <span v-show="!isEnglish">培养方案</span>
                <span v-show="isEnglish">Training Program</span>
              </h4>
              <ul>
                <li v-show="!isEnglish">校企联合实践、科研项目工程化落地训练</li>
                <li v-show="isEnglish">University-enterprise practice & engineering training</li>
                <li v-show="!isEnglish">完整的工程开发能力培养，贴合行业就业需求</li>
                <li v-show="isEnglish">Comprehensive engineering training for industry needs</li>
                <li v-show="!isEnglish">导师全程指导，课题项目与实习机会对接</li>
                <li v-show="isEnglish">Full supervision by supervisors, projects & internships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

// 锚点滚动
onMounted(() => {
  const anchor = window.location.hash.slice(1)
  if (anchor) {
    const targetDom = document.getElementById(anchor)
    if (targetDom) {
      targetDom.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
})
</script>

<style scoped>
/* 样式 100% 完全不变 */
.positions-page {
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
  margin: 0;
}

.position-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.position-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.position-card h3 {
  font-size: 38px;
  font-weight: 600;
  color: #1a55c2;
  margin: 0 0 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.position-desc > p {
  font-size: 38px;
  color: #444;
  margin: 0 0 36px;
  line-height: 1.7;
}

.detail-content h4 {
  font-size: 32px;
  font-weight: 600;
  color: #222;
  margin: 36px 0 14px;
}

.detail-content ul {
  margin: 0;
  padding-left: 24px;
}
.detail-content li {
  font-size: 26px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 10px;
}
.detail-content p {
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  margin: 0;
}
</style>