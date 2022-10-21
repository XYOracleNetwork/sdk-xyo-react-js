import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloadFindFilter } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'
import { useState } from 'react'

import { RefreshCallback } from './lib'
import { useArchivistStates } from './useArchivistStates'

export const useArchivistFind = <TFilter extends XyoPayloadFindFilter>(
  filter: TFilter,
  required = false,
): [XyoPayload[]?, Error?, RefreshCallback?] => {
  const [savedFilter] = useDataState(filter)
  const [payloads, setPayloads] = useState<XyoPayload[]>()
  const { archivistWrapper, error, refresh, setError, refreshPayloads } = useArchivistStates(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper) {
          const result = await archivistWrapper.find(savedFilter)
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivistWrapper, refresh, savedFilter, setError],
  )
  return [payloads, error, refreshPayloads]
}
