import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { useWrapperWallet } from '@xyo-network/react-wallet'

import { useNodeArchivistStates } from './useNodeArchivistStates'

export const useNodeArchivistAll = () => {
  const { archivist, error, payloads, setPayloads, refresh, setError, refreshCount } = useNodeArchivistStates()
  const wrapperWallet = useWrapperWallet()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist && wrapperWallet ? ArchivistWrapper.wrap(archivist, wrapperWallet) : undefined
        const result = await wrapper?.all()
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, refreshCount, setError, setPayloads, wrapperWallet],
  )
  return [payloads, error, refresh]
}
