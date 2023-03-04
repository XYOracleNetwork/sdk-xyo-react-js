import { useAsyncEffect } from '@xylabs/react-shared'
import { Module } from '@xyo-network/module-model'
import { useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModule = <TModule extends Module = Module>(nameOrAddress?: string): [TModule | undefined, Error | undefined] => {
  const [node, nodeError] = useProvidedWrappedNode()
  const [module, setModule] = useState<TModule>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (nodeError) {
          console.log(`Setting NodeError [${nodeError.message}]`)
          setError(nodeError)
          setModule(undefined)
        } else {
          if (node) {
            const module: TModule | undefined = nameOrAddress ? await node.resolve<TModule>(nameOrAddress) : (await node.resolve<TModule>()).pop()
            if (mounted()) {
              console.log(`Setting Module [${module?.address}]`)
              setModule(module)
              setError(undefined)
            }
          } else {
            console.log('Setting All to undefined')
            setError(undefined)
            setModule(undefined)
          }
        }
      } catch (ex) {
        if (mounted()) {
          const error = ex as Error
          console.log(`Setting Error [${error.message}]`)
          setError(error)
          setModule(undefined)
        }
      }
    },
    [nameOrAddress, node, nodeError],
  )

  return [module, error]
}
