import { ModuleResolver } from '@xyo-network/module-model'
import { MemoryNode } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { useNode } from '../useNode'

export const useMemoryNodeUpdates = () => {
  const [node] = useNode<MemoryNode>()
  const [resolver, seResolver] = useState<ModuleResolver>()

  useEffect(() => {
    if (node) {
      node.on('moduleResolverChanged', ({ resolver }) => {
        seResolver(resolver)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { resolver }
}
