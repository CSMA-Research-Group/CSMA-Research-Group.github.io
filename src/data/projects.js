import kgmafFigure from '../assets/figures/kgmaf-framework.svg'
import tracecoderFigure from '../assets/figures/tracecoder-workflow.svg'

export const projects = [
  {
    id: 'tracecoder',
    title: 'TraceCoder',
    subtitle: 'Trace-Driven Multi-Agent Debugging and Repair',
    type: 'Research Prototype',
    status: 'Published / Research Prototype',
    description:
      'TraceCoder is a trace-driven multi-agent framework for automated debugging and repair of LLM-generated code. It emulates the human observe-analyze-repair debugging loop by combining runtime tracing, causal analysis, historical lesson learning, and rollback-based iterative repair.',
    homeSummary:
      'A trace-driven multi-agent framework for debugging and repairing LLM-generated code.',
    keyIdeas: [
      'Runtime tracing',
      'Instrumentation Agent',
      'Causal analysis',
      'Analysis Agent',
      'Repair Agent',
      'Historical Lesson Learning Mechanism',
      'Rollback-based iterative repair',
      'Automated repair of LLM-generated code',
    ],
    relatedPublicationIds: ['tracecoder-icse-2026'],
    relatedPublications: [
      'TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code',
    ],
    links: [
      {
        label: 'Code',
        url: 'https://github.com/CSMA-Research-Group/TraceCoder',
      },
      {
        label: 'DOI',
        url: 'https://doi.org/10.1145/3744916.3773187',
      },
    ],
    figure: {
      src: tracecoderFigure,
      alt: 'TraceCoder trace-driven multi-agent debugging workflow',
      caption: 'TraceCoder workflow for trace-driven multi-agent debugging.',
    },
    tags: [
      'Automated Debugging',
      'Program Repair',
      'Runtime Tracing',
      'Multi-Agent Systems',
      'Code Generation',
    ],
    featured: true,
  },
  {
    id: 'kgmaf',
    title: 'KGMAF / ChatREQ',
    subtitle: 'Knowledge-Guided Multi-Agent Requirements Engineering',
    type: 'Research Framework / System Prototype',
    status: 'Published / Prototype',
    description:
      'KGMAF is a knowledge-guided multi-agent framework for intelligent requirements development. It supports software requirements specification generation through role-specialized agents, shared artifacts, injected requirements knowledge, and human-in-the-loop review.',
    homeSummary:
      'A knowledge-guided multi-agent framework for requirements development and SRS generation.',
    keyIdeas: [
      'Role-specialized agents',
      'Shared artifact pool',
      'Knowledge injection',
      'Requirements elicitation',
      'Requirements analysis',
      'Requirements specification',
      'Requirements validation',
      'Human-in-the-loop review',
      'SRS generation',
    ],
    relatedPublicationIds: ['kgmaf-ase-2025'],
    relatedPublications: [
      'Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration',
    ],
    links: [
      {
        label: 'DOI',
        url: 'https://doi.org/10.1109/ASE63991.2025.00334',
      },
    ],
    linkPlaceholders: ['Project code link requires group confirmation before publication.'],
    figure: {
      src: kgmafFigure,
      alt: 'KGMAF knowledge-guided multi-agent requirements engineering framework',
      caption: 'KGMAF framework for knowledge-guided multi-agent requirements engineering.',
    },
    tags: [
      'Requirements Engineering',
      'Knowledge-Guided Reasoning',
      'Human-in-the-Loop',
      'SRS Generation',
      'Multi-Agent Collaboration',
    ],
    featured: true,
  },
  {
    id: 'repo-level-agents',
    title: 'Repository-Level Software Agents',
    subtitle: 'Code Generation, Debugging, and Repair for Evolving Codebases',
    type: 'Research Theme',
    status: 'Ongoing Direction',
    description:
      'This direction studies software agents that understand repository structure, preserve project conventions, generate scoped changes, and repair regressions with test and trace feedback.',
    keyIdeas: [
      'Repository indexing and context selection',
      'Change planning and scoped implementation',
      'Requirement-code-test alignment',
      'Trace-guided regression diagnosis',
      'Memory-guided maintenance workflows',
    ],
    relatedPublicationIds: ['tracecoder-icse-2026'],
    relatedPublications: [
      'TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code',
    ],
    links: [],
    linkPlaceholders: ['Repository-level prototype link to be added after confirmation.'],
    tags: ['Software Agents', 'Repository Intelligence', 'Code Generation', 'Debugging'],
    featured: false,
  },
  {
    id: 'embodied-intelligence',
    title: 'Embodied and Robotic Intelligence',
    subtitle: 'Planning, Control, and Human-Robot Collaboration',
    type: 'Ongoing Research Direction',
    status: 'Ongoing Direction',
    description:
      'This project theme explores how cognitive and collaborative AI mechanisms can support robotic perception, decision-making, task planning, control, and continuous evolution in complex environments.',
    keyIdeas: [
      'Robotic perception',
      'Decision-making under uncertainty',
      'Task planning and control',
      'Human-robot collaboration',
      'Embodied intelligence',
      'Continuous evolution of robotic systems',
    ],
    relatedPublicationIds: [],
    relatedPublications: [],
    links: [],
    linkPlaceholders: ['Representative robotics publications and prototype links are not yet confirmed.'],
    tags: ['Intelligent Robotics', 'Embodied Intelligence', 'Planning', 'Control'],
    featured: false,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
