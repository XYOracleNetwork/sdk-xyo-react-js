import { usePromise } from '@xylabs/react-promise'
import { Logger } from '@xyo-network/core'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { useRefresh } from '@xyo-network/react-module'
import { useEffect, useRef } from 'react'

import { useProvidedNode } from './provided'

export const useModulesFromNode = <TModule extends Module = Module>(
  filter?: ModuleFilter,
  up?: boolean,
  logger?: Logger,
): [TModule[] | null | undefined, Error | undefined] => {
  const [node] = useProvidedNode()
  const [refreshed, refresh] = useRefresh()

  const modulesLength = useRef<number>()

  const eventUnsubscribe: EventUnsubscribeFunction[] = []

  const [resolvedModules, resolvedModulesError] = usePromise<TModule[] | undefined>(async () => {
    const getModulesFromResolution = async () => {
      if (node) {
        const resolvedDownModules: TModule[] | undefined = await node.downResolver.resolve<TModule>(filter)
        const resolvedUpModules: TModule[] | undefined = up ? await node.upResolver.resolve<TModule>(filter) : []
        const allResolvedModules = [...resolvedDownModules, ...resolvedUpModules]
        if (allResolvedModules?.length !== modulesLength.current) {
          logger?.debug(`getModulesFromResolution-setting: [${resolvedModules?.length}]`)
          modulesLength.current = allResolvedModules?.length
          return allResolvedModules
        }
      }
    }

    return await getModulesFromResolution()
  }, [node, filter, logger, up, refreshed])

  useEffect(() => {
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
  }, [node])

  return [resolvedModules, resolvedModulesError]
}
