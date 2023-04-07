import { useAsyncEffect } from '@xylabs/react-async-effect'
import { useState } from 'react'

import { useNode } from './useNode'

export const useNodeAttachedAddresses = () => {
  const [node] = useNode()
  const [addresses, setAddresses] = useState<string[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const attached = await node?.attached()
      if (mounted()) {
        setAddresses(attached)
      }
    },
    [node],
  )

  return [addresses, node?.registered()]
}
