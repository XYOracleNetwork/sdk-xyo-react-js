import { XyoNetworkNodePayload, XyoNetworkNodePayloadSchema } from '@xyo-network/network'

export const findDivinerPreset = (slug: string) => {
  return (
    divinerPresets.find((item) => {
      return item.slug === slug
    }) ?? divinerPresets[0]
  )
}

export const divinerPresets: XyoNetworkNodePayload[] = [
  {
    name: 'XYO Location (beta)',
    schema: XyoNetworkNodePayloadSchema,
    slug: 'beta-location-diviner-xyo-network',
    type: 'diviner',
    uri: 'https://beta.api.location.diviner.xyo.network',
    web: 'https://beta.explore.xyo.network',
  },
  {
    name: 'XYO Location',
    schema: XyoNetworkNodePayloadSchema,
    slug: 'location-diviner-xyo-network',
    type: 'diviner',
    uri: 'https://api.location.diviner.xyo.network',
    web: 'https://explore.xyo.network',
  },
]
