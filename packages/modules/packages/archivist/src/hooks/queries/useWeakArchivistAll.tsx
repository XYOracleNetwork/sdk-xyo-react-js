import { usePromise } from '@xylabs/react-promise'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { useRefresh } from '@xyo-network/react-module'
import { useState } from 'react'

export const useWeakArchivistAll = (archivist: WeakRef<ArchivistInstance>) => {
  const [error, setError] = useState<Error>()
  const [enabled, refresh] = useRefresh()

  const payloads = usePromise(async () => {
    try {
      if (enabled) {
        return await archivist?.deref()?.all?.()
      }
    } catch (ex) {
      const error = ex as Error
      setError(error)
    }
  }, [archivist, enabled])

  return [payloads, error, refresh]
}
