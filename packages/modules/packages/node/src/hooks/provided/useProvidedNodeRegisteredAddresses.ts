import { useAsyncEffect } from '@xylabs/react-async-effect'
import { NodeInstance } from '@xyo-network/node'
import { useMemo, useState } from 'react'

import { useProvidedNode } from './useProvidedNode'

export const useProvidedNodeRegisteredAddresses = (node?: NodeInstance) => {
  const [providedNode] = useProvidedNode()
  const [addresses, setAddresses] = useState<string[]>()

  const nodeToUse = useMemo(() => node ?? providedNode, [node, providedNode])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const registered = await nodeToUse?.registered()
      if (mounted()) {
        setAddresses(registered)
      }
    },
    [nodeToUse],
  )

  return [addresses]
}
