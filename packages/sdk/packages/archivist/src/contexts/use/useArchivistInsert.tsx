import { useAsyncEffect } from '@xylabs/react-shared'
import { WrapperError } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload'
import { useDataState } from '@xyo-network/react-shared'

import { useArchivistStates } from './useArchivistStates'

export const useArchivistInsert = (payloads: XyoPayload[], required = false): [(XyoPayload | null)[]?, WrapperError?] => {
  const [savedPayloads] = useDataState(payloads)
  const { archivistWrapper, error, payloads: resultPayloads, refresh, setError, setPayloads: setResultPayloads } = useArchivistStates(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper && savedPayloads) {
          const result = await archivistWrapper.insert(savedPayloads)
          if (mounted()) {
            setError(undefined)
            setResultPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as WrapperError)
      }
    },
    [archivistWrapper, refresh, savedPayloads, setError, setResultPayloads],
  )
  return [resultPayloads, error]
}
