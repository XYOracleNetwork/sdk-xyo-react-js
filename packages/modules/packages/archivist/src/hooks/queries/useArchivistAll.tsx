import { usePromise } from '@xylabs/react-promise'
import { ArchivistInstance } from '@xyo-network/archivist'
import { useRefresh } from '@xyo-network/react-module'
import { useState } from 'react'

export const useArchivistAll = (archivist: ArchivistInstance) => {
  const [error, setError] = useState<Error>()
  const [enabled, refresh] = useRefresh()

  const payloads = usePromise(async () => {
    try {
      if (enabled) {
        return await archivist?.all?.()
      }
    } catch (ex) {
      const error = ex as Error
      setError(error)
    }
  }, [archivist, enabled])

  return [payloads, error, refresh]
}
