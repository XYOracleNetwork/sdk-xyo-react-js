import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist'

import { useArchivistStates } from './useArchivistStates'

export const useArchivistClear = (required = false) => {
  const { archivist, error, payloads, setPayloads, refresh, setError, refreshCount } = useArchivistStates(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new ArchivistWrapper(archivist) : undefined
        await wrapper?.clear()
        if (mounted()) {
          setError(undefined)
          setPayloads([])
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, refreshCount, setError, setPayloads],
  )
  return [payloads, error, refresh]
}
