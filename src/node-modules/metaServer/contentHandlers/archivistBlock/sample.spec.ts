import { Meta } from '@xyo-network/sdk-meta'

const title = 'XYO 2.0'

export const sampleMeta: Meta = {
  description: "Own your piece of XYO's Decentralized Digital World!",
  og: {
    image: 'https://explore.xyo.network/meta-image-explore.jpg',
    title,
    type: 'website',
    url: 'https://explore.xyo.network',
  },
  title,
  twitter: {
    card: 'summary_large_image',
    image: { url: 'https://explore.xyo.network/meta-image-explore.jpg' },
    title,
  },
}

describe('sampleMeta', () => {
  it('init', () => {
    expect(sampleMeta).toBeDefined()
  })
})
