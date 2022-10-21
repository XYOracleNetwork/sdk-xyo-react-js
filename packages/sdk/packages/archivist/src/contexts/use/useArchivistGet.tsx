import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayloads } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'

import { RefreshCallback } from './lib'
import { useArchivistStates } from './useArchivistStates'

export const useArchivistGet = (ids?: string[], required = false): [XyoPayloads?, Error?, RefreshCallback?] => {
  const [savedIds] = useDataState(ids)
  const { archivistWrapper, error, payloads, refresh, setError, setPayloads, refreshPayloads } = useArchivistStates(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper && savedIds) {
          const result = (await archivistWrapper.get(savedIds ?? [])) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivistWrapper, savedIds, refresh, setError, setPayloads],
  )
  return [payloads, error, refreshPayloads]
}
