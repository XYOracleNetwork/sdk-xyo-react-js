import { usePromise } from '@xylabs/react-promise'
import { Logger } from '@xyo-network/core'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { useEffect, useRef } from 'react'

import { useProvidedNode } from './provided'

export const useModulesFromNode = <TModule extends Module = Module>(
  filter?: ModuleFilter,
  logger?: Logger,
): [TModule[] | null | undefined, Error | undefined] => {
  const [node] = useProvidedNode()

  const modulesLength = useRef<number>()

  const eventUnsubscribe: EventUnsubscribeFunction[] = []

  const [resolvedModules, resolvedModulesError] = usePromise<TModule[] | undefined>(async () => {
    const getModulesFromResolution = async () => {
      if (node) {
        const resolvedModules: TModule[] | undefined = await node.downResolver.resolve<TModule>(filter)
        if (resolvedModules?.length !== modulesLength.current) {
          logger?.debug(`getModulesFromResolution-setting: [${resolvedModules?.length}]`)
          modulesLength.current = resolvedModules?.length
          return resolvedModules
        }
      }
    }

    const modules = await getModulesFromResolution()

    if (node) {
      eventUnsubscribe.push(
        node.on('moduleAttached', async () => {
          logger?.debug('moduleAttached: getModulesFromResolution')
          await getModulesFromResolution()
        }),
      )
      eventUnsubscribe.push(
        node.on('moduleDetached', async () => {
          logger?.debug('moduleDetached: getModulesFromResolution')
          await getModulesFromResolution()
        }),
      )
    }
    return modules
  }, [node, filter, logger])

  useEffect(() => {
    return () => {
      //unsubscribe events
      eventUnsubscribe.forEach((func) => func())
    }
  }, [filter, node, logger])

  return [resolvedModules, resolvedModulesError]
}