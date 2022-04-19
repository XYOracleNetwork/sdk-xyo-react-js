// TODO: Grab/extend from ENV VAR to support additional dynamic domains
export type ArchivistDomain = 'https://beta.api.archivist.xyo.network' | 'https://api.archivist.xyo.network' | 'http://localhost:8080'

export const archivistDomains: Record<ArchivistDomain, true> = {
  'http://localhost:8080': true,
  'https://api.archivist.xyo.network': true,
  'https://beta.api.archivist.xyo.network': true,
}

export const isArchivistDomain = (domain: string): domain is ArchivistDomain => {
  return archivistDomains[domain as ArchivistDomain] || false
}
