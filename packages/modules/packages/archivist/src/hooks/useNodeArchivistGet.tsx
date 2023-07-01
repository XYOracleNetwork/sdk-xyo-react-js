import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Archivist } from '@xyo-network/archivist'
import { Payload } from '@xyo-network/payload-model'
import { useCallback, useState } from 'react'

import { useNodeArchivist } from './useNodeArchivist'
import { RefreshCallback } from './useNodeArchivistStates'

export const useNodeArchivistGet = <T extends Payload = Payload>(
  hashes?: string[],
  archivist?: Archivist | string,
): [T[]?, Error?, RefreshCallback?] => {
  const requestedArchivistNameOrAddress = typeof archivist === 'string' ? archivist : undefined
  const passedArchivist = typeof archivist === 'object' ? archivist : undefined
  const [payloads, setPayloads] = useState<T[]>()
  const [foundArchivist, foundArchivistError] = useNodeArchivist(requestedArchivistNameOrAddress)
  const [error, setError] = useState<Error>()
  const [refresh, setRefresh] = useState(0)

  const onRefresh = useCallback(() => {
    setRefresh(refresh + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const archivistToUse = passedArchivist ?? foundArchivist
        if (archivistToUse && hashes) {
          const result = ((await archivistToUse.get(hashes ?? [])) as T[]) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result as T[])
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [passedArchivist, foundArchivist, hashes, refresh, setError, setPayloads],
  )
  return [payloads, error ?? foundArchivistError, onRefresh]
}
