import { useAsyncEffect } from '@xylabs/react-shared'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { ModuleDetachedEventArgs, ModuleDetachedEventEmitter } from '@xyo-network/node'
import { useMemo, useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModule = <TModule extends Module = Module>(
  nameOrAddressOrFilter?: string | ModuleFilter,
): [TModule | undefined, Error | undefined] => {
  const nameOrAddress = useMemo(() => (typeof nameOrAddressOrFilter === 'string' ? nameOrAddressOrFilter : undefined), [nameOrAddressOrFilter])
  const filter = useMemo(() => (typeof nameOrAddressOrFilter === 'object' ? nameOrAddressOrFilter : undefined), [nameOrAddressOrFilter])
  const [node, nodeError] = useProvidedWrappedNode()
  const [module, setModule] = useState<TModule>()
  const [error, setError] = useState<Error>()
  const address = module?.address
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const detachHandler = (args: ModuleDetachedEventArgs) => {
        const eventModule = args.module
        if (eventModule.address === address && mounted()) {
          setModule(undefined)
          setError(undefined)
        }
      }
      try {
        if (nodeError) {
          setError(nodeError)
          setModule(undefined)
        } else {
          if (node) {
            const emitter = node.module as ModuleDetachedEventEmitter
            const module: TModule | undefined = nameOrAddress
              ? await node.resolve<TModule>(nameOrAddress)
              : (await node.resolve<TModule>(filter)).pop()
            if (mounted()) {
              emitter.on('moduleDetached', detachHandler)
              setModule(module)
              setError(undefined)
            }
            return () => {
              //remove the event handler on unmount
              emitter.on('moduleDetached', detachHandler, true)
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
    [nameOrAddress, node, nodeError, address, filter],
  )

  return [module, error]
}
