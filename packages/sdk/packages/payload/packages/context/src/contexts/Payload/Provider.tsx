import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { XyoPayload } from '@xyo-network/payload-model'
import { useState } from 'react'

import { PayloadContext } from './Context'

export interface PayloadProviderProps {
  /** @deprecated - no longer used */
  archive?: string
  /** @deprecated - use archivist prop instead */
  archivePayloadWrapper?: ArchivistWrapper
  archivist?: ArchivistWrapper
  cachePayload?: boolean
  hash?: string
  required?: boolean
}

export const PayloadProvider: React.FC<WithChildren<PayloadProviderProps>> = ({
  archivist,
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
      if (hash && archivist) {
        try {
          const [loadedPayloads] = await archivist.get([hash])
          setPayload(loadedPayloads ? loadedPayloads : null)
          setPayloadError(undefined)
        } catch (e) {
          setPayload(undefined)
          setPayloadError(e as Error)
        }
      }
    },
    [hash, archivist],
  )

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (cachePayload && archivist && payload) {
        await archivist.insert([payload])
      }
    },
    [archivist, cachePayload, payload],
  )

  return (
    <PayloadContext.Provider value={{ payload, payloadError, provided: true, setPayload }}>
      {payload ? children : required ? null : children}
    </PayloadContext.Provider>
  )
}
