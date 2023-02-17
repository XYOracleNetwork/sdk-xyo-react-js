import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload-model'

import { useArchivistStates } from './useArchivistStates'

export const useArchivistInsert = (payloads: XyoPayload[], required = false) => {
  const { archivist, error, payloads: resultPayloads, refresh, setError, setPayloads: setResultPayloads, refreshCount } = useArchivistStates(required)

  const insertRefresh = () => {
    setResultPayloads(undefined)
    setError(undefined)
  }

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && payloads && !resultPayloads && !error) {
          const result = await archivist.insert(payloads)
          if (mounted()) {
            setError(undefined)
            setResultPayloads(result)
          }
        }
      } catch (ex) {
        if (mounted()) {
          setResultPayloads(undefined)
          setError(ex as Error)
        }
      }
    },
    [archivist, refresh, payloads, setError, setResultPayloads, resultPayloads, refreshCount, error],
  )
  return [resultPayloads, error, insertRefresh]
}
