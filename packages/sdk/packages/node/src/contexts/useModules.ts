import { useAsyncEffect } from '@xylabs/react-shared'
import { ModuleFilter, XyoModule } from '@xyo-network/module'
import { useState } from 'react'

import { useNode } from './useNode'

export const useModules = (filter?: ModuleFilter) => {
  const [node] = useNode()
  const [modules, setModules] = useState<XyoModule[]>()

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
