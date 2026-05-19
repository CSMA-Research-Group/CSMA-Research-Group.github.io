import kgmafFigure from '../assets/figures/kgmaf-framework.svg'
import tracecoderFigure from '../assets/figures/tracecoder-workflow.svg'

export const researchAreas = [
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    summary:
      'We study cognition-driven AI systems that reason, plan, remember, reflect, and adapt across complex tasks and environments.',
    motivation:
      'The next generation of AI requires cognitive mechanisms beyond generation, including structured reasoning, uncertainty awareness, memory, reflection, and self-improvement.',
    keyTopics: [
      'Cognitive AI',
      'Reasoning and planning',
      'Memory and reflection',
      'Metacognitive intelligence',
      'Trustworthy AI systems',
    ],
    keyQuestions: [
      'How can intelligent agents combine goals, evidence, uncertainty, and memory during long-horizon reasoning?',
      'How can reflection and metacognition help agents detect errors, recover from failures, and improve over time?',
    ],
    methods: [
      'Cognition-inspired agent modeling',
      'Planning and reflection loops',
      'Memory-augmented reasoning',
      'Trace- and artifact-driven evaluation',
    ],
    representativeSystems: ['TraceCoder', 'KGMAF / ChatREQ'],
    relatedPublicationIds: ['tracecoder-icse-2026', 'kgmaf-ase-2025'],
    relatedProjectIds: ['tracecoder', 'kgmaf'],
    expectedImpact:
      'This direction establishes the cognitive foundation for reliable, adaptive, and self-improving AI systems.',
  },
  {
    id: 'intelligent-software-engineering',
    title: 'Intelligent Software Engineering',
    summary:
      'We build intelligent software engineering systems that connect requirements, code, tests, runtime traces, and repair into an evidence-driven lifecycle.',
    motivation:
      'Software intelligence should not stop at code generation; it must understand intent, preserve traceability, diagnose failures, and support trustworthy evolution.',
    keyTopics: [
      'Intelligent requirements engineering',
      'Requirement-code-test alignment',
      'Code generation and repair',
      'Trace-driven debugging',
      'Repository-level software agents',
      'Software artifact intelligence',
    ],
    keyQuestions: [
      'How can stakeholder intent be transformed into precise, traceable, and reviewable software artifacts?',
      'How can generated software be debugged and repaired using runtime evidence rather than only pass/fail signals?',
    ],
    methods: [
      'Knowledge-guided requirements modeling',
      'Artifact-mediated multi-agent collaboration',
      'Runtime instrumentation and causal analysis',
      'Rollback and historical lesson learning',
      'Lifecycle traceability modeling',
    ],
    representativeSystems: ['KGMAF / ChatREQ', 'TraceCoder', 'Repository-Level Software Agents'],
    relatedPublicationIds: ['kgmaf-ase-2025', 'tracecoder-icse-2026'],
    relatedProjectIds: ['kgmaf', 'tracecoder', 'repo-level-agents'],
    expectedImpact:
      'This direction advances a requirement-to-code-to-runtime intelligence stack for trustworthy software generation, debugging, repair, and evolution.',
  },
  {
    id: 'intelligent-robotics',
    title: 'Intelligent Robotics',
    summary:
      'We explore embodied intelligence that links natural-language goals, perception, planning, control, and human feedback in robotic task environments.',
    motivation:
      'Robots operate in open worlds where goals must be grounded in perception and action, plans must adapt to uncertainty, and failures must be recoverable.',
    keyTopics: [
      'Embodied intelligence',
      'Language-to-goal grounding',
      'Robotic planning and control',
      'Human-robot collaboration',
      'Experience-based adaptation',
    ],
    keyQuestions: [
      'How can natural-language tasks be transformed into executable robotic goals, constraints, and action plans?',
      'How can embodied agents recover from perception, planning, and execution failures through feedback and experience?',
    ],
    methods: [
      'Language-to-goal modeling',
      'Constraint-aware planning',
      'Simulation-based validation',
      'Human-robot feedback loops',
      'Experience memory for adaptation',
    ],
    representativeSystems: ['Embodied and Robotic Intelligence'],
    relatedPublicationIds: [],
    relatedProjectIds: ['embodied-intelligence'],
    expectedImpact:
      'This direction extends CSMA research from cognitive software agents toward embodied agents that act, adapt, and collaborate in realistic environments.',
  },
  {
    id: 'application-scenarios',
    title: 'Application Scenarios',
    summary:
      'We develop research prototypes and real-world scenarios that validate AI, intelligent software engineering, and robotics methods in practical workflows.',
    motivation:
      'Cognitive and collaborative AI should be evaluated in settings where artifacts evolve, humans review decisions, costs matter, and deployment constraints are real.',
    keyTopics: [
      'Research prototypes',
      'Intelligent requirements platforms',
      'AI-assisted coding and debugging',
      'Embodied task scenarios',
      'Human-in-the-loop applications',
      'Reproducible research artifacts',
    ],
    keyQuestions: [
      'Which real-world workflows benefit most from cognition-driven, knowledge-guided, and multi-agent intelligence?',
      'How can research systems expose evidence that supports human review, reproducibility, and continuous improvement?',
    ],
    methods: [
      'Prototype-driven research',
      'Scenario-based validation',
      'Benchmark and trace-based evaluation',
      'Human-in-the-loop assessment',
      'Open artifacts and documentation',
    ],
    representativeSystems: ['TraceCoder', 'KGMAF / ChatREQ'],
    relatedPublicationIds: ['tracecoder-icse-2026', 'kgmaf-ase-2025'],
    relatedProjectIds: ['tracecoder', 'kgmaf'],
    expectedImpact:
      'This direction keeps CSMA research grounded in usable, inspectable, and transferable intelligent systems.',
  },
  {
    id: 'multi-agent-cognitive-ai',
    title: 'Multi-Agent and Cognitive AI',
    summary:
      'We investigate cognitive multi-agent architectures where specialized agents collaborate through shared artifacts, memory, feedback, and reflection.',
    motivation:
      'Complex technical tasks require more than a single model response; they need coordinated roles, shared evidence, iterative reasoning, and controlled recovery.',
    keyTopics: [
      'Role-specialized agents',
      'Artifact-mediated collaboration',
      'Agent communication protocols',
      'Reflection and recovery',
      'Runtime feedback',
      'Collaborative intelligence',
    ],
    keyQuestions: [
      'How should agents divide responsibilities, exchange artifacts, and maintain semantic consistency during complex workflows?',
      'When should multi-agent systems act autonomously, ask for human feedback, or roll back unreliable actions?',
    ],
    methods: [
      'Blackboard-style artifact pools',
      'Observe-analyze-repair loops',
      'Agent role and responsibility modeling',
      'Failure memory and reflective planning',
      'Structured schemas and validation checks',
    ],
    representativeSystems: ['TraceCoder', 'KGMAF / ChatREQ'],
    relatedPublicationIds: ['tracecoder-icse-2026', 'kgmaf-ase-2025'],
    relatedProjectIds: ['tracecoder', 'kgmaf'],
    expectedImpact:
      'This direction develops a reusable design language for cognitive multi-agent systems across software, robotics, and real-world AI workflows.',
  },
  {
    id: 'knowledge-human-loop-ai',
    title: 'Knowledge-Guided and Human-in-the-Loop AI',
    summary:
      'We study how domain knowledge, expert feedback, standards, and quality checks can make generative AI systems more reliable, accountable, and controllable.',
    motivation:
      'Fluent generation is not enough for high-stakes technical work; AI systems must remain aligned with human intent, domain constraints, and verifiable evidence.',
    keyTopics: [
      'Knowledge-guided generation',
      'Requirements knowledge and standards',
      'Human feedback loops',
      'Quality and consistency checking',
      'Traceability and accountability',
      'Trustworthy AI workflows',
    ],
    keyQuestions: [
      'How can structured knowledge guide LLM-based agents without making systems rigid or brittle?',
      'How can human review be integrated at the right moments to improve reliability without overloading users?',
    ],
    methods: [
      'Knowledge extraction and injection',
      'Retrieval-augmented agent workflows',
      'Checklist and rule-based validation',
      'Human review and revision loops',
      'Artifact consistency checking',
    ],
    representativeSystems: ['KGMAF / ChatREQ', 'TraceCoder'],
    relatedPublicationIds: ['kgmaf-ase-2025', 'tracecoder-icse-2026'],
    relatedProjectIds: ['kgmaf', 'tracecoder'],
    expectedImpact:
      'This direction supports trustworthy AI systems that are guided by knowledge, accountable to humans, and grounded in inspectable evidence.',
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