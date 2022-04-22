import { getArchivistDomainFromExploreUri, networkToArchivistUri } from './getArchivistDomainFromExploreUri'

const prodUrls = [
  'https://explore.xyo.network/?network=main',
  'https://beta.explore.xyo.network/?network=main',
  'http://locahost:3000/?network=main',
  'http://aws-alb-123456789.us-east-1.elb.amazonaws.com:80/archive/temp/payload/hash/eef3ce837b279bdea1688ef7cd2e0606c388984d7ae950702b276e466528b789?network=main',
]
const betaUrls = [
  'https://explore.xyo.network/?network=kerplunk',
  'https://beta.explore.xyo.network/?network=kerplunk',
  'http://locahost:3000/?network=kerplunk',
  'http://aws-alb-123456789.us-east-1.elb.amazonaws.com:80/archive/temp/payload/hash/eef3ce837b279bdea1688ef7cd2e0606c388984d7ae950702b276e466528b789?network=kerplunk',
]
const localhostUrls = [
  'https://explore.xyo.network/?network=local',
  'https://beta.explore.xyo.network/?network=local',
  'http://locahost:3000/?network=local',
  'http://aws-alb-123456789.us-east-1.elb.amazonaws.com:80/archive/temp/payload/hash/eef3ce837b279bdea1688ef7cd2e0606c388984d7ae950702b276e466528b789?network=local',
]
const invalidUris = [
  'https://www.google.com/search/foo',
  'https://www.google.com',
  'https://beta.explore.xyo.network/archive/temp/block/hash/18b79aa80de2bcc7287fd0577a5c2caee47a37fd4ac75a252e4bc05aeddd7fbb',
  'https://explore.xyo.network/archive/temp/block/hash/ce9d1723d3f501abc980c4f48248c11c9689051d9a2010d521e4ee484b260436',
  'https://api.archivist.xyo.network',
]

describe('getArchivistDomainFromExploreUri', () => {
  it.each(prodUrls)('gets production domain from explorer URI', (uri) => {
    expect(getArchivistDomainFromExploreUri(uri)).toBe(networkToArchivistUri['main'])
  })
  it.each(betaUrls)('gets beta domain from explorer URI', (uri) => {
    expect(getArchivistDomainFromExploreUri(uri)).toBe(networkToArchivistUri['kerplunk'])
  })
  it.each(localhostUrls)('gets localhost domain from explorer URI', (uri) => {
    expect(getArchivistDomainFromExploreUri(uri)).toBe(networkToArchivistUri['local'])
  })
  it.each(invalidUris)('returns production domain if archivist not inferrable from explorer URI', (uri) => {
    expect(getArchivistDomainFromExploreUri(uri)).toBe(networkToArchivistUri['main'])
  })
})
