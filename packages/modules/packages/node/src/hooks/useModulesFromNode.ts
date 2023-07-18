import { usePromise } from '@xylabs/react-promise'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { isModuleInstance, ModuleFilter, ModuleInstance } from '@xyo-network/module-model'
import { useRefresh } from '@xyo-network/react-module'
import compact from 'lodash/compact'
import { useEffect, useRef } from 'react'

import { useProvidedNode } from './provided'
import { ModuleFromNodeConfig } from './useModuleFromNode'

export const useModulesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [ModuleInstance[] | null | undefined, Error | undefined] => {
  const [node] = useProvidedNode()
  const [refreshed, refresh] = useRefresh()

  //we store this to prevent the need of a deep compare to prevent  re-render
  const modulesLength = useRef<number>()

  const eventUnsubscribe: EventUnsubscribeFunction[] = []

  const [resolvedModules, resolvedModulesError] = usePromise<ModuleInstance[] | null | undefined>(async () => {
    const getModulesFromResolution = async (): Promise<ModuleInstance[] | null | undefined> => {
      const { logger, ...resolverConfig } = config ?? {}
      if (node) {
        const allResolvedModules = compact(
          (await node.resolve(filter, resolverConfig)).map((module) => (isModuleInstance(module) ? module : undefined)),
        )
        if (allResolvedModules?.length !== modulesLength.current) {
          logger?.debug(`getModulesFromResolution-setting: [${allResolvedModules?.length}]`)
          modulesLength.current = allResolvedModules?.length
          return allResolvedModules
        }
      }
      return undefined
    }

    return await getModulesFromResolution()
  }, [node, filter, config, refreshed])

  useEffect(() => {
    const { logger } = config ?? {}
    if (node) {
      while (eventUnsubscribe.length) {
        eventUnsubscribe.pop()?.()
      }
      eventUnsubscribe.push(
        node.on('moduleAttached', () => {
          logger?.debug('moduleAttached: getModulesFromResolution')
          refresh()
        }),
      )
      eventUnsubscribe.push(
        node.on('moduleDetached', () => {
          logger?.debug('moduleDetached: getModulesFromResolution')
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
  }, [node, config])

  return [resolvedModules, resolvedModulesError]
}
