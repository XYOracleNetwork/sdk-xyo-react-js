import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayloads } from '@xyo-network/payload'
import { useEffect, useState } from 'react'

import { useArchivist } from './use'

export const useArchivistStates = <T extends XyoPayloads = XyoPayloads>(required: boolean) => {
  const [payloads, setPayloads] = useState<T>()
  const { archivist } = useArchivist(required)
  const [error, setError] = useState<Error>()
  const [refresh, setRefresh] = useState(1)
  const refreshPayloads = () => setRefresh((previous) => previous + 1)

  const [archivistWrapper, setArchivistWrapper] = useState<XyoArchivistWrapper>()

  useEffect(() => {
    if (archivist) {
      setArchivistWrapper(new XyoArchivistWrapper(archivist))
    }
  }, [archivist])

  return { archivistWrapper, error, payloads, refresh, refreshPayloads, setError, setPayloads }
}
