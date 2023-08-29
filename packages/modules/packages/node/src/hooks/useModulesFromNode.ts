import { usePromise } from '@xylabs/react-promise'
import { ModuleFilter } from '@xyo-network/module'
import { ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { useModuleFilterOptions } from './useModuleFilterOptions'
import { ModuleFromNodeConfig } from './useModuleFromNode'
import { useNode } from './useNode'

export const useModulesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [ModuleInstance[] | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = config?.logger
  const filterOptions = useModuleFilterOptions()
  const [result, setResult] = useState<ModuleInstance[] | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    if (node) {
      node.on('moduleAttached', async ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        const moduleInstances = await node.resolve(filter, filterOptions)
        setResult(moduleInstances)
      })
      node.on('moduleDetached', async ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        const moduleInstances = await node.resolve(filter, filterOptions)
        setResult(moduleInstances)
      })
      const moduleInstances = await node.resolve(filter, filterOptions)
      setResult(moduleInstances)
      setResult(moduleInstances)
      return moduleInstances
    }
    console.log('Result: No Node')
    return undefined
  }, [node, filter])
  return [result, nodeError ?? error]
}
