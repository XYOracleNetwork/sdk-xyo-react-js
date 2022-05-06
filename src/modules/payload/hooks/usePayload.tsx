import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoApiError, XyoPayload } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { useArchive } from '../../archive'
import { useArchivistApi } from '../../archivist-api'

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
