import { useAsyncEffect } from '@xylabs/react-shared'
import { Module, ModuleFilter } from '@xyo-network/module'
import { AbstractNode } from '@xyo-network/node'
import { useState } from 'react'

import { useNode } from './useNode'

export const useModules = (filter?: ModuleFilter) => {
  const [node] = useNode<AbstractNode>()
  const [modules, setModules] = useState<Module[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const modules = await node?.resolve(filter)
      if (mounted()) {
        setModules(modules)
      }
    },
    [filter, node],
  )

  return modules
}
