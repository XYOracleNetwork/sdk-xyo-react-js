import { useAsyncEffect } from '@xylabs/react-shared'
import { useState } from 'react'

import { useNode } from './useNode'

export const useModuleAddresses = () => {
  const node = useNode()
  const [attachedAddresses, setAttachedAddresses] = useState<string[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const attached = await node?.attached()
      if (mounted()) {
        setAttachedAddresses(attached)
      }
    },
    [node],
  )

  return [attachedAddresses, node?.registered()]
}
