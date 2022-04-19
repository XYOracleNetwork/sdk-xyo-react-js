import { getHashFromUri } from './getHashFromUri'

const urisWithHash = [
  'https://beta.explore.xyo.network/archive/temp/block/hash/18b79aa80de2bcc7287fd0577a5c2caee47a37fd4ac75a252e4bc05aeddd7fbb?network=kerplunk',
  'https://explore.xyo.network/archive/temp/block/hash/ce9d1723d3f501abc980c4f48248c11c9689051d9a2010d521e4ee484b260436?network=main',
]

const urisWithoutHash = ['https://beta.explore.xyo.network/archive', 'https://explore.xyo.network/?network=main']

describe('getHashFromUri', () => {
  it.each(urisWithHash)('gets hash from URI', (uri) => {
    expect(getHashFromUri(uri)).toBeTruthy()
  })
  it.each(urisWithoutHash)('returns undefined if no hash in URI', (uri) => {
    expect(getHashFromUri(uri)).toBe(undefined)
  })
})
