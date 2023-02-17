import { ModuleResolver } from '@xyo-network/module-model'
import { MemoryNode, ModuleAttachedEventArgs } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { useNode } from './useNode'

export const useMemoryNodeUpdates = () => {
  const [node] = useNode<MemoryNode>()
  const [resolver, setResolver] = useState<ModuleResolver>()
  const [module, setModule] = useState<ModuleAttachedEventArgs>()

  useEffect(() => {
    if (node) {
      node.on('moduleResolverChanged', ({ resolver }) => {
        setResolver(resolver)
      })
      node.on('moduleAttached', (args) => {
        setModule(args)
      })
    }
  }, [node])

  return { module, resolver }
}
