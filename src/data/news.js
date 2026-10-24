const items = [
  {
    "id": "semfaith-pricai-2026-accepted",
    "date": "2026-08",
    "order": 2,
    "title": "SemFaith: Evaluating Semantic Faithfulness of LLM-Generated Classical-to-Modern Chinese Restatements",
    "description": "SemFaith was accepted at PRICAI 2026. It uses multiple human translations or authoritative explanations to derive semantic claims supported by the original classical Chinese text, then compares them with claims in LLM-generated modern Chinese restatements to diagnose meaning preservation, omissions, semantic shifts, and unsupported additions.",
    "tag": "Accepted",
    "venue": "PRICAI 2026 · CCF C",
    "paperTitle": "SemFaith: Evaluating Semantic Faithfulness of LLM-Generated Classical-to-Modern Chinese Restatements",
    "publicationId": "semfaith-pricai-2026"
  },
  {
    "id": "cross-model-collaboration-tosem-2026",
    "date": "2026-08",
    "order": 1,
    "title": "Cross-Model Collaboration for Enhancing LLM-Based Code Generation",
    "description": "The CMCS paper was published online in TOSEM. It studies how feedback-driven correction and collaboration between language models can improve code generation.",
    "tag": "Journal",
    "type": "Journal Article",
    "venue": "TOSEM · CCF A",
    "paperTitle": "Cross-Model Collaboration for Enhancing LLM-Based Code Generation",
    "publicationId": "cross-model-collaboration-tosem-2026"
  },
  {
    "id": "icse-2026-rio",
    "date": "2026-04",
    "title": "TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code",
    "description": "We presented TraceCoder at ICSE 2026. The framework combines runtime traces and multi-agent collaboration to debug and repair LLM-generated code.",
    "tag": "Conference",
    "type": "International Conference",
    "venue": "ICSE 2026 · CCF A",
    "paperTitle": "TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code",
    "publicationId": "tracecoder-icse-2026",
    "summary": "We presented TraceCoder at ICSE 2026. The framework combines runtime traces and multi-agent collaboration to debug and repair LLM-generated code."
  },
  {
    "id": "ase-2025-seoul",
    "date": "2025-11",
    "title": "Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration",
    "description": "We presented KGMAF at ASE 2025. The work explores knowledge-guided multi-agent collaboration for intelligent requirements engineering.",
    "tag": "Conference",
    "type": "International Conference",
    "venue": "ASE 2025 · CCF A",
    "paperTitle": "Envisioning Intelligent Requirements Engineering via Knowledge-Guided Multi-Agent Collaboration",
    "publicationId": "kgmaf-ase-2025",
    "summary": "We presented KGMAF at ASE 2025. The work explores knowledge-guided multi-agent collaboration for intelligent requirements engineering."
  }
]

export const newsItems = items.sort((a, b) => b.date.localeCompare(a.date) || (b.order || 0) - (a.order || 0))
