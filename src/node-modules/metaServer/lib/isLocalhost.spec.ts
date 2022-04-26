import { isLocalhost } from './isLocalhost'

const localhostStrings = [
  'localhost',
  'http://localhost',
  'http://localhost:8080',
  '127.0.0.1',
  'http://127.0.0.1',
  'http://127.0.0.1:8080',
  '[::1]',
  'http://[::1]',
  'http://[::1]:8080',
]

const nonLocalhostStrings = ['https://beta.explore.xyo.network', 'https://www.google.com', 'https://128.0.0.0', 'local', '128.0.0.0']

describe('isLocalhost', () => {
  it.each(localhostStrings)('Returns true for localhost strings', (uri) => {
    expect(isLocalhost(uri)).toBe(true)
  })
  it.each(nonLocalhostStrings)('Returns false for non-localhost strings', (uri) => {
    expect(isLocalhost(uri)).toBe(false)
  })
})
