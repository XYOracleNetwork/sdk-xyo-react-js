import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useState } from 'react'

export const usePayload = (hash?: string): [XyoPayload | undefined, boolean, XyoApiError | undefined] => {
  const { api } = useArchivistApi()
  const { archive } = useArchive()
  const [notFound, setNotFound] = useState(false)
  const [apiError, setApiError] = useState<XyoApiError>()
  const [payload, setPayload] = useState<XyoPayload>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (hash && hash.length > 0) {
        try {
          const result = await api?.archive(archive).payload.hash(hash).get()
          if (mounted()) {
            setApiError(undefined)
            if (result?.length) {
              setPayload(result[0])
            } else if (result) {
              setNotFound(true)
              setPayload(undefined)
            }
          }
        } catch (e) {
          setApiError(e as XyoApiError)
          setPayload(undefined)
          console.error(e)
        }
      }
    },
    [hash, api, archive]
  )
  return [payload, notFound, apiError]
}
