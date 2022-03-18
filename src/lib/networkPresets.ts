import { findArchivistPreset, XyoArchivistPreset } from './archivistPresets'
import { findDivinerPreset, XyoDivinerPreset } from './divinerPresets'

export interface XyoNetworkPreset {
  slug: string
  name: string
  archivists: XyoArchivistPreset[]
  diviners: XyoDivinerPreset[]
}

export const findNetworkPreset = (slug: string) => {
  return (
    networkPresets.find((item) => {
      return item.slug === slug
    }) ?? networkPresets[0]
  )
}

export const networkPresets: XyoNetworkPreset[] = [
  {
    archivists: [findArchivistPreset('beta-archivist-xyo-network')],
    diviners: [findDivinerPreset('beta-explore-xyo-network')],
    name: 'Kerplunk',
    slug: 'xyo-kerplunk',
  },
  {
    archivists: [findArchivistPreset('archivist-xyo-network')],
    diviners: [findDivinerPreset('explore-xyo-network')],
    name: 'Main',
    slug: 'xyo-main',
  },
  {
    archivists: [findArchivistPreset('local-archivist-xyo-network')],
    diviners: [findDivinerPreset('explore-xyo-network')],
    name: 'Local',
    slug: 'xyo-local',
  },
]
