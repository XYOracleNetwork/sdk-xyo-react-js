import { useAsyncEffect } from '@xylabs/react-async-effect'
import { AccountInstance } from '@xyo-network/account-model'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { ModuleAttachedEventArgs, ModuleDetachedEventArgs } from '@xyo-network/node'
import { useMemo, useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModule = <TModule extends Module = Module>(
  nameOrAddressOrFilter?: string | ModuleFilter,
  account?: AccountInstance,
): [TModule | undefined, Error | undefined] => {
  const nameOrAddress = useMemo(() => (typeof nameOrAddressOrFilter === 'string' ? nameOrAddressOrFilter : undefined), [nameOrAddressOrFilter])
  const filter = useMemo(() => (typeof nameOrAddressOrFilter === 'object' ? nameOrAddressOrFilter : undefined), [nameOrAddressOrFilter])
  const [node, nodeError] = useProvidedWrappedNode(account)
  const [module, setModule] = useState<TModule>()
  const [error, setError] = useState<Error>()

  const address = useMemo(() => module?.address, [module])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const eventUnsubscribe: EventUnsubscribeFunction[] = []
      try {
        /* Check pre-conditions */
        if (nodeError || !node || !nameOrAddress) {
          if (mounted()) {
            setError(nodeError)
            setModule(undefined)
          }
          return
        }

        const attachHandler = (args: ModuleAttachedEventArgs) => {
          const eventModule = args.module
          if (nameOrAddress && (eventModule.address === nameOrAddress || eventModule?.config.name === nameOrAddress)) {
            setModule(eventModule as TModule)
            setError(undefined)
          }
        }
        const detachHandler = (args: ModuleDetachedEventArgs) => {
          const eventModule = args.module
          if (eventModule.address === address) {
            setModule(undefined)
            setError(undefined)
          }
        }
        const module: TModule | undefined = nameOrAddress ? await node.resolve<TModule>(nameOrAddress) : (await node.resolve<TModule>(filter)).pop()
        if (mounted()) {
          eventUnsubscribe.push(node.on('moduleAttached', attachHandler))
          eventUnsubscribe.push(node.on('moduleDetached', detachHandler))
          setModule(module)
          setError(undefined)
        }
        return () => {
          //remove the event handler on unmount
          eventUnsubscribe.forEach((func) => func())
        }
      } catch (ex) {
        if (mounted()) {
          setError(ex as Error)
          setModule(undefined)
        }
      }
    },
    [nameOrAddress, node, nodeError, address, filter],
  )

  return [module, error]
}
