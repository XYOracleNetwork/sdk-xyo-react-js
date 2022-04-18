import { Request } from 'express'
import { sep } from 'path'

import { getAdjustedPath } from './getAdjustedPath'

const getRequestForUri = (uri: string) => {
  return {
    path: uri,
  } as unknown as Request
}

describe('getAdjustedPath', () => {
  it('returns the real path if there is an extension', () => {
    expect(getAdjustedPath(getRequestForUri('/index.js'))).toBe(`${sep}index.js`)
  })
  it('returns index.html if there is no extension', () => {
    expect(getAdjustedPath(getRequestForUri('/'))).toBe(`${sep}index.html`)
  })
})
