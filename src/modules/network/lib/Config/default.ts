import { XyoNetworkConfig } from '@xyo-network/sdk-xyo-client-js'

import { findArchivistPreset, findDivinerPreset } from '../../../general'

export const defaultNetworkConfigs: XyoNetworkConfig[] = [
  {
    name: 'Kerplunk',
    nodes: [findArchivistPreset('beta-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    slug: 'kerplunk',
  },
  {
    name: 'Main',
    nodes: [findArchivistPreset('archivist-xyo-network'), findDivinerPreset('location-diviner-xyo-network')],
    slug: 'main',
  },
  {
    name: 'Local',
    nodes: [findArchivistPreset('beta-archivist-xyo-network'), findDivinerPreset('beta-location-diviner-xyo-network')],
    slug: 'local',
  },
]

/** @deprecated use defaultNetworkConfigs instead */
export const networkPresets = defaultNetworkConfigs
