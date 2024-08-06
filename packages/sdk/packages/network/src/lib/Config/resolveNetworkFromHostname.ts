import { NetworkNames } from './NetworkNames.tsx'

export type SiteName = 'explore' | 'node'

export const resolveNetworkFromHostName = (fallback: NetworkNames = 'Kerplunk', siteName: SiteName) => {
  switch (document.location.hostname) {
    case `${siteName}.xyo.network`: {
      return 'Main'
    }
    case `beta.${siteName}.xyo.network`: {
      return 'Kerplunk'
    }
    default: {
      return fallback
    }
  }
}
