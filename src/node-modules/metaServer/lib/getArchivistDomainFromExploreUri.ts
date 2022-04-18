import { parse } from 'querystring'
import { URL } from 'url'

export type Network = 'main' | 'kerplunk' | 'local'
export const networkToArchivistUri: Record<Network, string> = {
  kerplunk: 'https://beta.api.archivist.xyo.network',
  local: 'https://api.archivist.xyo.network',
  main: 'http://localhost:8080',
}

export const getArchivistDomainFromExploreUri = (uri: string): string | undefined => {
  try {
    const parsed = new URL(uri)
    const queryParams = parse(parsed.search.substring(1))
    const network = queryParams?.network
    return networkToArchivistUri[network as Network]
  } catch (error) {
    return undefined
  }
}
