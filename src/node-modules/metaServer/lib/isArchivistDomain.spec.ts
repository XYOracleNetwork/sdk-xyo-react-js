import { isArchivistDomain } from './isArchivistDomain'

const archivistDomains = ['https://beta.api.archivist.xyo.network', 'https://api.archivist.xyo.network', 'http://localhost:8080']

const notArchivistDomains = ['https://beta.explore.xyo.network', 'https://www.google.com', 'https://localhost:8']

describe('isArchivistDomain', () => {
  it.each(archivistDomains)('Returns true for Archivist domains', (uri) => {
    expect(isArchivistDomain(uri)).toBe(true)
  })
  it.each(notArchivistDomains)('Returns false for non-archivist domains', (uri) => {
    expect(isArchivistDomain(uri)).toBe(false)
  })
})
