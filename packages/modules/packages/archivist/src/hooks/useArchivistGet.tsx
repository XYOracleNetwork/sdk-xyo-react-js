import { usePromise } from '@xylabs/react-promise'
import { AccountInstance } from '@xyo-network/account-model'
import { ArchivistModule } from '@xyo-network/archivist'
import { useState } from 'react'

import { useRefresh } from './useRefresh'
import { useWrappedArchivist } from './useWrappedArchivist'

export const useArchivistGet = (archivist?: ArchivistModule, hashes?: string[], account?: AccountInstance) => {
  const [wrappedArchivist] = useWrappedArchivist(archivist, account)
  const [error, setError] = useState<Error>()
  const [enabled, refresh] = useRefresh()

  const payloads = usePromise(async () => {
    try {
      if (enabled && wrappedArchivist && hashes) {
        return await wrappedArchivist?.get(hashes)
      }
    } catch (ex) {
      const error = ex as Error
      setError(error)
    }
  }, [wrappedArchivist, hashes, enabled])

  return [payloads, error, refresh]
}
