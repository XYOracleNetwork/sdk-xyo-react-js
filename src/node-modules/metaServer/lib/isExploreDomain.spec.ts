import { isExploreDomain } from './isExploreDomain'

const exploreDomains = ['https://beta.explore.xyo.network', 'https://explore.xyo.network', 'http://localhost:3000']

const notExploreDomains = ['https://beta.xyo.network', 'https://www.google.com', 'https://localhost:80']

describe('isExploreDomain', () => {
  it.each(exploreDomains)('Returns true for Explore domains', (uri) => {
    expect(isExploreDomain(uri)).toBe(true)
  })
  it.each(notExploreDomains)('Returns false for non-Explore domains', (uri) => {
    expect(isExploreDomain(uri)).toBe(false)
  })
})
