export interface XyoDivinerPreset {
  slug: string
  name: string
  urls: {
    web: string
  }
}

export const findDivinerPreset = (slug: string) => {
  return (
    divinerPresets.find((item) => {
      return item.slug === slug
    }) ?? divinerPresets[0]
  )
}

export const divinerPresets: XyoDivinerPreset[] = [
  {
    name: 'XYO Explore (beta)',
    slug: 'beta-explore-xyo-network',
    urls: {
      web: 'https://beta.explore.xyo.network',
    },
  },
  {
    name: 'XYO Explore',
    slug: 'explore-xyo-network',
    urls: {
      web: 'https://explore.xyo.network',
    },
  },
]
