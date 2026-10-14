import { peopleSections } from './people'

export const alumniProfiles = [...(peopleSections.find(section => section.id === 'alumni')?.people || [])]
  .sort((a, b) => (b.graduationYear || 0) - (a.graduationYear || 0))

const members = peopleSections.find(section => section.id === 'group-members')?.people || []
const defaultPortrait = `${import.meta.env.BASE_URL}people/default-avatar.svg`

// All current members use the same presentation and a neutral default avatar.
// Original confirmed photo/profile records remain in people.js for future use.
export const peopleProfiles = members.map(person => ({
  ...person,
  displayRole: 'Member',
  profilePath: '/people/' + person.id,
  portrait: defaultPortrait,
  portraitWidth: 80,
  portraitHeight: 80,
  defaultPortrait: true,
  interests: person.primaryResearchArea ? [person.primaryResearchArea] : person.interests,
  previewInterests: [person.primaryResearchArea || person.interests?.[0]].filter(Boolean),
}))

export const peopleHierarchy = [
  { id: 'members', title: 'Members', people: peopleProfiles },
]

export const homeMemberIds = peopleProfiles.map(person => person.id)
export const homePeopleRows = [
  { id: 'member', title: 'Members', people: peopleProfiles },
]
