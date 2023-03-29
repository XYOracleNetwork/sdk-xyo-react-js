import { useAsyncEffect } from '@xylabs/react-shared'
import { Logger } from '@xyo-network/core'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { useEffect, useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModules = <TModule extends Module = Module>(filter?: ModuleFilter, logger?: Logger): [TModule[] | undefined, Error | undefined] => {
  const [node, nodeError] = useProvidedWrappedNode()
  const [modules, setModules] = useState<TModule[]>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    if (nodeError) {
      setError(nodeError)
      setModules(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeError, logger])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const eventUnsubscribe: EventUnsubscribeFunction[] = []

      try {
        if (node) {
          const getModulesFromResolution = async () => {
            const resolvedModules: TModule[] | undefined = await node.resolve<TModule>(filter)
            if (mounted()) {
              if (resolvedModules.length !== modules?.length) {
                setModules(modules)
                setError(undefined)
              }
            }
          }
          await getModulesFromResolution()

          eventUnsubscribe.push(
            node.on('moduleAttached', async () => {
              await getModulesFromResolution()
            }),
          )
          eventUnsubscribe.push(
            node.on('moduleDetached', async () => {
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
        } else {
          if (mounted()) {
            setError(undefined)
            setModules(undefined)
          }
        }
      } catch (ex) {
        if (mounted()) {
          const error = ex as Error
          logger?.error(`useModules: useAsyncEffect [${error.message}]`)
          setError(error)
          setModules(undefined)
        }
      }
      return () => {
        logger?.debug('useModules: unmount')
        //unsubscribe events
        eventUnsubscribe.forEach((func) => func())
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, node, logger],
  )

  return [modules, error]
}
