import { Buffer, bufferPolyfill } from '@xylabs/buffer'
import { IndexedDbArchivist, IndexedDbArchivistConfigSchema } from '@xyo-network/archivist-indexeddb'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'

self.onmessage = async (_event) => {
  interface Myself {
    Buffer: Buffer
    count: number
  }
  type ISelf = Window & typeof globalThis & Myself
  const mySelf = self as unknown as ISelf
  mySelf.count = mySelf.count || 0
  mySelf.count++
  bufferPolyfill()
  const module = await IndexedDbArchivist.create({ config: { schema: IndexedDbArchivistConfigSchema } })
  const archivist = ArchivistWrapper.wrap(module)
  const payload = { count: mySelf.count, schema: 'network.xyo.test' }
  await archivist.insert([payload])
  self.postMessage(mySelf.count.toString())
}
