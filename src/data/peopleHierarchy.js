import { peopleSections } from './people'

export const alumniProfiles = [...(peopleSections.find(section => section.id === 'alumni')?.people || [])]
  .sort((a, b) => (b.graduationYear || 0) - (a.graduationYear || 0))

const members = peopleSections.find(section => section.id === 'group-members')?.people || []
const defaultPortrait = `${import.meta.env.BASE_URL}people/default-avatar.svg`
const visibleMembers = members.filter(person => person.portrait && person.portrait !== '/people/default-avatar.svg')

// Keep records without photos in people.js, but hide them from all current-member views and routes.
export const peopleProfiles = visibleMembers.map(person => {
  const portrait = person.portrait
    ? `${import.meta.env.BASE_URL}${person.portrait.replace(/^\//, '')}`
    : defaultPortrait

  return {
    ...person,
    displayRole: 'Member',
    profilePath: '/people/' + person.id,
    portrait,
    portraitWidth: person.portraitWidth || 80,
    portraitHeight: person.portraitHeight || 80,
    defaultPortrait: portrait === defaultPortrait,
    interests: person.interests?.length ? person.interests : [person.primaryResearchArea].filter(Boolean),
    previewInterests: [person.primaryResearchArea || person.interests?.[0]].filter(Boolean),
  }
})

export const peopleHierarchy = [
  { id: 'members', title: 'Members', people: peopleProfiles },
]

export const homeMemberIds = peopleProfiles.map(person => person.id)
export const homePeopleRows = [
  { id: 'member', title: 'Members', people: peopleProfiles },
]
