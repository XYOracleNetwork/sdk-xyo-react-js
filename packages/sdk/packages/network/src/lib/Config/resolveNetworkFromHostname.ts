import { XyoNetworkNames } from './NetworkNames'

export const resolveNetworkFromHostName = (fallback: XyoNetworkNames = 'Kerplunk') => {
  switch (document.location.hostname) {
    case 'explore.xyo.network':
      return 'Main'
    case 'beta.explore.xyo.network':
      return 'Kerplunk'
    default:
      return fallback
  }
}
