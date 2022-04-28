import { XyoNodeConfig } from '@xyo-network/sdk-xyo-client-js'

export const findDivinerPreset = (slug: string) => {
  return (
    divinerPresets.find((item) => {
      return item.slug === slug
    }) ?? divinerPresets[0]
  )
}

export const divinerPresets: XyoNodeConfig[] = [
  {
    name: 'XYO Location (beta)',
    slug: 'beta-location-diviner-xyo-network',
    type: 'diviner',
    uri: 'https://beta.api.location.diviner.xyo.network',
    web: 'https://beta.explore.xyo.network',
  },
  {
    name: 'XYO Location',
    slug: 'location-diviner-xyo-network',
    type: 'diviner',
    uri: 'https://api.location.diviner.xyo.network',
    web: 'https://explore.xyo.network',
  },
]
