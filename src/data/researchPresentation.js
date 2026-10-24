export const researchAreaPresentation = Object.freeze({
  'artificial-intelligence': {
    title: 'Cognitive and Collaborative Intelligence',
    role: 'Core Intelligence',
  },
  'intelligent-software-engineering': {
    title: 'Intelligent Software Engineering',
    role: 'Research Domain',
  },
  'intelligent-robotics': {
    title: 'Intelligent Robotics',
    role: 'Research Domain',
  },
  'application-scenarios': {
    title: 'Application Scenarios',
    role: 'Practical Validation',
  },
  'multi-agent-cognitive-ai': {
    title: 'Multi-Agent and Collaborative Intelligence',
    role: 'Collaborative Mechanism',
  },
  'knowledge-human-loop-ai': {
    title: 'Knowledge and Human Feedback',
    role: 'Cross-cutting Support',
  },
})

// Presentation copy is intentionally separate from siteInfo so the original
// repository content remains available unchanged for compatibility and review.
export const researchNarrative = Object.freeze({
  description:
    'We study cognitive and collaborative intelligence for software, robotics, and real-world intelligent systems.',
  homepageVision:
    'Cognitive intelligence guides our work in intelligent software and robotics. We develop and evaluate these methods in practical scenarios, drawing on multi-agent collaboration, knowledge, and human feedback.',
  visionTitle:
    'Cognitive and collaborative intelligence for real-world systems.',
  vision:
    'We study how intelligent agents understand tasks, organize knowledge, reason, plan, and learn through memory, reflection, and feedback. We also investigate collaboration among agents, models, and people, exploring how knowledge sharing, complementary capabilities, and coordinated decisions can help solve complex problems.',
  visionApplications:
    'Our vision is to combine individual cognition with collective intelligence to build systems that understand goals, act collaboratively, and adapt to complex environments. Through methods, prototypes, and reproducible evaluation in intelligent software engineering, intelligent robotics, and their applications, we aim to connect fundamental research with real-world needs.',
})

export const homepageResearchAreaIds = [
  'artificial-intelligence',
  'intelligent-software-engineering',
  'intelligent-robotics',
  'application-scenarios',
]

export const supportingResearchAreaIds = [
  'multi-agent-cognitive-ai',
  'knowledge-human-loop-ai',
]

export const getResearchAreaDisplayTitle = (area) => (
  researchAreaPresentation[area?.id]?.title || area?.title || ''
)

export const getResearchAreaRole = (areaId) => (
  researchAreaPresentation[areaId]?.role || 'Research Direction'
)
