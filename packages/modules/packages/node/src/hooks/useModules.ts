import { useAsyncEffect } from '@xylabs/react-shared'
import { Logger } from '@xyo-network/core'
import { EventUnsubscribeFunction } from '@xyo-network/module'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { ModuleAttachedEventArgs } from '@xyo-network/node'
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
  }, [nodeError, logger])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const eventUnsubscribe: EventUnsubscribeFunction[] = []
      try {
        if (node) {
          eventUnsubscribe.push(
            node.on('moduleAttached', ({ module }: ModuleAttachedEventArgs) => {
              if (mounted()) {
                //add the modules
                setModules([...(modules ?? []), module as TModule])
              }
            }),
          )
          eventUnsubscribe.push(
            node.on('moduleDetached', ({ module }: ModuleAttachedEventArgs) => {
              if (mounted()) {
                //remove the modules
                setModules(modules?.filter((value) => value.address !== module.address))
              }
            }),
          )
          const modules: TModule[] | undefined = await node.resolve<TModule>(filter)
          if (mounted()) {
            setModules(modules)
            setError(undefined)
          }
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
    [filter, node, logger],
  )

  return [modules, error]
}
