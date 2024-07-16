import { usePromise } from '@xylabs/react-promise'
import { StorageArchivist, StorageArchivistConfigSchema } from '@xyo-network/archivist-storage'
import { ArchivistFormGroupStorage, FormGroupParams } from '@xyo-network/react-form-group'

import { CreditCardInput } from '../../models/index.js'

const StorageNameSpace = 'credit-card-fields'

const calculateTTL = (months = 6) => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000
  const DAYS_PER_MONTH = 30.44
  return months * DAYS_PER_MONTH * MS_PER_DAY
}

export const useFormStorage = () => {
  return usePromise(async () => {
    const localStorageArchivist = await StorageArchivist.create({
      config: { namespace: StorageNameSpace, schema: StorageArchivistConfigSchema, type: 'local' },
    })
    const sessionStorageArchivist = await StorageArchivist.create({
      config: { namespace: StorageNameSpace, schema: StorageArchivistConfigSchema, type: 'session' },
    })

    const storage = {
      sensitive: new ArchivistFormGroupStorage(sessionStorageArchivist),
      storage: new ArchivistFormGroupStorage(localStorageArchivist),
    }

    return { serialize: true, storage, ttlStorage: calculateTTL() } as FormGroupParams<CreditCardInput>
  }, [])
}
