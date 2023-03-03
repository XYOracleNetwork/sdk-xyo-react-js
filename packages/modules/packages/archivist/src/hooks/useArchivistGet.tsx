import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload-model'
import { useDataState } from '@xyo-network/react-shared'

import { RefreshCallback, useArchivistStates } from './useArchivistStates'

export const useArchivistGet = <T extends XyoPayload = XyoPayload>(hashes?: string[]): [T[]?, Error?, RefreshCallback?] => {
  const [savedHashes, setSavedHashes] = useDataState(hashes)
  setSavedHashes(hashes)

  const { archivist, error, payloads, refresh, setError, setPayloads, refreshCount } = useArchivistStates<T>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && savedHashes) {
          const result = (await archivist.get(savedHashes ?? [])) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result as T[])
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, savedHashes, refreshCount, setError, setPayloads],
  )
  return [payloads, error, refresh]
}
