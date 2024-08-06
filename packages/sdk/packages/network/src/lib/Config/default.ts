import { NetworkPayload, NetworkSchema } from '@xyo-network/network'

import { findArchivistPreset } from '../archivistPresets.ts'
import { findDivinerPreset } from '../divinerPresets.ts'

export const defaultNetworkConfigs: NetworkPayload[] = [
  {
    name: 'Kerplunk',
    nodes: [findArchivistPreset('kerplunk-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    schema: NetworkSchema,
    slug: 'kerplunk',
  },
  {
    name: 'Main',
    nodes: [findArchivistPreset('main-archivist-xyo-network'), findDivinerPreset('location-diviner-xyo-network')],
    schema: NetworkSchema,
    slug: 'main',
  },
  {
    name: 'Local',
    nodes: [findArchivistPreset('local-archivist-xyo-network'), findDivinerPreset('local-location-diviner-xyo-network')],
    schema: NetworkSchema,
    slug: 'local',
  },
]

/** @deprecated use defaultNetworkConfigs instead */
export const networkPresets = defaultNetworkConfigs
