import { computed, ref } from 'vue'

const currentLang = ref(localStorage.getItem('lang') || 'zh')

const messages = {
  zh: {
    nav: {
      highlights: "研究亮点",
      people: "人物",
      publications: "出版物",
      seminars: "研讨会",
      positions: "职位",
      gallery: "画廊",
      contact: "联系方式",
      toggle: "English"
    },
    home: {
      title: "CSMA Research Group",
      intro: "团队依托重庆邮电大学，并与新加坡南洋理工大学、北京大学、武汉大学、北京航空航天大学、西南大学等国内外高校与科研机构开展协同研究。围绕人工智能、智能软件工程与智能机器人三大方向，重点研究多智能体认知与协同机制、软件开发全流程的智能化方法，以及复杂环境下智能机器人的感知、决策与规划问题。",
      about: "关于我们",
      aboutDesc1: "CSMA Research Group 隶属于重庆邮电大学，致力于人工智能、智能软件工程与多智能体系统研究。团队长期与国内外顶尖高校保持深度科研合作，承担多项国家级与省部级科研项目，在人工智能顶会与核心期刊发表多篇高质量学术论文。",
      aboutDesc2: "实验室以“学术创新、产业落地、国际合作”为发展方向，培养具备前沿科研能力与工程实践能力的高素质人才，研究成果应用于智慧医疗、环境监测、智能机器人、软件工程自动化等多个重要领域。",
      project1: "国家级重点研发项目",
      project1Desc: "多智能体协同决策系统研究",
      project2: "省部级自然科学基金",
      project2Desc: "智能软件工程自动化技术",
      project3: "企业横向合作项目",
      project3Desc: "复杂环境机器人感知与控制",
      publications: "重点学术论文",
      research: "研究方向",
      ai: "人工智能",
      aiDesc: "多智能体认知、推理、协同与决策机制",
      se: "智能软件工程",
      seDesc: "代码生成、需求工程、软件智能分析",
      robot: "智能机器人",
      robotDesc: "感知、规划、控制与复杂环境适应",
      join: "加入我们",
      position1: "计算机科学与技术（学术型硕士）",
      position1Desc: "招收人工智能、智能软件工程、智能机器人方向硕士/博士研究生，欢迎优秀学子加入！",
      position2: "软件工程（学术型硕士）",
      position2Desc: "诚聘人工智能、软件工程领域博士后/科研助理，提供优厚待遇与国际化科研平台。",
      position3: "软件工程（专业型硕士）",
      position3Desc: "诚聘人工智能、软件工程领域博士后/科研助理，提供优厚待遇与国际化科研平台。",
      collaborators: "合作机构",
      contact: "联系方式"
    },
    en: {
      nav: {
        highlights: "Highlights",
        people: "People",
        publications: "Publications",
        seminars: "Seminars",
        positions: "Positions",
        gallery: "Gallery",
        contact: "Contact",
        toggle: "中文"
      }
    }
  },
  en: {
    nav: {
      highlights: "Highlights",
      people: "People",
      publications: "Publications",
      seminars: "Seminars",
      positions: "Positions",
      gallery: "Gallery",
      contact: "Contact",
      toggle: "中文"
    },
    home: {
      title: "CSMA Research Group",
      intro: "Based at Chongqing University of Posts and Telecommunications, we collaborate with Nanyang Technological University, Peking University, Wuhan University, Beihang University, Southwest University and other institutions. Our research focuses on AI, intelligent software engineering, and robotics, including multi-agent collaboration, automated software development, and robot perception & planning.",
      about: "About Us",
      aboutDesc1: "CSMA Research Group is affiliated with Chongqing University of Posts and Telecommunications. We specialize in artificial intelligence, intelligent software engineering, and multi-agent systems. We undertake multiple national and provincial research projects and publish in top-tier conferences and journals.",
      aboutDesc2: "We aim for academic innovation, industrial application, and global collaboration. We cultivate high-quality talents with cutting-edge research and engineering capabilities. Our research is applied in smart healthcare, environmental monitoring, intelligent robotics, and software engineering automation.",
      project1: "National Key R&D Program",
      project1Desc: "Multi-Agent Collaborative Decision-Making Systems",
      project2: "Provincial Natural Science Foundation",
      project2Desc: "Intelligent Software Engineering Automation",
      project3: "Enterprise Cooperation Project",
      project3Desc: "Robot Perception & Control in Complex Environments",
      publications: "Featured Publications",
      research: "Research Directions",
      ai: "Artificial Intelligence",
      aiDesc: "Multi-agent cognition, reasoning, collaboration & decision-making",
      se: "Intelligent Software Engineering",
      seDesc: "Code generation, requirements engineering, intelligent analysis",
      robot: "Intelligent Robotics",
      robotDesc: "Perception, planning, control & complex environment adaptation",
      join: "Join Us",
      position1: "Computer Science and Technology (Academic Master)",
      position1Desc: "We recruit master/Ph.D. students in AI, intelligent software engineering, and robotics. Welcome outstanding students!",
      position2: "Software Engineering (Academic Master)",
      position2Desc: "We invite applications for postdocs and research assistants in AI and software engineering.",
      position3: "Software Engineering (Professional Master)",
      position3Desc: "We offer opportunities for engineering-focused students and researchers in AI and software development.",
      collaborators: "Collaborators",
      contact: "Contact Us"
    }
  }
}

const toggleLang = () => {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('lang', currentLang.value)
}

const t = computed(() => messages[currentLang.value])

export function useI18n() {
  return {
    currentLang,
    toggleLang,
    t
  }
}