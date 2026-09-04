export const researchAreaPresentation = Object.freeze({
  'artificial-intelligence': {
    title: 'Cognitive Intelligence',
    role: 'Core intelligence',
  },
  'intelligent-software-engineering': {
    title: 'Intelligent Software Engineering',
    role: 'Primary carrier',
  },
  'intelligent-robotics': {
    title: 'Intelligent Robotics',
    role: 'Primary carrier',
  },
  'application-scenarios': {
    title: 'Application Scenarios',
    role: 'Grounding and validation',
  },
  'multi-agent-cognitive-ai': {
    title: 'Multi-Agent and Collaborative Intelligence',
    role: 'Collaborative mechanism',
  },
  'knowledge-human-loop-ai': {
    title: 'Knowledge and Human Feedback',
    role: 'Cross-cutting support',
  },
})

// Presentation copy is intentionally separate from siteInfo so the original
// repository content remains available unchanged for compatibility and review.
export const researchNarrative = Object.freeze({
  description:
    'We study cognitive and collaborative intelligence for software, robotics, and real-world intelligent systems.',
  vision:
    'Our research places cognitive intelligence at the core, with intelligent software and robotics as the primary carriers and application scenarios as the grounding for evaluation. Multi-agent collaboration, knowledge-guided reasoning, and human feedback support reliable, adaptive, and accountable intelligent systems across these areas.',
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
  researchAreaPresentation[areaId]?.role || 'Research direction'
)
