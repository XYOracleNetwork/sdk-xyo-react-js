import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Logger } from '@xyo-network/core'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { isModuleInstance, ModuleFilterOptions, ModuleInstance } from '@xyo-network/module-model'
import { ModuleAttachedEventArgs, ModuleDetachedEventArgs } from '@xyo-network/node'
import { useMemo, useState } from 'react'

import { useProvidedNode } from './provided'

export type ModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
}

export const useModuleFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [ModuleInstance | null | undefined, Error | undefined] => {
  const [node] = useProvidedNode()
  const [module, setModule] = useState<ModuleInstance | null>()
  const [error, setError] = useState<Error>()

  const address = useMemo(() => module?.address, [module])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const { logger, ...resolverConfig } = config ?? {}
      const eventUnsubscribe: EventUnsubscribeFunction[] = []
      try {
        if (node) {
          const attachHandler = (args: ModuleAttachedEventArgs) => {
            const eventModule = args.module
            console.log('attachHandler: ', eventModule.address)
            if (nameOrAddress && (eventModule?.address === nameOrAddress || eventModule?.config.name === nameOrAddress)) {
              logger?.debug(`attachHandler-setting [${nameOrAddress}]`)
              if (eventModule) {
                if (isModuleInstance(eventModule)) {
                  setModule(eventModule)
                  setError(undefined)
                } else {
                  setModule(null)
                  setError(Error('Attached module failed identity check'))
                }
              } else {
                setModule(undefined)
                setError(undefined)
              }
            }
          }
          const detachHandler = (args: ModuleDetachedEventArgs) => {
            const eventModule = args.module
            console.log('detachHandler: ', eventModule.address)
            if (eventModule.address === address) {
              logger?.debug(`detachHandler-clearing [${address}]`)
              setModule(null)
              setError(undefined)
            }
          }
          const module = nameOrAddress ? await node.resolve(nameOrAddress, resolverConfig) : undefined
          if (mounted()) {
            if (module) {
              if (!isModuleInstance(module)) {
                setModule(null)
                setError(Error('Resolved module failed identity check'))
              } else {
                eventUnsubscribe.push(node.on('moduleAttached', attachHandler))
                eventUnsubscribe.push(node.on('moduleDetached', detachHandler))
                logger?.debug(`resolved [${nameOrAddress}]`)
                setModule(module ?? null)
                setError(undefined)
              }
            } else {
              setModule(undefined)
              setError(undefined)
            }
          }
        } else {
          if (mounted()) {
            setModule(node)
            setError(undefined)
          }
        }
        return () => {
          //remove the event handler on unmount
          eventUnsubscribe.forEach((func) => func())
        }
      } catch (ex) {
        if (mounted()) {
          const error = ex as Error
          logger?.error(error.message)
          setError(error)
          setModule(undefined)
        }
      }
    },
    [nameOrAddress, node, address, config],
  )

  return [module, error]
}
