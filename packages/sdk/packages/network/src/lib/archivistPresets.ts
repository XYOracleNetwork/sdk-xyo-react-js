import { XyoNetworkNodePayload, XyoNetworkNodeSchema } from '@xyo-network/network'

import { ExplorerMapHashes } from './ExplorerMapHashes'

export interface XyoArchivistPreset extends XyoNetworkNodePayload {
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

export const archivistPresets: XyoArchivistPreset[] = [
  {
    docs: 'https://beta.archivist.xyo.network/api',
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (kerplunk)',
    schema: XyoNetworkNodeSchema,
    slug: 'kerplunk-archivist-xyo-network',
    type: 'archivist',
    uri: 'https://beta.api.archivist.xyo.network',
  },
  {
    docs: 'https://archivist.xyo.network/api',
    explorerMapHashes: ExplorerMapHashes,
    name: 'XYO Shared Archivist (main)',
    schema: XyoNetworkNodeSchema,
    slug: 'main-archivist-xyo-network',
    type: 'archivist',
    uri: 'https://api.archivist.xyo.network',
  },
  {
    docs: 'http://localhost:8080/api',
    name: 'XYO Shared Archivist (local)',
    schema: XyoNetworkNodeSchema,
    slug: 'local-archivist-xyo-network',
    type: 'archivist',
    uri: 'http://localhost:8080',
  },
]
