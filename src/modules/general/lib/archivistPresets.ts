import { ExplorerMapHashes } from './ExplorerMapHashes'

export interface XyoArchivistPreset {
  slug: string
  name: string
  urls: {
    api: string
    web: string
    apiDocs?: string
  }
  explorerMapHashes?: {
    staticAnswerHash: string
    animatedAnswerHashes: string[]
  }
}

export const findArchivistPreset = (slug: string) => {
  return (
    archivistPresets.find((item) => {
      return item.slug === slug
    }) ?? archivistPresets[0]
  )
}

export const archivistPresets: XyoArchivistPreset[] = [
  {
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (kerplunk)',
    slug: 'beta-archivist-xyo-network',
    urls: {
      api: 'https://beta.api.archivist.xyo.network',
      apiDocs: 'https://beta.archivist.xyo.network/api',
      web: 'https://beta.archivist.xyo.network',
    },
  },
  {
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (main)',
    slug: 'archivist-xyo-network',
    urls: {
      api: 'https://api.archivist.xyo.network',
      apiDocs: 'https://archivist.xyo.network/api',
      web: 'https://archivist.xyo.network',
    },
  },
  {
    name: 'XYO Shared Archivist (local)',
    slug: 'local-archivist-xyo-network',
    urls: {
      api: 'http://localhost:8080',
      apiDocs: 'http://localhost:8080/api',
      web: 'http://localhost:8081',
    },
  },
]
