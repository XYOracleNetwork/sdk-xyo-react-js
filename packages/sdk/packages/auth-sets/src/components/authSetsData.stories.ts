import { AuthSetSchema } from '../contexts'

export const betaApiDomain = 'https://beta.api.archivist.xyo.network'
export const defaultAuthSets = new Map()
defaultAuthSets.set(betaApiDomain, [
  {
    account: '0x123456780910',
    identifier: 'Kerplunk Archivist',
    issuer: betaApiDomain,
    schema: AuthSetSchema,
    token: 'someToken',
  },
])
defaultAuthSets.set('https://api.archivist.xyo.network', [
  {
    account: '0x123456780910',
    identifier: 'Main Archivist',
    issuer: 'https://api.archivist.xyo.network',
    schema: AuthSetSchema,
    token: 'someToken',
  },
])

export const localStorageSets = new Map()
localStorageSets.set('http://someApi.com', [
  {
    account: '0x123456780910',
    identifier: 'From LocalStorage',
    issuer: 'http://someApi.com',
    schema: AuthSetSchema,
  },
])
localStorageSets.set('http://beta.someApi.com', [
  {
    account: '0x123456780910',
    identifier: 'From LocalStorage as well',
    issuer: 'http://beta.someApi.com',
    schema: AuthSetSchema,
  },
])
