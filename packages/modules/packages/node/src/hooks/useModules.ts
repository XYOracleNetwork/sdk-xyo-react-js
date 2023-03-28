import { useAsyncEffect } from '@xylabs/react-shared'
import { Logger } from '@xyo-network/core'
import { Module, ModuleFilter } from '@xyo-network/module-model'
import { useEffect, useState } from 'react'

import { useProvidedWrappedNode } from './useProvidedNode'

export const useModules = <TModule extends Module = Module>(filter?: ModuleFilter, logger?: Logger): [TModule[] | undefined, Error | undefined] => {
  const [node, nodeError] = useProvidedWrappedNode()
  const [modules, setModules] = useState<TModule[]>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    logger?.debug('useModules: useEffect')
    if (nodeError) {
      setError(nodeError)
      setModules(undefined)
    }
  }, [nodeError, logger])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      logger?.debug('useModules: useAsyncEffect')
      try {
        if (node) {
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
      }
    },
    [filter, node, logger],
  )

  return [modules, error]
}
