<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-bg">
        <img :src="heroImg" alt="CSMA Background" />
      </div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <p class="eyebrow">CSMA Research Group</p>
        <h1>
          <span v-show="!isEnglish">研究领域</span>
          <span v-show="isEnglish">Research Highlights</span>
        </h1>
        <p class="hero-desc">
          <span v-show="!isEnglish">研究领域涵盖人工智能、智能软件工程与智能机器人，聚焦认知驱动的理论创新、关键技术突破与系统应用落地。</span>
          <span v-show="isEnglish">Advancing cognition-driven multi-agent collaboration and intelligent software engineering.</span>
        </p>
      </div>
    </section>

    <section class="research-highlights">
      <div class="container">
        <div class="section-title">
          <p class="eyebrow">
            <span v-show="!isEnglish">科研方向</span>
            <span v-show="isEnglish">Research Areas</span>
          </p>
          <h2>
            <span v-show="!isEnglish">研究亮点</span>
            <span v-show="isEnglish">Research Highlights</span>
          </h2>
        </div>

        <div class="grid">
          <div class="card" @click="goTo('project1')">
            <div class="card-img gradient-one"></div>
            <div class="card-body">
              <h3>
                <span v-show="!isEnglish">认知驱动多智能体协同</span>
                <span v-show="isEnglish">Cognition-Driven Multi-Agent Collaboration</span>
              </h3>
              <p>
                <span v-show="!isEnglish">研究具备推理、记忆、反思与协作能力的多智能体系统。</span>
                <span v-show="isEnglish">Studying multi-agent systems with reasoning, memory, reflection, and collaboration.</span>
              </p>
            </div>
          </div>

          <div class="card" @click="goTo('project2')">
            <div class="card-img gradient-two"></div>
            <div class="card-body">
              <h3>
                <span v-show="!isEnglish">智能需求工程</span>
                <span v-show="isEnglish">Intelligent Requirements Engineering</span>
              </h3>
              <p>
                <span v-show="!isEnglish">面向需求获取、分析、建模与规约生成的智能化方法研究。</span>
                <span v-show="isEnglish">Intelligent methods for requirement elicitation, analysis, modeling, and specification generation.</span>
              </p>
            </div>
          </div>

          <div class="card" @click="goTo('project3')">
            <div class="card-img gradient-three"></div>
            <div class="card-body">
              <h3>
                <span v-show="!isEnglish">代码生成与自调试修复</span>
                <span v-show="isEnglish">Code Generation and Self-Debugging</span>
              </h3>
              <p>
                <span v-show="!isEnglish">基于运行轨迹、因果分析与历史经验的代码生成和自动修复研究。</span>
                <span v-show="isEnglish">Trace-driven code generation and automated repair with causal analysis and historical learning.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="project1" class="project-section">
      <ProjectBlock
        :isEnglish="isEnglish"
        zh-title="认知驱动多智能体协同"
        en-title="Cognition-Driven Multi-Agent Collaboration"
        zh-desc="本方向面向可信人工智能系统，研究认知驱动的多智能体协同机制，重点关注任务分解、角色协作、共享记忆、反思推理与协同决策。"
        en-desc="This direction studies cognition-driven multi-agent collaboration for trustworthy AI systems, focusing on task decomposition, role coordination, shared memory, reflective reasoning, and collaborative decision-making."
        :publications="[
          'TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code, ICSE 2026.',
          'Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration, ASE 2025.'
        ]"
        :people="['Zhou Chenyu', 'Xin']"
      />
    </section>

    <section id="project2" class="project-section alt">
      <ProjectBlock
        :isEnglish="isEnglish"
        zh-title="智能需求工程"
        en-title="Intelligent Requirements Engineering"
        zh-desc="本方向围绕需求获取、需求理解、需求建模与需求规约生成，探索知识引导、多智能体协作与人在回路相结合的智能化需求工程方法。"
        en-desc="This direction explores knowledge-guided, multi-agent, and human-in-the-loop methods for requirement elicitation, understanding, modeling, and specification generation."
        :publications="[
          'Knowledge-Guided Multi-Agent Collaboration for Intelligent Requirements Engineering.',
          'Cognition-in-the-Loop Requirement Generation Framework.'
        ]"
        :people="['Jiawen', 'Bayan', 'Keane']"
      />
    </section>

    <section id="project3" class="project-section">
      <ProjectBlock
        :isEnglish="isEnglish"
        zh-title="代码生成与自调试修复"
        en-title="Code Generation and Self-Debugging"
        zh-desc="本方向研究大语言模型生成代码的自动调试、自修复与可靠性提升，重点关注运行轨迹分析、错误定位、因果推理、历史经验学习与回滚机制。"
        en-desc="This direction studies automated debugging, self-repair, and reliability improvement for LLM-generated code, focusing on runtime trace analysis, fault localization, causal reasoning, historical learning, and rollback mechanisms."
        :publications="[
          'TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code, ICSE 2026.',
          'RepoCoder: Context-Aware and Memory-Enhanced Repository-Level Code Generation.'
        ]"
        :people="['Adamya', 'Research Team']"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineComponent, h } from 'vue'
import heroImg from '@/assets/img_2.png'

const isEnglish = ref(false)

const updateLang = () => {
  isEnglish.value = localStorage.getItem('lang') === 'en'
}

onMounted(() => {
  updateLang()
  window.addEventListener('storage', updateLang)
  window.addEventListener('lang-change', updateLang)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', updateLang)
  window.removeEventListener('lang-change', updateLang)
})

const goTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const ProjectBlock = defineComponent({
  props: {
    isEnglish: Boolean,
    zhTitle: String,
    enTitle: String,
    zhDesc: String,
    enDesc: String,
    publications: Array,
    people: Array
  },
  setup(props) {
    return () =>
      h('div', { class: 'container' }, [
        h('div', { class: 'project-card' }, [
          h('div', { class: 'project-visual' }),
          h('div', { class: 'project-content' }, [
            h('div', { class: 'project-header' }, [
              h('div', [
                h('p', { class: 'eyebrow' }, props.isEnglish ? 'Ongoing Project' : '进行中项目'),
                h('h1', props.isEnglish ? props.enTitle : props.zhTitle)
              ]),
              h('span', { class: 'badge' }, props.isEnglish ? 'Ongoing' : '进行中')
            ]),
            h('p', { class: 'desc' }, props.isEnglish ? props.enDesc : props.zhDesc),
            h('div', { class: 'section-block' }, [
              h('h3', props.isEnglish ? 'Publications' : '相关论文'),
              ...props.publications.map((item) => h('p', { class: 'paper' }, item))
            ]),
            h('div', { class: 'section-block' }, [
              h('h3', props.isEnglish ? 'People' : '团队成员'),
              h(
                'div',
                { class: 'people' },
                props.people.map((name) => h('span', name))
              )
            ])
          ])
        ])
      ])
  }
})
</script>

<style scoped>
.home-page {
  width: 100%;
  overflow-x: hidden;
  color: #111827;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #ffffff;
}

.container {
  width: min(1180px, 92%);
  margin: 0 auto;
}

.hero {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 120px 20px 96px;
  overflow: hidden;
}

.hero-bg,
.hero-bg img,
.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.62));
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 960px;
  text-align: center;
  color: #ffffff;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #2563eb;
  font-weight: 700;
}

.hero-content .eyebrow {
  color: rgba(255, 255, 255, 0.82);
}

.hero-content h1 {
  margin: 0;
  font-size: clamp(42px, 6vw, 72px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.hero-desc {
  max-width: 760px;
  margin: 22px auto 0;
  font-size: clamp(16px, 2vw, 22px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.research-highlights {
  padding: 96px 0;
  background: #f8fafc;
}

.section-title {
  text-align: center;
  margin-bottom: 48px;
}

.section-title h2 {
  margin: 0;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.card {
  background: #ffffff;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  border-color: #bfdbfe;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.12);
}

.card-img {
  height: 180px;
}

.gradient-one {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
}

.gradient-two {
  background: linear-gradient(135deg, #7c3aed, #60a5fa);
}

.gradient-three {
  background: linear-gradient(135deg, #0f766e, #67e8f9);
}

.card-body {
  padding: 26px;
}

.card h3 {
  margin: 0 0 14px;
  font-size: 22px;
  line-height: 1.35;
  color: #0f172a;
}

.card p {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: #475569;
}

.project-section {
  padding: 88px 0;
  background: #ffffff;
}

.project-section.alt {
  background: #f8fafc;
}

.project-card {
  display: grid;
  grid-template-columns: 38% 62%;
  overflow: hidden;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}

.project-visual {
  min-height: 420px;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.38), transparent 28%),
    linear-gradient(135deg, #1d4ed8, #06b6d4);
}

.project-content {
  padding: 44px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 22px;
}

.project-header h1 {
  margin: 0;
  font-size: clamp(28px, 3.2vw, 44px);
  line-height: 1.22;
  letter-spacing: -0.03em;
}

.badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 14px;
  font-weight: 700;
}

.desc {
  margin: 0 0 34px;
  font-size: 18px;
  line-height: 1.85;
  color: #334155;
}

.section-block {
  margin-top: 30px;
}

.section-block h3 {
  margin: 0 0 14px;
  font-size: 22px;
  color: #0f172a;
}

.paper {
  margin: 0 0 10px;
  padding-left: 14px;
  border-left: 3px solid #dbeafe;
  font-size: 15.5px;
  line-height: 1.75;
  color: #475569;
}

.people {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.people span {
  display: inline-flex;
  padding: 9px 14px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-card {
    grid-template-columns: 1fr;
  }

  .project-visual {
    min-height: 260px;
  }
}

@media (max-width: 720px) {
  .hero {
    min-height: 68vh;
    padding: 96px 18px 70px;
  }

  .research-highlights,
  .project-section {
    padding: 64px 0;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .card-img {
    height: 150px;
  }

  .card-body {
    padding: 22px;
  }

  .card h3 {
    font-size: 20px;
  }

  .card p {
    font-size: 15px;
  }

  .project-content {
    padding: 28px 22px;
  }

  .project-header {
    flex-direction: column;
    gap: 14px;
  }

  .desc {
    font-size: 16px;
  }
}
</style>