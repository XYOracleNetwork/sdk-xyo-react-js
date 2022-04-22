import { getArchiveFromUri } from './getArchiveFromUri'

const urisWithArchive = [
  'https://beta.explore.xyo.network/archive/temp/block/hash/18b79aa80de2bcc7287fd0577a5c2caee47a37fd4ac75a252e4bc05aeddd7fbb?network=kerplunk',
  'https://explore.xyo.network/archive/temp/block/hash/ce9d1723d3f501abc980c4f48248c11c9689051d9a2010d521e4ee484b260436?network=main',
  'http://localhost/archive/temp/block/recent',
  '/archive/temp/block/hash/ce9d1723d3f501abc980c4f48248c11c9689051d9a2010d521e4ee484b260436?network=main',
  '/archive/temp',
]

const urisWithoutArchive = [
  'https://beta.explore.xyo.network/archive',
  'https://explore.xyo.network/?network=main',
  'https://beta.explore.xyo.network/path/that/does/not/exist/but/could',
  'http://localhost:8080/path/that/does/not/exist/but/could',
  '/path/that/does/not/exist/but/could',
  '/archive',
]

describe('getArchiveFromUri', () => {
  it.each(urisWithArchive)('gets archive from URI', (uri) => {
    expect(getArchiveFromUri(uri)).toBe('temp')
  })
  it.each(urisWithoutArchive)('returns undefined if no archive in URI', (uri) => {
    expect(getArchiveFromUri(uri)).toBe(undefined)
  })
})
