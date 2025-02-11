import type { Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import type { ArchivistInstance, ArchivistModuleInstance } from '@xyo-network/archivist-model'
import type { Payload } from '@xyo-network/payload-model'
import type { PropsWithChildren } from 'react'
import React, {
  useCallback, useEffect, useState,
} from 'react'

import { PayloadContext } from './Context.ts'

export interface PayloadProviderProps {
  /** @deprecated - no longer used */
  archive?: string
  /** @deprecated - use archivist prop instead */
  archivePayloadWrapper?: ArchivistModuleInstance
  archivist?: ArchivistInstance
  cachePayload?: boolean
  hash?: Hash
  required?: boolean
}

export const PayloadProvider: React.FC<PropsWithChildren<PayloadProviderProps>> = ({
  archivist,
  cachePayload = true,
  children,
  hash,
  required = false,
}) => {
  const [payload, setPayload] = useState<Payload | null>()
  const [payloadError, setPayloadError] = useState<Error>()

  const refreshPayload = useCallback(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setPayload(undefined)
  }, [setPayload])

  const clearPayload = () => {
    setPayload(null)
  }

  useEffect(() => {
    refreshPayload()
  }, [archivist, hash])

  /**
   * Key States
   * payload === undefined - ready to attempt to fetch
   * payload === null - tried to fetch and was unsuccessful
   */
  usePromise(
    async () => {
      if (hash && archivist && payload === undefined) {
        try {
          const [loadedPayloads] = await archivist.get([hash])
          setPayload(loadedPayloads ?? null)
          setPayloadError(undefined)
        } catch (e) {
          setPayload(null)
          setPayloadError(e as Error)
        }
      }
    },
    [hash, archivist, payload],
  )

  usePromise(
    async () => {
      if (cachePayload && archivist && payload) {
        await archivist.insert([payload])
      }
    },
    [archivist, cachePayload, payload],
  )

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <PayloadContext.Provider value={{
      clearPayload, payload, payloadError, provided: true, refreshPayload, setPayload,
    }}
    >
      {payload
        ? children
        : required
          ? null
          : children}
    </PayloadContext.Provider>
  )
}
