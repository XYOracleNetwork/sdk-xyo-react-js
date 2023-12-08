import { NetworkNodePayload, NetworkNodeSchema } from '@xyo-network/network'

import { ExplorerMapHashes } from './ExplorerMapHashes'

export type ArchivistPreset = NetworkNodePayload & {
  explorerMapHashes?: {
    animatedAnswerHashes: string[]
    staticAnswerHash: string
  }
}

export const findArchivistPreset = (slug: string) => {
  return (
    archivistPresets.find((item) => {
      return item.slug === slug
    }) ?? archivistPresets[0]
  )
}

export const archivistPresets: ArchivistPreset[] = [
  {
    docs: 'https://beta.archivist.xyo.network/api',
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (kerplunk)',
    schema: NetworkNodeSchema,
    slug: 'kerplunk-archivist-xyo-network',
    type: 'archivist',
    uri: 'https://beta.api.archivist.xyo.network',
  },
  {
    docs: 'https://archivist.xyo.network/api',
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (main)',
    schema: NetworkNodeSchema,
    slug: 'main-archivist-xyo-network',
    type: 'archivist',
    uri: 'https://api.archivist.xyo.network',
  },
  {
    docs: 'http://localhost:8080/api',
    name: 'XYO Shared Archivist (local)',
    schema: NetworkNodeSchema,
    slug: 'local-archivist-xyo-network',
    type: 'archivist',
    uri: 'http://localhost:8080',
  },
]
