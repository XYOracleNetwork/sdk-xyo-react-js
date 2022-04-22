import { XyoArchivistApi, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { Meta, metaBuilder } from '@xyo-network/sdk-xyo-js'
import cloneDeep from 'lodash/cloneDeep'

import { getArchiveFromUri, getArchivistDomainFromExploreUri, getHashFromUri } from '../../lib'

export const setHtmlMetaData = async (path: string, html: string, config: Meta): Promise<string> => {
  console.log(`Getting info for HTML path ${path}`)

  const hash = getHashFromUri(path)
  const apiDomain = getArchivistDomainFromExploreUri(path)
  const archive = getArchiveFromUri(path)

  const meta = cloneDeep(config)

  console.log(`Archivist Payload Hash/API Domain/Archive: ${hash}/${apiDomain}/${archive}`)

  if (hash && apiDomain && archive) {
    const api = new XyoArchivistApi({ apiDomain })
    // TODO: We're only getting payloads, handle bound witnesses
    try {
      console.log('Getting block from Archivist')
      const blocks = await api.archive(archive).payload.hash(hash).get()
      console.log(`Got blocks from Archivist: ${blocks}`)
      if (blocks && blocks.length > 0) {
        console.log(`Wrapping block [0]: ${blocks[0]}`)
        const wrapper = new XyoPayloadWrapper(blocks[0])
        console.log('Wrapped block [0]')
        console.log('Calculating sorted hash')
        const hash = wrapper.sortedHash()
        console.log(`Calculated sorted hash: ${hash}`)
        meta.title = `XYO 2.0: Block | ${hash}`
        meta.description = `A XYO 2.0 ${wrapper.body.schema} block with the hash ${hash}.`
      }
    } catch (error) {
      console.log('========== Error ==============')
      console.log(error)
      console.log('===============================')
    }
  }

  meta.og = { ...meta.og, title: meta.title, url: path } as typeof meta.og
  meta.twitter = { ...meta.twitter, title: meta.title }
  console.log('Building HTML meta')
  const updated = metaBuilder(html, meta)
  console.log('Built HTML meta')
  console.log(updated)
  return updated
}
