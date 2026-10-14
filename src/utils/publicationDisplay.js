const authorListFormatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

export const formatPublicationAuthors = (authors = []) => authorListFormatter.format(authors)
