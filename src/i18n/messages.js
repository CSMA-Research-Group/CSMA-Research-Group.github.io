import { ui } from './zh/ui.js'
import { research } from './zh/research.js'
import { projects } from './zh/projects.js'
import { people } from './zh/people.js'
import { publications } from './zh/publications.js'
import { insights } from './zh/insights.js'

// Exact source-copy keys make missing or outdated translations detectable.
// Metadata remains in src/data; these files contain display copy only.
export const messages = Object.freeze(Object.assign({}, ui, research, projects, people, publications, insights))
