import { useAsyncEffect } from '@xylabs/react-shared'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModules = <TModule extends Module = Module>(filter?: ModuleFilter): [TModule[] | undefined, Error | undefined] => {
  const [node, nodeError] = useProvidedWrappedNode()
  const [modules, setModules] = useState<TModule[]>()
  const [error, setError] = useState<Error>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (nodeError) {
          setError(nodeError)
          setModules(undefined)
        } else {
          if (node) {
            const modules: TModule[] | undefined = await node.resolve<TModule>(filter)
            if (mounted()) {
              setModules(modules)
              setError(undefined)
            }
          } else {
            setError(undefined)
            setModules(undefined)
          }
        }
      } catch (ex) {
        if (mounted()) {
          const error = ex as Error
          setError(error)
          setModules(undefined)
        }
      }
    },
    [filter, node, nodeError],
  )

  return [modules, error]
}
