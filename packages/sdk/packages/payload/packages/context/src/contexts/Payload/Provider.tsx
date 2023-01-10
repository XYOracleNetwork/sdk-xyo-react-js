import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload-model'
import { useArchiveArchivists } from '@xyo-network/react-node'
import { useState } from 'react'

import { PayloadContext } from './Context'

export interface PayloadProviderProps {
  required?: boolean
  hash?: string
  archive?: string
}

export const PayloadProvider: React.FC<WithChildren<PayloadProviderProps>> = ({ required = false, archive = 'temp', hash, children }) => {
  const { archivePayloadWrapper } = useArchiveArchivists(archive)
  const [payload, setPayload] = useState<XyoPayload | null>()
  const [payloadError, setPayloadError] = useState<Error>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (payload === undefined && hash && archivePayloadWrapper) {
        try {
          const [loadedPayloads] = await archivePayloadWrapper.get([hash])
          if (mounted()) {
            setPayload(loadedPayloads)
            setPayloadError(undefined)
          }
        } catch (e) {
          setPayload(undefined)
          setPayloadError(e as Error)
        }
      }
    },
    [payload, hash, archivePayloadWrapper],
  )

  return (
    <PayloadContext.Provider value={{ payload, payloadError, provided: true, setPayload }}>
      {payload ? children : required ? null : children}
    </PayloadContext.Provider>
  )
}
