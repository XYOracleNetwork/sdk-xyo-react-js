import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { WrapperError } from '@xyo-network/module'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload'
import { useState } from 'react'

import { useArchivist } from './use'

export const useArchivistClear = (required = false): [(XyoPayload | null)[]?, WrapperError?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<WrapperError>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
        await wrapper?.clear()
        if (mounted()) {
          setError(undefined)
          setPayloads([])
        }
      } catch (ex) {
        setError(ex as WrapperError)
      }
    },
    [archivist],
  )
  return [payloads, error]
}
