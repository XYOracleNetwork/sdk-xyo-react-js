import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Logger } from '@xyo-network/logger'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { asModuleInstance, isModuleInstance, ModuleFilterOptions, ModuleInstance } from '@xyo-network/module-model'
import { ModuleAttachedEventArgs, ModuleDetachedEventArgs, NodeInstance } from '@xyo-network/node'
import { useDataState } from '@xyo-network/react-shared'
import { useMemo, useState } from 'react'

import { useProvidedNode } from './provided'

export type ModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: NodeInstance
}

export const useModuleFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [ModuleInstance | undefined, Error | undefined] => {
  const [providedNode] = useProvidedNode()
  const [module, setModule] = useState<ModuleInstance>()
  const [error, setError] = useState<Error>()
  const [configMemo, setConfigMemo] = useDataState(config)

  setConfigMemo(config)

  const address = useMemo(() => module?.address, [module])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const { logger, node, ...resolverConfig } = configMemo ?? {}
      const eventUnsubscribe: EventUnsubscribeFunction[] = []
      try {
        const activeNode = node ?? providedNode
        if (activeNode) {
          const attachHandler = (args: ModuleAttachedEventArgs) => {
            const eventModule = args.module
            if (nameOrAddress && (eventModule?.address === nameOrAddress || eventModule?.config?.name === nameOrAddress)) {
              logger?.debug(`attachHandler-setting [${nameOrAddress}]`)
              if (eventModule) {
                if (isModuleInstance(eventModule)) {
                  setModule(eventModule)
                  setError(undefined)
                } else {
                  const error = Error(
                    `Attached module failed identity check [${eventModule.config?.schema}:${eventModule.config?.name}:${eventModule.address}]`,
                  )
                  console.error(error.message)
                  setModule(undefined)
                  setError(error)
                }
              } else {
                setModule(undefined)
                setError(undefined)
              }
            }
          }
          const detachHandler = (args: ModuleDetachedEventArgs) => {
            const eventModule = args.module
            if (eventModule.address === address) {
              logger?.debug(`detachHandler-clearing [${address}]`)
              setModule(undefined)
              setError(undefined)
            }
          }
          const module = nameOrAddress ? await activeNode.resolve(nameOrAddress, resolverConfig) : undefined
          if (mounted()) {
            const instance = asModuleInstance(module)
            if (module) {
              if (!instance) {
                const error = Error(`Attached module failed identity check [${module.config?.schema}:${module.config?.name}:${module.address}]`)
                setModule(undefined)
                setError(error)
              } else {
                eventUnsubscribe.push(activeNode.on('moduleAttached', attachHandler))
                eventUnsubscribe.push(activeNode.on('moduleDetached', detachHandler))
                logger?.debug(`resolved [${nameOrAddress}]`)
                setModule(instance ?? null)
                setError(undefined)
              }
            } else {
              setModule(undefined)
              setError(undefined)
            }
          }
        } else {
          if (mounted()) {
            setModule(activeNode ? activeNode : undefined)
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
    [nameOrAddress, providedNode, address, configMemo],
  )

  return [module, error]
}
