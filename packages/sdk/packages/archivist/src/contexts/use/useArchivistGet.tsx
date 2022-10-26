import { useAsyncEffect } from '@xylabs/react-shared'
import { WrapperError } from '@xyo-network/module'
import { XyoPayloads } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'

import { RefreshCallback } from './lib'
import { useArchivistStates } from './useArchivistStates'

export const useArchivistGet = <T extends XyoPayloads = XyoPayloads>(ids?: string[], required = false): [T?, WrapperError?, RefreshCallback?] => {
  const [savedIds] = useDataState(ids)
  const { archivistWrapper, error, payloads, refresh, setError, setPayloads, refreshPayloads } = useArchivistStates<T>(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper && savedIds) {
          const result = ((await archivistWrapper.get(savedIds ?? [])) as T) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as WrapperError)
      }
    },
    [archivistWrapper, savedIds, refresh, setError, setPayloads],
  )
  return [payloads, error, refreshPayloads]
}
