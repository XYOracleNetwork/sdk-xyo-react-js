import { asyncHandler } from '@xylabs/sdk-api-express-ecs'
import { XyoArchivistApi, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { Meta, metaBuilder } from '@xyo-network/sdk-xyo-js'
import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import cloneDeep from 'lodash/cloneDeep'
import { extname, join } from 'path'

import { getAdjustedPath, getArchiveFromUri, getDomainFromUri, getHashFromUri } from '../../lib'
import { MountPathAndMiddleware } from '../../types'

// TODO: Pass in
const dirName = './build'
// TODO: Pass in
let config = {}

// TODO: Do via initialization method
try {
  config = JSON.parse(readFileSync(join(dirName, 'meta.json'), { encoding: 'utf-8' }) ?? '{}')
} catch (ex) {
  console.warn('No config found!  Please create a config at meta.json file in your ./build folder')
}

// TODO: Break out to package private file
export const setHtmlMetaData = async (path: string, html: string, config: Meta) => {
  const hash = getHashFromUri(path)
  const apiDomain = getDomainFromUri(path)
  const archive = getArchiveFromUri(path)

  const meta = cloneDeep(config)
  meta.og = { ...meta.og, url: path }

  if (hash && apiDomain && archive) {
    const api = new XyoArchivistApi({ apiDomain })
    const blocks = await api.archive(archive).payload.hash(hash).get()
    if (blocks && blocks.length > 0) {
      const wrapper = new XyoPayloadWrapper(blocks[0])
      const hash = wrapper.sortedHash()
      meta.title = `XYO 2.0: Block | ${hash}`
      meta.description = `A XYO 2.0 ${wrapper.body.schema} block with the hash "${hash}".`
      meta.og = { ...meta.og, title: meta.title } as typeof meta.og
      meta.twitter = { ...meta.twitter, title: meta.title }
    }
  }

  return metaBuilder(html, meta)
}

const handler = asyncHandler(async (req, res, next) => {
  const adjustedPath = getAdjustedPath(req)
  if (config && extname(adjustedPath) === '.html') {
    const html = await readFile(join(dirName, 'index.html'), { encoding: 'utf-8' })
    const updatedHtml = await setHtmlMetaData(`${req.protocol}://${req.headers.host}${req.url}`, html, config)
    res.send(updatedHtml)
  } else {
    res.send(await readFile(join(dirName, adjustedPath)))
    next()
  }
})

export const setMetadataForArchivistBlock: MountPathAndMiddleware = ['get', ['*', handler]]
