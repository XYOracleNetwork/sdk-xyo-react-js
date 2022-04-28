import { Meta, metaBuilder } from '@xyo-network/sdk-meta'
import { XyoArchivistApi, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import cloneDeep from 'lodash/cloneDeep'

import { getArchiveFromUri, getArchivistDomainFromExploreUri, getHashFromUri } from '../../lib'

export const setHtmlMetaData = async (path: string, html: string, config: Meta): Promise<string> => {
  const hash = getHashFromUri(path)
  const apiDomain = getArchivistDomainFromExploreUri(path)
  const archive = getArchiveFromUri(path)
  const meta = cloneDeep(config)
  if (hash && apiDomain && archive) {
    const api = new XyoArchivistApi({ apiDomain })
    // TODO: We're only getting payloads, handle bound witnesses
    try {
      const blocks = await api.archive(archive).payload.hash(hash).get()
      if (blocks && blocks.length > 0) {
        const wrapper = new XyoPayloadWrapper(blocks[0])
        const hash = wrapper.sortedHash()
        meta.title = `XYO 2.0: Block | ${hash}`
        meta.description = `A XYO 2.0 ${wrapper.body.schema} block with the hash ${hash}.`
      }
    } catch (error) {
      console.log(error)
    }
  }

  meta.og = { ...meta.og, title: meta.title, url: path } as typeof meta.og
  meta.twitter = { ...meta.twitter, title: meta.title }
  const updated = metaBuilder(html, meta)
  return updated
}
