import type { Utm, UtmSchema } from '@xyo-network/advertising-payload-plugins'
import { isUtm } from '@xyo-network/advertising-payload-plugins'
import { StorageArchivist, StorageArchivistConfigSchema } from '@xyo-network/archivist-storage'
import type { Payload } from '@xyo-network/payload-model'

const STORAGE_NAME_SPACE = 'utm' as const

let archivist: StorageArchivist | undefined

/**
 * Find or create a single instance of the UtmStorageArchivist
 * @returns Archivist instance
 */
export const UtmStorageArchivist = async () => {
  if (archivist) {
    return archivist
  } else {
    archivist = await StorageArchivist.create({
      account: 'random',
      config: {
        schema: StorageArchivistConfigSchema, namespace: STORAGE_NAME_SPACE, type: 'session',
      },
    })
    return archivist
  }
}

export const LatestUtmPayload = async (): Promise<Payload<Utm, UtmSchema> | undefined> => {
  const archivist = await UtmStorageArchivist()
  return (await archivist.next()).find(isUtm) as Payload<Utm, UtmSchema>
}
