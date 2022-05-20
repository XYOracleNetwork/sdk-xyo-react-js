import { XyoNetworkPayload, XyoNetworkPayloadSchema } from '@xyo-network/network'

import { findArchivistPreset, findDivinerPreset } from '../../../general'

export const defaultNetworkConfigs: XyoNetworkPayload[] = [
  {
    name: 'Kerplunk',
    nodes: [findArchivistPreset('kerplunk-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    schema: XyoNetworkPayloadSchema,
    slug: 'kerplunk',
  },
  {
    name: 'Main',
    nodes: [findArchivistPreset('main-archivist-xyo-network'), findDivinerPreset('location-diviner-xyo-network')],
    schema: XyoNetworkPayloadSchema,
    slug: 'main',
  },
  {
    name: 'Local',
    nodes: [findArchivistPreset('kerplunk-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    schema: XyoNetworkPayloadSchema,
    slug: 'local',
  },
]

/** @deprecated use defaultNetworkConfigs instead */
export const networkPresets = defaultNetworkConfigs
