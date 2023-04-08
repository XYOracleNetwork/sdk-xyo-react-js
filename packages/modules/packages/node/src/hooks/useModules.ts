import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Logger } from '@xyo-network/core'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { useRef, useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModules = <TModule extends Module = Module>(filter?: ModuleFilter, logger?: Logger): [TModule[] | undefined, Error | undefined] => {
  const [node, nodeError] = useProvidedWrappedNode()
  const [modules, setModules] = useState<TModule[]>()
  const [error, setError] = useState<Error>()

  const modulesLength = useRef<number>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      /* Check pre-conditions */
      if (nodeError || !node || !filter) {
        if (mounted()) {
          nodeError && logger?.error(nodeError.message)
          modulesLength.current = undefined
          setModules(undefined)
          setError(nodeError)
        }
        return
      }

      const eventUnsubscribe: EventUnsubscribeFunction[] = []

      try {
        const getModulesFromResolution = async () => {
          const resolvedModules: TModule[] | undefined = await node.resolve<TModule>(filter)
          if (mounted()) {
            if (resolvedModules.length !== modulesLength.current) {
              logger?.debug(`getModulesFromResolution-setting: [${resolvedModules.length}]`)
              modulesLength.current = resolvedModules.length
              setModules(resolvedModules)
              setError(undefined)
            }
          }
        }
        await getModulesFromResolution()

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
        //TODO: Obviously get rid of this timer
        const timeoutFunc = async () => {
          await getModulesFromResolution()
          if (mounted()) {
            setTimeout(timeoutFunc, 1000)
          }
        }
        setTimeout(timeoutFunc, 1000)
      } catch (ex) {
        if (mounted()) {
          const error = ex as Error
          logger?.error(`useModules: useAsyncEffect [${error.message}]`)
          modulesLength.current = undefined
          setModules(undefined)
          setError(error)
        }
      }
      return () => {
        //unsubscribe events
        eventUnsubscribe.forEach((func) => func())
      }
    },
    [filter, node, logger, nodeError],
  )
  return [modules, error]
}
