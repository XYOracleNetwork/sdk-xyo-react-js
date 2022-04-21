import { parse } from 'querystring'
import { URL } from 'url'

export type Network = 'main' | 'kerplunk' | 'local'
export const networkToArchivistUri: Record<Network, string> = {
  kerplunk: 'https://beta.api.archivist.xyo.network',
  local: 'http://localhost:8080',
  main: 'https://api.archivist.xyo.network',
}

export const getArchivistDomainFromExploreUri = (uri: string): string => {
  try {
    const parsed = new URL(uri)
    const queryParams = parse(parsed.search.substring(1))
    const network: Network = (queryParams?.network as Network) || 'main'
    return networkToArchivistUri[network] || networkToArchivistUri['main']
  } catch (error) {
    return networkToArchivistUri['main']
  }
}
