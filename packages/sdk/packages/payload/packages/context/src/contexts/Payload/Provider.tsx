import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { XyoPayload } from '@xyo-network/payload-model'
import { useState } from 'react'

import { PayloadContext } from './Context'

export interface PayloadProviderProps {
  archive?: string
  archivePayloadWrapper?: ArchivistWrapper
  cachePayload?: boolean
  hash?: string
  required?: boolean
}

export const PayloadProvider: React.FC<WithChildren<PayloadProviderProps>> = ({
  archivePayloadWrapper,
  cachePayload = true,
  children,
  hash,
  required = false,
}) => {
  const [payload, setPayload] = useState<XyoPayload | null>()
  const [payloadError, setPayloadError] = useState<Error>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (payload === undefined && hash && archivePayloadWrapper) {
        try {
          const [loadedPayloads] = await archivePayloadWrapper.get([hash])
          setPayload(loadedPayloads)
          setPayloadError(undefined)
        } catch (e) {
          setPayload(undefined)
          setPayloadError(e as Error)
        }
      }
    },
    [payload, hash, archivePayloadWrapper],
  )

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (cachePayload && archivePayloadWrapper && payload) {
        await archivePayloadWrapper.insert([payload])
      }
    },
    [archivePayloadWrapper, cachePayload, payload],
  )

  return (
    <PayloadContext.Provider value={{ payload, payloadError, provided: true, setPayload }}>
      {payload ? children : required ? null : children}
    </PayloadContext.Provider>
  )
}
