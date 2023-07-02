import { usePromise } from '@xylabs/react-promise'
import { AccountInstance } from '@xyo-network/account-model'
import { ArchivistModule } from '@xyo-network/archivist'
import { useRefresh } from '@xyo-network/react-module'
import { useState } from 'react'

import { useWrappedArchivist } from '../useWrappedArchivist'

export const useArchivistAll = (archivist: ArchivistModule, account?: AccountInstance) => {
  const [wrappedArchivist] = useWrappedArchivist(archivist, account)
  const [error, setError] = useState<Error>()
  const [enabled, refresh] = useRefresh()

  const payloads = usePromise(async () => {
    try {
      if (enabled) {
        return await wrappedArchivist?.all()
      }
    } catch (ex) {
      const error = ex as Error
      setError(error)
    }
  }, [wrappedArchivist, enabled])

  return [payloads, error, refresh]
}
