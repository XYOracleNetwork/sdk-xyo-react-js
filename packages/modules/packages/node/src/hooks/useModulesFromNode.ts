import { usePromise } from '@xylabs/react-promise'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { isModuleInstance, ModuleFilter, ModuleInstance } from '@xyo-network/module-model'
import { useRefresh } from '@xyo-network/react-module'
import { useDataState } from '@xyo-network/react-shared'
import compact from 'lodash/compact'
import { useEffect, useRef } from 'react'

import { useProvidedNode } from './provided'
import { ModuleFromNodeConfig } from './useModuleFromNode'

export const useModulesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [ModuleInstance[] | null | undefined, Error | undefined] => {
  const [providedNode] = useProvidedNode()
  const [configMemo, setConfigMemo] = useDataState(config)
  const [refreshed, refresh] = useRefresh()

  setConfigMemo(config)

  //we store this to prevent the need of a deep compare to prevent  re-render
  const modulesLength = useRef<number>()

  const eventUnsubscribe: EventUnsubscribeFunction[] = []

  const [resolvedModules, resolvedModulesError] = usePromise<ModuleInstance[] | null | undefined>(async () => {
    const getModulesFromResolution = async (): Promise<ModuleInstance[] | null | undefined> => {
      const { logger, ...resolverConfig } = configMemo ?? {}
      const activeNode = configMemo?.node ?? providedNode
      if (activeNode) {
        const allResolvedModules = compact(
          (await activeNode.resolve(filter, resolverConfig)).map((module) => (isModuleInstance(module) ? module : undefined)),
        )
        logger?.log(`getModulesFromResolution:allResolvedModules [${allResolvedModules?.length}]`)
        if (allResolvedModules?.length !== modulesLength.current) {
          logger?.log(`getModulesFromResolution-setting: [${allResolvedModules?.length}]`)
          modulesLength.current = allResolvedModules?.length
          return allResolvedModules
        }
      }
      return undefined
    }

    return await getModulesFromResolution()
  }, [providedNode, filter, configMemo, refreshed])

  useEffect(() => {
    const { logger, node } = configMemo ?? {}
    const activeNode = node ?? providedNode
    if (activeNode) {
      while (eventUnsubscribe.length) {
        eventUnsubscribe.pop()?.()
      }
      eventUnsubscribe.push(
        activeNode.on('moduleAttached', ({ module }) => {
          logger?.log(`moduleAttached: useModulesFromNode [${module.config.name ?? module.address}]`)
          refresh()
        }),
      )
      eventUnsubscribe.push(
        activeNode.on('moduleDetached', ({ module }) => {
          logger?.log(`moduleDetached: useModulesFromNode [${module.config.name ?? module.address}]`)
          refresh()
        }),
      )
    }

    return () => {
      //unsubscribe events
      eventUnsubscribe.forEach((func) => func())
      while (eventUnsubscribe.length) {
        eventUnsubscribe.pop()
      }
    }
  }, [providedNode, configMemo])

  return [resolvedModules, resolvedModulesError]
}
