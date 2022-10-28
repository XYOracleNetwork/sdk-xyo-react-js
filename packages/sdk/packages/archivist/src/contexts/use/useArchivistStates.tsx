import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload'
import { useEffect, useState } from 'react'

import { useArchivist } from './use'

export const useArchivistStates = <T extends XyoPayload = XyoPayload>(required: boolean) => {
  const { archivist: archivistFromHook } = useArchivist(required)
  const [payloads, setPayloads] = useState<T[]>()
  const [error, setError] = useState<Error>()
  const [refreshCount, setRefreshCount] = useState(1)
  const refreshPayloads = () => setRefreshCount((previous) => previous + 1)

  const [archivist, setArchivist] = useState<XyoArchivistWrapper>()

  useEffect(() => {
    if (archivistFromHook) {
      setArchivist(new XyoArchivistWrapper(archivistFromHook))
    }
  }, [archivistFromHook])

  return { archivist, error, payloads, refresh: refreshPayloads, refreshCount, setError, setPayloads }
}
