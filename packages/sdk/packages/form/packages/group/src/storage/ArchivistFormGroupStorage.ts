import { ArchivistInstance } from '@xyo-network/archivist-model'
import { Payload } from '@xyo-network/payload-model'

import { FormGroupStorage } from './FormGroupStorage.ts'

export class ArchivistFormGroupStorage implements FormGroupStorage {
  constructor(private archivist: ArchivistInstance) {}

  async clear() {
    await this.archivist.clear?.()
  }

  async get() {
    const all = await this.archivist.all?.()
    return all.at(-1)
  }

  async insert(value: Payload) {
    await this.archivist.insert?.([value])
  }
}
