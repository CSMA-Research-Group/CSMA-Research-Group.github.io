import { projects } from './projects'
import cmcsFigure from '../assets/figures/cmcs-framework.png'
import cmcsPdf from '../assets/figures/CMCS.pdf?url'
import semfaithFigure from '../assets/figures/semfaith-framework.png'
import semfaithPdf from '../assets/figures/SemFaith.pdf?url'

// Each paper identifies one primary supporting system. These profiles describe
// existing research artifacts; a profile does not imply a hosted demo.
// Optional previewMedia: { src, alt, width, height }. Add a supplied GIF or
// animated WebP here to show it beneath the resource introduction.
export const researchSystems = [
  {
    id: 'cmcs',
    previewMedia: null,
    title: 'CMCS',
    figure: {
      src: cmcsFigure,
      pdf: cmcsPdf,
      width: 2600,
      height: 855,
      alt: 'CMCS cross-model collaborative code generation architecture',
      caption: 'CMCS architecture for collaborative code generation and diagnostic correction.',
    },
    subtitle: 'Collaborative Multi-model Code Generation Scheme',
    type: 'Research Framework',
    status: 'Public code',
    description: 'CMCS coordinates two language models for code generation, using diagnostic correction and collaboration across models.',
    inputs: 'Programming tasks, test cases, and two configured language models.',
    outputs: 'Generated code with correctness checks, error feedback, and an attempt history in JSON.',
    workflow: [
      'Distribute initial generation tasks between two models.',
      'Use diagnostic feedback to revise unsuccessful candidates.',
      'Bring the models together to address the remaining failures.',
    ],
    availability: 'Code and usage instructions are available in the public repository.',
    relatedPublicationIds: ['cross-model-collaboration-tosem-2026'],
    links: [{ label: 'GitHub', url: 'https://github.com/CSMA-Research-Group/CMCS' }],
    featured: true,
  },
  {
    ...projects.find(project => project.id === 'tracecoder'),
    previewMedia: null,
    inputs: 'LLM-generated code, test cases, and runtime feedback from candidate executions.',
    outputs: 'Candidate repairs informed by execution traces and previous repair attempts.',
    workflow: [
      'Instrument the program and collect runtime execution traces.',
      'Analyze the traces to reason about failures and recall previous repair lessons.',
      'Produce and evaluate a candidate repair, with rollback when a repair attempt fails.',
    ],
    availability: 'The research implementation is available in the public TraceCoder repository.',
    featured: true,
  },
  {
    id: 'semfaith',
    previewMedia: null,
    title: 'SemFaith',
    figure: {
      src: semfaithFigure,
      pdf: semfaithPdf,
      width: 2600,
      height: 1343,
      alt: 'SemFaith claim-level semantic faithfulness diagnosis framework',
      caption: 'SemFaith framework for diagnosing preservation, omission, semantic shift, and unsupported expansion.',
    },
    subtitle: 'Claim-Level Diagnosis of Semantic Faithfulness',
    type: 'Evaluation Framework',
    status: 'Framework described in an accepted paper',
    description: 'SemFaith diagnoses semantic faithfulness in classical-to-modern Chinese restatements using source-licensed claims and a language-model checker.',
    inputs: 'Classical Chinese anchors, multiple human translations or authoritative explanations, and generated restatements.',
    outputs: 'Claim-level alignments and rates of preservation, omission, semantic shift, and unsupported expansion.',
    workflow: [
      'Derive anchor-licensed consensus claims from human translations or authoritative explanations.',
      'Align claims in each generated restatement with those consensus claims.',
      'Compute interpretable diagnostic rates under the selected checker setting.',
    ],
    availability: 'Implementation code is linked in the SemFaith GitHub repository.',
    limitation: 'Reported measurements are checker-conditioned and await human calibration.',
    relatedPublicationIds: ['semfaith-pricai-2026'],
    links: [{ label: 'GitHub', url: 'https://github.com/CSMA-Research-Group/SemFaith' }],
    featured: false,
  },
  {
    ...projects.find(project => project.id === 'kgmaf'),
    previewMedia: null,
    inputs: 'A project idea, requirements knowledge, shared intermediate artifacts, and human feedback.',
    outputs: 'Software requirements specification artifacts produced through coordinated requirements development.',
    workflow: [
      'Coordinate specialized agents for requirements elicitation, analysis, specification, and validation.',
      'Exchange intermediate and final requirements artifacts through a shared artifact pool.',
      'Inject requirements knowledge and incorporate human review into the workflow.',
    ],
    availability: 'The associated implementation is linked in the ChatREQ GitHub repository.',
    featured: false,
  },
]

export const featuredSystems = researchSystems.filter(system => system.featured)

// Separate the published KGMAF framework from its ChatREQ application.
// Other systems currently use one shared research and application profile.
const chatreqApplication = {
  ...researchSystems.find(system => system.id === 'kgmaf'),
  id: 'chatreq',
  title: 'ChatREQ',
  type: 'Research Application',
  subtitle: 'Knowledge-Guided Requirements Engineering',
  status: 'Application overview',
  description: 'ChatREQ is a requirements engineering application based on KGMAF, the knowledge-guided multi-agent framework introduced in the ASE 2025 paper. It connects requirements elicitation, analysis, specification, and human review in a shared workflow.',
  homeSummary: 'A requirements engineering application that connects elicitation, analysis, specification, and human review.',
  availability: 'Source code is linked in the ChatREQ GitHub repository.',
  links: [{ label: 'GitHub', url: 'https://github.com/CSMA-Research-Group/ChatREQ' }],
  frameworkId: 'kgmaf',
  applicationOnly: true,
}

export const projectApplications = researchSystems.map(system => (
  system.id === 'kgmaf' ? chatreqApplication : system
))

export const systemProfiles = [...researchSystems, chatreqApplication]
