import { useAsyncEffect } from '@xylabs/react-shared'
import { PayloadFindFilter, XyoPayload } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'

import { RefreshCallback } from './lib'
import { useArchivistStates } from './useArchivistStates'

export const useArchivistFind = <TFilter extends PayloadFindFilter>(filter: TFilter, required = false): [XyoPayload[]?, Error?, RefreshCallback?] => {
  const [savedFilter, setSavedFilter] = useDataState(filter)
  const { archivist, error, payloads, setPayloads, refresh, setError, refreshCount } = useArchivistStates(required)

  setSavedFilter(filter)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist) {
          const result = await archivist.find(savedFilter)
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, savedFilter, setError, setPayloads, refreshCount],
  )
  return [payloads, error, refresh]
}
