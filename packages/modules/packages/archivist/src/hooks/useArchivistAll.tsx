import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist'

import { useArchivistStates } from './useArchivistStates'

export const useArchivistAll = () => {
  const { archivist, error, payloads, setPayloads, refresh, setError, refreshCount } = useArchivistStates()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? ArchivistWrapper.wrap(archivist) : undefined
        const result = await wrapper?.all()
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, refreshCount, setError, setPayloads],
  )
  return [payloads, error, refresh]
}
