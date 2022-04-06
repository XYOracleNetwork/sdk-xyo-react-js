import { findArchivistPreset, findDivinerPreset } from '../../../../lib'
import { XyoNetworkConfig } from './XyoNetworkConfig'

export const defaultNetworkConfigs: XyoNetworkConfig[] = [
  {
    archivists: [findArchivistPreset('beta-archivist-xyo-network')],
    diviners: [findDivinerPreset('beta-explore-xyo-network')],
    name: 'Kerplunk',
    slug: 'kerplunk',
  },
  {
    archivists: [findArchivistPreset('archivist-xyo-network')],
    diviners: [findDivinerPreset('explore-xyo-network')],
    name: 'Main',
    slug: 'main',
  },
  {
    archivists: [findArchivistPreset('local-archivist-xyo-network')],
    diviners: [findDivinerPreset('explore-xyo-network')],
    name: 'Local',
    slug: 'local',
  },
]

/** @deprecated use defaultNetworkConfigs instead */
export const networkPresets = defaultNetworkConfigs
