import { usePromise } from '@xylabs/react-promise'
import { ModuleFilter } from '@xyo-network/module'
import { ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { useProvidedNode } from './provided'
import { ModuleFromNodeConfig } from './useModuleFromNode'

export const useModulesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [ModuleInstance[] | undefined, Error | undefined] => {
  const [providedNode] = useProvidedNode()
  const { logger, node: paramNode, ...resolveConfig } = config ?? {}
  const [result, setResult] = useState<ModuleInstance[] | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const activeNode = paramNode ?? providedNode
    if (activeNode) {
      activeNode.on('moduleAttached', async ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        const moduleInstances = await activeNode.resolve(filter, resolveConfig)
        setResult(moduleInstances)
      })
      activeNode.on('moduleDetached', async ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        const moduleInstances = await activeNode.resolve(filter, resolveConfig)
        setResult(moduleInstances)
      })
      const moduleInstances = await activeNode.resolve(filter, resolveConfig)
      setResult(moduleInstances)
      setResult(moduleInstances)
      return moduleInstances
    }
    console.log('Result: No Node')
    return undefined
  }, [paramNode, providedNode, filter])
  return [result, error]
}
