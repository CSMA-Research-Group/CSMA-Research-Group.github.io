import kgmafFigure from '../assets/figures/kgmaf-framework.svg'
import tracecoderFigure from '../assets/figures/tracecoder-workflow.svg'

export const researchAreas = [
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    summary:
      'We study the cognitive, reasoning, planning, memory, and collaboration mechanisms that allow intelligent agents to solve complex tasks with humans and with other agents.',
    motivation:
      'Modern AI systems need more than one-shot generation. Reliable agents must reason over goals, inspect their own uncertainty, use knowledge, remember previous failures, and coordinate actions with other agents and humans.',
    keyTopics: [
      'Multi-agent cognition',
      'Reasoning and planning',
      'Agent collaboration',
      'Memory and reflection',
      'Knowledge-guided reasoning',
      'Metacognitive AI',
      'Trustworthy and reliable AI systems',
    ],
    keyQuestions: [
      'How can agents represent goals, evidence, and uncertainty across multiple reasoning steps?',
      'How can memory and reflection prevent repeated failures in long-running tasks?',
      'How can multi-agent collaboration produce reliable behavior without amplifying errors?',
    ],
    methods: [
      'Role-specialized agent design',
      'Knowledge and memory injection',
      'Planning, critique, and recovery loops',
      'Human-AI collaboration protocols',
      'Trace and artifact driven evaluation',
    ],
    representativeSystems: ['TraceCoder', 'KGMAF / ChatREQ'],
    relatedPublicationIds: ['tracecoder-icse-2026', 'kgmaf-ase-2025'],
    relatedProjectIds: ['tracecoder', 'kgmaf'],
    expectedImpact:
      'This direction builds the cognitive foundation for reliable AI systems that can reason, collaborate, recover from errors, and support real technical work.',
  },
  {
    id: 'intelligent-software-engineering',
    title: 'Intelligent Software Engineering',
    summary:
      'We build intelligent methods for requirements analysis, code generation, automated debugging, program repair, reverse engineering, and requirement-code-test alignment.',
    motivation:
      'Software development is a knowledge-intensive process where requirements, code, tests, traces, and human decisions must stay aligned. LLM-based tools become more useful when they can reason over this full artifact chain rather than treating coding as isolated text generation.',
    keyTopics: [
      'Intelligent requirements engineering',
      'Requirements elicitation and analysis',
      'Requirement specification generation',
      'Requirement-code-test alignment',
      'Code generation',
      'Automated debugging and repair',
      'Software reverse engineering',
      'Repository-level software agents',
      'Trace-driven software intelligence',
    ],
    keyQuestions: [
      'How can rough stakeholder intent become precise, reviewable, and traceable specifications?',
      'How can generated code be debugged with runtime evidence rather than only pass/fail outcomes?',
      'How can software agents preserve repository conventions while making large, evolving changes?',
    ],
    methods: [
      'Knowledge-guided requirements modeling',
      'Artifact-mediated multi-agent collaboration',
      'Runtime instrumentation and causal analysis',
      'Automated repair with rollback and historical lesson learning',
      'Traceability modeling across requirements, code, tests, and execution traces',
    ],
    representativeSystems: ['KGMAF / ChatREQ', 'TraceCoder', 'Repository-Level Software Agents'],
    relatedPublicationIds: ['kgmaf-ase-2025', 'tracecoder-icse-2026'],
    relatedProjectIds: ['kgmaf', 'tracecoder', 'repo-level-agents'],
    expectedImpact:
      'The expected outcome is a maintainable software intelligence stack that supports requirements development, code generation, debugging, repair, and evidence-based review.',
  },
  {
    id: 'intelligent-robotics',
    title: 'Intelligent Robotics',
    summary:
      'We explore how cognitive intelligence and multi-agent coordination can support robotic perception, decision-making, planning, control, human-robot collaboration, and embodied intelligence.',
    motivation:
      'Robotic systems operate in open and changing environments. They need to ground goals in perception and action, adapt plans when conditions change, and communicate uncertainty to humans.',
    keyTopics: [
      'Robotic perception',
      'Decision-making',
      'Task planning',
      'Control',
      'Human-robot collaboration',
      'Embodied intelligence',
      'Continuous evolution of robotic systems',
    ],
    keyQuestions: [
      'How can natural-language tasks be transformed into executable robotic goals and constraints?',
      'How should embodied agents recover when perception, plans, or execution fail?',
      'How can human feedback guide robotic behavior without requiring constant manual intervention?',
    ],
    methods: [
      'Language-to-goal modeling',
      'Planning and control under constraints',
      'Simulation-based validation',
      'Human-robot feedback loops',
      'Experience memory for continuous adaptation',
    ],
    representativeSystems: ['Embodied and Robotic Intelligence'],
    relatedPublicationIds: [],
    relatedProjectIds: ['embodied-intelligence'],
    expectedImpact:
      'This is an ongoing direction. The goal is to connect CSMA work on cognition, planning, and collaboration with embodied agents that operate in realistic task environments.',
  },
  {
    id: 'application-scenarios',
    title: 'Application Scenarios',
    summary:
      'We emphasize system prototypes, experimental validation, and engineering deployment for AI, intelligent software engineering, and intelligent robotics in real-world settings.',
    motivation:
      'Research systems must be tested in practical workflows where incomplete information, evolving artifacts, cost limits, and human review all matter.',
    keyTopics: [
      'Research prototypes',
      'Real-world software engineering systems',
      'Intelligent requirements platforms',
      'AI-assisted coding and debugging systems',
      'Robotic and embodied task scenarios',
      'Applied intelligent systems',
    ],
    keyQuestions: [
      'Which application workflows benefit most from multi-agent and knowledge-guided intelligence?',
      'How can prototypes expose useful evidence for human review and system improvement?',
      'How should research artifacts be packaged so other groups can evaluate, reproduce, and extend them?',
    ],
    methods: [
      'Prototype-driven research',
      'Case studies with structured artifacts',
      'Benchmark and trace based evaluation',
      'Human-in-the-loop validation',
      'Public release of code, data, and documentation when confirmed',
    ],
    representativeSystems: ['TraceCoder', 'KGMAF / ChatREQ'],
    relatedPublicationIds: ['tracecoder-icse-2026', 'kgmaf-ase-2025'],
    relatedProjectIds: ['tracecoder', 'kgmaf'],
    expectedImpact:
      'This direction keeps the group focused on usable intelligent systems that can be inspected, evaluated, maintained, and transferred to practical scenarios.',
  },
  {
    id: 'multi-agent-cognitive-ai',
    title: 'Multi-Agent and Cognitive AI',
    summary:
      'We investigate the shared mechanisms behind CSMA systems: role-specialized agents, shared artifacts, knowledge, memory, reflection, runtime feedback, and human-in-the-loop control.',
    motivation:
      'Both TraceCoder and KGMAF show that difficult tasks can be decomposed into specialized agents whose collaboration is mediated by evidence-bearing artifacts.',
    keyTopics: [
      'Role-specialized agents',
      'Artifact-mediated collaboration',
      'Memory and reflection',
      'Runtime feedback',
      'Human-in-the-loop control',
      'Agent communication protocols',
    ],
    keyQuestions: [
      'What collaboration structures are appropriate for requirements, debugging, repair, robotics, and other technical tasks?',
      'How can agents share artifacts without losing semantic consistency?',
      'When should systems rely on autonomous iteration, and when should humans intervene?',
    ],
    methods: [
      'Blackboard-style artifact pools',
      'Observe-analyze-repair loops',
      'Agent role and responsibility modeling',
      'Structured prompts, schemas, and validation checks',
      'Failure memory and reflective planning',
    ],
    representativeSystems: ['TraceCoder', 'KGMAF / ChatREQ'],
    relatedPublicationIds: ['tracecoder-icse-2026', 'kgmaf-ase-2025'],
    relatedProjectIds: ['tracecoder', 'kgmaf'],
    expectedImpact:
      'The expected impact is a reusable design language for multi-agent systems that can be adapted across software, robotic, and real-world AI workflows.',
  },
  {
    id: 'knowledge-human-loop-ai',
    title: 'Knowledge-Guided and Human-in-the-Loop AI',
    summary:
      'We study how domain knowledge, standards, expert heuristics, human feedback, and quality checks can make generative AI more trustworthy in software and applied intelligent systems.',
    motivation:
      'Generative systems can produce fluent but incorrect outputs. Injecting domain knowledge and routing human feedback into the workflow are essential for requirements quality, software reliability, and trustworthy generation.',
    keyTopics: [
      'Knowledge injection',
      'Requirements knowledge and standards',
      'Human feedback',
      'Quality checking',
      'Trustworthy generation',
      'Reliable software systems',
    ],
    keyQuestions: [
      'How can structured domain knowledge constrain and guide LLM-based agents?',
      'How can human review be integrated without overloading users?',
      'How can generated artifacts be checked for consistency, traceability, and correctness?',
    ],
    methods: [
      'Knowledge extraction from projects, literature, standards, and experts',
      'Prompt and retrieval based knowledge injection',
      'Checklist and rule based validation',
      'Human review and revision loops',
      'Traceability matrices and artifact consistency checks',
    ],
    representativeSystems: ['KGMAF / ChatREQ', 'TraceCoder'],
    relatedPublicationIds: ['kgmaf-ase-2025', 'tracecoder-icse-2026'],
    relatedProjectIds: ['kgmaf', 'tracecoder'],
    expectedImpact:
      'This direction supports AI systems that remain accountable to human intent, domain constraints, and verifiable evidence.',
  },
]

export const researchHighlights = [
  {
    id: 'tracecoder-highlight',
    title: 'Trace-Driven Multi-Agent Debugging',
    projectId: 'tracecoder',
    publicationId: 'tracecoder-icse-2026',
    summary:
      'TraceCoder combines runtime instrumentation, causal analysis, historical lesson learning, and rollback-based repair to debug LLM-generated code through a coordinated multi-agent loop.',
    figure: {
      src: tracecoderFigure,
      alt: 'TraceCoder workflow diagram',
      caption: 'TraceCoder workflow for trace-driven multi-agent debugging.',
    },
    tags: ['ICSE 2026', 'Automated Debugging', 'Runtime Tracing'],
  },
  {
    id: 'kgmaf-highlight',
    title: 'Knowledge-Guided Requirements Engineering',
    projectId: 'kgmaf',
    publicationId: 'kgmaf-ase-2025',
    summary:
      'KGMAF coordinates six role-specialized agents with a shared artifact pool, injected requirements knowledge, and human-in-the-loop review for intelligent SRS generation.',
    figure: {
      src: kgmafFigure,
      alt: 'KGMAF framework diagram',
      caption: 'KGMAF framework for knowledge-guided multi-agent requirements engineering.',
    },
    tags: ['ASE 2025', 'Requirements Engineering', 'Human-in-the-Loop'],
  },
]
