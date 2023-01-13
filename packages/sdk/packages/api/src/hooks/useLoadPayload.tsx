import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload-model'
import { useEffect, useState } from 'react'

import { useArchive } from '../archive'
import { useApi } from '../contexts'
import { UsePayload } from './ResolvePayloadArgs'

/** @deprecated - use a node query instead */
export const useLoadPayloadViaApi = (hash?: string): UsePayload => {
  const { api } = useApi()
  const { archive } = useArchive()
  const [localHash, setLocalHash] = useState<string>()
  const [notFound, setNotFound] = useState<boolean>()
  const [xyoError, setXyoError] = useState<XyoError>()
  const [payload, setPayload] = useState<XyoPayload>()

  const reset = () => {
    setPayload(undefined)
    setXyoError(undefined)
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
          const error = e as Error
          reset()
          setNotFound(false)
          setXyoError({ message: error.message, schema: XyoErrorSchema, sources: [] })
          console.error(e)
        }
      }
    },
    [hash, api, archive, payload, notFound, localHash],
  )
  return [payload, notFound, xyoError]
}
