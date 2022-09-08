import { XyoNetworkPayload, XyoNetworkSchema } from '@xyo-network/network'

import { findArchivistPreset } from '../archivistPresets'
import { findDivinerPreset } from '../divinerPresets'

export const defaultNetworkConfigs: XyoNetworkPayload[] = [
  {
    name: 'Kerplunk',
    nodes: [findArchivistPreset('kerplunk-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    schema: XyoNetworkSchema,
    slug: 'kerplunk',
  },
  {
    name: 'Main',
    nodes: [findArchivistPreset('main-archivist-xyo-network'), findDivinerPreset('location-diviner-xyo-network')],
    schema: XyoNetworkSchema,
    slug: 'main',
  },
  {
    name: 'Local',
    nodes: [findArchivistPreset('local-archivist-xyo-network'), findDivinerPreset('local-location-diviner-xyo-network')],
    schema: XyoNetworkSchema,
    slug: 'local',
  },
]

/** @deprecated use defaultNetworkConfigs instead */
export const networkPresets = defaultNetworkConfigs
