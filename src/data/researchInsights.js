export const researchInsights = {
  id: 'insights',
  title: 'Research Insights',
  description: 'Technical articles, practical notes, and perspectives on emerging research.',
  items: [
    {
      id: 'rea',
      title: 'REA: Evidence for Software Understanding',
      category: 'Technical Notes',
      date: '2026-10',
      description: 'REA connects AI agents to tools for inspecting applications, binaries, and runtime behavior. Its documented workflows return findings with supporting evidence.',
      insight: 'A useful software agent should make its explanation testable: connect each claim to an artifact, then use new observations to revise it.',
      overview: [
        {
          text: 'REA (Reverse Engineer Anything) exposes software inspection through MCP and a command-line interface. It supports several kinds of artifacts, including native binaries, JavaScript/Electron applications and .NET assemblies. Available operations and analysis engines depend on the target.',
          sources: [1],
        },
        {
          text: 'The documentation describes Evidence records that retain artifact identity, source locations, observations, inferences and unresolved findings. Saved records support later queries and comparisons, while keeping the limitations of the original analysis visible.',
          sources: [2],
        },
      ],
      perspective: [
        'The research opportunity is to study whether evidence changes an agent’s decisions. For a suspected feature or defect, record the hypothesis, the observation supporting it, and a test that could refute it. An explanation becomes more useful when another researcher can follow that chain and reproduce the relevant behavior.',
        'For intelligent software engineering, this suggests experiments in requirements recovery, program comprehension and regression analysis. Compare agents with identical tool access, with and without explicit links between claims and observations. Measure localization accuracy, unsupported assertions and successful downstream fixes, alongside execution cost.',
      ],
      evidenceNote: 'This note interprets the project documentation. It does not report an independent execution or evaluation of REA.',
      sources: [
        { title: 'morluto/rea — official repository and README', url: 'https://github.com/morluto/rea' },
        { title: 'REA — CLI and Evidence documentation', url: 'https://github.com/morluto/rea/blob/main/docs/cli.md' },
      ],
    },
    {
      id: 'mass',
      title: 'MASS: Learning from Agent Teams',
      category: 'Research Trends',
      date: '2026-10',
      description: 'An October 2026 study from Sakana AI and collaborators explores how multi-agent experience can train the shared model that organizes, executes and evaluates the work.',
      insight: 'The key question is whether learned coordination transfers beyond its training tasks. Independent checks matter when one model both proposes and judges improvements.',
      overview: [
        {
          text: 'Multi-Agent Self-Supervision (MASS) alternates between workflow search and model training. A shared model proposes, executes and judges team workflows; selected execution traces then become training data for that model. The paper was submitted in October 2026.',
          sources: [1],
        },
        {
          text: 'The authors report 1.2–1.6× the base model’s score per output token on four research benchmarks after two cycles. Their detailed article also reports ratios of 0.96× on Terminal-Bench 2.0 and 0.94× on SWE-bench Verified, so the observed gains do not transfer uniformly.',
          sources: [2],
        },
      ],
      perspective: [
        'MASS is a useful example of a current research direction: treating coordination as something a model can learn. Role assignments, information exchange and checks between agents can shape the training signal. This makes the quality of a team’s interactions a concrete object of study.',
        'For software engineering, the next question is whether these gains survive on unseen repositories with independently checked tests and comparable budgets. Workflow search and training also have costs, so score per output token should be considered alongside total compute and time. A convincing result would improve verified task outcomes while keeping the full improvement process inspectable.',
      ],
      evidenceNote: 'The results above are reported by the authors. Two experimental cycles do not establish open-ended or universal self-improvement.',
      sources: [
        { title: 'Lee et al. — Recursive Self-Improvement through Multi-Agent Self-Supervision', url: 'https://arxiv.org/abs/2610.12176' },
        { title: 'Sakana AI — MASS research article, October 2026', url: 'https://pub.sakana.ai/mass/' },
      ],
    },
  ],
}
