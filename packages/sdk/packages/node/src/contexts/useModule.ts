import { useAsyncEffect } from '@xylabs/react-shared'
import { Module, ModuleDiscoverQuerySchema } from '@xyo-network/module'
import { useState } from 'react'

import { useWrappedNode } from './useNode'

export const useModule = <TModule extends Module = Module>(addressOrName?: string, query: string[][] = [[ModuleDiscoverQuerySchema]]) => {
  const node = useWrappedNode()
  const [module, setModule] = useState<TModule>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (addressOrName) {
        const module = await node?.resolve<TModule>(addressOrName)
        if (mounted()) {
          setModule(module)
        }
      } else {
        const module = (await node?.resolve<TModule>({ query }))?.pop()
        if (mounted()) {
          setModule(module)
        }
      }
    },
    [node, addressOrName, query],
  )

  return module
}
