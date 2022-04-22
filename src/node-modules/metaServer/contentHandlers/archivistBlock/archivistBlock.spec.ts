import { tryParseInt } from '@xylabs/sdk-api-express-ecs'
import { readFile } from 'fs/promises'
import { Server } from 'http'
import { join } from 'path'
import { SuperTest, Test } from 'supertest'

import { getServerOnPort } from '../../test'

const payloadUri = '/archive/temp/payload/hash/2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99?network=kerplunk'

const testServerPort = 12345

describe('archivistBlock', () => {
  let server: Server
  let agent: SuperTest<Test>
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // Disable `console.log` from real server starting up for these tests
    })
    const baseDir = __dirname
    ;[server, agent] = getServerOnPort(testServerPort, baseDir)
  })
  afterAll((done) => {
    server.close(done)
  })
  it('Modifies the head with block information', async () => {
    // Get this file via server
    const response = await agent.get(payloadUri).expect(200)
    expect(response).toBeTruthy()

    // Validate HTML headers
    const headers = response.headers
    expect(headers).toBeTruthy()
    expect(headers['content-type']).toBeTruthy()
    expect(headers['content-type']).toBe('text/html; charset=utf-8')

    expect(headers['content-length']).toBeTruthy()
    const contentLength = tryParseInt(headers['content-length'])
    expect(contentLength).toBeDefined()
    // Read file in original HTML file
    const originalFile = await readFile(join(__dirname, 'index.html'))
    // HTTP Content-Length header should reflect that modified file is
    // bigger than original after modification
    expect(contentLength).toBeGreaterThan(originalFile.byteLength)

    // Validate HTML document
    const actual = response.text
    expect(actual).toBeTruthy()
    expect(actual).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"en\\"><head>
        <meta charset=\\"utf-8\\">
        <title>XYO 2.0: Block | 2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99</title>
      <meta property=\\"og:title\\" content=\\"XYO 2.0: Block | 2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99\\"><meta property=\\"og:url\\" content=\\"http://127.0.0.1:12345/archive/temp/payload/hash/2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99?network=kerplunk\\"><meta property=\\"twitter:title\\" content=\\"XYO 2.0: Block | 2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99\\"><meta property=\\"description\\" content=\\"A XYO 2.0 network.xyo.location block with the hash 2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99.\\"><meta property=\\"title\\" content=\\"XYO 2.0: Block | 2096d4e1a3c0bf1ead5e7b2144bf98e39d0679c343d79c896a0d836479475e99\\"></head>

      <body>
        <pre>Test</pre>


      </body></html>"
    `)
  })
})
