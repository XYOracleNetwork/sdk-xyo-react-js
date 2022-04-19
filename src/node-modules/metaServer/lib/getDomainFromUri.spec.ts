import { getDomainFromUri } from './getDomainFromUri'

const validUris = [
  ['https://www.google.com/search/foo', 'https://www.google.com'],
  ['https://www.google.com', 'https://www.google.com'],
  [
    'https://beta.explore.xyo.network/archive/temp/block/hash/18b79aa80de2bcc7287fd0577a5c2caee47a37fd4ac75a252e4bc05aeddd7fbb?network=kerplunk',
    'https://beta.explore.xyo.network',
  ],
  ['https://explore.xyo.network/archive/temp/block/hash/ce9d1723d3f501abc980c4f48248c11c9689051d9a2010d521e4ee484b260436?network=main', 'https://explore.xyo.network'],
  ['https://api.archivist.xyo.network', 'https://api.archivist.xyo.network'],
]

describe('getDomainFromUri', () => {
  it.each(validUris)('gets domain from URI', (uri, expected) => {
    expect(getDomainFromUri(uri)).toBe(expected)
  })
})
