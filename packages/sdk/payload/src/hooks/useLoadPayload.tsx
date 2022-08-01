import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useEffect, useState } from 'react'

import { UsePayload } from './ResolvePayloadArgs'

export const useLoadPayload = (hash?: string): UsePayload => {
  const { api } = useArchivistApi()
  const { archive } = useArchive()
  const [localHash, setLocalHash] = useState<string>()
  const [notFound, setNotFound] = useState<boolean>()
  const [apiError, setApiError] = useState<XyoApiError>()
  const [payload, setPayload] = useState<XyoPayload>()

  const reset = () => {
    setPayload(undefined)
    setApiError(undefined)
    setNotFound(undefined)
  }

  // allow for hash changes to retrigger the api call
  useEffect(() => {
    if (hash !== localHash) {
      setLocalHash(hash)
      reset()
    }
  }, [hash, localHash])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api && localHash && localHash.length > 0 && notFound === undefined) {
        reset()
        try {
          const result = await api?.archive(archive).payload.hash(localHash).get()
          if (mounted()) {
            if (result?.length) {
              setPayload(result[0])
              setNotFound(false)
            } else if (result?.length === 0) {
              setNotFound(true)
              setPayload(undefined)
            }
          }
        } catch (e) {
          reset()
          setNotFound(false)
          setApiError(e as XyoApiError)
          console.error(e)
        }
      }
    },
    [hash, api, archive, payload, notFound, localHash]
  )
  return [payload, notFound, apiError]
}
