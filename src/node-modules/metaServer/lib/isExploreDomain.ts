// TODO: Grab/extend from ENV VAR to support additional dynamic domains
export type ExploreDomain = 'https://beta.explore.xyo.network' | 'https://explore.xyo.network' | 'http://localhost:3000'

export const exploreDomains: Record<ExploreDomain, true> = {
  'http://localhost:3000': true,
  'https://beta.explore.xyo.network': true,
  'https://explore.xyo.network': true,
}

export const isExploreDomain = (domain: string): domain is ExploreDomain => {
  return exploreDomains[domain as ExploreDomain] || false
}
