export const publicationCategories = ['Conference Papers']

export const publications = [
  {
    id: 'tracecoder-icse-2026',
    category: 'Conference Papers',
    title:
      'TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code',
    authors: [
      'Jiangping Huang',
      'Wenguang Ye',
      'Weisong Sun',
      'Jian Zhang',
      'Mingyue Zhang',
      'Yang Liu',
    ],
    venue: 'ICSE 2026',
    venueFullName: '2026 IEEE/ACM 48th International Conference on Software Engineering',
    year: 2026,
    publicationDate: '2026-04-12',
    conferenceDate: {
      start: '2026-04-12',
      end: '2026-04-18',
    },
    location: 'Rio de Janeiro, Brazil',
    type: 'Conference Paper',
    doi: '10.1145/3744916.3773187',
    pdf: '',
    code: 'https://github.com/CSMA-Research-Group/TraceCoder',
    tags: [
      'Intelligent Software Engineering',
      'Multi-Agent Systems',
      'Code Generation',
      'Automated Debugging',
      'Program Repair',
      'Runtime Tracing',
    ],
    abstractSummary:
      'TraceCoder addresses subtle bugs in LLM-generated code by moving beyond binary pass/fail feedback. The framework coordinates instrumentation, analysis, and repair agents to collect runtime traces, reason about causal failures, learn from previous repair attempts, and iteratively improve candidate patches.',
    contributionHighlights: [
      'Introduces a trace-driven multi-agent debugging loop modeled on observe-analyze-repair expert behavior.',
      'Uses an Instrumentation Agent to insert diagnostic probes and collect fine-grained runtime execution traces.',
      'Combines causal analysis, Historical Lesson Learning Mechanism (HLLM), and rollback-based repair to reduce repeated failures.',
      'Reports up to 34.43% relative Pass@1 improvement over advanced baselines across evaluated benchmarks.',
    ],
    relatedProjectId: 'tracecoder',
    relatedProjectTitle: 'TraceCoder',
    featured: true,
  },
  {
    id: 'kgmaf-ase-2025',
    category: 'Conference Papers',
    title: 'Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration',
    authors: ['Jiangping Huang', 'Dongmin Jin', 'Weisong Sun', 'Yang Liu', 'Zhi Jin'],
    venue: 'ASE 2025',
    venueFullName: '2025 40th IEEE/ACM International Conference on Automated Software Engineering',
    year: 2025,
    publicationDate: '2025-11-16',
    conferenceDate: {
      start: '2025-11-16',
      end: '2025-11-20',
    },
    location: 'Seoul, South Korea',
    type: 'Conference Paper',
    doi: '10.1109/ASE63991.2025.00334',
    pdf: '',
    code: '',
    tags: [
      'Intelligent Requirements Engineering',
      'Knowledge-Guided Reasoning',
      'Multi-Agent Collaboration',
      'Human-in-the-Loop',
      'SRS Generation',
    ],
    abstractSummary:
      'This paper proposes KGMAF, a knowledge-guided multi-agent framework for intelligent requirements development. KGMAF coordinates six role-specialized LLM-based agents through a shared artifact pool, injected requirements knowledge, and human-in-the-loop review to support software requirements specification generation.',
    contributionHighlights: [
      'Defines a knowledge-guided multi-agent architecture for requirements elicitation, analysis, specification, and validation.',
      'Models six RE roles: Interviewer, End-User, Analyst, Archivist, Reviewer, and Deployer.',
      'Uses a shared artifact pool as a blackboard-style coordination medium for intermediate and final requirements artifacts.',
      'Injects elicitation, analysis, specification, validation, contextual, and cognitive strategy knowledge into agent workflows.',
      'Demonstrates a proof-of-concept case study for generating SRS artifacts from a project idea.',
    ],
    relatedProjectId: 'kgmaf',
    relatedProjectTitle: 'KGMAF / ChatREQ',
    featured: true,
  },
]

export const featuredPublications = publications.filter((publication) => publication.featured)
