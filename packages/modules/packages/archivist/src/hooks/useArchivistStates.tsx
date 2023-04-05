import { ArchivistWrapper } from '@xyo-network/archivist'
import { Payload } from '@xyo-network/payload-model'
import { useEffect, useState } from 'react'

import { useArchivist } from './useArchivist'

export type RefreshCallback = () => void

export const useArchivistStates = <T extends Payload = Payload>() => {
  const [archivistFromHook] = useArchivist()
  const [payloads, setPayloads] = useState<T[]>()
  const [error, setError] = useState<Error>()
  const [refreshCount, setRefreshCount] = useState(1)
  const refreshPayloads = () => setRefreshCount((previous) => previous + 1)

  const [archivist, setArchivist] = useState<ArchivistWrapper>()

  useEffect(() => {
    if (archivistFromHook) {
      setArchivist(ArchivistWrapper.wrap(archivistFromHook))
    }
  }, [archivistFromHook])

  return { archivist, error, payloads, refresh: refreshPayloads, refreshCount, setError, setPayloads }
}
