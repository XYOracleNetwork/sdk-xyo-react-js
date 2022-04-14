import { XyoArchivistApi, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { Meta, metaBuilder } from '@xyo-network/sdk-xyo-js'
import cloneDeep from 'lodash/cloneDeep'

import { getArchiveFromUri, getDomainFromUri, getHashFromUri } from '../../lib'

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
