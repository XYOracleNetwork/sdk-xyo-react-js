import { XyoNodeConfig } from '@xyo-network/sdk-xyo-client-js'

import { ExplorerMapHashes } from './ExplorerMapHashes'

export interface XyoArchivistPreset extends XyoNodeConfig {
  explorerMapHashes?: {
    staticAnswerHash: string
    animatedAnswerHashes: string[]
  }
  docs?: string
  web?: string
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
    docs: 'https://beta.archivist.xyo.network/api',
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (kerplunk)',
    slug: 'kerplunk-archivist-xyo-network',
    type: 'archivist',
    uri: 'https://beta.api.archivist.xyo.network',
    web: 'https://beta.archivist.xyo.network',
  },
  {
    docs: 'https://archivist.xyo.network/api',
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (main)',
    slug: 'main-archivist-xyo-network',
    type: 'archivist',
    uri: 'https://api.archivist.xyo.network',
    web: 'https://archivist.xyo.network',
  },
  {
    docs: 'http://localhost:8080/api',
    name: 'XYO Shared Archivist (local)',
    slug: 'local-archivist-xyo-network',
    type: 'archivist',
    uri: 'http://localhost:8080',
    web: 'http://localhost:8081',
  },
]
