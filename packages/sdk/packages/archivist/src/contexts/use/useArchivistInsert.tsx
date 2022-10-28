import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'

import { useArchivistStates } from './useArchivistStates'

export const useArchivistInsert = (payloads: XyoPayload[], required = false) => {
  const [savedPayloads] = useDataState(payloads)
  const { archivist, error, payloads: resultPayloads, refresh, setError, setPayloads: setResultPayloads, refreshCount } = useArchivistStates(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && savedPayloads) {
          const result = await archivist.insert(savedPayloads)
          if (mounted()) {
            setError(undefined)
            setResultPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, refresh, savedPayloads, setError, setResultPayloads, refreshCount],
  )
  return [resultPayloads, error, refresh]
}
