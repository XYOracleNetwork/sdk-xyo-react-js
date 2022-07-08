import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useState } from 'react'

import { UsePayloadArgs } from './ResolvePayloadArgs'

export const usePayload = (hash?: string): UsePayloadArgs => {
  const { api } = useArchivistApi()
  const { archive } = useArchive()
  const [notFound, setNotFound] = useState<boolean>()
  const [apiError, setApiError] = useState<XyoApiError>()
  const [payload, setPayload] = useState<XyoPayload>()

  const reset = () => {
    setPayload(undefined)
    setApiError(undefined)
    setNotFound(undefined)
  }

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api && hash && hash.length > 0) {
        try {
          reset()
          const result = await api?.archive(archive).payload.hash(hash).get()
          if (mounted()) {
            if (result?.length) {
              setPayload(result[0])
            } else if (result) {
              setNotFound(true)
              setPayload(undefined)
            }
          }
        } catch (e) {
          reset()
          setApiError(e as XyoApiError)
          console.error(e)
        }
      }
    },
    [hash, api, archive]
  )
  return [payload, notFound, apiError]
}
