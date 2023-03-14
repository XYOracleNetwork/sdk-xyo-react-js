import { ModuleResolver } from '@xyo-network/module-model'
import { ModuleAttachedEventArgs } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { useNode } from './useNode'

interface UseMemoryNodeUpdates {
  module?: ModuleAttachedEventArgs
  /** @deprecated - use module events instead */
  resolver?: ModuleResolver
}

export const useMemoryNodeUpdates = (refreshAddresses?: string[]): UseMemoryNodeUpdates => {
  const [node] = useNode()
  const [module, setModule] = useState<ModuleAttachedEventArgs>()

  useEffect(() => {
    if (node) {
      node.module.on('moduleAttached', (args: ModuleAttachedEventArgs) => {
        if (refreshAddresses) {
          if (refreshAddresses.some((address) => address === args?.module.address)) setModule(args)
        } else {
          setModule(args)
        }
      })
    }
  }, [refreshAddresses, node])

  return {
    module,
  }
}
