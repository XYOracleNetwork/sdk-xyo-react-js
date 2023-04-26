import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { WithChildren } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { Payload } from '@xyo-network/payload-model'
import { useEffect, useState } from 'react'

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
  const [payload, setPayload] = useState<Payload | null>()
  const [payloadError, setPayloadError] = useState<Error>()

  const refreshPayload = () => {
    setPayload(undefined)
  }

  const clearPayload = () => {
    setPayload(null)
  }

  useEffect(() => {
    refreshPayload()
  }, [archivist])

  /**
   * Key States
   * payload === undefined - ready to attempt to fetch
   * payload === null - tried to fetch and was unsuccessful
   */
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (hash && archivist && payload === undefined) {
        try {
          const [loadedPayloads] = await archivist.get([hash])
          setPayload(loadedPayloads ? loadedPayloads : null)
          setPayloadError(undefined)
        } catch (e) {
          setPayload(null)
          setPayloadError(e as Error)
        }
      }
    },
    [hash, archivist, payload],
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
    <PayloadContext.Provider value={{ clearPayload, payload, payloadError, provided: true, refreshPayload, setPayload }}>
      {payload ? children : required ? null : children}
    </PayloadContext.Provider>
  )
}
