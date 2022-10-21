import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload'
import { useState } from 'react'

import { useArchivist } from './use'

export const useArchivistAll = (required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
        const result = await wrapper?.all()
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist],
  )
  return [payloads, error]
}
