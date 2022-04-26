import { Request } from 'express'

import { getUriBehindProxy } from './getUriBehindProxy'

const getMockRequestForHost = (host: string): Request => {
  return {
    headers: {
      host,
    },
    protocol: 'http',
    url: '/index.html',
  } as Request
}

const validateUri = (uri: string, protocol: 'http' | 'https') => {
  expect(uri).toBeTruthy()
  const url = new URL(uri)
  expect(url).toBeTruthy()
  expect(url.hostname).toBeTruthy()
  expect(url.protocol).toBe(`${protocol}:`)
}

describe('getUriBehindProxy', () => {
  describe('for localhost', () => {
    it('returns http for the protocol and preserves the port', () => {
      const host = 'localhost:8080'
      const request = getMockRequestForHost(host)
      const actual = getUriBehindProxy(request)
      validateUri(actual, 'http')
      expect(actual).toBe('http://localhost:8080/index.html')
    })
  })
  describe('for non-localhost hosts', () => {
    it('returns https for the protocol and removes the port', () => {
      const host = 'aws-alb-123456789.us-east-1.elb.amazonaws.com:8080'
      const request = getMockRequestForHost(host)
      const actual = getUriBehindProxy(request)
      validateUri(actual, 'https')
      expect(actual).toBe('https://aws-alb-123456789.us-east-1.elb.amazonaws.com/index.html')
    })
  })
})
