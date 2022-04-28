import { XyoNetworkConfig } from '@xyo-network/sdk-xyo-client-js'

import { findArchivistPreset, findDivinerPreset } from '../../../general'

export const defaultNetworkConfigs: XyoNetworkConfig[] = [
  {
    name: 'Kerplunk',
    nodes: [findArchivistPreset('kerplunk-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    slug: 'kerplunk',
  },
  {
    name: 'Main',
    nodes: [findArchivistPreset('main-archivist-xyo-network'), findDivinerPreset('location-diviner-xyo-network')],
    slug: 'main',
  },
  {
    name: 'Local',
    nodes: [findArchivistPreset('kerplunk-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    slug: 'local',
  },
]

/** @deprecated use defaultNetworkConfigs instead */
export const networkPresets = defaultNetworkConfigs
