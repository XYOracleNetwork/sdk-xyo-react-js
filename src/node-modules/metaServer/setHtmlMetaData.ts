import { XyoArchivistApi, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { Meta, metaBuilder } from '@xyo-network/sdk-xyo-js'
import cloneDeep from 'lodash/cloneDeep'

const hashFromUri = (uri: string) => {
  const uriParts = uri.split('/')
  let partFound: string | undefined = undefined
  uriParts.forEach((part) => {
    if (part.length === 64) {
      partFound = part
    }
  })
  return partFound
}

export const setHtmlMetaData = async (path: string, html: string, config: Meta) => {
  const hash = hashFromUri(path)

  const meta = cloneDeep(config)
  meta.og = { ...meta.og, url: path }

  if (hash) {
    const api = new XyoArchivistApi({ apiDomain: 'https://beta.api.archivist.xyo.network' })
    const blocks = await api.archive('temp').payload.hash(hash).get()

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
