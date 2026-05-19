const items = [
  {
    id: 'icse-2026-rio',
    date: '2026-04-12',
    title: 'CSMA members attended ICSE 2026 in Rio de Janeiro, Brazil',
    description:
      'Our group attended the 48th IEEE/ACM International Conference on Software Engineering (ICSE 2026) in Rio de Janeiro, Brazil, from April 12 to 18, 2026. We presented our paper, "TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code." TraceCoder introduces a collaborative multi-agent debugging framework that emulates the observe-analyze-repair workflow of human experts by combining runtime tracing, causal analysis, historical lesson learning, and rollback-based iterative repair.',
    tag: 'Conference',
    type: 'International Conference',
    location: 'Rio de Janeiro, Brazil',
    venue: 'ICSE 2026',
    paperTitle:
      'TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code',
  },
  {
    id: 'ase-2025-seoul',
    date: '2025-11-16',
    title: 'CSMA members attended ASE 2025 in Seoul, South Korea',
    description:
      'Our group attended the 40th IEEE/ACM International Conference on Automated Software Engineering (ASE 2025) in Seoul, South Korea, from November 16 to 20, 2025. We presented our paper, "Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration," which proposes KGMAF, a knowledge-guided multi-agent framework for intelligent requirements development. The work explores how role-specialized agents, shared artifact pools, knowledge injection, and human-in-the-loop mechanisms can support the generation and validation of high-quality software requirements specifications.',
    tag: 'Conference',
    type: 'International Conference',
    location: 'Seoul, South Korea',
    venue: 'ASE 2025',
    paperTitle:
      'Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration',
  },
]

export const newsItems = items.sort((a, b) => new Date(b.date) - new Date(a.date))
