import { useAsyncEffect } from '@xylabs/react-async-effect'
import { NodeModule } from '@xyo-network/node'
import { useMemo, useState } from 'react'

import { useProvidedNode } from './useProvidedNode'

export const useProvidedNodeAttachedAddresses = (node?: NodeModule) => {
  const [providedNode] = useProvidedNode()
  const [addresses, setAddresses] = useState<string[]>()

  const nodeToUse = useMemo(() => node ?? providedNode, [node, providedNode])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const attached = await nodeToUse?.attached()
      if (mounted()) {
        setAddresses(attached)
      }
    },
    [nodeToUse],
  )

  return [addresses]
}
