import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload-model'
import { useArchivist } from '@xyo-network/react-archivist'
import { useState } from 'react'

import { PayloadContext } from './Context'

export interface PayloadProviderProps {
  required?: boolean
  hash?: string
}

export const PayloadProvider: React.FC<WithChildren<PayloadProviderProps>> = ({ required = false, hash, children }) => {
  const { archivist } = useArchivist()
  const [payload, setPayload] = useState<XyoPayload | null>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (payload === undefined && hash) {
        const wrapper = archivist ? new ArchivistWrapper(archivist) : undefined
        const loadedPayloads = (await wrapper?.get([hash])) ?? []
        if (mounted()) {
          setPayload(loadedPayloads?.pop() ?? null)
        }
      }
    },
    [archivist, payload, hash],
  )

  return (
    <PayloadContext.Provider value={{ payload, provided: true, setPayload }}>
      {payload ? children : required ? null : children}
    </PayloadContext.Provider>
  )
}
