import { useAsyncEffect } from '@xylabs/react-shared'
import { Module, ModuleFilter } from '@xyo-network/module'
import { NodeModule } from '@xyo-network/node'
import { useState } from 'react'

import { useNode } from './useNode'

export const useModules = (filter?: ModuleFilter, refresher?: unknown) => {
  const [node] = useNode<NodeModule>()
  const [modules, setModules] = useState<Module[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const modules = await node?.downResolver.resolve(filter)
      if (mounted()) {
        setModules(modules)
      }
    },
    [filter, node, refresher],
  )

  return modules
}
