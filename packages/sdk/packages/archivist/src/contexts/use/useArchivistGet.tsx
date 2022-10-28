import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'

import { RefreshCallback } from './lib'
import { useArchivistStates } from './useArchivistStates'

export const useArchivistGet = <T extends XyoPayload = XyoPayload>(ids?: string[], required = false): [T[]?, Error?, RefreshCallback?] => {
  const [savedIds, setSavedIds] = useDataState(ids)
  setSavedIds(ids)

  const { archivist, error, payloads, refresh, setError, setPayloads, refreshCount } = useArchivistStates<T>(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && savedIds) {
          const result = (await archivist.get(savedIds ?? [])) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result as T[])
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, savedIds, refreshCount, setError, setPayloads],
  )
  return [payloads, error, refresh]
}
